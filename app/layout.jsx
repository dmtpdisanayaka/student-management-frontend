"use client";

import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Header } from "./components/Header";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        <AntdRegistry>
          <QueryClientProvider client={queryClient}>
            <Header />
            {children}
          </QueryClientProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
