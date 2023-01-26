import React from "react";
import { usePortalSubscription } from "./hooks/usePortal";

export const SanityTest = () => {
  usePortalSubscription();
  return <div>Yo</div>;
};
