import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/API";
import ClientOrderCard from "../../Components/ClientOrderCard";

const ClientOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchClientOrders = async () => {
      try {
        const response = await API.get("client_orders/");
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching raw materials: ", error);
      }
    };

    fetchClientOrders();
  }, []);

  return (
    <div>
      <h1 className="route-title">Client Orders</h1>
      <div className="background-frame">
        <section>
          {orders.map((order) => (
            <ClientOrderCard order={order} key={order.id} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default ClientOrders;
