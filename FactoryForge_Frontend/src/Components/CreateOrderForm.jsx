import { useState } from "react";

const CreateOrderForm = ({ toggleCreateOrder, createOrderTitle }) => {
  const [clientFormData, setClientFormData] = useState({});
  const [rawMaterialFormData, setRawMaterialFormData] = useState({});

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
          <form className="formdata_inputfields">
            <div>test</div>
          </form>
        ) : (
          <form action="" className="formdata_inputfields"></form>
        )}
      </div>
    </>
  );
};

export default CreateOrderForm;
