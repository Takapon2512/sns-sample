import React, { createContext, useContext, useState, useEffect } from "react";

//firebase
import { User, getAuth } from "firebase/auth";
import { app } from "@/lib/firebase";

//type
interface AuthContextType {
    user: User | null;
}

const AuthContext = createContext<AuthContextType>({
    user: null
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const value = {
        user: user
    };

    useEffect(() => {
        const auth = getAuth(app);
        const unSubscribe = auth.onAuthStateChanged((userCredential) => {
            if (userCredential) {
                setUser(userCredential);
            } else {
                setUser(null);
            };
        });

        return () => {
            unSubscribe();
        };
    }, []);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};