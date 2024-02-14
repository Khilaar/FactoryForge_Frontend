import { useState, useEffect, useMemo } from "react";
import API from "../../api/API";

const ProductInventory = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products/", {
        params: {
          _page: currentPage,
          _limit: 20, // Limit to 20 products per page
        },
      });
      setProducts((prevProducts) => [...prevProducts, ...response.data]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Products: ", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Increment current page to load next 20 products
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [products, searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="background-frame">
      <section>
        {/*Products Title and search*/}
        <div className="title-and-searchbar">
          <h3>All Products</h3>
          <span className="searchbar">
            <h3>search</h3>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </span>
        </div>
        {/*Products Title and search End*/}

        {/*Products List sort fields*/}
        <ul className="items-list" id="sort-list">
          {
            <li key="sort-product" className="list-item">
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
        <ul className="items-list">
          {filteredProducts.map((product) => (
            <li key={product.id} className="list-item">
              <span>{product.id}</span>
              <span>{product.title}</span>
              <span>{product.production_cost}</span>
              <span>{product.quantity_available}</span>
              <span>{product.price}</span>
            </li>
          ))}
        </ul>
        {/*Products List End*/}

        {/* Load More Button */}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <button onClick={handleLoadMore}>Load More</button>
        )}
      </section>
    </div>
  );
};

export default ProductInventory;
