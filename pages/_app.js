import "../styles/globals.css";
import { Layout } from "../components";
import { StateContext } from "../context/StateContext";
import { Toaster } from "react-hot-toast";
import {AnimatePresence} from 'framer-motion'

function MyApp({ Component, pageProps }) {
  return (
    <AnimatePresence exitBeforeEnter>  
      <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
     </AnimatePresence>
    
  );
}

export default MyApp;
