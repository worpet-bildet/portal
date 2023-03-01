import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useGroupPrivacy from "./logic/useGroupPrivacy";
import { useModalNavigate, useDismissNavigate } from "./logic/routing";
import useNavigateByApp from "./logic/useNavigateByApp";
import { useGroup, useGroupState } from "./state/groups/groups";
// import useHarkState from "./state/hark";

function getButtonText(privacy, requested, invited, group) {
  switch (true) {
    case group:
      return "Go";
    case requested && !invited:
      return "Requested";
    case privacy === "private" && !invited:
      return "Request to Join";
    default:
      return "Join";
  }
}

export default function useGroupJoin(
  flag,
  gang,
  inModal = false,
  redirectItem = undefined
) {
  const [status, setStatus] = useState("initial");
  const location = useLocation();
  const navigate = useNavigate();
  const navigateByApp = useNavigateByApp();
  const modalNavigate = useModalNavigate();
  const dismiss = useDismissNavigate();
  const group = useGroup(flag);
  const { privacy } = useGroupPrivacy(flag);
  const requested = gang?.claim?.progress === "knocking";
  const invited = gang?.invite;
  const open = useCallback(() => {
    if (group) {
      return navigateByApp(`/groups/${flag}`);
    }
    return navigate(`/gangs/${flag}`, {
      state: { backgroundLocation: location },
    });
  }, [flag, group, location, navigate, navigateByApp]);
  const join = useCallback(async () => {
    setStatus("loading");
    if (privacy === "private" && !invited) {
      await useGroupState.getState().knock(flag);
      // debugger;
    } else {
      // try {
      //   await useHarkState.getState().sawRope({
      //     channel: null,
      //     desk: "groups",
      //     group: flag,
      //     thread: `/${flag}/invite`,
      //   });
      // } catch (error) {
      //   // no notification
      // }
      try {
        // debugger;
        await useGroupState.getState().join(flag, true);
        setStatus("success");
        if (redirectItem) {
          if (redirectItem.type === "chat") {
            return navigateByApp(
              `/groups/${flag}/channels/${redirectItem.nest}?msg=${redirectItem.id}`
            );
          }
          return navigateByApp(
            `/groups/${flag}/channels/${redirectItem.nest}/${redirectItem.type}/${redirectItem.id}`
          );
        }
        return navigateByApp(`/groups/${flag}`);
      } catch (e) {
        setStatus("error");
        // debugger;
        if (requested) {
          await useGroupState.getState().rescind(flag);
        } else {
          await useGroupState.getState().reject(flag);
        }
        return navigateByApp(`/find/${flag}`);
      }
    }
    return null;
  }, [privacy, invited, flag, requested, redirectItem, navigateByApp]);
  const reject = useCallback(async () => {
    /**
     * No need to confirm if the group is public, since it's easy to re-initiate
     * a join request
     */
    if (privacy === "public") {
      await useGroupState.getState().reject(flag);
      if (inModal) {
        dismiss();
      }
      return;
    }
    if (inModal) {
      modalNavigate(`/gangs/${flag}/reject`, {
        state: { backgroundLocation: location },
      });
    } else {
      navigateByApp(`/gangs/${flag}/reject`);
    }
  }, [flag, inModal, location, dismiss, modalNavigate, privacy, navigateByApp]);
  return {
    group,
    privacy,
    requested,
    dismiss,
    open,
    join,
    status,
    reject,
    button: {
      disabled: requested && !invited,
      text: getButtonText(privacy, requested, !!invited, !!group),
      action: group ? open : join,
    },
  };
}
