import { Effect, useState } from "react";

const RawMaterialOrderCard = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [activeStatus, setActiveStatus] = useState(null);

  const statusChoices = {
    1: "Ordered",
    2: "In Transit",
    3: "Delivered",
  };

  //   useEffect(() => {
  //     setActiveStatus(getStatusLabel(order.order_status));
  //   }, [order.order_status]);

  const getStatusLabel = (statusKey) => {
    return statusChoices[statusKey];
  };

  const handleStatusClick = (statusLabel) => {
    setActiveStatus(statusLabel);
  };

  const handleCloseDetails = () => {
    toggleDetails();
    setShowDetails(false);
    // setActiveStatus(getStatusLabel(order.order_status));
  };

  return <></>;
};

export default RawMaterialOrderCard;
