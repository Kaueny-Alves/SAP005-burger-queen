import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Saloon from "./pages/Saloon";
import Kitchen from "./pages/Kitchen";
import ReactTooltip from "react-tooltip";
import { Container, Menu, PageBody, Button } from "./AppStyled";
import MenuItem from "./components/MenuItem";
import OrderKitchen from "./pages/OrderKitchen";
import Profile from "./pages/Profile";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import ProtectedRoute from "./components/ProtectedRouter/ProtectedRouter";
import { Home } from "./pages/Home";

export default () => {
  const [user, setUser] = useState(localStorage.getItem(""));

  useEffect(() => {
    const isUser = localStorage.getItem("user");
    setUser(isUser);
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <BrowserRouter>
      <Container>
        <Menu>
          {" "}
          {user === null ? (
            <>
              <MenuItem title="Login" icon="/assets/login.png" link="/login" />
              <MenuItem
                title="Register"
                icon="/assets/register.png"
                link="/register"
              />
            </>
          ) : (
            <Button onClick={handleLogout}>
              <img style={{ width: "100px" }} src="/assets/logout.png" />
            </Button>
          )}
        </Menu>
        <PageBody>
          <Switch>
            <ProtectedRoute exact path="/">
              <Home />
            </ProtectedRoute>
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
        <ReactTooltip id="tip-top" place="top" effect="solid" />
        <ReactTooltip id="tip-right" place="right" effect="solid" />
      </Container>
    </BrowserRouter>
  );
};
