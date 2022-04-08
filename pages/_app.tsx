import "../styles/global.css";
import { AppProps } from "next/app";
import React from "react";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import store from "../store/store";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (
    router.pathname.includes("signin") ||
    router.pathname.includes("signup")
  ) {
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  } else {
    return (
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    );
  }
}
export default App;
