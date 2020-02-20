import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { VSnackbar, VIcon, VBtn } from 'vuetify/lib'
import VuetifyToast from 'vuetify-toast-snackbar'

Vue.use(Vuetify, {
    components: {
        VSnackbar,
        VIcon,
        VBtn
    }
})

Vue.use(VuetifyToast, {
    x: 'right',
    y: 'top',
    showClose: true
})

export default new Vuetify({
    theme: {
        dark: true
    }
});
