import { useState, useEffect, useMemo } from "react";
import API from "../../api/API";

const Clients = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFormRawMat, setShowFormRawMat] = useState(false);
  const [rawMaterialFormData, setRawMaterialFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    type_of_user: "",
    address: "",
  });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await API.get("/users/clients/");

        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching clients: ", error);
      }
    };

    fetchClients();
  }, [searchQuery]);

  const filteredClients = useMemo(() => {
    return products.filter((product) =>
      product.username.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [products, searchQuery]);

  const handleRawMaterialInputChange = (e) => {
    const { name, value } = e.target;
    setRawMaterialFormData({
      ...rawMaterialFormData,
      [name]: value,
    });
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
      };

      const requestData = {
        ...rawMaterialFormData,
        type_of_user: "C",
      };

      const response = await API.post("/users/", requestData, config);
      console.log("User created:", response.data);
      setRawMaterialFormData({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        type_of_user: "C",
        address: "",
      });
    } catch (error) {
      console.error("Error creating user: ", error);
    }
  };

  const toggleFormRawMat = () => {
    setShowFormRawMat(!showFormRawMat);
  };

  const handleCloseRawMatForm = () => {
    setShowFormRawMat(false);
  };

  /*###########################*/
  return (
    <div className="background-frame-productinventory">
      <section>
        {/*Products Title and search*/}
        <div className="title-and-searchbar">
          <h3>All Clients</h3>
          <span className="searchbar">
            <h3>search</h3>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </span>
        </div>
        {/*Products Title and search End*/}

        {/*Products List sort fields*/}
        <ul className="items-list" id="sort-list">
          {
            <li key="sort-product" className="list-item-client-sort">
              <span>
                <p>id</p>
              </span>
              <span>
                <p>username</p>
              </span>
              <span>
                <p>name</p>
              </span>
              <button className="invisible-button">X</button>
            </li>
          }
        </ul>
        {/*Products List sort fields End*/}

        {/*Products List*/}
        <ul className="items-list">
          {filteredClients.map((user) => (
            <li key={user.id} className="list-item">
              <span>{user.id}</span>
              <span>{user.username}</span>
              <span>
                {user.first_name} {user.last_name}
              </span>
              <button>X</button>
            </li>
          ))}
        </ul>
        {/*Products List End*/}
      </section>

      {/*Products Add Button*/}
      <section className="inventory-background-buttons">
        <button onClick={toggleFormRawMat}>
          <span>ADD</span>
        </button>
        {showFormRawMat && (
          <div className="order-form">
            <span className="title-close-button-pop-up-form">
              <h3>Add Client</h3>
              <button onClick={handleCloseRawMatForm}>X</button>
            </span>
            <form
              className="inner-part-form"
              onSubmit={handleSubmitRawMaterial}
            >
              {/* Input fields for adding a new client */}
              <span className="add-client-fields">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={rawMaterialFormData.username}
                  onChange={handleRawMaterialInputChange}
                />
                <span>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={rawMaterialFormData.first_name}
                    onChange={handleRawMaterialInputChange}
                  />
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={rawMaterialFormData.last_name}
                    onChange={handleRawMaterialInputChange}
                  />
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={rawMaterialFormData.email}
                  onChange={handleRawMaterialInputChange}
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={rawMaterialFormData.address}
                  onChange={handleRawMaterialInputChange}
                />
              </span>

              {/* Submit button */}
              <button type="submit">
                <span>ADD</span>
              </button>
            </form>
          </div>
        )}
      </section>
      {/*Products Add Button End*/}
    </div>
  );
};

export default Clients;
