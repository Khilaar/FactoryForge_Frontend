const ClientOrderCard = ({ order }) => {
  return (
    <>
      <div className="list-item-clientorders">
        <div className="co-fields">
          <span>TN: {order.tracking_number}</span>
          <span>Client: {order.client.username}</span>
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
          <span>Status: {order.order_status}</span>
        </div>
        <div>
          <button>Details</button>
        </div>
      </div>
    </>
  );
};

export default ClientOrderCard;
