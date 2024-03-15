import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Stack, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://backengine-e05v.fly.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      toast({
        title: "Login Successful",
        description: `Welcome, ${email}!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // You can store the accessToken here and use it for authenticated requests
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://backengine-e05v.fly.dev/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Signup failed");
      }
      toast({
        title: "Signup Successful",
        description: "You can now log in with your credentials.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Heading>Welcome to Interactive API Site</Heading>
        <Stack spacing={4} as="form" onSubmit={handleLogin}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button leftIcon={<FaSignInAlt />} type="submit" colorScheme="blue">
            Login
          </Button>
        </Stack>
        <Box pt={6}>
          <Button leftIcon={<FaUserPlus />} colorScheme="green" onClick={handleSignup}>
            Signup
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
