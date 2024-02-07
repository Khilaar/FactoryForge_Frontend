import { BrowserRouter, Routes, Route } from "react-router-dom";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/register">
          <Route index element={<RegisterPage />} />
          <Route path="validation" element={<ValidationPage />} />
        </Route> */}
        <Route path="/" element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
