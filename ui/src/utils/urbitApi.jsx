import Urbit from "@urbit/http-api";

console.log(window.desk);

const api = new Urbit('', '', window.desk);
    api.ship = window.ship;

export const getUrbitApi = () => api;
