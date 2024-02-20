import { useState, useEffect, useMemo } from "react";
import API from "../../api/API";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFormSupplier, setShowFormSupplier] = useState(false);
  const [showDeleteAction, setShowDeleteAction] = useState(false);
  const [showSortPopUp, setShowSortPopUp] = useState(false);
  const [sortOption, setSortOption] = useState(null);
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
      if (!accessToken) {
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

  const toggleDeleteAction = () => {
    setShowDeleteAction(!showDeleteAction);
  }

  const toggleSortPopUp = () => {
    setShowSortPopUp(!showSortPopUp);
  }

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

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await API.get("/suppliers/");
        setSuppliers(response.data);
      } catch (error) {
        console.error("Error fetching Suppliers", error);
      }
    };
    fetchSuppliers();
  }, [searchQuery]);


  const sortedSuppliers = useMemo(() => {
    let sortedList = [...suppliers];

    if(sortOption) {
      sortedList.sort((a, b) => {
        const fieldA = a[sortOption].toString().toLowerCase();
        const fieldB = b[sortOption].toString().toLowerCase();
        return fieldA.localeCompare(fieldB);
      });
    }
    
    return sortedList.filter((supplier) =>
      Object.values(supplier)
        .some((field) => field && field.toString().toLowerCase().includes(searchQuery.toLowerCase()))
    );
    }, [suppliers, searchQuery, sortOption]);
  

  const handleDeleteSupplier = async (supplierId) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        throw new Error("Access token not found");
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
  
      await API.delete(`/suppliers/${supplierId}`, config);
  
      const response = await API.get("/suppliers/");
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error deleting supplier", error);
    }
  };

  return (
    <div>
      <div className="title-and-searchbar">
        <h1 className="route-title">Suppliers</h1>
        <span className="searchbar-suppliers">  
        <h3>Search</h3>
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        </span>
      </div>
      

      <div className="background-frame">
        <section>
          <ul>
          <span>
            <button onClick={toggleSortPopUp} className="supplier-button-sort">sort</button>
          </span>
          {showSortPopUp && (
            <span className="sort-span">
            <button 
            className="sort-span-button"
            onClick={() => {
              setSortOption("id");
              setShowSortPopUp(false);
            }}
            >id</button>
            <button 
            className="sort-span-button"
            onClick={() => {
              setSortOption("username");
              setShowSortPopUp(false);
            }}
            >username</button>
            <button 
            className="sort-span-button"
            onClick={() => {
              setSortOption("first_name");
              setShowSortPopUp(false);
            }}
            >first name</button>
            <button 
            className="sort-span-button"
            onClick={() => {
              setSortOption("last_name");
              setShowSortPopUp(false);
            }}
            >last name</button>
            </span>
          )}
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
                  {showDeleteAction && (
                    <span>
                    <p className="header-text">Action</p>
                  </span>
                  )}
                </li>
              }
            </ul>
            {sortedSuppliers.slice(0.5).map((supplier) => (
              <li key={supplier.id} className="list-item-suppliers">
                <span>{supplier.id}</span>
                <span>{supplier.username}</span>
                <span>{supplier.first_name}</span>
                <span>{supplier.last_name}</span>
                <span>{supplier.email}</span>
                {showDeleteAction && (
                  <span>
                    <button 
                      className="supplier-delete-action-btn"
                      onClick={() => handleDeleteSupplier(supplier.id)}
                    >
                      Delete
                    </button>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <button className="supplier-button" onClick={toggleFormSupplier}>
            ADD
          </button>
          <button className="supplier-button-delete" onClick={toggleDeleteAction}>
            DELETE
          </button>
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
                    <span>ADD</span>
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
