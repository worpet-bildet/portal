import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import pipe from "ramda/es/pipe";

export const createStore = pipe(immer, create);
