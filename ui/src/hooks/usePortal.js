import { useEffect, useState } from "react";
import Urbit from "@urbit/http-api";

export const usePortalSubscription = () => {
  const [ship, urbit] = useUrbit();
  const [portalSub, setPortalSub] = useState(null);

  useEffect(() => {
    if (urbit && ship && !portalSub) {
      const portalSub = getSubscription(urbit);
      setPortalSub(portalSub);
    }
    return () => {
      urbit?.unsubscribe(portalSub);
    };
  }, [ship]);
};

export const useUrbit = () => {
  const [urbit, setUrbit] = useState(null);
  const [ship, setShip] = useState(null);

  useEffect(() => {
    if (!ship) {
      const urbit = getUrbitApi("portal");
      setUrbit(urbit);
      setShip(urbit.ship);
    }
  }, [ship]);
  return [ship, urbit];
};

export const getUrbitApi = (desk = "portal") => {
  const api = new Urbit("", "", desk);
  api.ship = window.ship;
  return api;
};

export const getSubscription = (urbit, eventHandler = console.log) =>
  urbit.subscribe({
    ...subscription,
    ship: urbit.ship,
    event: eventHandler,
  });

export const subscription = {
  app: "portal-manager",
  path: "/all-items",
  ship: window?.ship || "",
  verbose: true,
  event: console.log,
  err: console.error,
  quit: console.error,
};
