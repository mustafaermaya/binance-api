import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter);

import SymbolList from "../components/SymbolList"

const routes = [
    { path: '/', component: SymbolList }
];

export const router = new VueRouter({
    routes,
    mode: "history"
});