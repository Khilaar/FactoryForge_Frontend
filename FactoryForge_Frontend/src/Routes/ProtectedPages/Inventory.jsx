import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/API";

const Inventory = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [rawMaterials, setRawMaterials] = useState([]);
  const [showFormRawMat, setShowFormRawMat] = useState(false);
  const [showFormProduct, setShowFormProduct] = useState(false);
  const [formDataProduct, setFormDataProduct] = useState({
    title: "",
    production_cost: "",
    price: "",
    category: "",
    quantity_available: "",
    raw_material_requirements: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataProduct({
      ...formDataProduct,
      [name]: value,
    });
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      await API.post("/products/", formDataProduct);
      navigate("/productinventory");
    } catch (error) {
      console.error("Error creating product: ", error);
    }
  };

  const toggleFormRawMat = () => {
    setShowFormRawMat(!showFormRawMat);
  };

  const toggleFormProduct = () => {
    setShowFormProduct(!showFormProduct);
  };

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
    const fetchRawMaterials = async () => {
      try {
        const response = await API.get("/raw_materials/");
        setRawMaterials(response.data);
      } catch (error) {
        console.error("Error fetching raw materials: ", error);
      }
    };

    fetchRawMaterials();
  }, []);
  /*###########################*/

  return (
    <div>
      <h1 className="route-title">Inventory</h1>

      <div className="background-frame">
        <section>
          {/*Products Inventory Small*/}
          <ul>
            <h2>Products</h2>
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
            {products.slice(0, 4).map((product) => (
              <li key={product.id} className="list-item">
                <span>{product.id}</span>
                <span>{product.title}</span>
                <span>{product.production_cost}</span>
                <span>{product.quantity_available}</span>
                <span>{product.price}</span>
              </li>
            ))}
          </ul>
          {/*Products Inventory Small End*/}
        </section>

        {/*Products Add and See Button*/}
        <section className="inventory-background-buttons">
          <button
            className="see-more-button"
            onClick={() => navigate("/productinventory")}
          >
            <span>SEE</span>
          </button>

          <button onClick={toggleFormProduct}>
            <span>ADD</span>
          </button>
          {showFormProduct && (
            <div className="add-form">
              <form onSubmit={handleSubmitProduct}>
                {/*Inventory Order Form Raw Material*/}
                <div className="inventory-add-form-product">
                  <span>
                    <h3>Title</h3>
                    <input
                      className="inventory-add-product-title-input"
                      type="text"
                      name="title"
                      value={formDataProduct.title}
                      onChange={handleInputChange}
                    />
                  </span>

                  <span>
                    <h3>Production Cost</h3>
                    <input
                      className="inventory-add-product-production-cost-input"
                      type="textarea"
                      name="production_cost"
                      value={formDataProduct.production_cost}
                      onChange={handleInputChange}
                    />
                  </span>

                  <span>
                    <h3>Price</h3>
                    <input
                      className="inventory-add-product-price-input"
                      type="textarea"
                      name="price"
                      value={formDataProduct.price}
                      onChange={handleInputChange}
                    />
                  </span>

                  <span>
                    <h3>Category</h3>
                    <input
                      className="inventory-add-product-category-input"
                      type="textarea"
                      name="category"
                      value={formDataProduct.category}
                      onChange={handleInputChange}
                    />
                  </span>

                  <span>
                    <h3>Quantity available</h3>
                    <input
                      className="inventory-add-product-quantity-available-input"
                      type="text"
                      name="quantity_available"
                      value={formDataProduct.quantity_available}
                      onChange={handleInputChange}
                    />
                  </span>

                  <span>
                    <h3>Raw Material Requirements</h3>
                    <input
                      className="inventory-add-product-raw-material-requirements-input"
                      type="textarea"
                      name="raw_material_requirements"
                      value={formDataProduct.raw_material_requirements}
                      onChange={handleInputChange}
                    />
                  </span>

                  <span>
                    <h3>Description</h3>
                    <textarea
                      className="inventory-add-description-input"
                      type="textarea"
                      name="description"
                      value={formDataProduct.description}
                      onChange={handleInputChange}
                    />
                  </span>

                  <button type="submit">
                    <span>SEND</span>
                  </button>
                </div>
                {/*Inventory Order Form Raw Material End*/}
              </form>
            </div>
          )}
        </section>
        {/*Products Add and See Button End*/}

        <section>
          {/*Raw Materials Inventory*/}
          <ul>
            <h2>Raw Materials</h2>
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
                    <button className="sort-button">cost</button>
                  </span>
                  <span>
                    <button className="sort-button">available amount</button>
                  </span>
                  <span>
                    <button className="sort-button">restock required?</button>
                  </span>
                </li>
              }
            </ul>
            {/*Products List sort fields End*/}
            {rawMaterials.slice(0, 4).map((rawMaterials) => (
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

        {/*Products Add and See Button*/}
        <section className="inventory-background-buttons">
          <button
            className="see-more-button"
            onClick={() => navigate("/rawmaterialinventory")}
          >
            <span>SEE</span>
          </button>

          <button onClick={toggleFormRawMat}>
            <span>ORDER</span>
          </button>
          {showFormRawMat && (
            <div className="order-form">
              <form>
                {/*Inventory Order Form Raw Material*/}
                <div className="inventory-order-form-raw-material">
                  <span>
                    <h3>Raw Material </h3>
                    <input
                      className="inventory-order-form-mat-input"
                      type="text"
                    />
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
                {/*Inventory Order Form Raw Material End*/}

                {/*Inventory Order Form Supplier*/}
                <div className="inventory-order-form-supplier">
                  <span>
                    <h3>Supplier </h3>
                    <input
                      className="inventory-order-form-mat-input"
                      type="text"
                    />
                  </span>
                </div>
                {/*Inventory Order Form Supplier End*/}

                {/*Inventory Order Form Message*/}
                <div className="inventory-order-form-message">
                  <span>
                    <h3>Message </h3>
                    <textarea
                      className="inventory-order-form-message-input"
                      type="text"
                    />
                  </span>
                </div>
                {/*Inventory Order Form Message End*/}
              </form>
            </div>
          )}
        </section>
        {/*Products Add and See Button End*/}
      </div>

      <div className="inventory-bottom-part">
        {/*Low-on Inventory*/}
        <div className="low-on-inventory">
          <ul>
            <h2>Low on Raw Materials</h2>
            {rawMaterials.slice(0, 5).map((rawMaterials) => (
              <li key={rawMaterials.id} className="list-item">
                <span>id {rawMaterials.id}</span>
                <span>{rawMaterials.name}</span>
                <span>quantity: {rawMaterials.quantity_available}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="low-on-inventory">
          <ul>
            <h2>Low on Product</h2>
            {products.slice(0, 5).map((product) => (
              <li key={product.id} className="list-item">
                <span>id: {product.id}</span>
                <span>{product.title}</span>
                <span>available: {product.quantity_available}</span>
              </li>
            ))}
          </ul>
        </div>
        {/*Low-on Inventory End*/}
      </div>
    </div>
  );
};

export default Inventory;
