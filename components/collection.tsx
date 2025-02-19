'use client'; // This directive tells Next.js that the component should run client-side

import Image from "next/image";

const WhatWeOffer = () => {
  const offers = [
    {
      title: "PARTY CUPCAKES",
      description:
        "We provide a variety of cupcakes for any party made with high-quality natural ingredients and no preservatives.",
      imgSrc: "/images/cupcakes.jpg",
    },
    {
      title: "WEDDING CAKES",
      description:
        "Want to make your wedding unforgettable? Then you need to order a unique wedding cake at Sweet Bakery!",
      imgSrc: "/images/cake_lk_banner_6.png",
    },
    {
      title: "CHOCO CAKES",
      description:
        "Nothing tastes better than a chocolate cake with a variety of flavors, which is always available at our bakery.",
      imgSrc: "/images/pexels-abhinavcoca-291528.jpg",
    },
  ];

  return (
    <section className="what-we-offer">
      <h2 className="section-title">WHAT WE OFFER</h2>
      <div className="offer-cards">
        {offers.map((offer, index) => (
          <div key={index} className="offer-card">
            <div className="image-wrapper">
              <Image
                src={offer.imgSrc}
                alt={offer.title}
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
            <h3 className="offer-title">{offer.title}</h3>
            <p className="offer-description">{offer.description}</p>
            {/* <button className="read-more-btn">
              READ MORE
            </button> */}
          </div>
        ))}
      </div>

      <style jsx>{`
        .what-we-offer {
          text-align: center;
          padding: 50px 20px;
          background:white;
        }

        .section-title {
          font-size: 50px;
          font-weight: bold;
          margin-bottom: 30px;
          color: #333;
        }

        .offer-cards {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .offer-card {
          background: #fff;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 450px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .offer-card:hover {
          transform: translateY(-10px); /* Lift effect */
          box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15); /* Stronger shadow */
        }

        .image-wrapper {
          overflow: hidden;
          border-radius: 8px;
          margin-bottom: 15px;
          position: relative;
          height: 380px;
          transition: transform 0.3s ease;
        }

        .image-wrapper:hover {
          transform: scale(1.05); /* Zoom effect on image hover */
        }

        .offer-title {
          font-size: 20px;
          font-weight: bold;
          margin: 15px 0;
          color: #333;
        }

        .offer-description {
          font-size: 16px;
          color: #666;
          margin-bottom: 15px;
        }

        .read-more-btn {
          background-color: #C64B8C; /* Matching with your color scheme */
          color: white;
          border: none;
          padding: 10px 20px;
          font-size: 18px;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }

        .read-more-btn:hover {
          background-color: #C14679; /* Darker shade for hover */
          transform: scale(1.05); /* Slight button scaling effect */
        }

        .read-more-btn:active {
          transform: scale(0.95); /* Button shrink effect on click */
        }
      `}</style>
    </section>
  );
};

export default WhatWeOffer;
