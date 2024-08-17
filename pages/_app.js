import "../styles/globals.css";
import { Layout } from "../components";
import { StateContext } from "../context/StateContext";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Router from "next/router";
import {  ClipLoader ,BarLoader} from "react-spinners";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      // console.log("start");
      setLoading(true);
    };
    const end = () => {
      // console.log("finished");
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
            <motion.div
              key="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              
              style={{
                minHeight: "100vh",
                width: "100vw",
                display: "flex",
                flexDirection:'column',
                alignItems: "center",
                justifyContent: "center",
                gap:'7px'
              }}
            >
              {/* <ClipLoader  /> */}
              <BarLoader  />
            </motion.div>
            
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </StateContext>
    </AnimatePresence>
  );
}

export default MyApp;
