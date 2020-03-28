import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#3f51b5',
            secondary: '#b0bec5',
            accent: '#8c9eff',
            error: '#b71c1c',
          },
        },
      },
});

// Pallette:
// {
//     primary: #00bcd4,
//     secondary: #cddc39,
//     accent: #e91e63,
//     error: #f44336,
//     warning: #ffeb3b,
//     info: #2196f3,
//     success: #4caf50
// }
  