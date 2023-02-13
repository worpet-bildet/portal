export const handleEventActions = (
  evt,
  factActions = {},
  { urbit, src = evt.face },
  args
) => {};

export const handleEvent =
  (urbit, factActions = {}) =>
  (evt, action) => {
    console.log("urbit event from sub: ", evt);
    console.log("evt.face: ", evt.face);
    if (evt.face === "put/validity-store") {
      return;
    }
    if (action === "portal-nested-all-items") {
      return factActions.onInitialLoad(evt);
    }
    if (action === "portal-front-end-update") {
      return factActions.onUpdate({ evt, action, urbit });
    }
    console.log({ factActions, action, evt });
    debugger;
  };

// TODO: async middleware
