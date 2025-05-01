import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import { Accordion, Text, Image } from "@chakra-ui/react";
import { useDataProvider } from "@/components/ui/data-provider";
import { Link, useNavigate } from "react-router";

export const Menu = () => {
  const navigate = useNavigate();

  const { categories, getItemByCategory } = useDataProvider();

  return (
    <Box bg="gray.50" minH="100vh" py={8} px={{ base: 4, md: 8 }}>
      <Heading as="h1" size="lg" mb={6} textAlign="center" color="gray.800">
        Menu
      </Heading>
      <Accordion.Root
        multiple
        defaultValue={categories?.map((_, index) => index.toString())}
      >
        {(categories ?? []).map((category, index) => (
          <Accordion.Item key={index} value={category.id}>
            <Accordion.ItemTrigger
              bg="white"
              boxShadow="sm"
              px={{ base: 4, md: 6 }}
              py={{ base: 3, md: 5 }}
              borderRadius="lg"
              _hover={{ bg: "gray.100", boxShadow: "md" }}
              transition="background-color 0.3s, box-shadow 0.3s"
            >
              <Flex align="center" justify="space-between" w="100%">
                <Stack gap={1}>
                  <Text fontSize="lg" fontWeight="semibold" color="gray.800">
                    {category.title}
                  </Text>
                  {category.description && (
                    <Text fontSize="sm" color="gray.500" mt={1}>
                      {category.description}
                    </Text>
                  )}
                </Stack>
                <Accordion.ItemIndicator />
              </Flex>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>
                <Image
                  src={category.image.src}
                  alt={category.title}
                  w="100%"
                  maxH={{ base: 180, md: 280 }}
                  objectFit="cover"
                  borderRadius="lg"
                  mb={4}
                  transition="transform 0.3s"
                  _hover={{ transform: "scale(1.02)" }}
                />
                {getItemByCategory(category.id).map((item) => (
                  <Box
                    as={Link}
                    _hover={{ textDecoration: "none" }}
                    key={item.id}
                    onClick={() => navigate(`/item/${item.id}`)}
                  >
                    <Flex
                      align="center"
                      justify="space-between"
                      _hover={{ bg: "gray.100" }}
                      px={{ base: 4, md: 6 }}
                      py={{ base: 3, md: 4 }}
                      borderBottom="1px solid"
                      borderColor="gray.200"
                      transition="background-color 0.3s"
                    >
                      <Flex align="center" gap={3}>
                        <Image
                          src={item.image.src}
                          alt={item.label}
                          objectFit="cover"
                          boxSize={{ base: "56px", md: "64px" }}
                          borderRadius="md"
                          transition="transform 0.3s"
                          _hover={{ transform: "scale(1.05)" }}
                        />
                        <Stack gap={1}>
                          <Text fontSize="md" fontWeight="semibold" color="gray.700">
                            {item.label}
                          </Text>
                          {item.description && (
                            <Text fontSize="sm" color="gray.500">
                              {item.description}
                            </Text>
                          )}
                        </Stack>
                      </Flex>
                      <Text fontSize="sm" fontWeight="bold" color="green.600">
                        रु {item.price.toFixed(2)}
                      </Text>
                    </Flex>
                  </Box>
                ))}
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Box>
  );
};
