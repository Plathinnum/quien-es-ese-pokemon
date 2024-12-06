// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import ClassicGuessView from '../views/ClassicGuessView.vue';
import RandomGuessView from '@/views/RandomGuessView.vue';
import GeneratorView from '@/views/GeneratorView.vue';

const routes = [
    { path: '/list-pokemon', component: ClassicGuessView },
    { path: '/random-pokemon', component: RandomGuessView },
    { path: '/generator', component: GeneratorView }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
