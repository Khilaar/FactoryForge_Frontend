import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar((prevShowSidebar) => !prevShowSidebar);
  };

  return (
    <>
      <aside
        className={`sidebar-container ${showSidebar ? "sidebar-open" : "sidebar-closed"}`}
      >
        <button className="toggle-button" onClick={toggleSidebar}>
          <i class="fi fi-rr-menu-burger"></i>
        </button>
        <nav className="aside-nav">
          {showSidebar ? (
            <>
              <NavLink to="/" activeClassName="activeNav">
                <i class="fi fi-rr-home"></i>
                <span>Dasboard</span>
              </NavLink>
              <NavLink to="/inventory" activeClassName="activeNav">
                <i class="fi fi-rr-shop"></i>
                <span>Inventory</span>
              </NavLink>
              <NavLink to="/clientorders" activeClassName="activeNav">
                <i class="fi fi-rr-shopping-cart"></i>
                <span>Orders</span>
              </NavLink>
              <NavLink to="/suppliers" activeClassName="activeNav">
                <i class="fi fi-rr-users"></i>
                <span>Suppliers</span>
              </NavLink>
              <NavLink to="/analytics" activeClassName="activeNav">
                <i class="fi fi-rr-chart-histogram"></i>
                <span>Analytics</span>
              </NavLink>
              <NavLink to="/profile" activeClassName="activeNav">
                <i class="fi fi-rr-user" />
                <span>Profile</span>
              </NavLink>
              <NavLink to="/settings" activeClassName="activeNav">
                <i class="fi fi-rr-settings"></i>
                <span>Settings</span>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/" activeClassName="activeNav">
                <i class="fi fi-rr-home"></i>
              </NavLink>
              <NavLink to="/inventory" activeClassName="activeNav">
                <i class="fi fi-rr-shop"></i>
              </NavLink>
              <NavLink to="/clientorders" activeClassName="activeNav">
                <i class="fi fi-rr-shopping-cart"></i>
              </NavLink>
              <NavLink to="/suppliers" activeClassName="activeNav">
                <i class="fi fi-rr-users"></i>
              </NavLink>
              <NavLink to="/analytics" activeClassName="activeNav">
                <i class="fi fi-rr-chart-histogram"></i>
              </NavLink>
              <NavLink to="/profile" activeClassName="activeNav">
                <i class="fi fi-rr-user" />
              </NavLink>
              <NavLink to="/settings" activeClassName="activeNav">
                <i class="fi fi-rr-settings"></i>
              </NavLink>
            </>
          )}
        </nav>
      </aside>
    </>
  );
}
