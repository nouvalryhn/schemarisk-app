import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import '@/assets/styles.scss';
import '@/assets/tailwind.css';

import './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark'
        }
    }
});
app.use(ToastService);
app.use(ConfirmationService);

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, you can redirect them to the intended route if needed
    } else {
        // User is not signed in, handle accordingly
        router.push('/auth/access');
    }
});

app.mount('#app');
