import { useEffect, useState } from "react";

const RawMaterialOrderCard = ({ order, isOpen, toggleDetails }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [activeStatus, setActiveStatus] = useState(null);
  const deliveryyDate = new Date(order.delivery_date);
  const formattedDeliveryDate = deliveryyDate.toISOString().slice(0, 10);
  const formattedDeliveryTime = deliveryyDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const statusChoices = {
    1: "Ordered",
    2: "In Transit",
    3: "Delivered",
  };

  useEffect(() => {
    setActiveStatus(getStatusLabel(order.status));
  }, [order.status]);

  const getStatusLabel = (statusKey) => {
    return statusChoices[statusKey];
  };

  const handleStatusClick = (statusLabel) => {
    setActiveStatus(statusLabel);
  };

  const handleCloseDetails = () => {
    toggleDetails();
    setShowDetails(false);
    setActiveStatus(getStatusLabel(order.status));
  };

  return (
    <>
      <div className={`list-item-orders ${showDetails ? "expanded" : ""}`}>
        <div className="co-fields">
          <span>Supplier: {order.supplier.username}</span>
          <span>Order ID: {order.id}</span>
        </div>
        <div className="co-productlist">
          {order.raw_materials_order != null &&
            Object.entries(order.raw_materials_order).map(
              ([rawMatID, quantity]) => (
                <li key={rawMatID}>
                  Raw Material ID: {rawMatID}. Quantity: {quantity}
                </li>
              ),
            )}
        </div>
        <div className="rmo-fields">
          <span> Due Date: {formattedDeliveryDate}</span>
          <span>Delivery Time: {formattedDeliveryTime}</span>
          <span>Status: {getStatusLabel(order.status)}</span>
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
                    Name: {order.supplier.first_name || "N/A"}{" "}
                    {order.supplier.last_name}
                  </span>
                  <span>Username: {order.supplier.username}</span>
                  <span>Email: {order.supplier.email || "N/A"}</span>
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
                    {order.raw_materials_order != null &&
                      Object.entries(order.raw_materials_order).map(
                        ([rawMatID, quantity]) => (
                          <li key={rawMatID} className="list-item">
                            <span className="idSpan">ID: {rawMatID}</span>
                            <span className="quantitySpan">
                              Quantity: {quantity}
                            </span>
                          </li>
                        ),
                      )}
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

export default RawMaterialOrderCard;
