import Products from './components/Products'
import Cart from './components/Cart'
import About from './components/About'
import Login from './components/Login'
import Logout from './components/Logout'
import Register from './components/Register'
import Profile from './components/Profile'


const getToken = () => localStorage.getItem('user');

const ifNotAuthenticated = (to, form, next) => {
    if(!getToken()){
        next();
        return;
    }
    next('/profile');
}

const ifAuthenticated = (to, from, next) => {
    if (getToken()) {
        next();
        return;
    }
    next('/login');
}

const routes = [{
        path: '/',
        component: Products
    },
    {
        path: '/cart',
        component: Cart
    },
    // {
    //     path: '/order-create',
    //     component: CreateOrder,
    //     beforeEnter: ifAuthenticated,
    // },
    {
        path: '/about',
        component: About,
    },
    // {
    //     path: '/payment',
    //     component: Payment,
    // },
    {
        path: '/login',
        component: Login,
        beforeEnter: ifNotAuthenticated,
    },
    {
        path: '/register',
        component: Register,
        beforeEnter: ifNotAuthenticated,
    },
    {
        path: '/logout',
        component: Logout,
    },
    {
        path: '/profile',
        component: Profile,
        beforeEnter: ifAuthenticated,
    },
]


export default routes;
