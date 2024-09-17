import { createContext, useContext, useEffect, useState } from "react";
import { router } from "expo-router";

import { getCurrentUser } from "../lib";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
            .then((result) => {
                if (result) {
                    setIsLoggedIn(true);
                    setUser(result);
                    router.replace("/home");
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
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading,
                setIsLoading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalProvider };
