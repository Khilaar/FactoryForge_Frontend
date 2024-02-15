import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/API";


const Suppliers = () => {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const [showFormSupplier, setShowFormSupplier] = useState(false);
  const [formDataSupplier, setFormDataSupplier] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    type_of_user: "S",
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataSupplier({
      ...formDataSupplier,
      [name]: value,
    });
  };

  const handleSubmitSupplier = async (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    try {
      const accessToken = localStorage.getItem("access_token");
      if(!accessToken) {
        throw new Error("Access token not found");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };

      const response = await API.post("/users/", formDataSupplier, config);
      toggleFormSupplier();
      console.log("Supplier created:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error creating supplier", error);
    }
  };

  const toggleFormSupplier = () => {
    setShowFormSupplier(!showFormSupplier);
  };

  const handleCloseSupplierForm = () => {
    setFormDataSupplier({
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      type_of_user: "S",
    });
    setShowFormSupplier(false);
    console.log(showFormSupplier);
  };

// Fetch all the Suppliers
useEffect(() => {
  const fetchSuppliers = async () => {
    try {
      const response = await API.get("/suppliers/");
      setSuppliers(response.data);
    }
    catch (error) {
      console.error("Error fetching Suppliers", error);
    }
  };
  fetchSuppliers();
}, []);

  return (
      <div>
        <h1 className="route-title">Suppliers</h1>

        <div className="background-frame">
          <section>
            <ul>
              <ul className="items-list">
                  {
                    <li className="list-item-suppliers">
                      <span>
                        <p className="header-text">id</p>
                      </span>
                      <span>
                        <p className="header-text">username</p>
                      </span>
                      <span>
                        <p className="header-text">first name</p>
                      </span>
                      <span>
                        <p className="header-text">last name</p>
                      </span>
                      <span>
                        <p className="header-text">email</p>
                      </span>
                    </li>
                  }
              </ul>
              {suppliers.slice(0.4).map((supplier) => (
                <li key={supplier.id} className="list-item-suppliers">
                  <span>{supplier.id}</span>
                  <span>{supplier.username}</span>
                  <span>{supplier.first_name}</span>
                  <span>{supplier.last_name}</span>
                  <span>{supplier.email}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <button className="supplier-button" onClick={toggleFormSupplier}>ADD SUPPLIER</button>
            {showFormSupplier && (
              <div className="add-form-supply">
                <form onSubmit={handleSubmitSupplier}>
                  <div className="add-form">
                      <span className="title-close-button-pop-up-form">
                        <h3>Add Supplier</h3>
                        <button onClick={handleCloseSupplierForm}>X</button>
                      </span>
                      <span>
                        <h3 className="h3-header">Username</h3>
                        <input 
                          className="input"
                          type="text"
                          name="username"
                          value={formDataSupplier.username}
                          onChange={handleInputChange} 
                        />
                      </span>
                      <span>
                        <h3 className="h3-header">First Name</h3>
                        <input 
                          className="input"
                          type="text"
                          name="first_name"
                          value={formDataSupplier.first_name}
                          onChange={handleInputChange} 
                        />
                      </span>
                      <span>
                        <h3 className="h3-header">Last Name</h3>
                        <input 
                          className="input"
                          type="text"
                          name="last_name"
                          value={formDataSupplier.last_name}
                          onChange={handleInputChange} 
                        />
                      </span>
                      <span>
                        <h3 className="h3-header">Email</h3>
                        <input 
                          className="input"
                          type="text"
                          name="email"
                          value={formDataSupplier.email}
                          onChange={handleInputChange} 
                        />
                      </span>
                      <button className="send-button-supply" type="submit">
                      <span>SUBMIT</span>
                      </button>
                  </div>
                </form>
              </div>
            )}
          </section>
        </div>
      </div>

    );
};

export default Suppliers;
