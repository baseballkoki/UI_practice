import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { User } from "../components/types/api/user"

type LoginUser = User & { isAdmin: boolean };

export type LoginUserContextType = {
    loginUser: (User & { isAdmin: boolean })| null;
    setloginUser: Dispatch<SetStateAction<LoginUser | null>>;
}

export const LoginUserContext = createContext<LoginUserContextType>({} as LoginUserContextType);

export const LoginUserProvider = (props: { children: ReactNode}) => {
    const { children } = props
    const [ loginUser, setloginUser] = useState<LoginUser | null>(null);
    return (
        <LoginUserContext.Provider value={{loginUser, setloginUser}}>
            {children}
        </LoginUserContext.Provider>
    )
}