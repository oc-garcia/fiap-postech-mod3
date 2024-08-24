import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { IUserCredentials } from "../interfaces/IUser";
import { userService } from "../services/UserService";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import axios from "axios";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must contain at least 6 characters"),
});

export default function Login() {
  const toast = useToast();
  const navigate = useNavigate();

  return (
    <Center flex={"1"}>
      <Card>
        <CardHeader>
          <Heading size="md">Log In to Continue</Heading>
        </CardHeader>

        <CardBody>
          <Stack spacing="4">
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              validationSchema={toFormikValidationSchema(loginSchema)}
              onSubmit={async (values: IUserCredentials) => {
                try {
                  const loginResponse = await userService.login(values);
                  if (loginResponse.status == 200) {
                    if ("data" in loginResponse) {
                      const token = loginResponse.data.token;
                      localStorage.setItem("authToken", token);
                      toast({
                        title: `Logged in`,
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                      });
                    }
                  }
                  navigate("/");
                } catch (error) {
                  if (axios.isAxiosError(error)) {
                    toast({
                      title: `Error logging in`,
                      description: `${error.response?.data?.message || error.message}`,
                      status: "error",
                      duration: 3000,
                      isClosable: true,
                    });
                  } else {
                    toast({
                      title: `Error logging in`,
                      description: `An unexpected error occurred`,
                      status: "error",
                      duration: 3000,
                      isClosable: true,
                    });
                  }
                }
              }}>
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <FormControl isInvalid={!!errors.username && touched.username}>
                      <FormLabel htmlFor="username">Username</FormLabel>
                      <Field as={Input} id="username" name="username" type="text" variant="filled" />
                      <FormErrorMessage>{errors.username}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.password && touched.password}>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Field as={Input} id="password" name="password" type="password" variant="filled" />
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                    <Button
                      type="submit"
                      fontSize={"sm"}
                      fontWeight={600}
                      color={"white"}
                      bg={"pink.400"}
                      width="full"
                      _hover={{
                        bg: "pink.300",
                      }}>
                      Login
                    </Button>
                    <Link to={"/register"}>
                      <Button fontSize={"sm"} fontWeight={400} variant={"link"}>
                        Not a member? Sign Up
                      </Button>
                    </Link>
                  </VStack>
                </form>
              )}
            </Formik>
          </Stack>
        </CardBody>
      </Card>
    </Center>
  );
}
