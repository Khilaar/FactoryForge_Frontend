import { useState, useEffect } from "react";
import API from "../../api/API";

const Analytics = () => {
  const [soldProducts, setSoldProducts] = useState(null);
  const [usedMaterials, setUsedMaterials] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await API.get("/analytics/statistics/", {
          params: {
            start_date: "2024-01-01",
            end_date: "2024-03-31",
          },
        });
        setSoldProducts(response.data[1]["Sold Products"]);
        setUsedMaterials(response.data[0]["Used Material"]);
      } catch (error) {
        console.error("Error fetching statistics: ", error);
      }
    };
    fetchStatistics();
  }, []);

  return (
    <>
      <h1 className="route-title">Analytics</h1>
      <div>
        <div className="background-frame-analytics">
          <h2>Sold Products</h2>
          <ul>
            {soldProducts &&
              Object.entries(soldProducts).map(([productName, quantity]) => (
                <li key={productName} className="list-item">
                  <p>{productName}</p>
                  <p>Quantity: {quantity}</p>
                </li>
              ))}
          </ul>
        </div>
        <div className="background-frame-analytics">
          <h2>Used Materials</h2>
          <ul>
            {usedMaterials &&
              Object.entries(usedMaterials).map(
                ([usedMaterialsName, quantity]) => (
                  <li key={usedMaterials} className="list-item">
                    <span>{usedMaterialsName}</span>
                    <span>Quantity: {quantity}</span>
                  </li>
                ),
              )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Analytics;
