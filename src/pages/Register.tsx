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
import { IUser } from "../interfaces/IUser";
import { userService } from "../services/UserService";

export default function Register() {
  return (
    <Center flex={"1"}>
      <Card>
        <CardHeader>
          <Heading size="md">Register to Continue</Heading>
        </CardHeader>

        <CardBody>
          <Stack spacing="4">
            <Formik
              initialValues={{
                username: "",
                name: "",
                cpf: "",
                password: "",
                confirmPassword: "",
              }}
              onSubmit={async (values: IUser) => {
                const registerResponse = await userService.register(values);
                console.log(registerResponse);
              }}>
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <FormControl>
                      <FormLabel htmlFor="username">Username</FormLabel>
                      <Field as={Input} id="username" name="username" type="username" variant="filled" />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Field as={Input} id="name" name="name" type="name" variant="filled" />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="cpf">CPF</FormLabel>
                      <Field as={Input} id="cpf" name="cpf" type="cpf" variant="filled" />
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
                    <FormControl isInvalid={!!errors.confirmPassword && touched.confirmPassword}>
                      <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                      <Field
                        as={Input}
                        id="confirmPassword"
                        name="confirmPassword"
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
                    <Link to={"/login"}>
                      <Button fontSize={"sm"} fontWeight={400} variant={"link"}>
                        Already registered?
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
