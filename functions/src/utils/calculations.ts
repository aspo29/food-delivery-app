import { ILine, ILineValue } from "../models/index.js";

export const calculateItemTotal = (fields: ILineValue[], basePrice: number, quantity: number) => {
  const uniqueFields = Array.from(new Set(fields.map(f => f.value)))
    .map(value => fields.find(f => f.value === value));

  const totalFields = uniqueFields.reduce((acc, field) => acc + (field?.price || 0), 0);
  return (totalFields + basePrice) * quantity;
};

export const calculateOrderSubTotal = (lines: ILine[]) => {
  return lines.reduce((acc, line) =>
    acc + calculateItemTotal(line.value, line.price, line.quantity), 
  0);
};

export const calculateOrderTax = (lines: ILine[], taxRate: number) => {
  return calculateOrderSubTotal(lines) * (taxRate / 100);
};

export const calculateOrderTotal = (lines: ILine[], taxRate: number) => {
  return calculateOrderSubTotal(lines) + calculateOrderTax(lines, taxRate);
};