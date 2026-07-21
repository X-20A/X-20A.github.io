/**
 * preset座標の静的グラフを描画する汎用SVGエンジン(cytoscape.Coreの代替)
 * 旧cytoscapeコアが担っていた責務のみを持つ:
 *   - ノード画像/ラベルの配置プリミティブ
 *   - エッジ描画(端点クリップ・湾曲・矢印・率ラベル)
 *   - fit(bbox→viewBox)・SVGマウント・座標変換(rendered_position)・クリック当たり判定
 *   - スクショ用スタンドアロンSVGの生成
 * KanColle固有のデータ・アセット・スタイル判定は一切持たず、data injection側(draw.ts)から与えられる。
 * @module logic/efffects/svgGraph
 */

/** 描画済みマップのハンドル(cytoscape.Coreの代替) */
export interface MapCore {
    /** #cy要素 */
    container: HTMLElement;
    svg: SVGSVGElement;
    /** スクショ用に保持するSVG内部マークアップ */
    content: string;
    view_box: { x: number; y: number; w: number; h: number };
    /** ノード中心のコンテナ内ピクセル座標(旧renderedPosition相当) */
    rendered_position(node_name: string): { x: number; y: number } | null;
}

export interface NodeStyle {
    img: string;
    /** 画像のネイティブサイズ(cytoscapeはbackground-fit:noneで原寸描画していた) */
    iw: number;
    ih: number;
    /** ノード形状(楕円)のサイズ = 当たり判定・エッジ端点 */
    w: number;
    h: number;
    /** 画像オフセット(旧background-position-x/y相当。未指定は中央寄せ) */
    ox?: number;
    oy?: number;
}

export interface TextStyle {
    size: number;
    weight: number;
    fill: string;
    stroke: string;
    stroke_opacity: number;
    /** 旧text-outline-width。stroke-widthはその2倍になる */
    outline: number;
}

export const FONT_FAMILY = 'Helvetica Neue, Helvetica, sans-serif';
const EDGE_WIDTH = 4;
const ARROW_LENGTH = 12;
const ARROW_HALF_WIDTH = 5;
/** 双方向エッジを分離する制御点オフセット */
const CURVE_OFFSET = 20;
/** fit時の余白(旧cytoscapeのfit padding相当) */
const FIT_PADDING = 30;
/** 表示コンテナの基準サイズ(App.vueの.cy: max 960x640) */
const CONTAINER_W = 960;
const CONTAINER_H = 640;

/** 数値を小数2桁で文字列化(SVG座標用) */
export const n = (v: number): string => String(Math.round(v * 100) / 100);

/** 中心(x,y)にテキストを配置するSVG断片を生成 */
export function text_el(x: number, y: number, content: string, style: TextStyle): string {
    return `<text x="${n(x)}" y="${n(y)}" dy="0.35em" text-anchor="middle"`
        + ` font-size="${style.size}" font-weight="${style.weight}" fill="${style.fill}"`
        + ` stroke="${style.stroke}" stroke-opacity="${style.stroke_opacity}" stroke-width="${style.outline * 2}"`
        + ` paint-order="stroke" stroke-linejoin="round">${content}</text>`;
}

/** 中心(cx,cy)にスタイルの画像を配置するSVG断片を生成 */
export function image_el(cx: number, cy: number, s: NodeStyle): string {
    const left = cx - s.w / 2 + (s.ox ?? (s.w - s.iw) / 2);
    const top = cy - s.h / 2 + (s.oy ?? (s.h - s.ih) / 2);
    return `<image x="${n(left)}" y="${n(top)}" width="${s.iw}" height="${s.ih}" href="${s.img}"/>`;
}

/** (tx,ty)方向へ向かう、中心(cx,cy)の楕円(rx,ry)境界点 */
function ellipse_boundary(
    cx: number, cy: number, rx: number, ry: number,
    tx: number, ty: number,
): { x: number; y: number } {
    const dx = tx - cx;
    const dy = ty - cy;
    const t = 1 / Math.sqrt((dx * dx) / (rx * rx) + (dy * dy) / (ry * ry));
    return { x: cx + dx * t, y: cy + dy * t };
}

