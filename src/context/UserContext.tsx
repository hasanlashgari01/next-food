"use client";
import { useGetUser } from "@/hooks/useAuth";
import { PropsWithChildren, createContext } from "react";

interface User {
  isLoading: boolean;
  data: {
    fullName: string;
    isLoading: boolean;
  };
}

export const UserContext = createContext<User>({} as User);

const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { isLoading, data } = useGetUser();

  return <UserContext.Provider value={{ isLoading, data }}>{children}</UserContext.Provider>;
};

export default UserProvider;
