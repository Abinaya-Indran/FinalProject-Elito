import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";

const EditProfile = () => {
  const [userData, setUserData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    role: "", // Buyer or Seller
    profilePicture: "",
  });

  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    address: false,
  });

  const [isModified, setIsModified] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/cookie");
        if (!response.data.user) {
          router.push("/login");
          return;
        }
        const userId = response.data.user.userId;
        const userResponse = await axios.post('/api/user/profile', {
          id: userId,
        });
        setUserData(userResponse.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setIsModified(true);
  };

  const handleSave = async () => {
    if (!isModified) {
      toast("No changes made.");
      return;
    }
    try {
      const response = await axios.patch('/api/user/profile', userData);
      const updatedUser = response.data;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUserData(updatedUser);
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
    setIsEditing({
      firstName: false,
      lastName: false,
      email: false,
      phoneNumber: false,
      address: false,
    });
    setIsModified(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_actual_preset"); // Make sure this matches your Cloudinary preset

    try {
      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dgyfbm2en/image/upload", // Replace with your Cloudinary cloud name
        formData
      );
      const imageUrl = uploadResponse.data.secure_url;
      setUserData({ ...userData, profilePicture: imageUrl });
      setIsModified(true);
      toast.success("Profile picture updated!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error uploading image:", error.response?.data || error.message);
      } else {
        console.error("Error uploading image:", error);
      }
      toast.error("Failed to upload image");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Edit Profile</h2>

      <div style={styles.imageContainer}>
        <img
          src={userData.profilePicture || "/default-profile.png"}
          alt="Profile"
          style={styles.profileImage}
        />
        <input type="file" onChange={handleImageUpload} accept="image/*" />
      </div>

      <div style={styles.form}>
        {["firstName", "lastName", "email"].map((field) => (
          <div key={field} style={styles.inputGroup}>
            <label style={styles.label}>{field.replace(/([A-Z])/g, " $1")}</label>
            {isEditing[field as keyof typeof isEditing] ? (
              <input
                type="text"
                name={field}
                value={userData[field as keyof typeof userData]}
                onChange={handleChange}
                style={styles.input}
              />
            ) : (
              <p style={styles.text} onClick={() => setIsEditing({ ...isEditing, [field]: true })}>
                {userData[field as keyof typeof userData] || "Click to edit"}
              </p>
            )}
          </div>
        ))}

        {userData.role === "seller" && (
          <>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Phone Number</label>
              {isEditing.phoneNumber ? (
                <input
                  type="text"
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={handleChange}
                  style={styles.input}
                />
              ) : (
                <p style={styles.text} onClick={() => setIsEditing({ ...isEditing, phoneNumber: true })}>
                  {userData.phoneNumber || "Click to edit"}
                </p>
              )}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Address</label>
              {isEditing.address ? (
                <input
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  style={styles.input}
                />
              ) : (
                <p style={styles.text} onClick={() => setIsEditing({ ...isEditing, address: true })}>
                  {userData.address || "Click to edit"}
                </p>
              )}
            </div>
          </>
        )}

        <button style={styles.button} onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "#fff",
    textAlign: "center" as const,
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  imageContainer: {
    marginBottom: "20px",
  },
  profileImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover" as const,
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
  },
  inputGroup: {
    marginBottom: "15px",
    textAlign: "left" as const,
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  text: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "#f9f9f9",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default EditProfile;
