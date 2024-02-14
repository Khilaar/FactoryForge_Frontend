import { Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";

import LoginPage from "./Authentication/LoginPage.jsx";
import ProductInventory from "./ProtectedPages/ProductInventory.jsx";
import RegisterPage from "./Authentication/RegisterPage.jsx";
import ValidationPage from "./Authentication/Validation.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import Dashboard from "./ProtectedPages/Dashboard.jsx";
import Inventory from "./ProtectedPages/Inventory.jsx";
import RawMaterialOrders from "./ProtectedPages/RawMaterialOrders.jsx";
import ProfilePage from "./ProtectedPages/ProfilePage.jsx";
import RawMaterialInventory from "./ProtectedPages/RawMaterialInventory.jsx";
import ClientOrders from "./ProtectedPages/ClientOrders.jsx";

const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register">
          <Route index element={<RegisterPage />} />
          <Route path="validation" element={<ValidationPage />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/productinventory" element={<ProductInventory />} />
          <Route path="/clientorders" element={<ClientOrders />} />
          <Route
            path="/rawmaterialinventory"
            element={<RawMaterialInventory />}
          />
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
