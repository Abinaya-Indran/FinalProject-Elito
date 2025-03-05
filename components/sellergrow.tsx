import React from "react";
import styled from "styled-components";
import { FaUserPlus, FaBookOpen, FaTruck, FaChartLine } from "react-icons/fa";

const SellerGrow = () => {
  return (
    <Container>
      <Title>Grow Your Business Effortlessly</Title>
      <Steps>
        <Step>
          <Icon>
            <FaUserPlus />
          </Icon>
          <Content>
            <StepTitle>01. Register As A Seller</StepTitle>
            <StepDescription>
              Complete a simple sign-up within 2 minutes! complete your seller profile by uploading Business / Individual documents.
            </StepDescription>
          </Content>
        </Step>

        <Step>
          <Icon>
            <FaBookOpen />
          </Icon>
          <Content>
            <StepTitle>02. Simple Product Listing.</StepTitle>
            <StepDescription>
              List everything you have! The more options you provide to customers, the better chances of you selling!
            </StepDescription>
          </Content>
        </Step>

        {/* <Step>
          <Icon>
            <FaStar />
          </Icon>
          <Content>
            <StepTitle>03. Be An Amazing Elito Seller With Seller Tools!</StepTitle>
            <StepDescription>
              Create vouchers, build a beautiful e-store, bundle up your hot-selling items - you decide your path to be an amazing seller!
            </StepDescription>
          </Content>
        </Step> */}

        <Step>
          <Icon>
            <FaTruck />
          </Icon>
          <Content>
            <StepTitle>03. Ship Easily</StepTitle>
            <StepDescription>
              With our in-house logistics providers, shipping is made easy for every seller!
            </StepDescription>
          </Content>
        </Step>

        <Step>
          <Icon>
            <FaChartLine />
          </Icon>
          <Content>
            <StepTitle>05. Earn!</StepTitle>
            <StepDescription>
              Start selling and watch your profits grow!
            </StepDescription>
          </Content>
        </Step>
      </Steps>
    </Container>
  );
};

export default SellerGrow;

// Styled Components
const Container = styled.div`
  background: #c64b8c;
  padding: 50px;
  color: white;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const Steps = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  background: white;
  color: #262626;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Icon = styled.div`
  font-size: 50px;
  color: #c64b8c;
  background: #fff;
  border-radius: 50%;
  padding: 10px;
  margin-right: 15px;
`;

const Content = styled.div`
  text-align: left;
`;

const StepTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

const StepDescription = styled.p`
  font-size: 14px;
`;
