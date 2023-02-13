import { useEffect, useState } from "react";
import Urbit from "@urbit/http-api";

import { getSubscription } from "./subscription";
import { pokes } from "./pokes";
import { handleEvent } from "../state/events";
import { useStore } from "../state/store";
import { getActions, getScryActions } from "../state/selectors";

export const usePortalSubscription = () => {
  const [ship, urbit] = useUrbit();
  const [portalSub, setPortalSub] = useState(null);
  const factActions = useStore(getActions);
  // const toastActions = useForm(getToastActions);

  useEffect(() => {
    if (urbit && ship && !portalSub) {
      const portalSub = getSubscription(urbit, handleEvent(urbit, factActions));
      setPortalSub(portalSub);
    }
    return () => urbit?.unsubscribe(portalSub);
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
