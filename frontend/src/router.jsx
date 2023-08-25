import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Error404Page from "./pages/Error404Page.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ForgotPage from "./pages/ForgotPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error404Page />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "forgot",
        element: <ForgotPage />,
      },
    //   {
    //     path: "pokemon/:id",
    //     element: <PokemonPage />,
    //   },
    //   {
    //     path: "pokemon/missing/:id",
    //     element: <MissingPokemonPage />,
    //   },
    ],
  },
]);

export default router;