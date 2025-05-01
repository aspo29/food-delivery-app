// Info.tsx
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  ListItem,
  List,
//   ListIcon,
} from '@chakra-ui/react';
import {
  BsFillMapFill,
  BsTelephoneFill,
  BsCashCoin,
  BsClock,
  BsArrowRightSquare,
} from 'react-icons/bs';
import moment from 'moment';
import { useDataProvider } from "@/components/ui/data-provider"; 

const Info = () => {
  const { restaurantInfo } = useDataProvider();

  const items = [
    {
      icon: <BsClock />,
      label: 'Opening Hours',
      children: (
        <Flex justify="space-between" w="100%">
          <Text>Everyday</Text>
          <Text>
             {moment(restaurantInfo?.openingTime?.toDate()).format('LT')} -{' '}
             {moment(restaurantInfo?.closingTime?.toDate()).format('LT')}
          </Text>
        </Flex>
      ),
    },
    {
      icon: <BsCashCoin />,
      label: 'Payment Methods',
      children: (
        <List.Root gap="2" variant="plain" align="center">
          {restaurantInfo?.paymentMethods?.map((method: string, index: number) => (
            <ListItem key={index}>
                <List.Indicator asChild color="gray.600">
                    <BsArrowRightSquare/>
                </List.Indicator>
              {method}
            </ListItem>
          ))}
        </List.Root>
      ),
    },
    {
      icon: <BsFillMapFill />,
      label: 'Address',
      children: <Text>{restaurantInfo?.address}</Text>,
    },
    {
      icon: <BsTelephoneFill />,
      label: 'Phone',
      children: <Text>{restaurantInfo?.phone}</Text>,
    },
  ];

   if (!restaurantInfo) {
        return null; // or a loading state
    }

  return (
    <Box p={4}>
      <Image
        src="/restaurant.jpg"
        alt="Restaurant"
        w="100%"
        maxH="280px"
        objectFit="cover"
        mb={4}
      />

      {items.map(({ icon, label, children }, index) => (
        <Flex
          key={index}
          direction="column"
          px={4}
          py={2}
          gap={2}
          borderBottom="1px solid"
          borderColor="gray.100"
          mb={4}
        >
          <Flex align="center" gap={2}>
            {icon}
            <Heading fontSize="16px">{label}</Heading>
          </Flex>
          <Flex direction="column" px={4} py={2}>
            {children}
          </Flex>
        </Flex>
      ))}
    </Box>
  );
};

export default Info;
