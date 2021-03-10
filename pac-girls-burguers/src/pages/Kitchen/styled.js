import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 15px;
`;

export const ProductArea = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 20px;
  margin-bottom: 10px;
  gap: 10px;
`;
export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Select = styled.select`
  width: 430px;
  height: 50px;
  font-size: 16px;
  border: 2 px solid #000;
  border-radius: 10px;
  margin: 10px;
`;

export const Option = styled.option`
  font-size: 16px;
  font-weight: bold;
`;

export const Titulo = styled.div`
  color: #fffafa;
  background-color: #136713;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  padding: 10px;
`;

export const ContainerProduct = styled.div`
  background-color: #fffafa;
  border-radius: 5px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  padding: 10px;
  display: flex;
  color: #136713;
  cursor: pointer;
`;

export const ProductInfoArea = styled.div`
  flex: 1;
  margin-left: 10px;
  margin-right: 10px;
`;

export const ProductName = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

export const ProductType = styled.div``;
export const ProductItem = styled.div``;
export const ClientName = styled.div`
  font-size: 14px;
  font-weight: bold;
`;
export const ProductQuantity = styled.div``;
export const Table = styled.div``;
export const Status = styled.div``;
export const Waiter = styled.div``;
export const ButtonToDo = styled.button`
  /* color: #fffafa; */
  /* background-color: ${(props) => (props.ready ? "red" : "orange")}; */
  margin: 10px 0px;
`;


