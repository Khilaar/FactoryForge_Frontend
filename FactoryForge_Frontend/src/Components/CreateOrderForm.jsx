import { useEffect, useState } from "react";
import API from "../api/API";

const CreateOrderForm = ({ toggleCreateOrder, createOrderTitle }) => {
  const [clientFormData, setClientFormData] = useState({
    supplier: "",
    ordered_products: [],
    client_note: "",
    due_date: "",
    processing_time: "",
  });
  const [rawMaterialFormData, setRawMaterialFormData] = useState({});
  const [productsList, setProductsList] = useState([]);

  const fetchProductsList = async () => {
    try {
      const response = await API.get("products/");
      setProductsList(response.data);
    } catch (error) {
      console.error("Error fetching raw materials: ", error);
    }
  };

  useEffect(() => {
    fetchProductsList();
  }, []);

  const handleClientOrderSubmit = (e) => {
    e.preventDefault();

    console.log("Form Submitted!");
  };

  const handleRawMaterialOrderSubmit = (e) => {
    e.preventDefault();

    console.log("Form Submitted!");
  };

  return (
    <>
      <div className="add-order-form">
        <span className="title-close-button-pop-up-form">
          <h3>{createOrderTitle}</h3>
          {createOrderTitle === "Create Client Order" ? (
            <button
              className="sendButton"
              type="submit"
              onClick={handleClientOrderSubmit}
            >
              SEND
            </button>
          ) : (
            <button
              className="sendButton"
              type="submit"
              onClick={handleRawMaterialOrderSubmit}
            >
              SEND
            </button>
          )}
          <button onClick={toggleCreateOrder}>X</button>
        </span>
        {createOrderTitle === "Create Client Order" ? (
          <div className="formdata_inputfields">
            <form action="">
              <input
                type="text"
                placeholder="Supplier"
                onChange={(e) =>
                  setClientFormData({
                    ...clientFormData,
                    supplier: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Client Note"
                onChange={(e) =>
                  setClientFormData({
                    ...clientFormData,
                    client_note: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Client Note"
                onChange={(e) =>
                  setClientFormData({
                    ...clientFormData,
                    due_date: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Processing Time"
                onChange={(e) =>
                  setClientFormData({
                    ...clientFormData,
                    processing_time: e.target.value,
                  })
                }
              />
              <div>
                <select
                  onChange={(e) => handleRequiredMatChange(e.target.value)}
                  className="required-raw-mat-select"
                >
                  <option value="requiredMat">Select Raw Material</option>
                  {rawMaterials.map((material) => (
                    <option key={material.id} value={material.name}>
                      {material.name}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
        ) : (
          <div action="" className="formdata_inputfields"></div>
        )}
      </div>
    </>
  );
};

export default CreateOrderForm;
