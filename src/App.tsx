import { Theme } from "@twilio-paste/core/theme";

import { Route, Routes } from "react-router-dom";

import useBearStore from "./components/hooks/useBearStore";

import Home from "./components/pages/Home";
import Landing from "./components/pages/Landing";
import Men from "./components/pages/Men";
import Women from "./components/pages/Women";
import Jewelry from "./components/pages/Jewelry";
import Electronics from "./components/pages/Electronics";
import ProductDetails from "./components/pages/ProductDetails";
import NotFound from "./components/pages/NotFound";
import Navigation from "./components/Header/Navigation";
import { useEffect } from "react";

const App = () => {
  const { fetch } = useBearStore();

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <Theme.Provider theme="default">
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="home" element={<Home />} />
        <Route path="men" element={<Men />} />
        <Route path="women" element={<Women />} />
        <Route path="jewelry" element={<Jewelry />} />
        <Route path="electronics" element={<Electronics />} />
        <Route path="product-details/:id" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Theme.Provider>
  );
};

export default App;
