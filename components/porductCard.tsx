type Product = {
    _id: string;
    name: string;
    price: number;
    description?: string;
    category?: string;
    stock?: number;
    imageUrl: string;
  };
  
  interface ProductCardProps {
    product: Product;
  }
  
  export default function ProductCard({ product }: ProductCardProps) {
    return (
      <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p className="text-gray-700">${product.price.toFixed(2)}</p>
        {product.description && (
          <p className="text-sm text-gray-500 mt-2">{product.description}</p>
        )}
      </div>
    );
  }
  