import { useEffect, useState } from "react";
import API from "../../api/API";

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState({});
  const [updateUserProfile, setUpdateUserProfile] = useState({
    username: userProfile.username || "",
    first_name: userProfile.first_name || "",
    last_name: userProfile.last_name || "",
    avatar: userProfile.avatar || "",
    email: userProfile.email || "",
    address: userProfile.address || "",
  });
  const accessToken = localStorage.getItem("access_token");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!accessToken) {
        throw new Error("Access Token not found.");
      }
      try {
        const response = await API.get("users/me/", config);
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching client orders: ", error);
      }
    };
    fetchUserProfile();
  }, [accessToken]);

  const toggleShowEdit = () => {
    setShowEditProfile((prevData) => !prevData);
  };

  return (
    <>
      <div className="profilePage-container">
        <div className="profilePage-frame">
          {!showEditProfile && updateUserProfile ? (
            <div className="profileBox">
              <div className="avatar-container" title="Avatar">
                <img src={userProfile.avatar} />
              </div>
              <div className="profile-info-container">
                <div title="Username">
                  <i className="fi fi-rr-user" />
                  <span>{userProfile.username}</span>
                </div>
                <div title="Full Name">
                  <i className="fi fi-rr-id-badge"></i>
                  <span>
                    {userProfile.first_name || "N/A"}{" "}
                    {userProfile.last_name || "N/A"}
                  </span>
                </div>
                <div title="Email">
                  <i className="fi fi-rr-at"></i>
                  <span>{userProfile.email || "N/A"}</span>
                </div>
                <div title="Address">
                  <i className="fi fi-rr-marker"></i>
                  <span>{userProfile.address || "N/A"}</span>
                </div>
                <div title="Type of User">
                  <i className="fi fi-rr-text"></i>
                  <span>{userProfile.type_of_user || "N/A"}</span>
                </div>
                <div title="ID">
                  <i className="fi fi-rr-hastag"></i>
                  <span>{userProfile.id || "N/A"}</span>
                </div>
                <div className="editButtonProfile">
                  <button onClick={toggleShowEdit}>EDIT</button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="profileBox">
                <label htmlFor="avatar-input">
                  <div className="avatar-container-update" title="Avatar">
                    <img src={userProfile.avatar} />
                  </div>
                  <input
                    type="file"
                    id="avatar-input"
                    style={{ display: "none" }}
                  />
                </label>
                <div className="profile-info-container-update">
                  <div className="input-container">
                    <i className="fi fi-rr-user" />
                    <input type="text" placeholder="Username" />
                  </div>
                  <div className="fullNameDiv">
                    <div className="input-container">
                      <i className="fi fi-rr-first"></i>
                      <input type="text" placeholder="First Name" />
                    </div>
                    <div className="input-container">
                      <i className="fi fi-rr-second"></i>
                      <input type="text" placeholder="Last Name" />
                    </div>
                  </div>
                  <div className="input-container">
                    <i className="fi fi-rr-at"></i>
                    <input type="email" placeholder="Email" />
                  </div>
                  <div className="input-container">
                    <i className="fi fi-rr-marker"></i>
                    <input type="text" placeholder="Address" />
                  </div>
                </div>
                <div className="editButtonProfile">
                  <button onClick={toggleShowEdit}>SAVE</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
