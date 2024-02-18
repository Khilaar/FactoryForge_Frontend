import { useEffect, useState } from "react";
import API from "../../../api/API";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({});
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

  // const redirectToEdit = (e) => {
  //   e.preventDefault();
  //   navigate("/profile/edit");
  // };

  const toggleShowEdit = () => {
    setShowEditProfile((prevData) => !prevData);
  };

  return (
    <>
      <div className="profilePage-container">
        <div className="profilePage-frame">
          <div className="profileBox">
            <div className="avatar-container" title="Avatar">
              <img src={userProfile.avatar} />
            </div>
            <div className="profile-info-container">
              <div>
                <i className="fi fi-rr-user" />
                <span title="Username">{userProfile.username}</span>
              </div>
              <div>
                <i className="fi fi-rr-id-badge"></i>
                <span title="Full Name">
                  {userProfile.first_name || "N/A"}{" "}
                  {userProfile.last_name || "N/A"}
                </span>
              </div>
              <div>
                <i className="fi fi-rr-at"></i>
                <span title="Email">{userProfile.email || "N/A"}</span>
              </div>
              <div>
                <i className="fi fi-rr-marker"></i>
                <span title="Address">{userProfile.address || "N/A"}</span>
              </div>
              <div>
                <i className="fi fi-rr-text"></i>
                <span title="Type of User">
                  {userProfile.type_of_user || "N/A"}
                </span>
              </div>
              <div>
                <i className="fi fi-rr-text"></i>
                <span title="ID">{userProfile.id || "N/A"}</span>
              </div>
              <div className="editButtonProfile">
                <button>EDIT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
