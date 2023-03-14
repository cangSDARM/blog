import "@/styles/katex/katex.min.css";
import "@/styles/global.scss";
import type { AppProps } from "next/app";
import type { NextPage } from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type EnhancedAppProps = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: EnhancedAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
