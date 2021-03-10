import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../api";
import Header from "../../components/Header";
import {Container,Orders,Cards,CardContainer} from "./styled";

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
      <Header></Header>
      <Orders>
      <section>
       < h2>Pedidos Prontos</h2>
       <CardContainer >
       {products && products.filter(({status})=>status ==="deliver").map((item,index)=>{
         return(
         <Cards key={index}>
         <p> Cliente:{item.client_name}</p>
         <p> Mesa: {item.table}</p>
         <button onClick={()=>{status(item.id)}}>Entregue</button>
         </Cards>
         )
       })}
      </CardContainer>
      </section>
      <section>
      <h2>Pedidos Entregues</h2>
      <CardContainer>
     {products && products.filter(({status})=>status ==="delivered").map((item,index)=>{
         return(
         <Cards key={index}>
         <p> Cliente:{item.client_name}</p>
         <p> Mesa: {item.table}</p>
         <button onClick={()=>{deleteOrders(item.id)}}>Delete</button>
         </Cards>
         )
       })}
       </CardContainer>
      </section>
      </Orders>
      </Container>
  );
};
