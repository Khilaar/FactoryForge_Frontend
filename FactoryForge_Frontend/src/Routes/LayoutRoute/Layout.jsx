import { Routes, Route } from "react-router-dom";
import CounterTest from "../../Components/CounterTestComponent/CounterTest.jsx";
import Home from "../../Components/HomeComponent/Home.jsx";
import Dashboard from "../DashboardRoute/Dashboard.jsx";
import Inventory from "../InvenotryRoute/Inventory.jsx";
import ProductInventory from "../ProductInventoryRoute/ProductInventory.jsx";
import ClientOrders from "../ClientOrdersRoute/ClientOrders.jsx";
import RawMaterialOrders from "../RawMaterialOrders/RawMaterialOrders.jsx";
import Suppliers from "../SuppliersRoute/Suppliers.jsx";
import Clients from "../ClientsRoute/Clients.jsx";

function Layout() {
  return (
    <div>
      <Routes>
          <Route path="" element={<Home />} />
          <Route path="/counter" element={<CounterTest />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/productinventory" element={<ProductInventory />} />
          <Route path="/clientorders" element={<ClientOrders />} />
          <Route path="/rawmaterialorders" element={<RawMaterialOrders />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/clients" element={<Clients />} />
      </Routes>
    </div>
  );
}

export default Layout;
