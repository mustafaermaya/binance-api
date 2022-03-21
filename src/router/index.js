import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter);

import Coins from "../components/Coins"

const routes = [
    { path: '/', component: Coins }
];

export const router = new VueRouter({
    routes,
    mode: "history"
});