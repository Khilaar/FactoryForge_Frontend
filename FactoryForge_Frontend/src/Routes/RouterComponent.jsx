import { Routes, Route } from "react-router-dom";
import Layout from "./LayoutRoute/Layout.jsx";
import NotFound from "./NotFoundRoute/NotFound.jsx";

const RouterComponent = () => {
  return (
    <Routes>
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/register">
          <Route index element={<RegisterPage />} />
          <Route path="validation" element={<ValidationPage />} />
        </Route> */}
      <Route path="*" element={<Layout />}>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouterComponent;