import { createContext, useState, ReactNode } from "react";

interface AppContextProps {
  token: string | null;
  setToken: (user: string | null) => void;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  return <AppContext.Provider value={{ token, setToken }}>{children}</AppContext.Provider>;
};
