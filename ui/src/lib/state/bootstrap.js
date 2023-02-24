import api from "../api";
import { useGroupState } from "./groups/groups";
import useHarkState from "./hark";

export default async function bootstrap(reset = false) {
  if (reset) {
    api.reset();
  }
  useGroupState.getState().start();
  useHarkState.getState().start();
}
