import { createVuetify } from "vuetify";

/**
 * pictogrammers から
 * @example - <v-icon icon="mdi:mdi-send-outline"/>
 */
// import { mdi } from "vuetify/iconsets/mdi";
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
/**
 * Google Fonts から
 * @example - <v-icon icon="md:drag_indicator" />
 */
// import { md } from "vuetify/iconsets/md";
// import '@mdi/font/css/materialdesignicons.css';


// cssが重い！アイコン数個の為に数百kbは大きすぎる。没！
// vite-plugin-svg-icons を検討

// components や directives は vite-plugin-vuetify が自動で必要なだけ読んでくれる
// ただし、<component :is="button ? 'v-btn' : 'v-chip'" /> みたいに
// 動的に読み込まれる components は拾わないらしいので注意

const vuetify = createVuetify({
    theme: {
        themes: {
            light: {
                colors: { // このへんまだよくわからん
                    primary: '#fff',
                    secondary: '#fff',
                    accent: '#fff',
                    error: '#fff',
                    warning: '#fff',
                    info: '#fff',
                    success: '#fff',
                },
            },
        },
    },
    /*
    icons: {
        sets: {
            mdi,
            md,
        },
    }, */
});

export default vuetify;
