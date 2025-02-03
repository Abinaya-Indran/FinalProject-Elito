import { useState, useEffect } from "react";

interface User {
  name: string;
  email: string;
  role: "Buyer" | "Seller" | "Admin";
  address?: string;
  phoneNumber?: string;
  cakeShopName?: string;
  sellerType?: "Individual" | "Cake Shop";
}

export default function EditProfile({ user }: { user: User | null }) {
  const [formData, setFormData] = useState<User>(
    user || {
      name: "",
      email: "",
      role: "Buyer",
      address: "",
      phoneNumber: "",
      cakeShopName: "",
      sellerType: "Individual",
    }
  );

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      alert("Profile updated successfully");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2 className="edit-profile-title">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="edit-profile-form">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        {formData.role === "Seller" && (
          <>
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              placeholder="Enter your address"
            />

            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber || ""}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />

            <label>Seller Type</label>
            <select
              name="sellerType"
              value={formData.sellerType || "Individual"}
              onChange={handleChange}
            >
              <option value="Individual">Individual</option>
              <option value="Cake Shop">Cake Shop</option>
            </select>

            {formData.sellerType === "Cake Shop" && (
              <>
                <label>Cake Shop Name</label>
                <input
                  type="text"
                  name="cakeShopName"
                  value={formData.cakeShopName || ""}
                  onChange={handleChange}
                  placeholder="Enter cake shop name"
                />
              </>
            )}
          </>
        )}

        <button type="submit">Save Changes</button>
      </form>

      <style jsx>{`
        .edit-profile-container {
          max-width: 450px;
          margin: 50px auto;
          padding: 20px;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .edit-profile-title {
          text-align: center;
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 20px;
        }

        .edit-profile-form {
          display: flex;
          flex-direction: column;
        }

        label {
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 5px;
          color: #555;
        }

        input, select {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 1rem;
        }

        input:focus, select:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        }

        button {
          width: 100%;
          padding: 12px;
          background: #007bff;
          color: white;
          font-size: 1rem;
          font-weight: bold;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        button:hover {
          background: #0056b3;
        }
      `}</style>
    </div>
  );
}
