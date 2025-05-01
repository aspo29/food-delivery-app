import { useDataProvider } from "@/components/ui/data-provider";
import { Box, VStack, Image, Field, Input, Textarea, Fieldset, For, Text, Span, Flex } from "@chakra-ui/react";
import { Checkbox, FormControlLabel, Radio, RadioGroup} from '@mui/material';
import { useParams } from "react-router";
import { useFieldArray, useForm } from "react-hook-form";
import { ILine } from "@/models";
import { useEffect } from "react";
import { BottomButton } from "@/components/ui/bottom-button";
import { calculateItemTotal } from "@/utils/calculations";

const Variant = ({ allowMultiple, name, children, onChange, watch, setValue }: any) => {
  return allowMultiple ? (
    <Box onChange={(e) => {
      const values = Array.from(
        (e.currentTarget as HTMLElement).querySelectorAll('input[type=checkbox]:checked')
      ).map((input) => (input as HTMLInputElement).value);
      onChange?.(values);
    }}>
      {children}
    </Box>
  ) : (
   <RadioGroup
      value={watch(name) ?? ""}  // Watch the value of the field with fallback
      onChange={(e) => {
        // Manually update the form state with setValue
        setValue(name, e.target.value);
        onChange?.(e.target.value);  // Update the parent component as well
      }}
    >
      {children}
    </RadioGroup>
  );
};

const Choice = ({ allowMultiple, value, name, control, label, children, onChange }: any) => {
  const { watch, setValue, getValues } = control;
  const selected = watch(name) || (allowMultiple ? [] : "");

  const isChecked = allowMultiple
    ? selected.includes(value)
    : selected === value;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    if (allowMultiple) {
      const current = getValues(name) || [];
      const newValue = checked
        ? [...current, value]
        : current.filter((v: string) => v !== value);
      setValue(name, newValue);
      onChange?.(newValue);
    } else {
      setValue(name, value);
      onChange?.(value);
    }
  };

  return allowMultiple ? (
    <FormControlLabel
      control={
        <Checkbox
          checked={isChecked}
          onChange={handleChange}
          value={value}
          size="medium"
        />
      }
      label={
        <Flex gap={3} align="center" justify="space-between" w="full">
          <Text>{label}</Text>
          {children}
        </Flex>
      }
    />
  ) : (
    <FormControlLabel
      value={value}
      control={<Radio />}
      label={
        <Flex gap={3} align="center" justify="space-between" w="full">
          <Text>{label}</Text>
          {children}
        </Flex>
      }
    />
  );
};

