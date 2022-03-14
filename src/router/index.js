import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter);

import Home from "../components/Home"
import About from "../components/About"

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About }
];

export const router = new VueRouter({
    routes,
    mode: "history"
});