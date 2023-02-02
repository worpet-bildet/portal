import { useEffect, useState } from "react";
import Urbit from "@urbit/http-api";
import { urbitConfig as config } from "../config";
import { handleEvent } from "./events";
import { onInitialLoad as _onInitialLoad, useStore } from "./store";

export const usePortalSubscription = () => {
  const [ship, urbit] = useUrbit();
  const [portalSub, setPortalSub] = useState(null);
  const onInitialLoad = useStore(_onInitialLoad);

  useEffect(() => {
    if (urbit && ship && !portalSub) {
      const portalSub = getSubscription(urbit, handleEvent(urbit, { onInitialLoad }));
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
      const urbit = getUrbitApi(config.desk);
      setUrbit(urbit);
      setShip(urbit.ship);
    }
  }, [ship]);
  return [ship, urbit];
};

export const getUrbitApi = (desk = config.desk) => {
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
  app: config.agent,
  path: config.path,
  ship: window?.ship || "",
  verbose: true,
  event: console.log,
  err: console.error,
  quit: console.error,
};
