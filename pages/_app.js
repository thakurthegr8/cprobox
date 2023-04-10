import React from "react";
import nprogress from "nprogress";
import { Router } from "next/router";
import Navbar from "@/src/components/sections/Navbar";
import AuthProvider from "@/src/providers/AuthProvider";
import "nprogress/nprogress.css";
import "@/styles/globals.css";

Router.events.on("routeChangeStart", () => nprogress.start());
Router.events.on("routeChangeComplete", () => nprogress.done());
Router.events.on("routeChangeError", () => nprogress.done());

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
