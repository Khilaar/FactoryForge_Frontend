import API from "../../api/API";

export const handleSubmitProduct = async (
  formDataProduct,
  toggleFormProduct,
) => {
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

    const response = await API.post("/products/", formDataProduct, config);
    toggleFormProduct();
    console.log("Product created:", response.data);
  } catch (error) {
    console.error("Error creating product: ", error);
  }
};

export const handleSubmitRawMaterial = async (
  rawMaterialFormData,
  toggleFormRawMat,
) => {
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

    const response = await API.post(
      "/raw_materials/",
      rawMaterialFormData,
      config,
    );
    const data = response.data;
    console.log("Raw material created:", data);
    toggleFormRawMat();
  } catch (error) {
    console.error("Error creating raw material: ", error);
  }
};
