import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { useState } from "react";
import AppContext from "../AppContext";
import languagesObject from "../languageObject";

function MyApp({ Component, pageProps }) {
  const [languageSelected, setLanguageSelected] = useState("en");
  const languageObject = languagesObject;
  return (
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
  );
}

export default MyApp;
