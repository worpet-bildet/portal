import { useEffect } from "react";
import bootstrap from "../lib/state/bootstrap";
import useErrorHandler from "../lib/logic/useErrorHandler";

export const useLandscapeSubscription = () => {
  const handleError = useErrorHandler();
  useEffect(() => {
    handleError(() => {
      bootstrap();
    })();
  }, [handleError]);
};
