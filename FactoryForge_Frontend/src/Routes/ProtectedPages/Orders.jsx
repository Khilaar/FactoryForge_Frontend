import { useState, useEffect } from "react";
import API from "../../api/API";
import ClientOrderCard from "../../Components/ClientOrderCard";
import { useNavigate, useLocation } from "react-router-dom";
import RawMaterialOrderCard from "../../Components/RawMaterialOrderCard";
import CreateOrderForm from "../../Components/CreateOrderForm";

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

  const fetchClientOrders = async () => {
    try {
      const response = await API.get("client_orders/");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching raw materials: ", error);
    }
  };

  const fetchRawMaterialOrders = async () => {
    try {
      const response = await API.get("raw_materials_orders/");
      setRawMaterialOrders(response.data);
    } catch (error) {
      console.error("Error fetching raw materials: ", error);
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
          <h1 className="route-title" style={{ cursor: "default" }}>
            |
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
              />
            ))}
          </section>
        )}
        {showCreateOrder && (
          <div className="createOrderForm-container">
            {displayPage == "Client Orders" ? (
              <CreateOrderForm
                toggleCreateOrder={() => toggleCreateOrder()}
                createOrderTitle={"Create Client Order"}
              />
            ) : (
              <CreateOrderForm
                toggleCreateOrder={() => toggleCreateOrder()}
                createOrderTitle={"Create Raw Material Order"}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
