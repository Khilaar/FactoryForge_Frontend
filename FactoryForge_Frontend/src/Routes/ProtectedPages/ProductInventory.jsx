import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/sass/_components.scss";
import API from "../../api/API";

const ProductInventory = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

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

  return (
    <div className="inventory-background">
      <section>
        {/*###########################*/}
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
        {/*###########################*/}
      </section>

      <section className="inventory-background-buttons">
        <button>
          <span>ADD</span>
        </button>
      </section>
    </div>
  );
};

export default ProductInventory;
