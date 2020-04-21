import { createContext, useContext } from 'react';

export const AuthContext = createContext(null); // null for this context means no user authenticated

export function useAuth() {
    return useContext(AuthContext);
}