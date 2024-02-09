import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/sass/_components.scss";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [rawMaterials, setRawMaterials] = useState([]);

  /*##############################################################*/
  /*Fetch all the products and save them with use state*/
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://factoryforge-5f88b931d18d.herokuapp.com/api/products/",
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching Products: ", error);
      }
    };

    fetchProducts();
  }, []);
  /*##############################################################*/

  /*##############################################################*/
  /*Fetch all the raw materials and save them with use state*/
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://factoryforge-5f88b931d18d.herokuapp.com/api/raw_materials/",
        );
        setRawMaterials(response.data);
      } catch (error) {
        console.error("Error fetching raw materials: ", error);
      }
    };

    fetchProducts();
  }, []);
  /*##############################################################*/

  return (
    <div>
      <h1 className="route-title">Inventory</h1>

      <div className="inventory-highest-section">
        <section>
          {/*##############################################################*/}
          {/*Products Inventory*/}
          <ul>
            <h2>Products</h2>
            {products.map((product) => (
              <li key={product.id} className="product-item">
                <span>id: {product.id}</span>
                <span>{product.title}</span>
                <span>production cost: {product.production_cost}</span>
                <span>available: {product.quantity_available}</span>
                <span>price: {product.price}</span>
              </li>
            ))}
          </ul>
          {/*##############################################################*/}
        </section>
        <button className="pushable">
          <span className="shadow"></span>
          <span className="edge"></span>
          <span className="front">ADD NEW PRODUCT</span>
        </button>

        <section>
          {/*##############################################################*/}
          {/*Raw Materials Inventory*/}
          <ul>
            <h2>Raw Materials</h2>
            {rawMaterials.map((rawMaterials) => (
              <li key={rawMaterials.id} className="product-item">
                <span>id: {rawMaterials.id}</span>
                <span>{rawMaterials.name}</span>
                <span>cost: {rawMaterials.cost}</span>
                <span>quantity: {rawMaterials.quantity_available}</span>
                <span>
                  restock required:{" "}
                  {rawMaterials.restock_required ? "Yes" : "No"}
                </span>
              </li>
            ))}
          </ul>
          {/*##############################################################*/}
        </section>
        <button className="pushable">
          <span className="shadow"></span>
          <span className="edge"></span>
          <span className="front">ADD NED RAW MATERIAL</span>
        </button>
      </div>

      {/*##############################################################*/}
      {/*Low-on Inventory*/}
      <div className="inventory-bottom-part">
        <div className="low-on-inventory">
          <ul>
            <h2 className="route-subtitle">Low on Raw Materials</h2>
            {rawMaterials.map((rawMaterials) => (
              <li key={rawMaterials.id} className="product-item">
                <span>id: {rawMaterials.id}</span>
                <span>{rawMaterials.name}</span>
                <span>cost: {rawMaterials.cost}</span>
                <span>quantity: {rawMaterials.quantity_available}</span>
                <span>
                  restock required:{" "}
                  {rawMaterials.restock_required ? "Yes" : "No"}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {/*##############################################################*/}

        <form className="inventory-order-form" action="">
          <div className="inventory-order-form-raw-material">
            <h3>Raw Material: </h3>
            <input className="inventory-order-form-mat-input" type="text" />
            <h3>Quantity: </h3>
            <input
              className="inventory-order-form-mat-quantity-input"
              type="text"
            />
            <button>send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Inventory;
