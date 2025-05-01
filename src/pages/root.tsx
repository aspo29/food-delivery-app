import { Box, Container, Heading, IconButton, Flex } from "@chakra-ui/react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { BsArrowLeft ,BsCart2, BsInfoCircle } from "react-icons/bs";
import { useDataProvider } from "@/components/ui/data-provider";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {lines ,restaurantInfo} = useDataProvider();
  const hasCartItems = (lines ?? []).length > 0;

  return (
    <Box
      width="100%"
      position="fixed"
      top={0}
      zIndex={1}
      boxShadow="md"
      backgroundColor="teal.500"
      color="white"
    >
      <Flex justifyContent="space-between" alignItems="center" padding={4}>
        <Flex alignItems="center" gap={4}>
          {location.pathname !== "/" && (
            <IconButton
              aria-label="Back"
              variant="ghost"
              colorScheme="whiteAlpha"
              size="lg"
              onClick={() => navigate("/", { replace: true })}
            >
            <BsArrowLeft />
            </IconButton>
          )}
          <Heading fontSize="lg">{restaurantInfo?.name}</Heading>
        </Flex>

        <Flex alignItems="center" gap={4}>
          <IconButton
            aria-label="Cart"
            variant="ghost"
            key={"cart"}
            color={hasCartItems ? "red" : "whiteAlpha"}
            // backgroundColor={hasCartItems ? "teal.500" : "red.500"}
            _hover={{
              backgroundColor: hasCartItems ? "red.600" : "teal.600",
              color: "white",
            }}
            size="lg"
            onClick={() => {
              if (location.pathname !== "/cart") {
                navigate("/cart");
              } else {
                navigate(-1);
              }
            }}
          >
          <BsCart2 />
            </IconButton>

          <IconButton
            aria-label="Info"
            variant="ghost"
            colorScheme="whiteAlpha"
            size="lg"
            onClick={() => {
              if (location.pathname !== "/info") {
                navigate("/info");
              } else {
                navigate(-1);
              }
            }}
          >
          <BsInfoCircle />
          </IconButton>

        </Flex>
      </Flex>
    </Box>
  );
};

export const Root = () => {
  return (
    <Box>
      <Navbar />
      <Container maxW="container.xl" p={4} mt={20}>
        <Outlet />
      </Container>
    </Box>
  );
};
