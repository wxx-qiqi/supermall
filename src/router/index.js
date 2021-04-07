import Vue from 'vue';
import VueRouter from 'vue-router';
const Home = () =>
    import ('../views/home/Home')
const My = () =>
    import ('../views/my/My')
const Category = () =>
    import ('../views/category/Category')
const Cart = () =>
    import ('../views/cart/Cart')

Vue.use(VueRouter);

const routes = [{
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/my',
        component: My
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/cart',
        component: Cart
    }

];

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router