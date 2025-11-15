import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const authorizationToken = `Bearer ${token}`;
    
    const API = import.meta.env.VITE_APP_URI_API;

    const storeTokenInLS = async (serverToken) => {
        localStorage.setItem("token", serverToken);
        setToken(serverToken);
      
        // fetch user immediately
        await userAuthentication();
    };
      
    
    let isLoggedIn = !!token;
    // console.log('isLoggedIn',isLoggedIn);

    //tackling logout functionality
    const LogoutUser = () =>{
        setToken("");
        return localStorage.removeItem('token');
    }

    //JWT AUTHENTICATION to get the currently
    //loggedIN user data
    const userAuthentication = async () => {
        if (!token) return;
        try {
          setIsLoading(true);
          const response = await fetch(`${API}/api/auth/user`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });
      
          if (response.ok) {
            const data = await response.json();
            setUser(data.userData); // set user immediately
            setIsLoading(false);
          } else {
            setIsLoading(false);
            setUser(null);
          }
        } catch (error) {
          console.log("User auth error", error);
          setIsLoading(false);
          setUser(null);
        }
    };
      
    useEffect(() =>{
        userAuthentication();
    },[]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, API }}>
        {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);

    if (!authContextValue){
        throw new Error("useAuth used outside of the Provider");
    } 
    return authContextValue;
}