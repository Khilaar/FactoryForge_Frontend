import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/API";
import defaultproductimage from "../../Assets/default-product-image.png";
import { useFetchRawMaterials } from "../../Components/InventoryComponent/FetchesInventory";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [rawMaterials, setRawMaterials] = useState([]);
  const [updatedProduct, setUpdatedProduct] = useState({
    title: "",
    description: "",
    quantity_available: 0,
    price: "",
    production_cost: "",
    category: null,
  });

  useFetchRawMaterials(setRawMaterials);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching Product: ", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (rawMaterials.length > 0 && product) {
      setIsLoading(false);
    }
  }, [rawMaterials, product]);

  const getRawMaterialNameById = (id) => {
    const rawMaterial = rawMaterials.find(
      (material) => material.id === Number(id),
    );
    return rawMaterial ? rawMaterial.name : "Loading...";
  };

  const handleFormSubmit = async () => {
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

      const updatedFields = {};
      if (updatedProduct.title) {
        updatedFields.title = updatedProduct.title;
      }
      if (updatedProduct.description) {
        updatedFields.description = updatedProduct.description;
      }
      if (updatedProduct.price) {
        updatedFields.price = updatedProduct.price;
      }
      if (updatedProduct.category) {
        updatedFields.category = updatedProduct.category;
      }

      if (Object.keys(updatedFields).length === 0) {
        console.error("No fields updated.");
        return;
      }

      const response = await API.patch(
        `/products/${id}`,
        updatedFields,
        config,
      );
      console.log("Product updated successfully:", response.data);
      setProduct(response.data);
      setShowForm(false);
      setUpdatedProduct({});
    } catch (error) {
      console.error("Error updating Product: ", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="background-frame-product-detail">
      <h1>ProductDetail</h1>

      <img className="product-image-default" src={defaultproductimage} alt="" />
      <div className="product-detail-table">
        <li key={"product-name"} className="list-item">
          <span>
            <p>name</p>
            <p className="p-rigth">{product.title}</p>
          </span>
        </li>
        <li key={"product-id"} className="list-item">
          <span>
            <p>id</p>
            <p className="p-rigth">{product.id}</p>
          </span>
        </li>
        <li key={"product-description"} className="list-item">
          <span>
            <p>description</p>
            <p className="p-rigth">{product.description}</p>
          </span>
        </li>
        <li key={"product-price"} className="list-item">
          <span>
            <p>price</p>
            <p className="p-rigth">{product.price}</p>
          </span>
        </li>
        <li key={"product-production-cost"} className="list-item">
          <span>
            <p>production cost</p>
            <p className="p-rigth">{product.production_cost}</p>
          </span>
        </li>
        <li key={"product-category"} className="list-item">
          <span>
            <p>category</p>
            <p className="p-rigth">{product.category}</p>
          </span>
        </li>
        <li key={"product-rawMatReq"} className="list-item">
          <span>
            <p>rawMatRequirements</p>
            <span className="product-detail-rawMatList">
              {Object.entries(product.raw_material_requirements).map(
                ([rawMatId, quantity]) => (
                  <p key={rawMatId}>
                    {getRawMaterialNameById(rawMatId)}: {quantity}
                  </p>
                ),
              )}
            </span>
          </span>
        </li>
        <button onClick={() => setShowForm(true)}>Edit Product</button>
      </div>
      {showForm && (
        <div className="add-form">
          <div className="title-close-button-pop-up-form-patch">
            <h2>Patch Product</h2>
            <button
              onClick={() => {
                setShowForm(false);
                setUpdatedProduct({});
              }}
            >
              X
            </button>
          </div>
          <input
            type="text"
            placeholder={product.title}
            value={updatedProduct.title}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder={product.price}
            value={updatedProduct.price}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, price: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="description"
            value={updatedProduct.description}
            onChange={(e) =>
              setUpdatedProduct({
                ...updatedProduct,
                description: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="category"
            value={updatedProduct.category}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, category: e.target.value })
            }
          />
          <button onClick={handleFormSubmit}>Update</button>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
