import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Saloon from "./pages/Saloon";
import Kitchen from "./pages/Kitchen";
import { Container, PageBody } from "./AppStyled";

import Profile from "./pages/Profile";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import ProtectedRoute from "./components/ProtectedRouter/ProtectedRouter";
import { HallSaloon } from "./pages/HallSaloon";
import { OrderPreparing } from "./pages/OrderPreparing";
import { OrderReady } from "./pages/OrderReady";
import OrderDelivered from "./pages/OrderDelivered";
import OrderSaloon from "./pages/OrderSaloon";

export default function App() {
  return (
    <BrowserRouter>
      <Container>
        <PageBody>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <ProtectedRoute exact path="/kitchen">
              <Kitchen />
            </ProtectedRoute>
            <ProtectedRoute exact path="/preparing">
              <OrderPreparing />
            </ProtectedRoute>
            <ProtectedRoute exact path="/ready">
              <OrderReady />
            </ProtectedRoute>
            <ProtectedRoute exact path="/delivered">
              <OrderDelivered />
            </ProtectedRoute>
            <ProtectedRoute path="/saloon">
              <Saloon />
            </ProtectedRoute>
            <ProtectedRoute path="/hall">
              <HallSaloon />
            </ProtectedRoute>
            <ProtectedRoute path="/orders">
              <OrderSaloon />
            </ProtectedRoute>
            <ProtectedRoute path="/profile">
              <Profile />
            </ProtectedRoute>
          </Switch>
        </PageBody>
      </Container>
    </BrowserRouter>
  );
}
