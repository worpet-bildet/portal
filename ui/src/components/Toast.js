import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { shallow } from "zustand/shallow";
import cn from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useToastStore } from "../state/useToast";

export function Toast(props) {
  const { uniqueId, config = {}, className, children } = props;
  const { duration = 3500, role = "status" } = config;

  const { toastList, close } = useToastStore(
    state => ({
      toastList: state.toastList,
      close: state.close,
    }),
    shallow
  );

  const isShown = toastList.has(uniqueId);

  useEffect(() => {
    if (!duration || !isShown) {
      return;
    }

    const timeoutId = setTimeout(() => {
      close(uniqueId);
    }, duration);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [uniqueId, isShown, duration, close]);

  return createPortal(
    <AnimatePresence>
      {isShown && (
        <motion.div
          key={uniqueId}
          layout
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.5 }}
          className={cn("toast", className)}
          role={role}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.querySelector("#toasts-portal")
  );
}