/** エッジ描画の見た目指定(色・湾曲・ラベルはdata injection側が決定) */
export interface EdgeOptions {
    color: string;
    /** 逆向きエッジが存在する場合にtrue。左右に湾曲させて分離する(旧bezier相当) */
    curved: boolean;
    /** 通過率ラベル。省略/null時は非表示 */
    label?: string | null;
    label_style?: TextStyle;
}

/**
 * source→targetのエッジ(線/曲線 + 矢印 + ラベル)を描画するSVG断片群を生成
 * 端点はノード楕円の境界でクリップされる。bboxには影響しない(旧cytoscape同様)。
 * @param sx source中心X
 * @param sy source中心Y
 * @param tx target中心X
 * @param ty target中心Y
 * @param s_style source側ノードスタイル(端点クリップ用)
 * @param t_style target側ノードスタイル(端点クリップ用)
 * @param opts 色・湾曲・ラベル
 */
export function draw_edge(
    sx: number, sy: number, tx: number, ty: number,
    s_style: NodeStyle, t_style: NodeStyle,
    opts: EdgeOptions,
): string[] {
    const { color, curved } = opts;
    const parts: string[] = [];

    let path: string;
    let tip: { x: number; y: number };
    let arrow_dir: { x: number; y: number };
    let label_pos: { x: number; y: number };

    if (curved) {
        const mx = (sx + tx) / 2;
        const my = (sy + ty) / 2;
        const dx = tx - sx;
        const dy = ty - sy;
        const len = Math.hypot(dx, dy) || 1;
        const ctrl = {
            x: mx + (-dy / len) * CURVE_OFFSET,
            y: my + (dx / len) * CURVE_OFFSET,
        };
        const s_b = ellipse_boundary(sx, sy, s_style.w / 2, s_style.h / 2, ctrl.x, ctrl.y);
        tip = ellipse_boundary(tx, ty, t_style.w / 2, t_style.h / 2, ctrl.x, ctrl.y);
        const a_len = Math.hypot(tip.x - ctrl.x, tip.y - ctrl.y) || 1;
        arrow_dir = { x: (tip.x - ctrl.x) / a_len, y: (tip.y - ctrl.y) / a_len };
        const base = { x: tip.x - arrow_dir.x * ARROW_LENGTH, y: tip.y - arrow_dir.y * ARROW_LENGTH };
        path = `<path d="M ${n(s_b.x)} ${n(s_b.y)} Q ${n(ctrl.x)} ${n(ctrl.y)} ${n(base.x)} ${n(base.y)}"`
            + ` fill="none" stroke="${color}" stroke-width="${EDGE_WIDTH}"/>`;
        // 2次ベジェのt=0.5点にラベル
        label_pos = {
            x: 0.25 * s_b.x + 0.5 * ctrl.x + 0.25 * tip.x,
            y: 0.25 * s_b.y + 0.5 * ctrl.y + 0.25 * tip.y,
        };
    } else {
        const s_b = ellipse_boundary(sx, sy, s_style.w / 2, s_style.h / 2, tx, ty);
        tip = ellipse_boundary(tx, ty, t_style.w / 2, t_style.h / 2, sx, sy);
        const len = Math.hypot(tip.x - s_b.x, tip.y - s_b.y) || 1;
        arrow_dir = { x: (tip.x - s_b.x) / len, y: (tip.y - s_b.y) / len };
        const base = { x: tip.x - arrow_dir.x * ARROW_LENGTH, y: tip.y - arrow_dir.y * ARROW_LENGTH };
        path = `<line x1="${n(s_b.x)}" y1="${n(s_b.y)}" x2="${n(base.x)}" y2="${n(base.y)}"`
            + ` stroke="${color}" stroke-width="${EDGE_WIDTH}"/>`;
        label_pos = { x: (s_b.x + tip.x) / 2, y: (s_b.y + tip.y) / 2 };
    }

    parts.push(path);

    // 矢印(三角)
    const base = { x: tip.x - arrow_dir.x * ARROW_LENGTH, y: tip.y - arrow_dir.y * ARROW_LENGTH };
    const perp = { x: -arrow_dir.y, y: arrow_dir.x };
    parts.push(
        `<polygon points="${n(tip.x)},${n(tip.y)}`
        + ` ${n(base.x + perp.x * ARROW_HALF_WIDTH)},${n(base.y + perp.y * ARROW_HALF_WIDTH)}`
        + ` ${n(base.x - perp.x * ARROW_HALF_WIDTH)},${n(base.y - perp.y * ARROW_HALF_WIDTH)}"`
        + ` fill="${color}"/>`
    );

    // ラベル(未指定時は非表示)
    if (opts.label != null && opts.label_style) {
        parts.push(text_el(label_pos.x, label_pos.y, opts.label, opts.label_style));
    }

    return parts;
}

