import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { calculateOrderSubTotal, calculateOrderTotal } from './utils/calculations.js';
import { ILine } from "./models/index.js";

const firebaseConfig = {
  apiKey: process.env.VITE_API_KEY,
  authDomain: process.env.VITE_AUTH_DOMAIN,
  projectId: process.env.VITE_PROJECT_ID,
  messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_APP_ID,
  measurementId: process.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface OrderData {
  lines: ILine[];
  instructions?: string;
  quantity?: number;
  price?: number;
  label?: string;
  paymentMethod?: string;
}

export const placeOrderClient = async (data: OrderData, uid: string) => {
  const lines = data.lines;

  const draft = {
    ...data,
    status: 'pending',
    subTotal: calculateOrderSubTotal(lines),
    total: calculateOrderTotal(lines, 13),
    pickupTime: serverTimestamp(),
    createAt: serverTimestamp(),
    createdBy: uid,
  };

  const orderRef = await addDoc(collection(db, 'order'), draft);

  return { id: orderRef.id, order: draft };
};