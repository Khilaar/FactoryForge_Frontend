import { useState } from "react";

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar((prevShowSidebar) => !prevShowSidebar);
  };

  return (
    <>
      <aside
        className={`sidebar-container ${!showSidebar ? "sidebar-open" : "sidebar-closed"}`}
      >
        <button className="toggle-button" onClick={toggleSidebar}>
          {showSidebar ? "Close" : "Open"}
        </button>
        {showSidebar && <div className="sidebar-content">test</div>}
      </aside>
    </>
  );
}
