import Layout from "../components/Layout";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import EditModal from "../components/modals/EditModal";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "../styles/globals.css";

dayjs.extend(relativeTime);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Toaster />
        <LoginModal />
        <EditModal />
        <RegisterModal />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  );
}

export default MyApp;
