import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext(); // egy globális "konténert" hoz létre

// az useContext segítségével érik el a gyermekkomponensek (sign-in, sign-up, stb) ténylegesen a value prop-ban átadott adatokat
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

const GlobalContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // az aktuális felhasználó adatait tartalmazza
  const [isLoading, setIsLoading] = useState(true); // jelzi, hogy az alkalmazás éppen tölti-e a felhasználói adatokat

  useEffect(() => {
    getCurrentUser() // a jelenlegi bejelentkezett felhasználó adatait kéri le
      .then((res) => {
        // res: érvényes felhasználói adat
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []); // első rendereléskor fut le

  return (
    // a Provider a "szolgáltató", amely körülveszi a gyermekkomponenseket (az összes képernyőt (a Stack.Screen-eket a _layout.js-ben)) és megosztja velük a dinamikusan változó adatokat (state állapotokat)
    <GlobalContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
