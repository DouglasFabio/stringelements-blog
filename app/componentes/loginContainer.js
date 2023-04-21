'use client'

import { createContext } from "react"
import { SessionProvider } from "next-auth/react";
export const TokenContext = createContext(null);
export default function LoginContainer({ children }) {
    const getToken = () => {
        return null;
    }
    return (
        <>
            <SessionProvider>
                {children}
            </SessionProvider>
        </>
    )
}