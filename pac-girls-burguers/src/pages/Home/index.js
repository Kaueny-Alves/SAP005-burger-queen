import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return <div>
      <button><Link to="/orders">Pedidos Prontos</Link></button>
      <button><Link to="/saloon">Novo Pedido</Link></button>
  </div>;
};
