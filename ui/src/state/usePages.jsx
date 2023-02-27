import { useStore } from "./store";
import { getInitalPages, getUserHasContent } from "./selectors";

export const useUserHasContent = userShip => {
  const userHasContent = useStore(state => getUserHasContent(state, userShip));
  return userHasContent;
};

export const useInitialPages = () => {
  const initialPages = useStore(getInitalPages);
  return initialPages;
};
