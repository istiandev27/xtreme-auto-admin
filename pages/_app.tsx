import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/useAuth";
import { ContentProvider } from "../context/useContent";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContentProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ContentProvider>
  );
}
