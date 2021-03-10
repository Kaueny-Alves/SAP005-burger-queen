import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../api";
import Header from "../../components/Header";
import {Container,Orders,Cards,CardContainer,Button,H2} from "./styled";
import MenuItem from "../../components/MenuItem";

export default () => {
  const history = useHistory();
  const [products,setProducts]=useState([])
 

  useEffect(()=>{
    async function readyOrders(){
      const data = await api.getOrders()
      setProducts(data)
      console.log(data)
    }
    readyOrders()
 
  },[])
      

  async function status(orderId){
    const body = {status:'delivered'}
    const data = await api.putOrdersId(orderId,body)
    console.log(data)
     
  }

  async function deleteOrders(orderId){
    const data = await api.deleteOrdersId(orderId)
    console.log(data)
     
  }
  return (
    <Container>
      <Header> 
        <MenuItem icon="/assets/back.png" link="/saloon"/>
        </Header>
      <Orders>
       <CardContainer >
       <H2>Pedidos Prontos</H2>
       {products && products.filter(({status})=>status ==="deliver").map((item,index)=>{
         return(
         <Cards key={index}>
         <p> <strong>Pedido:</strong>  {item.id}</p>
         <p> <strong>Cliente:</strong>{" "+item.client_name}</p>
         <p> <strong>Mesa: </strong>{item.table}</p>
         <Button onClick={()=>{status(item.id)}}>Entregar</Button>
         </Cards>
         )
       })}
      </CardContainer>
      <CardContainer>
      <H2>Pedidos Entregues</H2>
     {products && products.filter(({status})=>status ==="delivered").map((item,index)=>{
         return(
         <Cards key={index}>
          <p> <strong>Pedido:</strong>  {item.id}</p>
         <p> <strong>Cliente:</strong>{" "+item.client_name}</p>
         <p> <strong>Mesa: </strong>{item.table}</p>
         <Button onClick={()=>{deleteOrders(item.id)}}>Delete</Button>
         </Cards>
         )
       })}
       </CardContainer>
      </Orders>
      </Container>
  );
};
