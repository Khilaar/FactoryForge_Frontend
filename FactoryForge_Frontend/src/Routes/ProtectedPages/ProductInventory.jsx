import { useState, useEffect } from "react";
import API from "../../api/API";

const ProductInventory = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="inventory-background">
      <section>
        {/*###########################*/}
        {/*Products Inventory*/}

        <div className="title-and-searchbar">
          <h3>All Products</h3>

          <span className="searchbar">
            <h3>search</h3>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </span>
        </div>
        <ul className="product-list" id="sort-list">
          {
            <li key="sort-item" className="product-item">
              <span>
                <button>sort</button>
              </span>
              <span>
                <button>sort</button>
              </span>
              <span>
                <button>sort</button>
              </span>
              <span>
                <button>sort</button>
              </span>
              <span>
                <button>sort</button>
              </span>
            </li>
          }
        </ul>
        <ul className="product-list">
          {filteredProducts.map((product) => (
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