export const Item = () => {
  const { id } = useParams();
  const { getItemById, addToCart } = useDataProvider();
  const item = getItemById(id! as string);

  const defaultValues: any = {
    quantity: 1,
    value: [],
    price: item!.price,
    label: item!.label,
  };

  item?.variants.forEach((variant) => {
    if (variant.isRequired) {
      if (variant.allowMultiple) {
        defaultValues[variant.type] = [`${variant.type}:0`];
      } else {
        defaultValues[variant.type] = `${variant.type}:0`;
      }
    }
  });

  const { register, handleSubmit, formState, watch, setValue, getValues, control } = useForm<ILine>({
    defaultValues,
  });

  const { append, remove, fields } = useFieldArray<ILine, 'value'>({
    control,
    name: "value",
    rules: {
      required: true,
    },
  });

  useEffect(() => {
    if (!item?.variants.length) return;

    item.variants
      .filter((variant) => variant.isRequired)
      .forEach((variant) => {
        if (variant.allowMultiple) {
          defaultValues[variant.type] = [`${variant.type}:0`];
        } else {
          defaultValues[variant.type] = `${variant.type}:0`;
        }
        append({
          price: variant.choices[0].price,
          value: variant.choices[0].label,
          variant: variant.type,
        });
      });
  }, []);

  const onSubmit = (data: ILine) => addToCart?.(data);

  if (!item) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={6} p={6} bg="white" borderRadius="lg" boxShadow="lg" alignItems={"flex-start"}>
        <Image
          src={item.image.src}
          alt={item.label}
          objectFit="cover"
          borderRadius="lg"
          boxShadow="sm"
          w="100%"
          maxH="200px"
        />
        <VStack gap={3} alignItems="flex-start" w="100%">
          <Box as="h2" fontSize="2xl" fontWeight="semibold" color="gray.800">
            {item.label}
          </Box>
          <Box as="p" fontSize="lg" color="gray.600">
            {item.description}
          </Box>
          {item.variants.map((variant) => (
            <Field.Root invalid={false} required key={variant.type}>
              <Field.Label>
                {variant.type}
                {variant.isRequired && (
                  <Text as={Span} fontSize="sm" color="gray.400">
                    (Required)
                  </Text>
                )}
              </Field.Label>

              <Variant
                allowMultiple={variant.allowMultiple}
                name={variant.type}
                watch={watch}
                setValue={setValue}
                onChange={(index: string | string[]) => {
                  const removeAll = fields.reduce((acc, field: any, index) => {
                    if (field.variant !== variant.type) return acc;
                    return [...acc, index];
                  }, [] as number[]);
                  remove(removeAll);

                  if (Array.isArray(index)) {
                    const currIndexs = index
                      .filter((i) => !!i)
                      .map((i) => parseInt(i.split(':')[1]));
                    currIndexs.forEach((i) =>
                      append({
                        value: variant.choices[i].label,
                        price: variant.choices[i].price,
                        variant: variant.type,
                      })
                    );
                  } else {
                    const currIndex = parseInt(index.split(':')[1]);
                    append({
                      value: variant.choices[currIndex].label,
                      price: variant.choices[currIndex].price,
                      variant: variant.type,
                    });
                  }
                }}
              >
                <VStack gap="2" alignItems="flex-start" border="1px solid" borderColor="gray.200" borderRadius={4} p={3}>
                  <For each={variant.choices}>
                    {(choice, index) => (
                      <Box
                        key={index}
                        w="100%"
                        borderBottomWidth={index === variant.choices.length - 1 ? 0 : 1}
                        borderColor="gray.200"
                        borderRadius={4}
                        px={2}
                        py={1}
                      >
                        <Choice
                          key={`${variant.type}:${index}`}
                          value={`${variant.type}:${index}`}
                          allowMultiple={variant.allowMultiple}
                          name={variant.type}
                          control={{ watch, setValue, getValues }}
                          label={choice.label}
                        >
                          {choice.price > 0 && (
                            <Text fontSize="sm" color="gray.500">
                              + रु{choice.price.toFixed(2)}
                            </Text>
                          )}
                        </Choice>
                      </Box>
                    )}
                  </For>
                </VStack>
              </Variant>
            </Field.Root>
          ))}

          <Fieldset.Root size="lg" maxW="md">
             {/* <Stack>
                    <Fieldset.Legend>Contact details</Fieldset.Legend>
                    <Fieldset.HelperText>
                    Please provide your contact details below.
                    </Fieldset.HelperText>
                </Stack> */}
            <Fieldset.Content>
              <Field.Root invalid={false}>
                <Field.Label>Special Instruction</Field.Label>
                <Textarea placeholder="pepper /salt /cutlery..." {...register('instructions')} />
              </Field.Root>

              <Field.Root invalid={!!formState.errors.quantity?.type} required>
                <Field.Label>Quantity</Field.Label>
                <Input
                  type="number"
                  defaultValue={1}
                  min={1}
                  placeholder="1"
                  onInput={(e) => {
                    const input = e.currentTarget;
                    if (parseInt(input.value) < 1) input.value = "1";
                  }}
                  {...register('quantity', { min: 1, valueAsNumber: true })}
                />
                {!!formState.errors.quantity?.type && <Field.ErrorText>invalid quantity</Field.ErrorText>}
              </Field.Root>
            </Fieldset.Content>
          </Fieldset.Root>
        </VStack>
        <BottomButton
          label="Add to Cart"
          total={calculateItemTotal(fields, item.price, watch("quantity") || 1).toFixed(2)}
        />
      </VStack>
    </form>
  );
};
                        
   
