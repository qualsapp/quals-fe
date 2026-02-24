import React from "react";
import ReactQueryProvider from "./react-query-provider";
import { UserProvider } from "@/context/UserContext";
import GoogleProvider from "./google-provider";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <GoogleProvider>
      <ReactQueryProvider>
        <UserProvider>{children}</UserProvider>
      </ReactQueryProvider>
    </GoogleProvider>
  );
};

export default Providers;
