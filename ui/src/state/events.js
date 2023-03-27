export const handleEvent =
  (urbit, factActions = {}) =>
  (evt, action) => {
    console.log("urbit event from sub: ", evt, action);
    if (evt.face === "put/validity-store") {
      return;
    }
    if (action === "portal-nested-all-items") {
      return factActions.onInitialLoad(evt);
    }
    if (evt.action !== "del" && action === "portal-front-end-update") {
      return factActions.onUpdate({ evt, action, urbit });
    }
  };
