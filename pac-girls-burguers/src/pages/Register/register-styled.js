import styled from "styled-components";

export const Container = styled.div`
  background-color: #136713;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  margin-top: 100px;
  padding: 20px;
`;

export const Input = styled.input`
  outline: none;
  width: 400px;
  height: 30px;
  font-size: 16px;
  padding: 10px;
  border: 1 px solid #424242;
  border-radius: 10px;
  margin: 10px;
`;

export const Button = styled.button`
  background-color: #073c07;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  box-sizing: border-box;
  padding: 0.8rem 150px;
`;

export const Select = styled.select`
  outline: none;
  width: 425px;
  height: 50px;
  font-size: 16px;
  border: 1px solid #000;
  border-radius: 10px;
  margin: 10px;
`;

export const Logo = styled.img`
  width: 300px;
  height: auto;
`;

export const Title = styled.h1`
  color: #fffafa;
`;

export const P = styled.p`
color:#FFFAFA;
`;

export const Option = styled.option`
  font-size: 16px;
  font-weight: bold;
  color: #073c07;
`;