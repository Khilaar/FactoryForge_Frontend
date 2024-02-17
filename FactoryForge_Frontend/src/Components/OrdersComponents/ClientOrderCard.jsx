import { useEffect, useState } from "react";

const ClientOrderCard = ({ order, isOpen, toggleDetails }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [activeStatus, setActiveStatus] = useState(null);

  const statusChoices = {
    1: "Created",
    2: "In Progress",
    3: "Quality Control",
    4: "Ready for Shipping",
    5: "In Transit",
    6: "Completed",
  };

  useEffect(() => {
    setActiveStatus(getStatusLabel(order.order_status));
  }, [order.order_status]);

  const getStatusLabel = (statusKey) => {
    return statusChoices[statusKey];
  };

  const handleStatusClick = (statusLabel) => {
    setActiveStatus(statusLabel);
  };

  const handleCloseDetails = () => {
    toggleDetails();
    setShowDetails(false);
    setActiveStatus(getStatusLabel(order.order_status));
  };

  return (
    <>
      <div
        className={`list-item-orders ${showDetails ? "expanded" : ""}`}
      >
        <div className="co-fields">
          <span>Client: {order.client.username}</span>
          <span>{order.tracking_number}</span>
        </div>
        <div className="co-productlist">
          {order.ordered_products.map((product) => (
            <li key={product.product}>
              Product ID: {product.product}. Quantity: {product.quantity}
            </li>
          ))}
        </div>
        <div className="co-fields">
          <span>Due Date: {order.due_date}</span>
          <span>Status: {getStatusLabel(order.order_status)}</span>
        </div>
        <div>
          {!isOpen ? (
            <button
              onClick={() => {
                toggleDetails();
                setShowDetails(!showDetails);
              }}
            >
              Details
            </button>
          ) : (
            <div className="xSave">
              <button className="xButton" onClick={handleCloseDetails}>
                X
              </button>
              <button className="saveButton">SAVE</button>
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <>
          <div className="showDetails">
            <div className="leftContainer">
              <div className="clientDetails">
                <h2>Client Details</h2>
                <div className="clientDetails">
                  <span>
                    Name: {order.client.first_name || "N/A"}{" "}
                    {order.client.last_name}
                  </span>
                  <span>Username: {order.client.username}</span>
                  <span>Email: {order.client.email || "N/A"}</span>
                </div>
              </div>
              <div className="orderStatus">
                <h2>Order Status</h2>
                <div className="orderStatusSelection">
                  {Object.values(statusChoices).map((statusLabel) => (
                    <button
                      key={statusLabel}
                      className={activeStatus === statusLabel ? "active" : ""}
                      onClick={() => handleStatusClick(statusLabel)}
                    >
                      {statusLabel}
                    </button>
                  ))}
                </div>
              </div>
              <div className="clientNote"></div>
            </div>
            <div className="rightContainer">
              <div className="orderedProducts">
                <h2>Ordered Products</h2>
                <div className="orderedProductsList">
                  <ul>
                    {order.ordered_products.map((product) => (
                      <li key={product.product} className="list-item">
                        <span className="idSpan">ID: {product.product}</span>
                        <span className="quantitySpan">
                          Quantity: {product.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ClientOrderCard;
