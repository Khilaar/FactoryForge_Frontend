import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/sass/_components.scss";

const Inventory = () => {
  const [products, setProducts] = useState([]);

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

  /*##############################################################*/

  return (
    <div>
      <h1>Inventory</h1>

      <div className="inventory-highest-section">
        <section className="inventory-section">
          <ul>
            <h2>Products</h2>
            {products.map((product) => (
              <li key={product.id} className="product-item">
                {product.title}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <ul>
            <h2>Raw Materials</h2>
            {products.map((product) => (
              <li key={product.id} className="product-item">
                {product.title}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Inventory;
