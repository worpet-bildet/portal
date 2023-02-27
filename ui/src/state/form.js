import produce from "immer";
import _get from "lodash/get";
import _set from "lodash/set";
import { initialFormData } from "./state";
import { createStore } from "./middleware";

export const getToastActions = state => ({
  add: state.addToast,
});

export const getFormActions = state => ({
  setFormAction: state.setFormAction,
  setSkipInit: state.setSkipInit,
  setFormData: state.setFormData,
  setFormDataAtPath: state.setFormDataAtPath,
  hydrateFormData: state.hydrateFormData,
  initFormData: state.initFormData,
  resetFormData: state.resetFormData,
});

export const getFormState = state => ({
  formAction: state.formAction,
  formData: state.formData,
  skipInit: state.skipInit,
  getFormDataAtPath: state.getFormDataAtPath,
});
// const toastActions = useForm(getToastActions);

export const useForm = createStore((set, get) => ({
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
  getFormDataAtPath: path => _get(get().formData, path),
  setFormDataAtPath: (path, value) =>
    set(
      produce(draft => {
        _set(draft.formData, path, value.toLowerCase());
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

export function useToastControls() {
  const controls = useForm(
    state => ({
      add: state.addToast,
      remove: state.removeToast,
      reset: state.resetToasts,
    }),
    shallow
  );

  return controls;
}
