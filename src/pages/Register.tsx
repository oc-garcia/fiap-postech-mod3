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
import { IUser } from "../interfaces/IUser";
import { userService } from "../services/UserService";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import axios from "axios";
import { useState } from "react";

const registerSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    name: z.string().min(1, "Name is required"),
    cpf: z
      .string()
      .length(11, "CPF must be exactly 11 characters")
      .regex(/^\d{11}$/, "CPF must contain only numbers"),
    password: z.string().min(6, "Password must contain at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must contain at least 6 characters"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export default function Register() {
  const toast = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
              validationSchema={toFormikValidationSchema(registerSchema)}
              onSubmit={async (values: IUser) => {
                setIsSubmitting(true);

                try {
                  const registerResponse = await userService.register(values);
                  if (registerResponse.status == 201) {
                    toast({
                      title: `Registered successfully`,
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                    });
                    navigate("/login");
                  }
                } catch (error) {
                  if (axios.isAxiosError(error)) {
                    toast({
                      title: `Error registering`,
                      description: `${error.response?.data?.message || error.message}`,
                      status: "error",
                      duration: 3000,
                      isClosable: true,
                    });
                  } else {
                    toast({
                      title: `Error registering`,
                      description: `An unexpected error occurred`,
                      status: "error",
                      duration: 3000,
                      isClosable: true,
                    });
                  }
                } finally {
                  setIsSubmitting(false);
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
                    <FormControl isInvalid={!!errors.name && touched.name}>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Field as={Input} id="name" name="name" type="text" variant="filled" />
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.cpf && touched.cpf}>
                      <FormLabel htmlFor="cpf">CPF</FormLabel>
                      <Field as={Input} id="cpf" name="cpf" type="text" variant="filled" />
                      <FormErrorMessage>{errors.cpf}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.password && touched.password}>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Field as={Input} id="password" name="password" type="password" variant="filled" />
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.confirmPassword && touched.confirmPassword}>
                      <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                      <Field as={Input} id="confirmPassword" name="confirmPassword" type="password" variant="filled" />
                      <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                    </FormControl>
                    <Button
                      isLoading={isSubmitting}
                      type="submit"
                      fontSize={"sm"}
                      fontWeight={600}
                      color={"white"}
                      bg={"pink.400"}
                      width="full"
                      _hover={{
                        bg: "pink.300",
                      }}>
                      Register
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
