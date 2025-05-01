 import { ILine, ILineValue } from "@/models";

    // export const calculateItemTotal = (fields:ILine[],price:number,quantity:number) => {
    //     const totalFields = fields.reduce((acc, field) => 
    //              acc + field.price
    //         , 0);
    //         return (totalFields + price) * quantity;
    //     };
 export const calculateItemTotal = (fields: ILineValue[], price: number, quantity: number) => {
  // Deduplicate the fields if any duplicated items exist
  const uniqueFields = Array.from(new Set(fields.map(f => f.value)))
    .map(value => fields.find(f => f.value === value));

  const totalFields = uniqueFields.reduce((acc, field) => acc + (field?.price || 0), 0);
  return (totalFields + price) * quantity;
  };
   
  export const calculateOrderSubTotal = (lines: ILine[]) => {
    return lines.reduce((acc, lines) => acc + calculateItemTotal(lines.value, lines.price ,lines.quantity), 0 as number);
  };

  export const calculateOrderTax  = (lines: ILine[], taxRate: number) => {
    return calculateOrderSubTotal(lines) * (taxRate / 100);
  };

  export const calculateOrderTotal =  (lines: ILine[], taxRate: number) => {
    return calculateOrderSubTotal(lines) + calculateOrderTax(lines ?? [],taxRate);
  };