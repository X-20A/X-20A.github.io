/**
 * 行の選択状態。
 *
 * 旧実装は選択を2行までに制限し、それを diff 表示のトリガーも兼ねさせていた。
 * 複数行のコピーを扱うため、選択の上限を外し、比較対象の指定と切り離す
 */

export type SelectionState = {
    selection: number[],
    /** Shift による範囲選択の起点 */
    anchor_index: number | null,
}

export type ClickModifiers = {
    ctrl: boolean,
    shift: boolean,
}

export const EMPTY_SELECTION: SelectionState = {
    selection: [],
    anchor_index: null,
};

function make_range(from: number, to: number): number[] {
    const start = Math.min(from, to);
    const end = Math.max(from, to);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/**
 * 行がクリックされたときの新しい選択状態を返す
 */
export function calc_selection(
    state: SelectionState,
    index: number,
    modifiers: ClickModifiers,
): SelectionState {
    // 起点がない状態での Shift は単独選択として扱う
    if (modifiers.shift && state.anchor_index !== null) {
        return {
            selection: make_range(state.anchor_index, index),
            // 起点は動かさない。続けて Shift を押したまま範囲を広げられるように
            anchor_index: state.anchor_index,
        };
    }

    if (modifiers.ctrl) {
        const is_selected = state.selection.includes(index);

        return {
            selection: is_selected
                ? state.selection.filter(i => i !== index)
                : state.selection.concat(index),
            anchor_index: index,
        };
    }

    // 修飾なしのクリックは単独選択。既に単独で選ばれていれば解除する
    const is_only_selection =
        state.selection.length === 1 && state.selection[0] === index;

    return is_only_selection
        ? { selection: [], anchor_index: null }
        : { selection: [index], anchor_index: index };
}

/**
 * 行が削除・並べ替えされた後に、選択から範囲外の行を落とす
 */
export function clamp_selection(
    state: SelectionState,
    row_count: number,
): SelectionState {
    const selection = state.selection.filter(
        index => index >= 0 && index < row_count,
    );

    const anchor_index =
        state.anchor_index !== null
            && state.anchor_index >= 0
            && state.anchor_index < row_count
            ? state.anchor_index
            : null;

    return { selection, anchor_index };
}

/**
 * 選択された行を昇順で返す。
 * 選択順ではなくシート上の並び順でコピーするため
 */
export function sorted_selection(state: SelectionState): number[] {
    return [...state.selection].sort((a, b) => a - b);
}

/**
 * diff は2行を比べる機能のため、それ以外の選択数では選べない
 */
export function can_show_diff(state: SelectionState): boolean {
    return state.selection.length === 2;
}
