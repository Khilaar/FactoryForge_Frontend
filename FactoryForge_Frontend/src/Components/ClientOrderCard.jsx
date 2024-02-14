const ClientOrderCard = ({ order }) => {
  const getStatusLabel = (statusKey) => {
    const statusChoices = {
      1: "Created",
      2: "In Progress",
      3: "Quality Control",
      4: "Ready for Shipping",
      5: "In Transit",
      6: "Completed",
    };
    return statusChoices[statusKey];
  };

  return (
    <>
      <div className="list-item-clientorders">
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
          <button>Details</button>
        </div>
      </div>
    </>
  );
};

export default ClientOrderCard;