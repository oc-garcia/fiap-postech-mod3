import {
  Button,
  ButtonGroup,
  Card,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Tab,
  Table,
  TableCaption,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { IPost } from "../interfaces/IPost";
import axios, { AxiosResponse } from "axios";
import { PostsService } from "../services/PostsService";
import { IUser } from "../interfaces/IUser";
import { userService } from "../services/UserService";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Formik, Field, Form } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

export default function Admin() {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("MyComponent must be used within an AppProvider");
  }

  const { token, setToken } = context;

  const [posts, setPosts] = useState<IPost[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const tabListColor = useColorModeValue("gray.600", "gray.200");
  const drawerDisclosure = useDisclosure();
  const modalDisclosure = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      setToken(token);
      fetchAllPosts();
      fetchAllUsers();
    } else {
      setLoading(false);
      navigate("/login");
    }
  }, [setToken, navigate]);

  const fetchAllPosts = async () => {
    try {
      const response: AxiosResponse<IPost[]> = await PostsService.getAll();
      setPosts(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Failed to fetch posts", error.response?.data || error.message);
      } else {
        console.error("Failed to fetch posts", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response: AxiosResponse<IUser[]> = await userService.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Failed to fetch users", error.response?.data || error.message);
      } else {
        console.error("Failed to fetch users", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (post: IPost) => {
    setSelectedPost(post);
    drawerDisclosure.onOpen();
  };

  const handleDeleteClick = (postId: number) => {
    modalDisclosure.onOpen();
    console.log("Delete post with ID:", postId);
  };

  const handleFormSubmit = async (values: IPost) => {
    if (selectedPost && selectedPost.id !== undefined) {
      try {
        await PostsService.put(selectedPost.id, { ...values, author: selectedPost.author }, token ? token : "");
        fetchAllPosts();
        drawerDisclosure.onClose();
        toast({
          title: `Post updated successfully`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Failed to update post", error);
        toast({
          title: `Failed to update post`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      console.error("Selected post is invalid");
    }
  };

  if (loading) {
    return (
      <Flex minHeight={"50vh"} flexDirection={"column"} gap={"1rem"}>
        <Skeleton flex={"1"} />
        <Skeleton flex={"1"} />
        <Skeleton flex={"1"} />
      </Flex>
    );
  }

  return (
    <Flex flexDirection={"column"} gap={"1rem"}>
      <Tabs isFitted variant="unstyled">
        <TabList mb="1em" color={tabListColor}>
          <Tab
            borderBottom="1px solid"
            borderColor="pink.400"
            fontWeight="bold"
            _selected={{
              color: "pink.400",
              borderColor: "pink.400",
              borderTop: "1px solid",
              borderLeft: "1px solid",
              borderRight: "1px solid",
              borderBottom: "1px solid transparent",
              background: "rgba(255, 192, 203,  0.05)",
            }}>
            Post Manager
          </Tab>
          <Tab
            borderBottom="1px solid"
            borderColor="pink.400"
            fontWeight="bold"
            _selected={{
              color: "pink.400",
              borderTop: "1px solid",
              borderLeft: "1px solid",
              borderRight: "1px solid",
              borderBottom: "1px solid transparent",
              background: "rgba(255, 192, 203, 0.05)",
            }}>
            User Manager
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel padding={0}>
            <Card>
              <TableContainer>
                <Table variant="simple" colorScheme="blackAlpha">
                  <TableCaption>TOTAL: {posts.length}</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Title</Th>
                      <Th>Content</Th>
                      <Th>Creation Date</Th>
                      <Th>Update Date</Th>
                      <Th>Author</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {posts.map((post: IPost) => (
                      <Tr key={post.id}>
                        <Td>{post.id}</Td>
                        <Td>{post.title}</Td>
                        <Td>{post.content}</Td>
                        <Td>{post.creation_date ? new Date(post.creation_date).toLocaleString() : "N/A"}</Td>
                        <Td>{post.update_date ? new Date(post.update_date).toLocaleString() : "N/A"}</Td>
                        <Td>{post.author}</Td>
                        <Td>
                          <ButtonGroup size="sm" isAttached variant="outline">
                            <IconButton
                              onClick={() => handleEditClick(post)}
                              aria-label="Edit post"
                              icon={<EditIcon />}
                            />
                            <IconButton
                              aria-label="Delete post"
                              icon={<DeleteIcon />}
                              onClick={() => {
                                if (post.id !== undefined) {
                                  handleDeleteClick(post.id);
                                }
                              }}
                            />
                          </ButtonGroup>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Card>
          </TabPanel>
          <TabPanel padding={0}>
            <Card>
              <TableContainer>
                <Table variant="simple" colorScheme="blackAlpha">
                  <TableCaption>TOTAL: {users.length}</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Username</Th>
                      <Th>Name</Th>
                      <Th>Email</Th>
                      <Th>CPF</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {users.map((user) => (
                      <Tr key={user.id}>
                        <Td>{user.id}</Td>
                        <Td>{user.username}</Td>
                        <Td>{user.name}</Td>
                        <Td>{user.email ? user.email : "N/A"}</Td>
                        <Td>{user.cpf}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Drawer isOpen={drawerDisclosure.isOpen} placement="right" size="full" onClose={drawerDisclosure.onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit Post</DrawerHeader>

          <DrawerBody>
            {selectedPost && (
              <Formik
                initialValues={{
                  title: selectedPost.title,
                  content: selectedPost.content,
                }}
                validationSchema={toFormikValidationSchema(postSchema)}
                onSubmit={handleFormSubmit}>
                {({ errors, touched }) => (
                  <Form id="edit-post-form">
                    <FormControl isInvalid={!!errors.title && touched.title}>
                      <FormLabel htmlFor="title">Title</FormLabel>
                      <Field as={Input} id="title" name="title" />
                      <FormErrorMessage>{errors.title}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.content && touched.content}>
                      <FormLabel htmlFor="content">Content</FormLabel>
                      <Field as={Textarea} resize={"vertical"} size={"lg"} id="content" name="content" />
                      <FormErrorMessage>{errors.content}</FormErrorMessage>
                    </FormControl>
                  </Form>
                )}
              </Formik>
            )}
          </DrawerBody>

          <DrawerFooter width={"100%"}>
            <Center width={"100%"}>
              <Button variant="outline" mr={3} onClick={drawerDisclosure.onClose}>
                Cancel
              </Button>
              <Button
                color={"white"}
                bg={"pink.400"}
                _hover={{
                  bg: "pink.300",
                }}
                type="submit"
                form="edit-post-form">
                Save
              </Button>
            </Center>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Modal isOpen={modalDisclosure.isOpen} onClose={modalDisclosure.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this post?</ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={modalDisclosure.onClose}>
              Close
            </Button>
            <Button
              color={"white"}
              bg={"pink.400"}
              _hover={{
                bg: "pink.300",
              }}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
