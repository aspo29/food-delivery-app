import { Button, Flex, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface IBottomButtonProps {
    onClick?: () => void;
    total?: string;
    label?: string;
}

export const BottomButton: FunctionComponent<IBottomButtonProps> = ({ total, label,onClick }) => {
    return (
        <Flex
            position="sticky"
            bottom={0} 
            left={0}
            right={0}
            bg="white"
            p={4}
            zIndex={1000}
            justifyContent="center"
            alignItems="center"
            borderTopWidth={1}
            borderRadius={"lg"}
            borderTopColor="gray.200"
            maxW="container.sm"
            width="100%"
            mx="auto"
            mt="auto" 
            boxShadow=" 0px 4px 4px rgba(0, 0, 0, 0.1)"
            backdropFilter="blur(10px)"
            borderTopStyle="solid"
            backdropBlur="10px"
            backdropOpacity={0.8}
            transition="background-color 0.3s, box-shadow 0.3s"
            _hover={{
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
            }}
            _active={{
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
            _focus={{
                boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
            }}
        >
            <Button type="submit" w="100%" borderRadius="lg" colorPalette="blue" onClick={onClick}>
                <Flex gap={4} w="100%">
                    <Text>रु{total}</Text>
                    <Flex
                        justifyContent="center"
                        alignItems="center"
                        mx="auto"
                        borderLeftWidth={1}
                        w="100%"
                        borderLeftColor="gray.200"
                    >
                        <Text>{label}</Text>
                    </Flex>
                </Flex>
            </Button>
        </Flex>
    );
};

// <div style="font-family: system-ui, sans-serif; font-size: 14px; color: #2c3e50;">
    //     <h2 style="color: #1a73e8;">Hi ${data.firstName}, your order has been confirmed!</h2>
    //     <p>Thank you for your purchase. Here are your order details:</p>
        
    //     <h3 style="margin-top: 10px;">Order Summary</h3>
    //     <table style="border-collapse: separate; border-spacing: 10px; font-family: Arial, sans-serif;">
    //       <thead>
    //         <tr>
    //           <th align="left">Item</th>
    //           <th align="right">Quantity</th>
    //           <th align="right">Price</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         ${data.lines.map(line => `
    //           <tr>
    //             <td>${line.label}</td>
    //             <td align="right">${line.quantity}</td>
    //             <td align="right">$${line.price.toFixed(2)}</td>
    //           </tr>
    //         `).join('')}
    //       </tbody>
    //     </table>

    //     <p style="margin-top: 10px;"><strong>Subtotal:</strong> $${draft.subTotal.toFixed(2)}</p>
    //     <p><strong>Total:</strong> $${draft.total.toFixed(2)}</p>

    //     <p style="margin-top: 20px;">We'll notify you when your order is ready for pickup.</p>
    //     <p style="color: #888;">Order ID: ${docRef.id}</p>
    //   </div>