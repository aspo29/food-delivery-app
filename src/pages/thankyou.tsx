import { Heading, Icon,Text, VStack } from "@chakra-ui/react";
import { FaCheckCircle,FaTimesCircle,FaHourglassHalf } from 'react-icons/fa'; 
import { useDataProvider } from "../components/ui/data-provider";

const ThankyouContent = () => {
    const { order } = useDataProvider();
    if (!order) return null;
    if (order.status === "PENDING") return (
        <>
        <Icon as={FaHourglassHalf} w={24} h={24} color="gray. 700" /> 
        <Heading size="lg" textAlign="center">Waiting for a confirmation</Heading>
        <Text textAlign="center">
        Your order has been placed. Please wait for a confirmation from restaurant.
        </Text>
        </>
    );
    if (order.status === "CANCELLED") return (
     <>
        <Icon as={FaTimesCircle} w={24} h={24} color="gray. 700" /> 
        <Heading size="lg" textAlign="center">Order cancelled</Heading>
        <Text textAlign="center">
        Your order has been cancelled. Please Contact the restaurant for more information.
        </Text>
        </>
    );

    return (
     <>
        <Icon as={FaCheckCircle} w={24} h={24} color="gray. 700" /> 
        <Heading size="lg" textAlign="center">Order Confirmed</Heading>
        <Text textAlign="center">
        See you soon! Your order has been confirmed and will be ready for pickup.
        </Text>
        </>
    );
};

export const ThankYou = ()=> {
    return (
       <VStack gap={2} mt={2} mx={2}>
        <ThankyouContent/>
       </VStack>
    )
    }
