import React from "react";
import ReactQueryProvider from "./react-query-provider";
import { UserProvider } from "@/context/UserContext";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <ReactQueryProvider>
      <UserProvider>{children}</UserProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
