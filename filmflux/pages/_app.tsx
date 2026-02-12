import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import { WatchlistProvider } from "@/contexts/WatchlistContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <ThemeProvider>
        <WatchlistProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </WatchlistProvider>
      </ThemeProvider>
    </div>
  );
}
