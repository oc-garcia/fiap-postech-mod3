import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { PostsService } from "../services/PostsService";
import { IPost } from "../interfaces/IPost";
import axios, { AxiosResponse } from "axios";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { SearchIcon, ViewIcon } from "@chakra-ui/icons";

export default function Home() {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const tabListColor = useColorModeValue("gray.600", "gray.200");
  const toast = useToast();

  if (!context) {
    throw new Error("MyComponent must be used within an AppProvider");
  }

  const { setToken } = context;

  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [keyword, setKeyword] = useState<string>("");
  const [keywordSearchResults, setKeywordSearchResults] = useState<IPost[]>([]);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const drawerDisclosure = useDisclosure();
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);

  const handleViewClick = (post: IPost) => {
    setSelectedPost(post);
    drawerDisclosure.onOpen();
  };

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
    }

    getAllPosts();
  }, [setToken, navigate]);

  const handleKeywordSearch = async () => {
    setSearchLoading(true);
    try {
      const response = await PostsService.getByKeyword(keyword);
      if ("data" in response) {
        if (response.data.length === 0) {
          toast({
            title: `No posts found with the keyword provided.`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
        setKeywordSearchResults(response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Failed to fetch posts", error.response?.data || error.message);
      } else {
        console.error("Failed to fetch posts", error);
      }
    } finally {
      setSearchLoading(false);
    }
  };

  if (loading) {
    return (
      <Flex flex={1} flexDirection={"column"} gap={"1rem"}>
        <Skeleton flex={"1"} />
        <Skeleton flex={"1"} />
        <Skeleton flex={"1"} />
      </Flex>
    );
  }

  return (
    <Flex flex={1} flexDirection={"column"}>
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
                    <Flex justifyContent={"space-between"} alignItems={"center"}>
                      <Heading size="md">{post.title}</Heading>
                      <IconButton
                        onClick={() => handleViewClick(post)}
                        icon={<ViewIcon />}
                        aria-label="View Post"
                        color={"white"}
                        bg={"pink.400"}
                        _hover={{
                          bg: "pink.300",
                        }}
                      />
                    </Flex>
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
          <TabPanel padding={0}>
            <Flex flexDirection={"column"} gap={3}>
              <Card width="100%" height="100%" padding="1rem">
                <InputGroup>
                  <InputLeftAddon>Keyword</InputLeftAddon>
                  <Input type="text" onChange={(e) => setKeyword(e.target.value)} />
                  <InputRightAddon padding={0}>
                    <Button
                      isLoading={searchLoading}
                      isDisabled={keyword == ""}
                      onClick={handleKeywordSearch}
                      color={"white"}
                      bg={"pink.400"}
                      borderRadius={"0 5px 5px 0"}
                      _hover={{
                        bg: "pink.300",
                      }}
                      rightIcon={<SearchIcon />}>
                      Submit
                    </Button>
                  </InputRightAddon>
                </InputGroup>
              </Card>
              <Flex flexDirection={"column"} gap={3}>
                {keywordSearchResults.map((post) => (
                  <Card key={post.id}>
                    <CardHeader>
                      <Flex justifyContent={"space-between"} alignItems={"center"}>
                        <Heading size="md">{post.title}</Heading>
                        <IconButton
                          onClick={() => handleViewClick(post)}
                          icon={<ViewIcon />}
                          aria-label="View Post"
                          color={"white"}
                          bg={"pink.400"}
                          _hover={{
                            bg: "pink.300",
                          }}
                        />
                      </Flex>{" "}
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
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Drawer isOpen={drawerDisclosure.isOpen} placement="right" size="full" onClose={drawerDisclosure.onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{selectedPost?.title}</DrawerHeader>
          <DrawerBody>
            <Text>{selectedPost?.content}</Text>
          </DrawerBody>
          <DrawerFooter width={"100%"}>
            <Center width={"100%"}>
              <Flex gap={2} alignItems={"center"} justifyContent={"center"}>
                <Text>Author: {selectedPost?.author}</Text>
                {selectedPost?.creation_date && (
                  <>
                    <Divider height="2rem" orientation="vertical" />
                    <Text>Created: {new Date(selectedPost.creation_date).toLocaleString("pt-BR")}</Text>
                  </>
                )}
                {selectedPost?.update_date && (
                  <>
                    <Divider height="2rem" orientation="vertical" />
                    <Text>Updated: {new Date(selectedPost.update_date).toLocaleString("pt-BR")}</Text>
                  </>
                )}
              </Flex>
            </Center>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
