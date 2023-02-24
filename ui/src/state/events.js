import { toast } from "react-toastify";
import { getFactSuccessMsg } from "./util";

export const handleEventActions = (
  evt,
  factActions = {},
  { urbit, src = evt.face },
  args
) => {};

export const handleEvent =
  (urbit, factActions = {}) =>
  (evt, action) => {
    console.log("====================================");
    console.log("urbit event from sub: ", evt, action);
    // debugger;
    console.log("====================================");
    console.log("evt.face: ", evt.face);

    // TODO: Handle errors, success, other events, etc. properly with toasts
    const successMessage = getFactSuccessMsg(evt?.face);
    const _toast = successMessage?.length ? successMessage : action;

    toast.success(_toast);

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
