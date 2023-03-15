import api from "../api";
import { useGroupState } from "./groups/groups";
// import useHarkState from "./hark";
// import usePalsState from "./pals";

export default async function bootstrap(reset = false) {
  if (reset) {
    // api.reset();
  }
  useGroupState.getState().start();
  // usePalsState.getState().initializePals();
  // useHarkState.getState().start();
}
