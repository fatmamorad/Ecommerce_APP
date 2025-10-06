// ClientProviders.tsx
"use client";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "image/Redux/store";
import UserProvider from "./UserProvider";

export default function ClientProvidet({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <UserProvider>
         {children}
      </UserProvider>
    </Provider>
  );
}
