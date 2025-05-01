import { ICategory, IItem, ILine, IRestaurant, IOrder ,OrderStatus} from "@/models";
import { db, auth } from "@/utils/firebase";
import { Center, Spinner, Text } from "@chakra-ui/react";
import { signInAnonymously } from "firebase/auth";
import { collection, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { createContext, FunctionComponent, PropsWithChildren, useContext, useEffect, useState } from "react";
import { placeOrderClient } from "@/utils/order";

interface IDataProviderContext {
    lines?: ILine[];
    restaurantInfo ?: IRestaurant;
    categories ?: ICategory[];
    items ?: IItem[];
    order ?: IOrder;
    getItemByCategory: (category: string) => IItem[];
    getItemById: (itemId: string) => IItem | undefined;
    addToCart?: (line: ILine) => void;
    removeCartItem?: (index:number) => void;
    placeOrder?: (orderData: IOrder, userId: string) => Promise<string | undefined>;
}

const DataProviderContext = createContext<IDataProviderContext>({
    lines: [],
    categories: [],
    items: [],
    getItemByCategory: () => [],
    getItemById: () => undefined,
    addToCart: () => {},
    removeCartItem: () => {},
   placeOrder: async (_orderData: IOrder, _userId: string) => undefined,
});

export const useDataProvider = () => useContext(DataProviderContext);

export const DataProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {

  const [isReady, setIsReady] = useState(false);
  const [restaurantInfo, setRestaurantInfo] = useState<IRestaurant>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [items, setItems] = useState<IItem[]>([]);
  const [lines, setlines] = useState<ILine[]>([]);
  const [order, setOrder] = useState<IOrder>();

  const fetchCategories = async () => {
    const categoriesSnap = await getDocs(collection(db, 'category'));
    const categoriesData: ICategory[] = [];
    categoriesSnap.forEach((doc) => {
      const category = doc.data() as ICategory;
      category.id = doc.id; // Add the document ID to the category object
      categoriesData.push(category);
    });
    setCategories(categoriesData);
  };

  const fetchItems = async () => {
    const itemsSnap = await getDocs(collection(db, 'item'));
    const itemsData: IItem[] = [];
    itemsSnap.forEach((doc) => {
      const item = doc.data() as IItem;
      item.id = doc.id; // Add the document ID to the item object
      itemsData.push(item);
    });
    setItems(itemsData);
  }
  const fetchRestaurantInfo = async () => {
   const restaurantInfoSnap= await getDoc(doc(db,'restaurant', 'info'))
   setRestaurantInfo(restaurantInfoSnap.data() as IRestaurant);
  };

  const addToCart = (line: ILine) => {
    setlines((prevLines) => [...prevLines, line]);
  };

  const removeCartItem = (index: number) => {
    setlines((prevLines) => prevLines.filter((_, i) => i !== index));
  };

  const placeOrder = async (orderData: IOrder, userId: string) => {
    try {
      const data = await placeOrderClient(orderData, userId);
      // console.log("Order placed successfully:", result);
      // You can add a success message or navigation here
      setlines([]);
      setOrder({
        ...data.order,
        status: data.order.status as OrderStatus, // ✅ explicitly cast
      });
      onSnapshot(doc(db, "order", data.id), (docSnapshot) => {
        if (docSnapshot.exists()) {
          setOrder(docSnapshot.data() as IOrder);
        } else {
          console.log("No such document!");
        }
      });
      return data.id;
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

 // Simulate data fetching
    const fetchData = async () => {
     await signInAnonymously(auth);
      // Simulate a delay
      await fetchItems();
      await fetchCategories();
      await fetchRestaurantInfo();
      setIsReady(true);
    };

  useEffect(() => {
    fetchData();
  }
  , []);

    // Simulate loading dots
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : ''));
    }, 500); // Change every 500ms

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const getItemById = (itemId: string): IItem | undefined => {
    return items.find(item => item.id === itemId);
  };
  const getItemByCategory = (category: string): IItem[]=> {
    return items.filter(item => item.category === category);
  };
  // Provide the restaurantInfo, categories, items, and getItemByCategory function to the context
  return (
    <DataProviderContext.Provider value={{lines,restaurantInfo , categories, items,getItemByCategory, getItemById,addToCart,removeCartItem, placeOrder,order }}>
        {/* Show loading spinner and dots while data is being fetched */}
      {isReady ? children : (
       <Center height="100vh" width="100vw" bg="gray.50" flexDirection="column">
            <Spinner size="xl" color="blue.500" mb={4} />
            <Text fontSize="lg" color="gray.700">Loading{dots}</Text>
       </Center>
      )}
    </DataProviderContext.Provider>
  );
}
