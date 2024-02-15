import { useEffect, useState } from "react";
import API from "../api/API";

const CreateOrderForm = ({ toggleCreateOrder, createOrderTitle }) => {
  const [clientOrderFormData, setClientOrderFormData] = useState({
    client: "",
    ordered_products: [],
    client_note: "",
    due_date: "",
    processing_time: "",
  });
  const [rawMaterialFormData, setRawMaterialFormData] = useState({});
  const [productsList, setProductsList] = useState([]); // for fetching, DONT USE
  const [addedProductsList, setAddedProductsList] = useState([]);
  const [clientsList, setClientsList] = useState([]);
  const accessToken = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  const fetchProductsList = async () => {
    try {
      const response = await API.get("products/");
      setProductsList(response.data);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  const fetchClientsList = async () => {
    try {
      const response = await API.get("users/clients/");
      setClientsList(response.data);
    } catch (error) {
      console.error("Error fetching clients: ", error);
    }
  };

  useEffect(() => {
    fetchProductsList();
    fetchClientsList();
  }, []);

  const handleClientOrderSubmit = async (e) => {
    e.preventDefault();
    if (!accessToken) {
      throw new Error("Access Token not found.");
    }
    console.log(clientOrderFormData);
    try {
      const res = await API.post("client_orders/", clientOrderFormData, config);
      toggleCreateOrder();
      console.log("Client Order created:", res.data);
      console.log("Form Submitted!");
    } catch (error) {
      console.error("Error creating client order: ", error);
    }
  };

  const handleRawMaterialOrderSubmit = (e) => {
    e.preventDefault();

    console.log("Form Submitted!");
  };

  const handleRequiredProductChange = (newValue) => {
    if (!addedProductsList.includes(newValue)) {
      setAddedProductsList((prevAddedProds) => [...prevAddedProds, newValue]);
    }
  };

  const handleProductListChange = (e, productName) => {
    // const value = e.target;
    // setClientOrderFormData((prevData) => {
    //   const newOrderedProducts = [...prevData.ordered_products];
    //   newOrderedProducts.push({
    //     product_name: productName,
    //     quantity: value || 0,
    //   });
    //   console.log(newOrderedProducts)
    //   return {
    //     ...prevData,
    //     ordered_products: newOrderedProducts,
    //   };
    // });
  };

  const handleDeleteProductFromList = (index) => {
    setAddedProductsList((prevProductData) =>
      prevProductData.filter((_, i) => i !== index),
    );
  };

  const handleClientChange = (e) => {
    setClientOrderFormData({
      ...clientOrderFormData,
      client: e.target.value,
    });
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
            <form>
              <div className="left-side-order-form">
                <select
                  className="client-select"
                  onChange={(e) => handleClientChange(e)}
                >
                  <option>Select Client</option>
                  {clientsList.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.username}
                    </option>
                  ))}
                </select>
                <textarea
                  placeholder="Client Note"
                  onChange={(e) =>
                    setClientOrderFormData({
                      ...clientOrderFormData,
                      client_note: e.target.value,
                    })
                  }
                />
                <input
                  type="date"
                  placeholder="Due Date"
                  onChange={(e) =>
                    setClientOrderFormData({
                      ...clientOrderFormData,
                      due_date: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Processing Time"
                  onChange={(e) =>
                    setClientOrderFormData({
                      ...clientOrderFormData,
                      processing_time: e.target.value,
                    })
                  }
                />
                <div>
                  <select
                    onChange={(e) =>
                      handleRequiredProductChange(e.target.value)
                    }
                    className="product-select"
                  >
                    <option value="requiredproduct">Select Product</option>
                    {productsList.map((product) => (
                      <option key={product.id} value={product.title}>
                        {product.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="right-side-order-form">
                <ul>
                  {addedProductsList.map((product, index) => (
                    <li key={index}>
                      <div>{product}</div>
                      <input
                        type="number"
                        placeholder="qty"
                        onChange={(e) => handleProductListChange(e, product)}
                      />
                      <button
                        onClick={() => handleDeleteProductFromList(index)}
                      >
                        X
                      </button>
                    </li>
                  ))}
                </ul>
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
