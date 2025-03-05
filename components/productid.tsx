"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const ProductDetails = () => {
  interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    quantity:string;
  
  }

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`/api/Product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to load product details:" , error);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // const handleSizeSelect = (size: string) => {
  //   setSelectedSize(size);
  // };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  // const buttonStyle = (size: string) => {
  //   const isSelected = selectedSize === size;
  //   return {
  //     padding: "12px 25px",
  //     background: isSelected ? " #C14679" : "white",
  //     border: `2px solid ${isSelected ? " #C14679" : "#ccc"}`,
  //     borderRadius: "5px",
  //     cursor: "pointer",
  //     fontSize: "16px",
  //     transition: "all 0.3s ease, transform 0.2s ease",
  //     fontFamily: "Poppins",
  //     color: isSelected ? "white" : "#333",
  //     boxShadow: isSelected ? "0px 6px 12px rgba(0, 0, 0, 0.15)" : "0px 4px 6px rgba(0, 0, 0, 0.1)",
  //     transform: isSelected ? "scale(1.05)" : "scale(1)",
  //   };
  // };

  const handleBuyNow = async () => {
    router.push(`/order?productId=${product._id}`)
  }

  return (
    <section className="king" style={styles.container}>
      <div style={styles.productImage}>
        <Image src={product.image} alt={product.name} style={styles.image} width={600}/>
      </div>

      <div style={styles.details}>
        <h1 style={styles.title}>{product.name}</h1>
        <p style={styles.price}>Rs {product.price}</p>
        <p style={styles.description}>Description: {product.description}</p>
        <p style={styles.quantity}> {product.quantity}</p>
       

        {/* Personalized Icing Message */}
        <div>
          <span>optional:</span><br/><br/>
          <p>Personalized icing message on the cake</p>
          <input type="text" placeholder="Eg- Happy birthday Amma" style={styles.input} />
        </div>
        <div>
          <p>If you want any changes  </p>
          <input type="text" placeholder="text here" style={styles.input} />
        </div>

        {/* Buttons */}
        <div style={styles.addToCart}>
          <button onClick={handleBuyNow} style={styles.cartButton}>Buy Now</button>
          <Link href="/yourcart" passHref>
            <button style={styles.cartButton}>Add To Cart</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const styles = {

  container: {
    display: "flex",
    flexDirection: "row" as const,
    width: "90%",
    maxWidth: "1200px",
    gap: "70px",
    margin: "80px auto",
    backgroundColor: "#fdfdfd",
    padding: "50px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
  },
  productImage: {
    width: "600px",
  },

  span : {
    fontSize: "20px",
    color: "#333",
    fontWeight: "bold",
  },
  
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    borderRadius: "10px",
    border: "2px solid #ccc",
  },
  details: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",

  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#333",

  },
  price: {
    fontSize: "30px",
    color: "#C14679",
    fontWeight: "bold",

  },
  description: {
    fontSize: "18px",
    color: "#333",
    

  },
  quantity: {
    fontSize: "18px",
    color: "#666",
  },
  date: {
    fontSize: "16px",
    color: "#777",

  },
  sizeOptions: {
    marginTop: "15px",

  },
  label: {
    fontSize: "18px",
    fontWeight: "bold",

  },
  sizeButtonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",

  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",

  },
  sellerInfo: {
    padding: "15px",
    backgroundColor: "#f3f3f3",
    borderRadius: "8px",

  },
  addToCart: {
    display: "flex",
    justifyContent: "flex-start",
    gap: "10px",
    marginTop: "20px",


  },
  cartButton: {
    backgroundColor: " #C14679",
    color: "white",
    padding: "12px 20px",
    border: "none",
    fontSize: "18px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.3s ease",
  },
};

export default ProductDetails;
