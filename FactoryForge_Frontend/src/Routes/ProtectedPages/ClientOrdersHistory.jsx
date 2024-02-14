import { useState, useEffect } from "react";
import API from "../../api/API";
import ClientOrderCard from "../../Components/ClientOrderCard";
import { useNavigate } from "react-router-dom";

const ClientOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [openedOrderId, setOpenedOrderId] = useState(null);

  useEffect(() => {
    const fetchClientOrders = async () => {
      try {
        const response = await API.get("client_orders/history/");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching raw materials: ", error);
      }
    };
    fetchClientOrders();
  }, []);

  const toggleOrderDetails = (orderId) => {
    setOpenedOrderId((prevOpenedOrderId) =>
      prevOpenedOrderId === orderId ? null : orderId,
    );
  };

  const handleNavigate = () => {
    navigate("/clientorders/");
  };

  return (
    <div>
      <div className="topBar">
        <h1 className="route-title">Client Orders</h1>
        <button className="pastOrders active" onClick={handleNavigate}>
          Past Orders
        </button>
      </div>
      <div className="background-frame">
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
      </div>
    </div>
  );
};

export default ClientOrders;
