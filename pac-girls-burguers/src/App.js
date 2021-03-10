import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Saloon from "./pages/Saloon";
import Kitchen from "./pages/Kitchen";
import { Container, PageBody } from "./AppStyled";
import OrderKitchen from "./pages/OrderKitchen";
import Profile from "./pages/Profile";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import ProtectedRoute from "./components/ProtectedRouter/ProtectedRouter";

export default () => {
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
            <ProtectedRoute path="/saloon">
              <Saloon />
            </ProtectedRoute>
            <ProtectedRoute path="/orders">
              <OrderKitchen />
            </ProtectedRoute>
            <ProtectedRoute path="/profile">
              <Profile />
            </ProtectedRoute>
          </Switch>
        </PageBody>
      </Container>
    </BrowserRouter>
  );
};
