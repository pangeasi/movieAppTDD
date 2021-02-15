import { TermProvider } from "../context/term.context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <TermProvider>
      <Component {...pageProps} />
    </TermProvider>
  );
}

export default MyApp;
