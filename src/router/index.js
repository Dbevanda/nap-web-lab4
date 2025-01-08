import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import NotFound from '../views/NotFound.vue';

const EventPage = () => import('../views/EventPage.vue');

const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date) && dateString.match(/^\d{4}-\d{2}-\d{2}$/);
};

const routes = [
    { path: '/', component: HomePage },
    {
        path: '/event/:date',
        component: EventPage,
        props: true,
        beforeEnter: (to, from, next) => {
            if (isValidDate(to.params.date)) {
                next();
            } else {
                next({ path: '/404' });
            }
        },
    },
    { path: '/404', component: NotFound },
    { path: '/:catchAll(.*)', redirect: '/404' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;