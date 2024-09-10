import {
  Card,
  Flex,
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
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { IPost } from "../interfaces/IPost";
import axios, { AxiosResponse } from "axios";
import { PostsService } from "../services/PostsService";
import { IUser } from "../interfaces/IUser";
import { userService } from "../services/UserService";

export default function Admin() {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("MyComponent must be used within an AppProvider");
  }

  const { setToken } = context;

  const [posts, setPosts] = useState<IPost[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const tabListColor = useColorModeValue("gray.600", "gray.200");

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const getAllPosts = async () => {
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

    const getAllUsers = async () => {
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

    if (token) {
      setToken(token);
      getAllPosts();
      getAllUsers();
    } else {
      setLoading(false);
      navigate("/login");
    }
  }, [setToken, navigate]);

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
            </Card>{" "}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
