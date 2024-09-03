import { createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout";
import HomePage from "./Components/HomePage";
import About from "./Components/About";
import Contact from "./Components/Contact";
import ProductsList from "./Components/ProductsList";
import Products from "./Components/Products";
import Cart from "./Components/Cart";
import Payment from "./Components/Payment";
import Account from "./Components/Account";
import SignInSignUp from "./Components/SignInSignUp";
import Orders from "./Components/Orders";
import WelcomePage from "./Components/WelcomePage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/user",
        children: [
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "account",
            element: <Account />,
          },
          {
            path: "signin",
            element: <SignInSignUp />,
          },
          {
            path: "signout",
            element: <div>Sign Out Component</div>,
          },
        ],
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/products",
        children: [
          {
            index: true,
            element: <ProductsList />,
          },
          {
            path: ":productId",
            element: <Products />,
          },
        ],
      },
      {
        path: "/welcomePage",
        element: <WelcomePage />,
      },
    ],
  },
]);

export default router;
