import "@/styles/global.scss";
import "nprogress/nprogress.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import NProgress from "nprogress";
import { useRouter } from "next/router";
import React from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type EnhancedAppProps = AppProps & {
  Component: NextPageWithLayout;
};

NProgress.configure({ showSpinner: false });

export default function App({ Component, pageProps }: EnhancedAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();

  //useEffect only run after window useable
  React.useEffect(() => {
    router.events.on("routeChangeStart", () => NProgress.start());
    router.events.on("routeChangeComplete", () => NProgress.done());
    router.events.on("routeChangeError", () => NProgress.done());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return getLayout(<Component {...pageProps} />);
}