/** create_mapへ渡すSVG断片群(描画順にjoinされる) */
export interface GraphParts {
    /** エッジ(線・矢印・ラベル) */
    edge_parts: string[];
    /** ノード(画像・ラベル・装飾) */
    node_parts: string[];
    /** クリック当たり判定 */
    hit_parts: string[];
}

/** fit計算用の全要素バウンディングボックス */
export interface MapBounds {
    min_x: number;
    min_y: number;
    max_x: number;
    max_y: number;
}

/**
 * 生成済みSVG断片群からviewBoxを算出し、#cyへSVGをマウントしてハンドルを返す
 * @param parts エッジ・ノード・当たり判定の各SVG断片
 * @param bounds 全要素bbox(fit用)
 * @param position_of ノード名→SVG座標(rendered_position用)
 * @returns 描画済みマップのハンドル
 */
export function create_map(
    parts: GraphParts,
    bounds: MapBounds,
    position_of: (node_name: string) => { x: number; y: number } | null,
): MapCore {
    // fit相当: 全要素bbox + 余白をviewBoxに設定(以降のリサイズはSVGが自動追従)
    const bw = bounds.max_x - bounds.min_x;
    const bh = bounds.max_y - bounds.min_y;
    const scale = Math.min(CONTAINER_W / bw, CONTAINER_H / bh);
    const pad = FIT_PADDING / scale;
    const view_box = {
        x: bounds.min_x - pad,
        y: bounds.min_y - pad,
        w: bw + pad * 2,
        h: bh + pad * 2,
    };

    const content = `<g pointer-events="none">${parts.edge_parts.join('')}${parts.node_parts.join('')}</g>`
        + `<g>${parts.hit_parts.join('')}</g>`;

    // #cyに生成
    const container = document.getElementById('cy')!;
    container.innerHTML = '';
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `${n(view_box.x)} ${n(view_box.y)} ${n(view_box.w)} ${n(view_box.h)}`);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('font-family', FONT_FAMILY);
    svg.style.userSelect = 'none';
    svg.style.display = 'block';
    svg.innerHTML = content;
    container.appendChild(svg);

    return {
        container,
        svg,
        content,
        view_box,
        rendered_position(node_name: string) {
            const pos = position_of(node_name);
            const ctm = svg.getScreenCTM();
            if (!pos || !ctm) return null;
            const rect = container.getBoundingClientRect();
            const p = new DOMPoint(pos.x, pos.y).matrixTransform(ctm);
            return { x: p.x - rect.left, y: p.y - rect.top };
        },
    };
}

/**
 * スクショ用のスタンドアロンSVG文字列を生成(旧cy.jpg相当の元画像)
 * @param map 描画済みマップ
 * @param width 出力幅(旧maxWidth: 1293)
 * @param bg 背景色(旧bg: '#212121')
 */
export function build_map_screenshot_svg(
    map: MapCore,
    width: number,
    bg: string,
): string {
    const { x, y, w, h } = map.view_box;
    const height = Math.round(width * h / w);
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"`
        + ` viewBox="${n(x)} ${n(y)} ${n(w)} ${n(h)}" font-family="${FONT_FAMILY}">`
        + `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="${bg}"/>`
        + map.content
        + '</svg>';
}
