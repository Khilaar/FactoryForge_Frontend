import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/API";
import defaultproductimage from "../../Assets/default-product-image.png";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${id}`);

        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching Product: ", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
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
                ([rawMat, quantity]) => (
                  <p key={rawMat}>
                    {rawMat}: {quantity}
                  </p>
                ),
              )}
            </span>
          </span>
        </li>
      </div>
    </div>
  );
};

export default ProductDetail;
