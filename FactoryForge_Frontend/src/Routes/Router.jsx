import { Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import NotFound from "./NotFound.jsx";

import LoginPage from "./Authentication/LoginPage.jsx";
import ProductInventory from "./ProtectedPages/ProductInventory.jsx";
import RegisterPage from "./Authentication/RegisterPage.jsx";
import ValidationPage from "./Authentication/Validation.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import Dashboard from "./ProtectedPages/Dashboard.jsx";
import Inventory from "./ProtectedPages/Inventory.jsx";
import RawMaterialOrders from "./ProtectedPages/RawMaterialOrders.jsx";
import ProfilePage from "./ProtectedPages/ProfilePage.jsx";
import Home from "./Home.jsx";

const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register">
          <Route index element={<RegisterPage />} />
          <Route path="validation" element={<ValidationPage />} />
        </Route>
        <Route path="" element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/productinventory" element={<ProductInventory />} />
          <Route path="/rawmatsorders" element={<RawMaterialOrders />}>
            {/* <Route path=':rawmaterialorderID' element={<rmoID/>} /> */}
          </Route>
          <Route path="/users/me" element={<ProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RouterComponent;
