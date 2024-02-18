import { useState, useEffect } from "react";
import API from "../../api/API";
import PieChart from "../../Components/Charts/PieChart.jsx";

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
      <div className="analytics-overlay">
        <span>
          <div className="background-frame-analytics-top-seller">
            <h2>Top Seller</h2>
            <ul>
              {soldProducts &&
                Object.keys(soldProducts)
                  .sort(
                    (productNameA, productNameB) =>
                      soldProducts[productNameB] - soldProducts[productNameA],
                  )
                  .slice(0, 3)
                  .map((productName) => (
                    <li key={productName} className="list-item">
                      <p>{productName}</p>
                      <p>Quantity: {soldProducts[productName]}</p>
                    </li>
                  ))}
            </ul>
          </div>
          <div className="background-frame-analytics-top-seller">
            <h2>Most used materials</h2>
            <ul>
              {usedMaterials &&
                Object.keys(usedMaterials)
                  .sort(
                    (materialNameA, materialNameB) =>
                      usedMaterials[materialNameB] -
                      usedMaterials[materialNameA],
                  )
                  .slice(0, 3)
                  .map((materialName) => (
                    <li key={materialName} className="list-item">
                      <p>{materialName}</p>
                      <p>Quantity: {usedMaterials[materialName]}</p>
                    </li>
                  ))}
            </ul>
          </div>
        </span>

        <span>
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

          <div className="background-frame">
            <div className={"sold-products-chart"}>
              <h3>Sold Products</h3>
              {soldProducts && (
                <PieChart
                  chartData={{
                    labels: Object.keys(soldProducts),
                    datasets: [
                      {
                        label: "Quantity Sold",
                        data: Object.values(soldProducts),
                        backgroundColor: [
                          "#151724",
                          "#6e248a",
                          "#fcff00",
                          "#40C9A2",
                          "#CC4BC2",
                          "#BBB5BD",
                          "#8EE3F5",
                        ],
                        borderWidth: 0,
                      },
                    ],
                  }}
                />
              )}
            </div>
          </div>
        </span>

        <span>
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
          <div className="background-frame">
            <div className={"used-materials-chart"}>
              <h3>Used Matrerials</h3>
              {usedMaterials && (
                <PieChart
                  chartData={{
                    labels: Object.keys(usedMaterials),
                    datasets: [
                      {
                        label: "Quantity Used",
                        data: Object.values(usedMaterials),
                        backgroundColor: [
                          "#151724",
                          "#6e248a",
                          "#fcff00",
                          "#40C9A2",
                          "#CC4BC2",
                          "#BBB5BD",
                          "#8EE3F5",
                        ],
                        borderWidth: 0,
                      },
                    ],
                  }}
                />
              )}
            </div>
          </div>
        </span>
      </div>
    </>
  );
};

export default Analytics;
