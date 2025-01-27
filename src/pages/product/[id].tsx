import { GetServerSideProps } from 'next';
import { connectToDatabase } from '../../../lib/db';
import Cake from '../../../models/product';

type CakeProps = {
  cake: {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  };
};

const ProductPage = ({ cake }: CakeProps) => {
  return (
    <div>
      <h1>{cake.name}</h1>
      <img src={cake.imageUrl} alt={cake.name} />
      <p>{cake.description}</p>
      <p>${cake.price}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    await connectToDatabase();

    const cake = await Cake.findById(params?.id);
    if (!cake) {
      return { notFound: true };
    }

    return {
      props: {
        cake: {
          name: cake.name,
          description: cake.description,
          price: cake.price,
          imageUrl: cake.imageUrl,
        },
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default ProductPage;
