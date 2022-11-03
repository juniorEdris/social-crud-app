import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Container from "./component/Container";

const App = () => {
  const Authantication = lazy(() => import("./component/Authantication"));
  const Home = lazy(() => import("./component/Home"));

  const component = (Page) => (
    <Suspense fallback={<div>Loading</div>}>
      <Container>
        <Page />
      </Container>
    </Suspense>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={component(Authantication)} />
        <Route index path="*" element={component(Home)} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
