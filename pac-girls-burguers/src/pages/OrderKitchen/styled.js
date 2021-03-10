import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width:100%;
  padding:15px;
  height: 90% ;
`;

export const Orders = styled.div`
  display: flex;
  justify-content:space-evenly;
`;

export const Cards = styled.div`
   display:flex;
   width: 250px;
   background-color: white;
   flex-direction: column;
   margin: 10px;
   border-radius:10px;
   padding: 20px;
   color:#136713;

`;
export const CardContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content:space-evenly;
   align-items: center;
`;
export const H2 = styled.h2`
   width: 300px;
  color: #fffafa;
  background-color: #136713;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  padding: 10px;
  border-radius: 10px;
`;

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fffafa;
  background-color: #136713;
  border-radius: 10px;
  padding: 10px;
  margin: 20px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  cursor: pointer;
`;