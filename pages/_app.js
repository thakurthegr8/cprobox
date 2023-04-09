import Navbar from "@/src/components/sections/Navbar";
import AuthProvider from "@/src/providers/AuthProvider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
