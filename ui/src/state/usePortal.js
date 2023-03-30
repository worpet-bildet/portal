import Urbit from "@urbit/http-api";

export const api = new Urbit("", "", "portal");
api.ship = window.ship;

export const usePortal = () => {
  return { urbit: api, ship: api.ship };
};

export const scry = async s => {
  return await api.scry(s);
};

export const poke = p => {
  return api.poke(p);
};

export const getState = () => {
  return scry({
    app: "portal-store",
    path: `/all/nested`,
  });
};
