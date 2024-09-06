// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import ClassicGuessView from '../views/ClassicGuessView.vue';
import RandomGuessView from '@/views/RandomGuessView.vue';

const routes = [
    { path: '/list-pokemon', component: ClassicGuessView },
    { path: '/random-pokemon', component: RandomGuessView }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
