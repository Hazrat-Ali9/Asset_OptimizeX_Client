import { createContext, useState } from "react";
// User Context jsx
export const UserContext = createContext();

export function UserProvider ({children}) {
    const [user,setUser] = useState({})
    return(
        <UserContext.Provider value= {[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}