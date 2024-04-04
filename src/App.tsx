import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import useBearStore from "./components/hooks/useBearStore";

import Landing from "./components/pages/Landing";
import Home from "./components/pages/Home";
import Men from "./components/pages/Men";
import Women from "./components/pages/Women";
import Jewelry from "./components/pages/Jewelry";
import Electronics from "./components/pages/Electronics";
import NotFound from "./components/pages/NotFound";
import Navigation from "./components/Header/Navigation";

import { CustomizationProvider } from "@twilio-paste/core/customization";

const App = () => {
  const { fetch } = useBearStore();

  useEffect(() => {
    fetch();
  }, [fetch]);

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
      </Routes>
    </CustomizationProvider>
  );
};

export default App;
