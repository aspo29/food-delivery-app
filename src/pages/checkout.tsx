import { BottomButton } from "@/components/ui/bottom-button";
import { useDataProvider } from "@/components/ui/data-provider";
import { useUser } from "@/components/ui/useUser";
import { IOrder } from "@/models";
import { calculateOrderTotal } from "@/utils/calculations";
import { Accordion, Box, Field, Fieldset, Icon, Input, RadioCard, Span, Textarea, VStack, Wrap } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { PAYMENT_METHODS ,PaymentIcons} from "@/utils/constants";

export const Checkout = () => {
    const navigate = useNavigate();
    const { lines ,restaurantInfo, placeOrder } = useDataProvider();
    const { user } = useUser();
    const { register, handleSubmit ,formState } = useForm<IOrder>();
    const onSubmit = async (data: IOrder) => {
      if (user?.uid && placeOrder) {
        const orderWithLines = { ...data, lines: lines ?? [] };
        try {
          await placeOrder(orderWithLines, user.uid);
          navigate('/thankyou');
          // console.log("Order placed successfully.");
          // You can redirect or show confirmation here
        } catch (err) {
          console.error("Failed to place order:", err);
        }
      } else {
        console.warn("User not authenticated or placeOrder not available.");
      }
    };
    if(!restaurantInfo) return null;

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <VStack px={6} py={8} gap={8} bg="white" borderRadius="lg" boxShadow="2xl" w="full" maxW="container.md" mx="auto" minH="80px">
            <Accordion.Root defaultValue={["item-1"]} multiple variant="subtle" bg="gray.50" p={4} borderRadius="lg">
            <Accordion.Item value="item-1" key="item-1" border="1px solid" borderColor="gray.200" borderRadius="md" mb={4} bg="gray.100">
                <Accordion.ItemTrigger px={6} py={5} fontWeight="bold" _hover={{ bg: "gray.200" }} cursor="pointer"> 
                    <Span flex="1" textAlign="left" fontWeight="semibold">CONTACT</Span>
                <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent p={6}>
                 <Accordion.ItemBody p={6}>
                    <VStack mt={3}>
                            <Fieldset.Root size="lg" maxW="7xl">
                            <Fieldset.Content>
                                <Field.Root required invalid={!!formState?.errors?.firstName?.type}>
                                <Field.Label>First Name <Field.RequiredIndicator /> </Field.Label>
                                <Input placeholder="First Name" {...register("firstName",{required : true})} />
                                <Field.ErrorText>Required</Field.ErrorText>
                                </Field.Root>

                                <Field.Root required invalid={!!formState?.errors?.lastName?.type}>
                                <Field.Label>Last Name <Field.RequiredIndicator /> </Field.Label>
                                <Input placeholder="Last Name" {...register("lastName",{required : true})} />
                                <Field.ErrorText>Required</Field.ErrorText>
                                </Field.Root>

                                <Field.Root required invalid={!!formState?.errors?.email?.type}>
                                <Field.Label>Email <Field.RequiredIndicator /> </Field.Label>
                                <Input placeholder="Email" {...register("email",{required : true})} />
                                <Field.ErrorText>Required</Field.ErrorText>
                                </Field.Root>

                                <Field.Root required invalid={!!formState?.errors?.phone?.type}>
                                <Field.Label>Phone <Field.RequiredIndicator /> </Field.Label>
                                <Input placeholder="Phone" {...register("phone",{required : true})} />
                                <Field.ErrorText>Required</Field.ErrorText>
                                </Field.Root>
                            </Fieldset.Content>
                            </Fieldset.Root>
                        </VStack>
                 </Accordion.ItemBody>
                </Accordion.ItemContent>
            </Accordion.Item>
            
             <Accordion.Item value="item-2" border="1px solid" borderColor="gray.200" borderRadius="md" mb={4} bg="gray.100">
  <Accordion.ItemTrigger px={6} py={5} fontWeight="bold" _hover={{ bg: "gray.200" }} cursor="pointer">
    <Span flex="1" textAlign="left" fontWeight="semibold">PAYMENT METHOD</Span>
    <Accordion.ItemIndicator />
  </Accordion.ItemTrigger>
  <Accordion.ItemContent p={6}>
    <Accordion.ItemBody p={6}>
      <Box mt={3} w="full" display="flex" justifyContent="center">
        <Box w="full" maxW="7xl">

        <RadioCard.Root
          orientation="horizontal"
          align="start"
          defaultValue="cash"
          maxW="7xl"
          bg="white" border="1px solid" borderColor="gray.200" borderRadius="md" p={4}
        >
          <RadioCard.Label mb={2}>Payment method</RadioCard.Label>
          <Wrap gap={4}>
           {restaurantInfo.paymentMethods.map((method) => {
            const IconComponent = PaymentIcons[method];
            return (
                <RadioCard.Item
                key={method}
                value={method}
                // invalid={!!formState?.errors?.paymentMethod?.type}
                >
                <RadioCard.ItemHiddenInput {...register("paymentMethod", { required: true })} />
                <RadioCard.ItemControl>
                    {IconComponent && (
                    <Icon as={IconComponent} fontSize="2xl" color="fg.muted" />
                    )}
                    <RadioCard.ItemText fontWeight="medium" textAlign="center">
                    {PAYMENT_METHODS.find((m) => m.id === method)?.name}
                    </RadioCard.ItemText>
                    <RadioCard.ItemIndicator />
                </RadioCard.ItemControl>
                </RadioCard.Item>
            );
            })}
          </Wrap>
        </RadioCard.Root>
        </Box>
      </Box>
    </Accordion.ItemBody>
  </Accordion.ItemContent>
</Accordion.Item>

             <Accordion.Item value="item-3" border="1px solid" borderColor="gray.200" borderRadius="md" mb={4} bg="gray.100">
                <Accordion.ItemTrigger px={6} py={5} fontWeight="bold" _hover={{ bg: "gray.200" }} cursor="pointer"> 
                    <Span flex="1" textAlign="left" fontWeight="semibold">COMMENTS</Span>
                    <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent p={6}>
                    <Accordion.ItemBody p={6}>
                        <VStack mt={3}>
                            <Fieldset.Root size="lg" maxW="7xl">
                            <Fieldset.Content>
                                <Field.Root>
                                <Field.Label>Comments</Field.Label>
                                <Textarea placeholder="Comments" {...register("comments")} />
                                </Field.Root>
                            </Fieldset.Content>
                            </Fieldset.Root>
                        </VStack>
                    </Accordion.ItemBody>
                </Accordion.ItemContent>
            </Accordion.Item>
            </Accordion.Root>
               <BottomButton
                        label="Pick up order"
                        onClick={ ()=>navigate("/checkout")}
                        total={calculateOrderTotal(lines ?? [],13).toFixed(2)}
                      />
               </VStack>
        </form>
    );
};
