import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 700px;
  height: 1000px;
  align-items: center;
  justify-content: space-around;
  justify-items: center;
`;

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${(props) => (props.new ? "#136713" : "#ffd700")};
  color: ${(props) => (props.new ? "#ffd700" : "#136713")};
  font-size: 25px;
  font-weight: bold;
  width:300px;
  height: 100px;
`;
