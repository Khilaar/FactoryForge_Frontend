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
    description: "",
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
    try {
      await API.post("/suppliers/", formDataSupplier);
//      navigate("/productinventory");
    } catch (error) {
      console.error("Error creating suppliers: ", error);
    }
  };

  const toggleFormSupplier = () => {
    setShowFormSupplier(!showFormSupplier);
  };

  const handleCloseSupplierForm = () => {
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
                        <p className="header-text">description</p>
                      </span>
                    </li>
                  }
              </ul>
              {suppliers.slice(0.4).map((supplier) => (
                <li className="list-item-suppliers">
                  <span>{supplier.id}</span>
                  <span>{supplier.username}</span>
                  <span>{supplier.first_name}</span>
                  <span>{supplier.last_name}</span>
                  <span>{supplier.description}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <button className="supplier-button" onClick={toggleFormSupplier}>ADD SUPPLIER</button>
            {showFormSupplier && (
              <div className="add-form">
                <form onSubmit={handleSubmitSupplier}>
                  <div className="inventory-add-form-product">
                      <span className="title-close-button-pop-up-form">
                        <h3>Add Supplier</h3>
                        <button onClick={handleCloseSupplierForm}>X</button>
                      </span>
                      <span>
                        <h3 className="h3-header">Username</h3>
                        <input 
                          className="input"
                          type="text"
                          name="title"
                          value={formDataSupplier.username}
                          onChange={handleInputChange} 
                        />
                      </span>
                      <span>
                        <h3 className="h3-header">First Name</h3>
                        <input 
                          className="input"
                          type="text"
                          name="title"
                          value={formDataSupplier.first_name}
                          onChange={handleInputChange} 
                        />
                      </span>
                      <span>
                        <h3 className="h3-header">Last Name</h3>
                        <input 
                          className="input"
                          type="text"
                          name="title"
                          value={formDataSupplier.last_name}
                          onChange={handleInputChange} 
                        />
                      </span>
                      <span>
                        <h3 className="h3-header">Email</h3>
                        <input 
                          className="input"
                          type="text"
                          name="title"
                          value={formDataSupplier.email}
                          onChange={handleInputChange} 
                        />
                      </span>
                      <span>
                        <h3 className="h3-header">Description</h3>
                        <input 
                          className="input-description"
                          type="text"
                          name="title"
                          value={formDataSupplier.description}
                          onChange={handleInputChange} 
                        />
                      </span>
                      <button type="submit">
                      <span>SEND</span>
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
