"use client";

import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apolloClient";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ApolloProvider client={client}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ApolloProvider>
  );
};

export default RootLayout;