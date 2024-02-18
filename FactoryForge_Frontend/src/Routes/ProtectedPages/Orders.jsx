import { useState, useEffect } from "react";
import API from "../../api/API";
import ClientOrderCard from "../../Components/OrdersComponents/ClientOrderCard";
import { useNavigate, useLocation } from "react-router-dom";
import RawMaterialOrderCard from "../../Components/OrdersComponents/RawMaterialOrderCard";
import CreateOrderForm from "../../Components/OrdersComponents/CreateOrderForm";

const Orders = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [rawMaterialOrders, setRawMaterialOrders] = useState([]);
  const [openedOrderId, setOpenedOrderId] = useState(null);
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [displayPage, setDisplayPage] = useState(
    location.state ? location.state.displayPage : "Client Orders",
  );
  const accessToken = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  const fetchClientOrders = async () => {
    try {
      const response = await API.get("client_orders/");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching client orders: ", error);
    }
  };

  const fetchRawMaterialOrders = async () => {
    try {
      const response = await API.get("raw_materials_orders/");
      setRawMaterialOrders(response.data);
    } catch (error) {
      console.error("Error fetching raw materials orders: ", error);
    }
  };

  useEffect(() => {
    fetchClientOrders();
    fetchRawMaterialOrders();
  }, []);

  const toggleCreateOrder = () => {
    setShowCreateOrder((prevShowCreateOrder) => !prevShowCreateOrder);
  };

  const toggleOrderDetails = (orderId) => {
    setOpenedOrderId((prevOpenedOrderId) =>
      prevOpenedOrderId === orderId ? null : orderId,
    );
  };

  const handleNavigate = () => {
    navigate("/orders/history/", { state: { displayPage } });
  };

  const togglePage = (page) => {
    setDisplayPage(page);
  };

  return (
    <>
      <div className="topBar">
        <div className="selectPage">
          <h1
            className={` ${displayPage === "Client Orders" ? "active" : ""}`}
            onClick={() => togglePage("Client Orders")}
          >
            Client Orders
          </h1>

          <h1
            className={` ${displayPage === "Raw Material Orders" ? "active" : ""}`}
            onClick={() => togglePage("Raw Material Orders")}
          >
            Raw Material Orders
          </h1>
        </div>
        <div className="headerButtons">
          <button
            className={`createOrder ${showCreateOrder ? "active" : ""}`}
            onClick={toggleCreateOrder}
          >
            Create Order
          </button>
          <button className="pastOrders" onClick={handleNavigate}>
            Past Orders
          </button>
        </div>
      </div>
      <div className="background-frame-orders">
        {displayPage === "Client Orders" ? (
          <section>
            {orders.map((order) => (
              <ClientOrderCard
                order={order}
                key={order.id}
                isOpen={order.id === openedOrderId}
                toggleDetails={() => toggleOrderDetails(order.id)}
                config={config}
                accessToken={accessToken}
                fetchClientOrders={fetchClientOrders}
              />
            ))}
          </section>
        ) : (
          <section>
            {rawMaterialOrders.map((order) => (
              <RawMaterialOrderCard
                order={order}
                key={order.id}
                isOpen={order.id === openedOrderId}
                toggleDetails={() => toggleOrderDetails(order.id)}
                config={config}
                accessToken={accessToken}
                fetchRawMaterialOrders={fetchRawMaterialOrders}
              />
            ))}
          </section>
        )}
      </div>
      {showCreateOrder && (
        <div className="createOrderForm-container">
          {displayPage == "Client Orders" ? (
            <CreateOrderForm
              toggleCreateOrder={() => toggleCreateOrder()}
              createOrderTitle={"Create Client Order"}
              fetchClientOrders={fetchClientOrders}
              config={config}
              accessToken={accessToken}
            />
          ) : (
            <CreateOrderForm
              toggleCreateOrder={() => toggleCreateOrder()}
              createOrderTitle={"Create Raw Material Order"}
              fetchRawMaterialOrders={fetchRawMaterialOrders}
              config={config}
              accessToken={accessToken}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Orders;
