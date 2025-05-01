import { BottomButton } from "@/components/ui/bottom-button";
import { useDataProvider } from "@/components/ui/data-provider";
import { calculateOrderSubTotal, calculateOrderTax, calculateOrderTotal } from "@/utils/calculations";
import { Box, Flex, Heading,Text,  IconButton, VStack, Separator } from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router";
export const Cart = ()=> {
    const navigate = useNavigate();
     const { lines , removeCartItem } = useDataProvider();
    return (
<VStack px={4} py={6} gap={6} bg="white" borderRadius="md" boxShadow="lg" w="full" maxW="container.sm" mx="auto" minH="calc(100dvh - 80px)">
  <Box width="100%">
    <Heading size="lg" color="gray.700" mb={4}>My Cart</Heading>
    {(lines?.length ?? 0) > 0 ? (
    <>
      {(lines ?? []).map((line, index) => (
      <Box
        key={line.id}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "16px",
        //   borderBottomWidth: "1px",
        //   borderColor: "gray.200",
          borderRadius: "8px",
          transform: "scale(1)",
        }}
        _hover={{ scale: 1.02, backgroundColor: "gray.50", boxShadow: "md" }}
        transition="all 0.4s ease-in-out"
      >
        <Heading flex={1} fontSize="md" maxW="50px" color="gray.700" mb={1}>{line.quantity}x</Heading>
        <Box flex={5} pl={2} >
          <Heading fontSize="md" color="gray.800" mb={1}>{line.label}</Heading>
          {[...(line.value ?? []) 
          .filter((choice, index, self) => 
              index === self.findIndex((c) => c.value === choice.value)
          )].map((choice) => (
          <Text key={choice.value} color="gray.500" fontSize="sm">
              {choice.value}
          </Text>
          ))}
        </Box>
        <Flex flex={2} alignItems="center" justifyContent="flex-end" gap={2}>
          <Box textAlign="right">
            <Heading fontSize="md" color="gray.700" textAlign="right" mb={1}>रु{line.price.toFixed(2)}</Heading>
            {[...(line.value ?? [])
              .filter((choice, index, self) => index === self.findIndex((c) => c.price === choice.price))
            ].map((choice) => (
              <Text key={choice.price} color="gray.500" textAlign="right" fontSize="sm">
                +रु{choice.price.toFixed(2)}
              </Text>
            ))}
          </Box>
          <IconButton
            aria-label="Remove from Cart"
            onClick={() => {
              removeCartItem?.(index);
            }}
            variant="ghost"
            colorScheme="red"
            size="xs"
            _hover={{ bg: "red.100" }}
            transition="background-color 0.2s ease"
          >
            <MdClose />
          </IconButton>
        </Flex>
      </Box>
    ))}
    <Separator my={4} />
    <VStack w="100%" bg="gray.50" p={4} borderRadius="md" boxShadow="sm" borderTop="1px solid" borderColor="gray.200">
      <Flex justifyContent="space-between" w="100%" p={2} color="gray.600" >
            <Text fontWeight="semibold" fontSize="lg" color="gray.700">Sub-Total</Text>
            <Text fontWeight="semibold" fontSize="lg" color="gray.700">रु{calculateOrderSubTotal(lines ?? []).toFixed(2)}</Text>
        </Flex>
      <Flex w="100%" p={2}  justifyContent="space-between" color="gray.600" >
      <Text fontWeight="semibold" fontSize="lg" color="gray.700">Taxes (13%)</Text>
      <Text fontWeight="semibold" fontSize="lg" color="gray.700">रु{calculateOrderTax(lines ?? [],13).toFixed(2)}</Text>
      </Flex>
      <Flex w="100%" p={2}  justifyContent="space-between" >
      <Text fontWeight={"bold"} fontSize={18}>Total</Text>
      <Text fontWeight={"bold"} fontSize={18}>रु{calculateOrderTotal(lines ?? [],13).toFixed(2)}</Text>
      </Flex>
    </VStack>
    </>
    ) : (
      <Text color="gray.500" fontSize="lg" textAlign="center" mt={6}>Your cart is empty.</Text>
    )}
  </Box>
  {(lines?.length ?? 0) > 0 && (
//   <Box w="full" transition="all 0.3s ease" boxShadow="md" borderRadius="lg" bg="white">
   <BottomButton
            label="Add to Checkout"
            onClick={()=>navigate("/checkout")}
            total={calculateOrderTotal(lines ?? [],13).toFixed(2)}
          />
//   </Box>
  )}
</VStack>
    )
    }
