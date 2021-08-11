import Home from '@views/home/home';
import About from '@views/about/about';

export const routes = [
    {
        component: Home,
        exact: true,
        path: '/',
    },
    {
        component: About,
        exact: false,
        path: '/about',
    },
];
