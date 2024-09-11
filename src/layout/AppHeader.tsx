"use client";

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLightTheme, setIsLightTheme] = useState(colorMode === "light");

  const context = useContext(AppContext);

  if (!context) {
    throw new Error("MyComponent must be used within an AppProvider");
  }

  const { token, setToken } = context;

  const navigate = useNavigate();

  useEffect(() => {
    const savedColorMode = localStorage.getItem("chakra-ui-color-mode");
    if (savedColorMode) {
      if (savedColorMode !== colorMode) {
        toggleColorMode();
      }
      setIsLightTheme(savedColorMode === "light");
    }
  }, [colorMode, toggleColorMode]);

  const handleThemeToggle = () => {
    toggleColorMode();
    const newColorMode = colorMode === "light" ? "dark" : "light";
    localStorage.setItem("chakra-ui-color-mode", newColorMode);
    setIsLightTheme(newColorMode === "light");
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}>
        <Flex flex={{ base: 1, md: "auto" }} ml={{ base: -2 }} display={{ base: "flex", md: "none" }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            display={"flex"}
            gap={1}
            fontSize={"xl"}
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}>
            <Text
              as={"span"}
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              fontWeight={700}
              color={"pink.400"}>
              FIAP
            </Text>
            Blogging
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack flex={{ base: 1, md: 0 }} justify={"flex-end"} alignItems={"center"} direction={"row"} spacing={6}>
          <IconButton
            aria-label="Toggle theme"
            icon={isLightTheme ? <SunIcon /> : <MoonIcon />}
            onClick={handleThemeToggle}
          />
          {!token && (
            <>
              <Link to={"/login"}>
                <Button display={{ base: "none", md: "inline-flex" }} fontSize={"sm"} fontWeight={400} variant={"link"}>
                  Log In
                </Button>
              </Link>
              <Link to={"/register"}>
                <Button
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  bg={"pink.400"}
                  _hover={{
                    bg: "pink.300",
                  }}>
                  Sign Up
                </Button>
              </Link>
            </>
          )}
          {token && (
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              _hover={{
                bg: "pink.300",
              }}
              onClick={handleLogout}>
              Log Out
            </Button>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");

  const context = useContext(AppContext);

  if (!context) {
    throw new Error("MyComponent must be used within an AppProvider");
  }

  const { token } = context;

  const navigate = useNavigate();
  const toast = useToast();

  const handleNavigate = (href: string | undefined) => {
    if (!token) {
      toast({
        title: `You need to be logged in to access this page`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      navigate(href ?? "#");
    }
  };

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.filter((navItem) => navItem.label !== "Admin" || token).map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                cursor={"pointer"}
                onClick={() => handleNavigate(navItem.href)}
                p={2}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </Box>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("MyComponent must be used within an AppProvider");
  }

  const { token, setToken } = context;

  const navigate = useNavigate();

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const bgColor = useColorModeValue("white", "gray.800");
  const buttonColor = useColorModeValue("gray.600", "gray.200");

  return (
    <Stack bg={bgColor} p={4} display={{ md: "none" }}>
      {NAV_ITEMS.filter((navItem) => navItem.label !== "Admin" || token).map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      {token && (
        <Button
          variant={"link"}
          display={{ base: "inline", md: "none" }}
          fontWeight={600}
          color={buttonColor}
          py={2}
          onClick={handleLogout}>
          Log Out
        </Button>
      )}
    </Stack>
  );
};

const MobileNavItem = ({ label, href }: NavItem) => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("MyComponent must be used within an AppProvider");
  }
  const toast = useToast();

  const { token } = context;
  const navigate = useNavigate();

  const handleNavigate = (href: string | undefined) => {
    if (!token) {
      toast({
        title: `You need to be logged in to access this page`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      navigate(href ?? "#");
    }
  };

  return (
    <Stack spacing={4}>
      <Box
        as="span"
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}>
        <Text
          cursor={"pointer"}
          onClick={() => handleNavigate(href)}
          py={2}
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}>
          {label}
        </Text>
      </Box>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Posts",
    href: "/",
  },
  {
    label: "Admin",
    href: "/admin",
  },
];
