import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./layout/Layout";
import { MenuType } from "./router/menu";

const Home = lazy(() => import("./pages/Home"));
const Basic = lazy(() => import("./pages/Basic"));
const Compare = lazy(() => import("./pages/Compare"));
const Tuning = lazy(() => import("./pages/Tuning"));
const Word = lazy(() => import("./pages/Word"));
const TuningLecture = lazy(() => import("./pages/TuningLecture"));
const Practice = lazy(() => import("./pages/Practice"));
const Docker = lazy(() => import("./pages/Docker"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={MenuType.BASIC} element={<Basic />} />
            <Route path={MenuType.COMPARE} element={<Compare />} />
            <Route path={MenuType.TUNING} element={<Tuning />} />
            <Route path={MenuType.WORD} element={<Word />} />
            <Route path={MenuType.TUNINGLECTURE} element={<TuningLecture />} />
            <Route path={MenuType.PRACTICE} element={<Practice />} />
            <Route path={MenuType.DOCKER} element={<Docker />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
