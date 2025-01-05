import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import LandingPageLayout from "./layouts/LandingPageLayout";
import Dashboard from "./Pages/Dashboard";
import Main from "./Pages/Main";
import Account from "./Pages/Account";
import Category from "./Pages/Category";
import SubCategory from "./Pages/SubCategory";
import Login from "./layouts/LogIn";

function App() {
  // const refToken = store.getState().refreshToken;
  // const refresh = useRefreshToken();

  // useEffect(() => {
  //   useRefreshToken();
  // }, [refToken]);

  const ProtectedRoute = ({ children }) => {
    // const isLoggedIn = useSelector((state) => state.auth.user == null);
    const isLoggedIn = localStorage.getItem("token");
    console.log(isLoggedIn);

    if (!isLoggedIn) {
      return <Navigate to="/login" replace />; // Redirect to login on unauthorized access
    }

    return children; // Render child component if logged in
  };
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <LandingPageLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Main />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/category",
          element: <Category />,
        },
        {
          path: "/subcategory",
          element: <SubCategory />,
        },
        {
          path: "/account",
          element: <Account />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} style={{ minHeight: "100vh" }} />;
}

export default App;
