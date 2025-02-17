"use client";

const AboutUs = () => {
  return (
    <section className="about-us">
      <h2 className="title">ABOUT US</h2>
      <div className="content">
        <div className="image-container">
          <img
            src="/images/close-up-woman-with-delicious-cupcakes.jpg"
            alt="Baked goods"
          />
        </div>
        <div className="text-container">
          <h3 className="subtitle">
            PROVIDING QUALITY BAKED GOODS FOR ALL CUSTOMERS
          </h3>
          <p className="description">
            Our mission is to create a bakery that makes the best quality baked
            goods on-site from scratch, and where both employees and customers
            would feel comfortable.
          </p>
          <div className="mission-values">
        <div className="item active">
          <span className="number">01</span>
          <span className="label">OUR MISSION</span>
        </div>
        <div className="item">
          <span className="number">02</span>
          <span className="label">OUR VALUES</span>
        </div>
        <div className="item">
          <span className="number">03</span>
          <span className="label">OUR GOALS</span>
        </div>
      </div>
        </div>
      </div>
      
      <style jsx>{`
        .about-us {
          text-align: center;
          padding: 50px 20px;
        }
        .title {
          font-size:50px;
          font-weight: bold;
          margin-bottom: 50px;
          color: #262626;
        }
        .content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
          max-width: 1000px;
          margin: 20px auto;
        }
        .image-container {
          flex: 1;
          padding-right:50px
         
        }
        .image-container img {
          width: 100%;
          border-radius: 10px;
        }
        .text-container {
          flex: 1;
          text-align: left;
        }
        .subtitle {
          font-size: 30px;
          font-weight: bold;
          color: #262626;
        }
        .description {
          margin: 15px 0;
          font-size: 18px;
          color: #555;
        }
        .read-more {
          text-decoration: none;
          color: #c64b8c;
          font-weight: bold;
          border-bottom: 2px solid #c64b8c;
          padding-bottom: 2px;
        }
        .mission-values {
          display: flex;
          justify-content: center;
          margin-top: 40px;
          gap: 30px;
        }
        .item {
          text-align: center;
          color: #999;
          font-size: 18px;
        }
        .item .number {
          font-size: 32px;
          font-weight: bold;
        }
        .item.active {
          color: #c64b8c;
        }
        .item.active .number {
          color: #c64b8c;
        }
        @media (max-width: 768px) {
          .content {
            flex-direction: column;
            text-align: center;
          }
          .text-container {
            text-align: center;
          }
          .mission-values {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutUs;
