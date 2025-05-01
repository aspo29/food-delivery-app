import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { db, serverTimestamp } from "./firebase";
import { IOrder} from "../models";
import { calculateOrderSubTotal, calculateOrderTotal } from './calculations';
import emailjs from "@emailjs/browser";

export const placeOrderClient = async (data: IOrder, uid: string) => {
  const lines = data.lines;  // Using IOrder's lines directly

  const draft = {
    ...data,
    status: "PENDING",
    subTotal: calculateOrderSubTotal(lines),
    total: calculateOrderTotal(lines, 13),
    pickupTime: serverTimestamp(),
    createAt: serverTimestamp(),
    createdBy: uid,
  };

  const docRef = await addDoc(collection(db, "order"), draft);

  try {
    emailjs.init("rwkazUNI0OgXJWBGL");

    const restaurantDoc = await getDoc(doc(db, "restaurant", "info"));
    const restaurant = restaurantDoc.data();

    await emailjs.send("service_dt0yg3o", "template_np5a3wp", {
      title: `${restaurant?.name} - Order: ${docRef.id}`,
      orderId: docRef.id,
      name: data.firstName,
      email: data.email,
      subtotal: draft.subTotal.toFixed(2),
      total: draft.total.toFixed(2),
      html: `
      <div style="font-family: system-ui, sans-serif; font-size: 14px; color: #2c3e50;">
        <h2>Restaurant Address</h2>
        <p>${restaurant?.name}</p>
        <p style="margin-top: 0;">${restaurant?.address}</p>
         <h2 style="color: #1a73e8;">Hi ${data.firstName}, your order has been confirmed!</h2>
         <p>Thank you for your purchase. Here are your order details:</p>

        <h3 style="margin-top: 10px;">Order Summary</h3>
        <ul style="padding-left: 20px;">
          ${data.lines.map(line => `
            <li style="margin-bottom: 10px;">
              <h3>${line.quantity}x ${line.label}: रु${line.price.toFixed(2)}</h3>
              <ul>
                ${line.value.map(variant => `
                  <li>${variant.variant}: ${variant.value} - $${variant.price.toFixed(2)}</li>
                `).join('')}
              </ul>
            </li>
          `).join('')}
        </ul>

        <p><strong>Subtotal:</strong> रु${draft.subTotal.toFixed(2)}</p>
        <p><strong>Total:</strong> रु${draft.total.toFixed(2)}</p>
        <p style="margin-top: 20px;">We'll notify you when your order is ready for pickup.</p>
        <p style="color: #888;">Order ID: ${docRef.id}</p>
      </div>
      `
    });
    // console.log("Confirmation email sent.");
  } catch (error) {
    console.error("Failed to send confirmation email", error);
  }

  return { id: docRef.id, order: draft };
};
