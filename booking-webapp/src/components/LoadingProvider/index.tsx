"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface LoadingContextProps {
    isLoading: boolean;
    setLoading: (state: boolean) => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null; // hoặc skeleton tạm


    const setLoading = (state: boolean) => {
        setIsLoading(state);
    };

    return <LoadingContext.Provider value={{ isLoading, setLoading }}>{children}</LoadingContext.Provider>;
};

export const useLoading = (): LoadingContextProps => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
};
