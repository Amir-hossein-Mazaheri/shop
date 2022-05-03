import React, { Suspense } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "@loadable/component";
import MainLayout from "../Layouts/MainLayout";
import Loading from "../Common/Loading";

const HomePage = lazy(() => import("../Pages"));

const App: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout asRoute />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
