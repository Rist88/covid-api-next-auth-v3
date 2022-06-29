import "bootstrap/dist/css/bootstrap.min.css";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { useState } from "react";
import AppContext from "../AppContext";
import languagesObject from "../languageObject";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [languageSelected, setLanguageSelected] = useState("en");
  const languageObject = languagesObject;
  return (
    <SessionProvider session={session}>
      <AppContext.Provider
        value={{
          state: {
            languages: languageObject[languageSelected],
            languageSelected: languageSelected,
          },
          setLanguageSelected: setLanguageSelected,
        }}
      >
        <Component {...pageProps} />;
      </AppContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;
