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
    if (action === "portal-nested-all-items") {
      return factActions.onInitialLoad(evt);
    }
  };

// TODO: async middleware
