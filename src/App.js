import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Container from "./component/Container";
import PrivateRoute from "./component/PrivateRoute";

const App = () => {
  const Authantication = lazy(() => import("./component/Authantication"));
  const Home = lazy(() => import("./component/Home"));
  const Profile = lazy(() => import("./component/Profile"));
  const About = lazy(() => import("./component/About"));

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
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={component(Profile)} />
        </Route>
        <Route path="/auth" element={component(Authantication)} />
        <Route path="/about" element={component(About)} />
        <Route index path="*" element={component(Home)} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
