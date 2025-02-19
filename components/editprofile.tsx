import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Pencil } from "lucide-react"; // Edit Icon

const EditProfile = () => {
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    role: "",
    profilePicture: "",
  });

  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    phoneNumber: false,
    address: false,
  });

  const [isModified, setIsModified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
        const userResponse = await axios.post("/api/user/profile", { id: userId });
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
      toast.error("No changes made.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.patch("/api/user/profile", {
        _id: userData._id, // Ensure correct user is updated
        name: userData.name,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        address: userData.address,
      });

      if (response.status === 200) {
        setUserData(response.data);
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error: any) {
      toast.error(`Error updating profile: ${error.response?.data?.message || error.message}`);
    }

    setIsEditing({
      name: false,
      email: false,
      phoneNumber: false,
      address: false,
    });
    setIsModified(false);
    setIsLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Edit Profile</h2>

      {/* <div style={styles.imageContainer}>
        <img
          src={userData.profilePicture || "/default-profile.png"}
          alt="Profile"
          style={styles.profileImage}
        />
        <input type="file" accept="image/*" style={styles.fileInput} />
      </div> */}

      <div style={styles.form}>
        {["name", "email", "phoneNumber", "address"].map((field) => (
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
              <p style={styles.inputText}>{userData[field as keyof typeof userData] || "Click to edit"}</p>
            )}
            <Pencil
              size={18}
              style={styles.editIcon}
              onClick={() => setIsEditing({ ...isEditing, [field]: true })}
            />
          </div>
        ))}

        <button style={styles.button} onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    maxWidth: "450px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    textAlign: "center" as const,
    fontFamily: "Poppins, sans-serif",
  
  },
  heading: {
    fontSize: "24px",
    color: "#262626",
    marginBottom: "20px",
    fontWeight: "600",
  },
  imageContainer: {
    position: "relative" as const,
    marginBottom: "20px",
  },
  // profileImage: {
  //   width: "120px",
  //   height: "120px",
  //   borderRadius: "50%",
  //   objectFit: "cover" as const,
  //   border: "3px solid #C14679",
  // },
  fileInput: {
    marginTop: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    position: "relative" as const,
  },
  label: {
    fontWeight: "600",
    color: "#555",
    flex: "1",
    textAlign: "left" as const,
  },
  input: {
    flex: "1",
    border: "none",
    padding: "8px",
    fontSize: "16px",
    background: "transparent",
    outline: "none",
  },
  inputText: {
    flex: "1",
    padding: "8px",
    fontSize: "16px",
    border: "none",
    background: "transparent",
    color: "#333",
  },
  editIcon: {
    cursor: "pointer",
    color: " #C14679",
    transition: "0.2s",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: " #C14679",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
    marginTop: "10px",
    opacity: 1,
  },
};

export default EditProfile;
