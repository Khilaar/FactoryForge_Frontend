import { useEffect, useState } from "react";
import API from "../../../api/API";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
//   const navigate = useNavigate();
//   const [userProfile, setUserProfile] = useState({});
//   const [updateProfile, setUpdateProfile] = {
//     username: "",
//   };
//   const accessToken = localStorage.getItem("access_token");
//   const config = {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       "Content-Type": "application/json",
//     },
//   };

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       if (!accessToken) {
//         throw new Error("Access Token not found.");
//       }
//       try {
//         const response = await API.get("users/me/", config);
//         console.log(response.data);
//       } catch (error) {
//         console.error("Error fetching client orders: ", error);
//       }
//     };
//     fetchUserProfile();
//   }, [accessToken]);

//   const updateProfile = async () => {
//     if (!accessToken) {
//       throw new Error("Access Token not found.");
//     }
//     try {
//       const response = await API.patch("users/me/update/", config);
//       setUserProfile(response.data);
//     } catch (error) {
//       console.error("Error fetching client orders: ", error);
//     }
//   };

  return (
    <>
      {/* <div className="profilePage-container">
        <div className="profilePage-frame">
          <div className="profileBox">
            <div className="avatar-container" title="Avatar">
              <img src={userProfile.avatar} />
            </div>
            <div className="profile-info-container">
              <div className="editButtonProfile">
                <button onClick={(e) => updateProfile(e)}>SAVE</button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};
export default EditProfile;
