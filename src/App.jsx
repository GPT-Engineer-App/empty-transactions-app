import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { Button } from "@chakra-ui/react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (token) => {
    localStorage.setItem("access_token", token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {isAuthenticated && (
        <Button onClick={handleLogout} position="absolute" top={4} right={4}>
          Logout
        </Button>
      )}
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Index />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
