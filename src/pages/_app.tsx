import { Noto_Sans_JP } from "next/font/google";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline } from "@mui/material";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProps } from "next/app";
import { ReactNode, Suspense, useCallback } from "react";
import { SessionProvider } from "@/client/session/session-hook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CommonLayout } from "@/client/layout/common-layout";

const queryClient = new QueryClient();

const noto = Noto_Sans_JP({ subsets: ["latin"], weight: "400" });

interface CustomComponent {
  Layout({ children }: { children: ReactNode }): ReactNode;

  icon?: ReactNode;
  title?: string;
}

export default function App({ Component, pageProps }: AppProps) {
  const customComponent = Component as unknown as CustomComponent;

  const title = customComponent.title;
  const icon = customComponent.icon;

  const FallbackLayout = useCallback(
    ({ children }: { children: ReactNode }) => {
      return (
        <CommonLayout title={title} icon={icon}>
          {children}
        </CommonLayout>
      );
    },
    [icon, title],
  );

  const Layout = customComponent.Layout ?? FallbackLayout;
  return (
    <>
      <Head>
        <title>medi+</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <ReactQueryDevtools initialIsOpen={false} />
        <SessionProvider>
          <Suspense fallback={<p>資格情報を検証中・・・</p>}>
            <Layout>
              <Component {...pageProps} />
              <ToastContainer />
            </Layout>
          </Suspense>
        </SessionProvider>
      </QueryClientProvider>
    </>
  );
}
