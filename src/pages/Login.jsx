import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SUPABASE_URL = "https://vdnhjxmsuykhvhnvjupi.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkbmhqeG1zdXlraHZobnZqdXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjIyNjUsImV4cCI6MjAyNTM5ODI2NX0.byaihexABIEbRtnd1-n8R33kkt4lIwcB1xsX6P6PUA8";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { access_token } = await response.json();
        onLogin(access_token);
        navigate("/");
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <Box maxWidth="400px" margin="auto" mt={8}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
