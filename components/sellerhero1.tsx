"use client";

import Link from "next/link";
import styled from "styled-components";

const SellerHero = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <Title>Start Selling & Grow Your Business with Elito</Title>
        <Subtitle>
          Join Elito and reach more customers with ease. List your cakes, manage orders, and boost your sales effortlessly!
        </Subtitle>
        <Link href="/addcake" passHref>
          <CTAButton>Add Your Cake</CTAButton>
        </Link>
      </HeroContent>
      <HeroImageContainer>
        <HeroImage src="/images/pexels-shkrabaanthony-6148522.jpg" alt="Baker preparing cakes" width={700}/>
      </HeroImageContainer>
    </HeroContainer>
  );
};

export default SellerHero;

// Styled Components
const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60px 10%;
  background: white;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  max-width: 50%;

  @media (max-width: 768px) {
    max-width: 100%;
    margin-bottom: 30px;
  }
`;

const Title = styled.h1`
  font-size: 42px;
  font-weight: bold;
  color: #262626;
  font-family: "Poppins", sans-serif;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Subtitle = styled.p`
  font-size: 20px;
  color: #555;
  font-family: "Poppins", sans-serif;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const CTAButton = styled.button`
  padding: 15px 35px;
  background: #c14679;
  color: white;
  font-size: 18px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #a13a66;
    transform: scale(1.08);
  }
`;

const HeroImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const HeroImage = styled.img`
  max-width: 80%;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;
