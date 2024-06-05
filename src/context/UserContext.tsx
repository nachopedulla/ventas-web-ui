
import React from "react";
import { User } from "../models/User";

const UserContext = React.createContext({
    get: () : User => { return { id: '', name: '', mail: '',  role: '', permissions: [] }; },
    login: (mail: string, password: string) : User => { return { id: '', name: '', mail: '',  role: '', permissions: [] }},
    isLogged: () : boolean => false,
    logout: () => { }
});

const UserProvider = (props: any) => {

    const get = () : User => {
        const localUser = localStorage.getItem('user');
        return JSON.parse(localUser!);
    }

    const login = (mail: string, password: string) : User => {
        /* TODO: login contra firebase */
        var user = { id: '', mail: 'nachopedulla@gmail.com', role: 'ADMIN', permissions: [], name: 'Ignacio' }
        localStorage.setItem('user', JSON.stringify(user));
        return user;   
    }

    const logout = () => {
        localStorage.removeItem('user');
    }

    const isLogged = () : boolean => {
        const localUser = localStorage.getItem('user');
        return localUser !== null;
    }

    return (
        <UserContext.Provider value={{ get, login, isLogged, logout }} {...props} />
    )
}

const useUser = () => React.useContext(UserContext);


export { UserProvider, useUser };