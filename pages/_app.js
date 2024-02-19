import "../styles/globals.css";
import { Layout } from "../components";
import { StateContext } from "../context/StateContext";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Router from "next/router";
import { PropagateLoader } from "react-spinners";
function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("finished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <StateContext>
        <Layout>
          <Toaster />
          {loading ? (
            <div style={{ minHeight: "100vh",width:'100vw',display:'flex',alignItems:'center' , justifyContent:'center'}}>
              <PropagateLoader color='grey' />
            </div>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </StateContext>
    </AnimatePresence>
  );
}

export default MyApp;
