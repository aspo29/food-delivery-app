import { ArrayField, Labeled, NumberField, ResourceProps, RadioButtonGroupInput } from "react-admin";
import { List, Datagrid, TextField ,DateField } from "react-admin";
import { SimpleForm, TextInput} from "react-admin";
import {Edit} from "react-admin";
import { MdReceipt } from "react-icons/md";
import { ORDER_STATUS } from "@/utils/constants";

const OrderList = () => (
  <List sort={{ field: 'pickupTime', order: 'DESC' }}>
    <Datagrid rowClick="edit" bulkActionButtons={false} rowStyle={record =>
    record.status === 'PENDING' ? { backgroundColor: '#fdecea' } : undefined
    }>
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="phone" />
      <TextField source="email" />
      <TextField source="status" />
      <NumberField source="total" options={{ style: "currency", currency: "NPR" }} />
      <DateField source="pickupTime" showTime showDate={false} label="pickup" />
    </Datagrid>
  </List>
);

const OrderForm = () => {
return (
    <SimpleForm sanitizeEmptyValues>
      <Labeled>
        <TextField source="firstName" label="First Name" />
      </Labeled>
      <Labeled>
      <TextField source="lastName" label="Last Name" />
      </Labeled>
      <Labeled>
      <TextField source="email" label="Email" />
      </Labeled>
      <Labeled>
      <TextField source="phone" label="Phone" />
      </Labeled>
      <Labeled>
      <TextField source="comments" label="Comments" />
      </Labeled>
      <Labeled>
       <NumberField 
        source="total" 
        label="Total" 
        options={{ style: "currency", currency: "NPR" }}
        />
      </Labeled>
      <RadioButtonGroupInput choices={ORDER_STATUS} source="status"/>
      <TextInput source="reason" label="Reason" />
      <ArrayField source="lines" label="Lines">
                <Datagrid bulkActionButtons={false}>
                    <TextField source="label" />
                     <NumberField source="price" options={{ style: "currency", currency: "NPR" }}/>
                     <NumberField source="quantity" />
                     <TextField source="comments" />
                      <ArrayField source="value" label="Value">
                          <Datagrid bulkActionButtons={false}>
                              <TextField source="value" />
                              <NumberField source="price" options={{ style: "currency", currency: "NPR" }}/>
                          </Datagrid>
                      </ArrayField>
                </Datagrid>
            </ArrayField>
    </SimpleForm>
  );
}
const OrderEdit = () => (
    <Edit>
        < OrderForm />
    </Edit>
);
export const OrderProps: ResourceProps = {
  icon: MdReceipt,
  name: "order",
  list: OrderList,
  edit: OrderEdit,
};
