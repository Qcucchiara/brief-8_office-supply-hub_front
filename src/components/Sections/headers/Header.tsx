"use client";
import React, { useEffect, useState } from "react";
import { HeaderUser } from "./HeaderUser";
import { HeaderGuest } from "./HeaderGuest";
export const authStatus = {
  NOT_LOGGED: "NOT_LOGGED",
  LOGGED_USER: "LOGGED_USER",
  LOGGED_ADMIN: "LOGGED_ADMIN",
};

export enum AuthStatus {
  NOT_LOGGED = "NOT_LOGGED",
  LOGGED_USER = "LOGGED_USER",
  LOGGED_ADMIN = "LOGGED_ADMIN",
}

export const Header = () => {
  const [status, setStatus] = useState<string>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setStatus("LOGGED_USER");
    }
  }, []);
  return (
    <>{status === authStatus.LOGGED_USER ? <HeaderUser /> : <HeaderGuest />}</>
  );
};
