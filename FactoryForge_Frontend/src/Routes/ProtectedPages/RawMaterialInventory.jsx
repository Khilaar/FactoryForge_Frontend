import { useEffect, useState, useMemo } from "react";
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

  const filteredRawMaterials = useMemo(() => {
    return rawMaterials.filter((rawMaterial) =>
      rawMaterial.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [rawMaterials, searchQuery]);

  /*###########################*/
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
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </span>
        </div>
        {/*Products Title and search End*/}

        {/*Products List sort fields*/}
        <ul className="items-list" id="sort-list">
          {
            <li key="sort-product" className="list-item">
              <span>
                <button>id</button>
              </span>
              <span>
                <button>name</button>
              </span>
              <span>
                <button>cost</button>
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
          {filteredRawMaterials.map((rawMaterials) => (
            <li key={rawMaterials.id} className="list-item">
              <span>{rawMaterials.id}</span>
              <span>{rawMaterials.name}</span>
              <span>{rawMaterials.cost}</span>
              <span>{rawMaterials.quantity_available}</span>
              <span>{rawMaterials.restock_required ? "Yes" : "No"}</span>
            </li>
          ))}
        </ul>
        {/*Raw Materials Inventory End*/}
      </section>
    </div>
  );
};

export default RawMaterialInventory;
