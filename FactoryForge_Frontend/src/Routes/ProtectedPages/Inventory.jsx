import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/API";

const Inventory = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [rawMaterials, setRawMaterials] = useState([]);

  /*###########################*/
  /*Fetch all the products and save them with use state*/
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products/");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching Products: ", error);
      }
    };

    fetchProducts();
  }, []);
  /*###########################*/

  /*###########################*/
  /*Fetch all the raw materials and save them with use state*/
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/raw_materials/");
        setRawMaterials(response.data);
      } catch (error) {
        console.error("Error fetching raw materials: ", error);
      }
    };

    fetchProducts();
  }, []);
  /*###########################*/

  return (
    <div>
      <h1 className="route-title">Inventory</h1>

      <div className="inventory-background">
        <section>
          {/*###########################*/}
          {/*Products Inventory*/}
          <ul>
            <h2>Products</h2>
            {products.slice(0, 5).map((product) => (
              <li key={product.id} className="product-item">
                <span>id: {product.id}</span>
                <span>{product.title}</span>
                <span>production cost: {product.production_cost}</span>
                <span>available: {product.quantity_available}</span>
                <span>price: {product.price}</span>
              </li>
            ))}
          </ul>
          {/*###########################*/}
        </section>

        <section className="inventory-background-buttons">
          <button
            className="see-more-button"
            onClick={() => navigate("/productinventory")}
          >
            <span>SEE</span>
          </button>

          <button>
            <span>ADD</span>
          </button>
        </section>

        <section>
          {/*###########################*/}
          {/*Raw Materials Inventory*/}
          <ul>
            <h2>Raw Materials</h2>
            {rawMaterials.slice(0, 5).map((rawMaterials) => (
              <li key={rawMaterials.id} className="product-item">
                <span>id {rawMaterials.id}</span>
                <span>{rawMaterials.name}</span>
                <span>cost: {rawMaterials.cost}</span>
                <span>available: {rawMaterials.quantity_available}</span>
                <span>
                  restock required{" "}
                  {rawMaterials.restock_required ? "Yes" : "No"}
                </span>
              </li>
            ))}
          </ul>
          {/*###########################*/}
        </section>

        <section className="inventory-background-buttons">
          <button className="see-more-button">
            <span>SEE</span>
          </button>

          <button>
            <span>ADD</span>
          </button>
        </section>
      </div>

      {/*###########################*/}
      {/*Low-on Inventory*/}
      <div className="inventory-bottom-part">
        <div className="low-on-inventory">
          <ul>
            <h2>Low on Raw Materials</h2>
            {rawMaterials.slice(0, 5).map((rawMaterials) => (
              <li key={rawMaterials.id} className="product-item">
                <span>id {rawMaterials.id}</span>
                <span>{rawMaterials.name}</span>
                <span>quantity: {rawMaterials.quantity_available}</span>
              </li>
            ))}
          </ul>
        </div>
        {/*###########################*/}

        <form className="inventory-order-form" action="">
          <div className="inventory-order-form-raw-material">
            <span>
              <h3>Raw Material </h3>
              <input className="inventory-order-form-mat-input" type="text" />
            </span>
            <h3>Quantity: </h3>
            <input
              className="inventory-order-form-mat-quantity-input"
              type="text"
            />
            <button>
              <span>SEND</span>
            </button>
          </div>

          <div className="inventory-order-form-supplier">
            <span>
              <h3>Supplier </h3>
              <input className="inventory-order-form-mat-input" type="text" />
            </span>
          </div>

          <div className="inventory-order-form-message">
            <span>
              <h3>Message </h3>
              <textarea
                className="inventory-order-form-message-input"
                type="text"
              />
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Inventory;
