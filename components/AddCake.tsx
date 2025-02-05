import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

interface Product {
  sellerId: string;
  name: string;
  price: number;
  image: string;
  createdAt?: Date;
  description?: string;
  category?: string;
}

export default function AddProduct() {
  const [product, setProduct] = useState<Product>({
    sellerId: '',
    name: '',
    price: 0,
    image: '',
    description: '',
    createdAt: new Date(),
    category: '',
  });
  const [preview, setPreview] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [sellerId, setSellerId] = useState<string>('');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get('/api/cookie');
        setSellerId(response.data.user.userId);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        setProduct((prev) => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');

    if (!sellerId) {
      alert('Seller ID is missing');
      return;
    }

    try {
      const response = await axios.post('/api/addcake', {data: { ...product, sellerId } });
      console.log('Response:', response.data);

      // const result = await response.json();

      // if (!response.ok) {
      //   throw new Error(result.error || 'Error adding product');
      // }

      alert('Product added successfully');
      setProduct({
        sellerId: '',
        name: '',
        price: 0,
        image: '',
        description: '',
        createdAt: new Date(),
        category: '',
      });
      setPreview('');
    } catch (err) {
      console.error('Error:', err);
      alert(err instanceof Error ? err.message : 'Error adding product');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-container">
        <h2 className="form-title">Add New Cake</h2>
        <div className="cake-form">
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              placeholder="Product Name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Product Price</label>
            <input
              type="number"
              id="price"
              placeholder="Product Price"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Product Image</label>
            <input type="file" id="image" accept="image/*" onChange={handleImageChange} required />
            {preview && <Image src={preview} alt="Preview" width={200} height={200} />}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              placeholder="Description"
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="createdAt">Created At</label>
            <input
              type="date"
              id="createdAt"
              placeholder="Created At"
              value={product.createdAt ? product.createdAt.toISOString().split('T')[0] : ''}
              onChange={(e) => setProduct({ ...product, createdAt: new Date(e.target.value) })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              placeholder="Category"
              value={product.category || ''}
              onChange={(e) => setProduct({ ...product, category: e.target.value })}
            />
          </div>
          <button type="submit" className="submit-btn">Add Product</button>
          {message && <p className="form-message">{message}</p>}
        </div>
      </form>


      <style jsx>{`
        .form-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          background-color: #F9F9F9;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: 2rem auto;
        }
        .form-title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          color: #B864D4;
        }
        .cake-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
        }
        .form-group label {
          font-size: 1rem;
          color: #333;
          margin-bottom: 0.5rem;
        }
        .form-group input,
        .form-group textarea {
          padding: 0.75rem;
          font-size: 1rem;
          border: 1px solid #ddd;
          border-radius: 5px;
          width: 100%;
          box-sizing: border-box;
        }
        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }
        .submit-btn {
          background-color: #B864D4;
          color: white;
          font-size: 1rem;
          font-weight: 500;
          padding: 0.75rem;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .submit-btn:hover {
          background-color: #A755C4;
        }
        .form-message {
          margin-top: 1rem;
          color: green;
          font-weight: bold;
        }
        .image-preview {
          margin-top: 1rem;
          max-width: 100%;
          img {
            width: 100%;
            max-height: 300px;
            object-fit: cover;
          }
        }
      `}</style>
    </>
  );
}
