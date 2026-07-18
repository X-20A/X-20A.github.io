/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

// スクショ用SVGシリアライズのため、マップアイコンはdata URIとして埋め込む
declare module '*.png?inline' {
    const src: string;
    export default src;
}
