import { useState, useEffect, useMemo } from "react";
import API from "../../api/API";

const Clients = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  /*###########################*/
  /*Fetch all the products and save them with use state*/

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await API.get("/users/");
        const clients = response.data.filter(
          (user) => user.type_of_user === "C",
        );
        setProducts(clients);
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
            <li key="sort-product" className="list-item">
              <span>
                <p>id</p>
              </span>
              <span>
                <p>usernamename</p>
              </span>
              <span>
                <p>name</p>
              </span>
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
            </li>
          ))}
        </ul>
        {/*Products List End*/}
      </section>

      {/*Products Add Button*/}
      <section className="inventory-background-buttons">
        <button>
          <span>ADD</span>
        </button>
      </section>
      {/*Products Add Button End*/}
    </div>
  );
};

export default Clients;
