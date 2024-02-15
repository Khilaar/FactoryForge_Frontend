import { useState, useEffect } from "react";
import API from "../../api/API";
import ClientOrderCard from "../../Components/ClientOrderCard";
import { useNavigate } from "react-router-dom";
import RawMaterialOrderCard from "../../Components/RawMaterialOrderCard";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [rawMaterialOrders, setRawMaterialOrders] = useState([]);
  const [openedOrderId, setOpenedOrderId] = useState(null);
  const [displayPage, setDisplayPage] = useState();

  const fetchClientOrders = async () => {
    try {
      const response = await API.get("client_orders/history/");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching raw materials: ", error);
    }
  };

  const fetchRawMaterialOrders = async () => {
    try {
      const response = await API.get("raw_materials_orders/history/");
      setRawMaterialOrders(response.data);
    } catch (error) {
      console.error("Error fetching raw materials: ", error);
    }
  };

  useEffect(() => {
    fetchClientOrders();
    fetchRawMaterialOrders();
  }, []);

  const toggleOrderDetails = (orderId) => {
    setOpenedOrderId((prevOpenedOrderId) =>
      prevOpenedOrderId === orderId ? null : orderId,
    );
  };

  const handleNavigate = () => {
    navigate("/orders/");
  };

  const togglePage = (page) => {
    setDisplayPage(page);
  };

  return (
    <div>
      <div className="topBar">
        <div className="selectPage">
          <h1
            className={`" ${displayPage === "Client Orders" ? "active" : ""}`}
            onClick={() => togglePage("Client Orders")}
          >
            Client Orders
          </h1>
          <h1 className="route-title">|</h1>
          <h1
            className={`" ${displayPage === "Raw Material Orders" ? "active" : ""}`}
            onClick={() => togglePage("Raw Material Orders")}
          >
            Raw Material Orders
          </h1>
        </div>
        <button className="pastOrders active" onClick={handleNavigate}>
          Past Orders
        </button>
      </div>
      <div className="background-frame">
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
      </div>
    </div>
  );
};

export default Orders;
