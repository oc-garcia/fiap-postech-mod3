import { Flex, Skeleton, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { IPost } from "../interfaces/IPost";
import axios, { AxiosResponse } from "axios";
import { PostsService } from "../services/PostsService";

export default function Admin() {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("MyComponent must be used within an AppProvider");
  }

  const { setToken } = context;

  const [posts, setPosts] = useState<IPost[]>([]);
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
            <p>Post Manager</p>
            <pre>{JSON.stringify(posts, null, 2)}</pre>{" "}
          </TabPanel>
          <TabPanel padding={0}>
            <p>User Manager</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
