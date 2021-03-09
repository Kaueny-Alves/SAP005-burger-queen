import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`;

export const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #136713;
  width: 80px;
`;

export const PageBody = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex: 1;
  background-color: #136713;
  overflow-y: auto;
  background-image: url("/assets/bg.png");
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: #136713;
  &:hover,
  &:focus {
    background-color: #073c07;
    outline: none;
  }
`;

 
