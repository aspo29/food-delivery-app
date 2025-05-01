import { Provider } from "@/components/ui/provider"
import React from "react"
import ReactDOM from "react-dom/client"
// import App from "./App"
// import { ChakraProvider } from "@chakra-ui/react"

import { createBrowserRouter, RouterProvider } from "react-router";
import { Root } from "@/pages/root";
import { Menu } from "@/pages/menu";
import { Item } from "@/pages/item";
import { Cart } from "@/pages/cart";
import { Checkout } from "@/pages/checkout";
import { ThankYou } from "@/pages/thankyou";
import Info from "./pages/info";
import { Admin } from "@/pages/admin";
import { DataProvider } from "./components/ui/data-provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        index: true, // default route
        element: <Menu/>,
      },
       {
        path: 'item/:id',
        element: <Item/>,
      },
       {
        path: 'cart',
        element: <Cart/>,
      },
       {
        path: 'checkout',
        element: <Checkout/>,
      },
       {
        path: 'thankYou',
        element: <ThankYou/>,
      },
       {
        path: 'info',
        element: <Info/>,
      },
    ],
  },
  {
    path: "admin/*",
    element: <Admin/>,
  }
]);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </Provider>
  </React.StrictMode>,
)