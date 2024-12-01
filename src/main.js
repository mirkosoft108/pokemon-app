import { createApp } from 'vue';
import { createPinia } from 'pinia'; 
import App from './App.vue';
import router from './router';
import { Quasar, Notify } from 'quasar'
import quasarUserOptions from './quasar-user-options'

const app = createApp(App).use(Quasar, {
    plugins: {
      Notify
    }}, quasarUserOptions);

const pinia = createPinia();
app.use(pinia);

app.use(router);

app.mount('#app');

