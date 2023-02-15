import React, { useState, useEffect } from "react";
import Urbit from "@urbit/http-api";
import { authSubConfig, urbitConfig } from "../config";

// UNUSED - Use this for custom auth or if facing auth issues
export const openAirlock = async () => {
  const authAirlock = async () => await Urbit.authenticate(authSubConfig);

  const airlock = await authAirlock();
  airlock.subscribe(urbitConfig.desk, "/all");
};

export const useAirlock = () => {
  const [airlock, setAirlock] = useState(null);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const authAirlock = async () => {
      const airlock = await Urbit.authenticate(authSubConfig);
      setAirlock(airlock);
      setIsAuthed(true);
    };
    authAirlock();
  }, []);
  return { airlock, isAuthed };
};
