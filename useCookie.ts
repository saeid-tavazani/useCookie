// use cookie

import { useState, useEffect } from "react";
import Cookie from "js-cookie";

export default function setCookie<T>(
  key: string,
  initalValue: T | (() => T),
  expiresTime: number
) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = Cookie.get(key);
    if (jsonValue != undefined) {
      return JSON.parse(jsonValue);
    }
    if (typeof initalValue === "function") {
      return initalValue as () => T;
    } else {
      return initalValue;
    }
  });
  useEffect(() => {
    if (value) {
      Cookie.set(key, JSON.stringify(value), { expires: expiresTime });
    }
  }, [key, value]);
  return [value, setValue] as [typeof value, typeof setValue];
}


// use localStorage

import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initalValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    }
    if (typeof initalValue === "function") {
      return initalValue as () => T;
    } else {
      return initalValue;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue] as [typeof value, typeof setValue];
}
