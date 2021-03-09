import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const history = useHistory();

  return (
    <div>
      <h1>Order</h1>
      <section>
       < h2>Pedidos Prontos</h2>
      </section>
      <section>
      <h2>Pedidos Entregues</h2>
      </section>
    </div>
  );
};
