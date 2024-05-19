import App from "@/App";
import { LoginPart } from "@/components/LoginSignup/LoginPart";
import { SignupForm } from "@/components/LoginSignup/SignupPart";
import Home from "@/components/pages/Home";
import { Login } from "@/components/pages/Login";
import { createBrowserRouter } from "react-router-dom";
import Protect from "./Protect";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protect>
        <App />
      </Protect>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    children: [
      {
        path: "/login",
        element: <LoginPart />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Login />,
    children: [
      {
        path: "/signup",
        element: <SignupForm />,
      },
    ],
  },
]);

export default appRouter;
