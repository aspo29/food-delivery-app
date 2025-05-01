import { ResourceProps } from "react-admin";
import { List, Datagrid, TextField ,DateField } from "react-admin";
import { Create, SimpleForm, TextInput, required } from "react-admin";
import {  ImageField } from 'react-admin';
import {Edit} from "react-admin";
import {CustomImageInput} from "@/components/ui/img";
import {MdOutlineCategory} from "react-icons/md";

const CategoryList = () => (
  <List>
    <Datagrid rowClick="edit">
      <ImageField source="image.src" label="Image"/>
      <TextField source="title" />
      <TextField source="description" />
      <DateField source="createdate" showTime label="Created At" />
      <DateField source="lastupdate" showTime showDate={false} label="Updated At" />
    </Datagrid>
  </List>
);

const CategoryForm = () => {
return (
    <SimpleForm sanitizeEmptyValues>
      <CustomImageInput source="image" label="Image" multiple={false} fullWidth />
      <TextInput source="title" validate={[required()]} fullWidth />
      <TextInput source="description" fullWidth />
    </SimpleForm>
  );
}

const CategoryCreate = () => (
     <Create>
        < CategoryForm />
    </Create>
);

const CategoryEdit = () => (
    <Edit>
        < CategoryForm />
    </Edit>
);
export const CategoryProps: ResourceProps = {
  icon: MdOutlineCategory,
  name: "category",
  list: CategoryList,
  create: CategoryCreate,
  edit: CategoryEdit,
};
