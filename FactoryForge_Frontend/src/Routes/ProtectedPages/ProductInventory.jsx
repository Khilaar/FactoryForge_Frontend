import { useState, useEffect, useMemo } from "react";
import API from "../../api/API";

/**
   @todo: right your todo comment here
**/

const ProductInventory = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  /*###########################*/
  /*Fetch all the products and save them with use state*/

  useEffect(() => {
    const fetchRawMaterials = async () => {
      try {
        const response = await API.get("/products/");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching Products: ", error);
      }
    };

    fetchRawMaterials();
  }, [searchQuery]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [products, searchQuery]);

  /*###########################*/

  return (
    <div className="inventory-background">
      <section>
        {/*Products Title and search*/}
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
        {/*Products Title and search End*/}

        {/*Products List sort fields*/}
        <ul className="product-list" id="sort-list">
          {
            <li key="sort-item" className="product-item">
              <span>
                <button className="sort-button">id</button>
              </span>
              <span>
                <button className="sort-button">name</button>
              </span>
              <span>
                <button className="sort-button">production cost</button>
              </span>
              <span>
                <button className="sort-button">available amount</button>
              </span>
              <span>
                <button className="sort-button">price</button>
              </span>
            </li>
          }
        </ul>
        {/*Products List sort fields End*/}

        {/*Products List*/}
        <ul className="product-list">
          {filteredProducts.map((product) => (
            <li key={product.id} className="product-item">
              <span>{product.id}</span>
              <span>{product.title}</span>
              <span>{product.production_cost}</span>
              <span>{product.quantity_available}</span>
              <span>{product.price}</span>
            </li>
          ))}
        </ul>
        {/*Products List End*/}
      </section>

      {/*Products Add Button*/}
      <section className="inventory-background-buttons">
        <button>
          <span>ADD</span>
        </button>
      </section>
      {/*Products Add Button End*/}
    </div>
  );
};

export default ProductInventory;
