import { ArrayInput, BooleanInput, ChipField, number, NumberField, NumberInput, ReferenceField, ReferenceInput, ResourceProps, SelectInput, SimpleFormIterator } from "react-admin";
import { List, Datagrid, TextField ,DateField } from "react-admin";
import { Create, SimpleForm, TextInput, required } from "react-admin";
import { ImageField } from 'react-admin';
import {Edit} from "react-admin";
import {CustomImageInput} from "@/components/ui/img";
import { MdOutlineFastfood } from "react-icons/md";

const ItemList = () => (
  <List>
    <Datagrid rowClick="edit">
      <ImageField source="image.src" label="Image"/>
      <TextField source="label" />
      <ReferenceField source="category" reference="category" label="Category">
        <ChipField source="title" />
      </ReferenceField>
      <NumberField source="price" />
      <TextField source="description" />
      <DateField source="createdate" showTime label="Created At" />
      <DateField source="lastupdate" showTime showDate={false} label="Updated At" />
    </Datagrid>
  </List>
);

const ItemForm = () => {
return (
    <SimpleForm sanitizeEmptyValues>
      <CustomImageInput source="image" label="Image" multiple={false} fullWidth />
      <ReferenceInput source="category" reference="category">
          <SelectInput optionText="title" fullWidth validate={[required()]}/>
      </ReferenceInput>
      <TextInput source="label" validate={[required()]} fullWidth />
      <NumberInput source="price" validate={[required(),number()]} fullWidth />
      <TextInput source="description" fullWidth />
      <ArrayInput source="variants" label="Variants">
                <SimpleFormIterator fullWidth>
                    <TextInput source="type" helperText={false} fullWidth />
                      <ArrayInput source="choices" label="Choices">
                          <SimpleFormIterator inline>
                              <TextInput source="label" helperText={false} fullWidth />
                              <NumberInput source="price" validate={[required(),number()]} fullWidth defaultValue={0}/>
                          </SimpleFormIterator>
                      </ArrayInput>
                    <BooleanInput source="allowMultiple" label="Allow Multiple"fullWidth />
                    <BooleanInput source="isRequired" label="Required" fullWidth />
                </SimpleFormIterator>
            </ArrayInput>
    </SimpleForm>
  );
}

const ItemCreate = () => (
     <Create>
        < ItemForm />
    </Create>
);

const ItemEdit = () => (
    <Edit>
        < ItemForm />
    </Edit>
);
export const ItemProps: ResourceProps = {
  icon: MdOutlineFastfood,
  name: "item",
  list: ItemList,
  create: ItemCreate,
  edit: ItemEdit,
};
