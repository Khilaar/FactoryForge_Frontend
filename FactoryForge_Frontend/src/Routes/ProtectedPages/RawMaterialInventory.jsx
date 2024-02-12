import { useEffect, useState } from "react";
import API from "../../api/API";

const RawMaterialInventory = () => {
  const [rawMaterials, setRawMaterials] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
                <button>id</button>
              </span>
              <span>
                <button>name</button>
              </span>
              <span>
                <button>production cost</button>
              </span>
              <span>
                <button>available amount</button>
              </span>
              <span>
                <button>price</button>
              </span>
            </li>
          }
        </ul>
        {/*Products List sort fields End*/}
      </section>
      <section>
        {/*Raw Materials Inventory*/}
        <ul>
          <h2>Raw Materials</h2>
          {rawMaterials.map((rawMaterials) => (
            <li key={rawMaterials.id} className="product-item">
              <span>id {rawMaterials.id}</span>
              <span>{rawMaterials.name}</span>
              <span>cost: {rawMaterials.cost}</span>
              <span>available: {rawMaterials.quantity_available}</span>
              <span>
                restock required {rawMaterials.restock_required ? "Yes" : "No"}
              </span>
            </li>
          ))}
        </ul>
        {/*Raw Materials Inventory End*/}
      </section>
    </div>
  );
};

export default RawMaterialInventory;
