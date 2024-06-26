import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import useScript from "./components/hooks/useScript";
import useBearStore from "./components/hooks/useBearStore";
import { readFromLocalStorage } from "./utils/localStorageUtil";
import { CustomizationProvider } from "@twilio-paste/core/customization";

import Men from "./components/pages/Men";
import Cart from "./components/pages/Cart";
import Home from "./components/pages/Home";
import Women from "./components/pages/Women";
import Jewelry from "./components/pages/Jewelry";
import Landing from "./components/pages/Landing";
import NotFound from "./components/pages/NotFound";
import Navigation from "./components/Header/Navigation";
import Electronics from "./components/pages/Electronics";

const App = () => {
  const { fetch } = useBearStore();
  const configureScriptUrl = useScript();

  useEffect(() => {
    fetch();

    const existingScript = document.querySelector(
      'script[src*="c360a.min.js"]'
    );
    if (existingScript) {
      return;
    }

    const scriptUrl = readFromLocalStorage("scriptUrl");

    if (scriptUrl) {
      configureScriptUrl(scriptUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CustomizationProvider
      elements={{
        BUTTON_STATIC_POSITION: {
          position: "static",
        },
      }}
    >
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="home" element={<Home />} />
        <Route path="men" element={<Men />} />
        <Route path="women" element={<Women />} />
        <Route path="jewelry" element={<Jewelry />} />
        <Route path="electronics" element={<Electronics />} />
        <Route path="*" element={<NotFound />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </CustomizationProvider>
  );
};

export default App;
