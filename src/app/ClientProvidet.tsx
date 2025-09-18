// ClientProviders.tsx
"use client";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "image/Redux/store";
import UserProvider from "./UserProvider";
import CounterProvider from "./CounterProvider";

export default function ClientProvidet({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <UserProvider>
        <CounterProvider>{children}</CounterProvider>
      </UserProvider>
    </Provider>
  );
}
