import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { PostsService } from "../services/PostsService";
import { IPost } from "../interfaces/IPost";
import axios, { AxiosResponse } from "axios";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Skeleton,
  Stack,
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Home() {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const tabListColor = useColorModeValue("gray.600", "gray.200");

  if (!context) {
    throw new Error("MyComponent must be used within an AppProvider");
  }

  const { setToken } = context;

  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

    if (token) {
      setToken(token);
      getAllPosts();
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
    <Flex flexDirection={"column"}>
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
            All Posts
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
            Search Posts
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel padding={0}>
            <Flex flexDirection={"column"} gap={3}>
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <Heading size="md">{post.title}</Heading>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <Box>
                      <Text pt="2" fontSize="sm">
                        {post.content}
                      </Text>
                    </Box>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <Stack direction="row" divider={<StackDivider borderColor="gray.200" />} spacing={4}>
                      <Text>Author: {post.author}</Text>
                      {post.creation_date && (
                        <Text>Created: {new Date(post.creation_date).toLocaleString("pt-BR")}</Text>
                      )}
                      {post.update_date && <Text>Updated: {new Date(post.update_date).toLocaleString("pt-BR")}</Text>}
                    </Stack>
                  </CardFooter>
                </Card>
              ))}
            </Flex>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
