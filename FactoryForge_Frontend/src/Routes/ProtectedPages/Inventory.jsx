import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/API";

const Inventory = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [rawMaterials, setRawMaterials] = useState([]);
  const [showFormRawMat, setShowFormRawMat] = useState(false);
  const [showFormProduct, setShowFormProduct] = useState(false);
  const [requiredMat, setRequiredMat] = useState([]);
  const [formDataProduct, setFormDataProduct] = useState({
    title: "",
    description: "",
    quantity_available: "",
    price: "",
    production_cost: "",
    category: "",
    raw_material_requirements: "",
  });
  const [rawMaterialFormData, setRawMaterialFormData] = useState({
    name: "",
    quantity_available: "",
    inventory: "",
    max_quantity: "",
    cost: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataProduct({
      ...formDataProduct,
      [name]: value,
    });
  };

  const handleRawMaterialChange = (e, materialName) => {
    const { value } = e.target;
    setFormDataProduct((prevData) => ({
      ...prevData,
      raw_material_requirements: {
        ...prevData.raw_material_requirements,
        [materialName]: parseInt(value) || 0,
      },
    }));
  };

  const handleRawMaterialInputChange = (e) => {
    const { name, value } = e.target;
    setRawMaterialFormData({
      ...rawMaterialFormData,
      [name]: value,
    });
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };

      const response = await API.post("/products/", formDataProduct, config);
      toggleFormProduct();
      console.log("Product created:", response.data);
    } catch (error) {
      console.error("Error creating product: ", error);
    }
  };

  const handleSubmitRawMaterial = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(rawMaterialFormData),
      };

      const response = await fetch(
        "https://factoryforge-5f88b931d18d.herokuapp.com/api/raw_materials/",
        config,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Raw material created:", data);
    } catch (error) {
      console.error("Error creating raw material: ", error);
    }
  };

  const toggleFormRawMat = () => {
    setShowFormRawMat(!showFormRawMat);
  };

  const toggleFormProduct = () => {
    setShowFormProduct(!showFormProduct);
  };

  const handleCloseProductForm = () => {
    setShowFormProduct(false);
    setRequiredMat([]);
    setFormDataProduct({
      title: "",
      description: "",
      quantity_available: "",
      price: "",
      production_cost: "",
      category: "",
      raw_material_requirements: {},
    });
  };

  const handleCloseRawMatForm = () => {
    setShowFormRawMat(false);
  };

  const handleRequiredMatChange = (newValue) => {
    if (!requiredMat.includes(newValue)) {
      setRequiredMat((prevRequiredMat) => [...prevRequiredMat, newValue]);
    }
  };

  const handleDeleteRequiredMaterial = (index) => {
    setRequiredMat((prevRequiredMat) =>
      prevRequiredMat.filter((_, i) => i !== index),
    );
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
                    <p>id</p>
                  </span>
                  <span>
                    <p>name</p>
                  </span>
                  <span>
                    <p>production cost</p>
                  </span>
                  <span>
                    <p>available amount</p>
                  </span>
                  <span>
                    <p>price</p>
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
                    <span className="title-close-button-pop-up-form">
                      <h3>Add Product</h3>
                      <button onClick={handleCloseProductForm}>X</button>
                    </span>
                  </span>
                  <span className="input-fields-add-product">
                    <span className="left-side-add-product">
                      <span>
                        <span>
                          <h3>Name</h3>
                          <input
                            className="inventory-add-product-title-input"
                            type="text"
                            name="title"
                            value={formDataProduct.title}
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
                      </span>

                      <span>
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
                          <h3>Test</h3>
                          <select
                            value={requiredMat}
                            onChange={(e) =>
                              handleRequiredMatChange(e.target.value)
                            }
                            className="required-raw-mat-select"
                          >
                            <option value="requiredMat">
                              Select Raw Material
                            </option>
                            {rawMaterials.map((material) => (
                              <option key={material.id} value={material.name}>
                                {material.name}
                              </option>
                            ))}
                          </select>
                        </span>
                      </span>
                    </span>
                    {/*<span>
                    <h3>Description</h3>
                    <textarea
                      className="inventory-add-description-input"
                      type="textarea"
                      name="description"
                      value={formDataProduct.description}
                      onChange={handleInputChange}
                    />
                  </span>*/}
                    <span className="right-side-add-product">
                      <span>
                        <h3>List of Raw Materials</h3>
                        <ul className="list-required-raw-mat">
                          {requiredMat.map((material, index) => (
                            <li key={index}>
                              <span className="name-and-quantity-required-mat">
                                <div className="name-required-mat-added">
                                  {material}
                                </div>
                                <input
                                  type="number"
                                  placeholder="qty"
                                  value={
                                    formDataProduct.raw_material_requirements[
                                      material
                                    ] || ""
                                  }
                                  onChange={(e) =>
                                    handleRawMaterialChange(e, material)
                                  }
                                />
                              </span>
                              <button
                                onClick={() =>
                                  handleDeleteRequiredMaterial(index)
                                }
                              >
                                X
                              </button>
                            </li>
                          ))}
                        </ul>
                      </span>
                    </span>
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
                    <p>id</p>
                  </span>
                  <span>
                    <p>name</p>
                  </span>
                  <span>
                    <p>cost</p>
                  </span>
                  <span>
                    <p>available amount</p>
                  </span>
                  <span>
                    <p>restock required?</p>
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
            <span>ADD</span>
          </button>
          {showFormRawMat && (
            <div className="order-form">
              <form
                className="inner-part-form"
                onSubmit={handleSubmitRawMaterial}
              >
                {/* Inventory Order Form Raw Material */}
                <span className="title-close-button-pop-up-form">
                  <h2>Order Raw Material</h2>
                  <button onClick={handleCloseRawMatForm}>X</button>
                </span>
                <div className="inventory-order-form-raw-material">
                  <span>
                    <h3>Raw Material </h3>
                    <input
                      className="inventory-order-form-mat-input"
                      type="text"
                      name="name"
                      value={rawMaterialFormData.name}
                      onChange={handleRawMaterialInputChange}
                    />
                  </span>
                  <div className="quantity-span-add-raw-mat">
                    <div>
                      <h3>Quantity </h3>
                      <input
                        className="inventory-order-form-mat-quantity-input"
                        type="text"
                        name="quantity_available"
                        value={rawMaterialFormData.quantity_available}
                        onChange={handleRawMaterialInputChange}
                      />
                    </div>

                    <span>
                      <div>
                        <h3>Max Quantity </h3>
                        <input
                          className="inventory-order-form-mat-quantity-input"
                          type="text"
                          name="max_quantity"
                          value={rawMaterialFormData.max_quantity}
                          onChange={handleRawMaterialInputChange}
                        />
                      </div>
                    </span>
                  </div>
                </div>
                {/* Inventory Order Form Raw Material End */}

                {/* Inventory Order Form Supplier */}
                <div className="inventory-order-form-supplier">
                  <span>
                    <h3>Supplier </h3>
                    <input
                      className="inventory-order-form-mat-input"
                      type="text"
                      name="supplier"
                    />
                  </span>
                </div>
                {/* Inventory Order Form Supplier End */}

                <div className="inventory-order-form-supplier">
                  <span>
                    <h3>Cost</h3>
                    <input
                      className="inventory-order-form-mat-input"
                      type="text"
                      name="cost"
                      value={rawMaterialFormData.cost}
                      onChange={handleRawMaterialInputChange}
                    />
                  </span>
                </div>
                <button type="submit">
                  <span>SEND</span>
                </button>
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
