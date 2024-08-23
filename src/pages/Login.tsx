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
  VStack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { Link } from "react-router-dom";
import { IUserCredentials } from "../interfaces/IUser";
import { userService } from "../services/UserService";

export default function Login() {
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
              onSubmit={async (values: IUserCredentials) => {
                const loginResponse = await userService.login(values);
                console.log(loginResponse);
              }}>
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <FormControl>
                      <FormLabel htmlFor="username">Username</FormLabel>
                      <Field as={Input} id="username" name="username" type="text" variant="filled" />
                    </FormControl>
                    <FormControl isInvalid={!!errors.password && touched.password}>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type="password"
                        variant="filled"
                        validate={(value: string) => {
                          let error;
                          if (value.length < 6) {
                            error = "Password must contain at least 6 characters";
                          }
                          return error;
                        }}
                      />
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
