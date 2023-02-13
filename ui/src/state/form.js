import produce from "immer";
import { initialFormData } from "./state";
import { createFormStore } from "./middleware";

export const useForm = createFormStore((set, get) => ({
  formAction: "ITEM_ADD",
  formData: initialFormData,
  skipInit: false,
  toastStack: new Set(),
  setSkipInit: skip =>
    set(
      produce(draft => {
        draft.skipInit = skip;
      })
    ),
  setFormAction: action =>
    set(
      produce(draft => {
        draft.formAction = action;
        draft.formData.actionType = action;
      })
    ),
  setFormData: (name, value) =>
    set(
      produce(draft => {
        draft.formData[name] = value.toLowerCase();
      })
    ),
  hydrateFormData: data =>
    set(
      produce(draft => {
        draft.formData = { ...draft.formData, ...data };
        draft.skipInit = true;
      })
    ),
  initFormData: data =>
    set(
      produce(draft => {
        draft.formData = data;
      })
    ),
  resetFormData: () =>
    set(
      produce(draft => {
        draft.formData = initialFormData;
      })
    ),
  addToast: ({ message, type = toastTypes.SUCCESS }) =>
    set(
      produce(draft => {
        draft.toastStack.add({ message, type, id: `${new Date()}` });
      })
    ),
  removeToast: toast =>
    set(
      produce(draft => {
        draft.toastStack.delete(toast);
      })
    ),
  resetToasts: () =>
    set(
      produce(draft => {
        draft.toastStack = new Set();
      })
    ),
}));

export const toastTypes = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  WARNING: "WARNING",
  INFO: "INFO",
};
