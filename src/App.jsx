import HomePage from "./routes/homePage/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListingPage from "./routes/listingPage/listingPage";
import Layout from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import Login from "./routes/login/login";
import Signup from "./routes/signup/signup";
import AddProperty from "./routes/admin/AddProperty/AddProperty";
import Dashboard from "./routes/admin/Dashboard/Dashboard";
import PropertiesPage from "./routes/PropertiesPage/PropertiesPage";
import WishlistPage from "./routes/WishlistPage/WishlistPage";
import AboutUsPage from "./routes/AboutUsPage/AboutUsPage";
import UpdateProperty from "./routes/admin/UpdateProperty/UpdateProperty";
import JoinMembershipPage from "./routes/JoinMembershipPage/JoinMembershipPage";
import PropertyDetailsPage from "./routes/PropertyDetailsPage/PropertyDetailsPage";
import ContactUsPage from "./routes/ContactUsPage/ContactUsPage";
import ProfilePage from "./routes/ProfilePage/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminMessagesPanel from "./routes/admin/AdminMessagesPanel/AdminMessagesPanel";
import AdminAppointments from "./routes/admin/Appointments/Appointments";
import AppointmentCalendar from "./routes/AppointmentCalendar/AppointmentCalendar";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListingPage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/admin",
          element: <Dashboard/>,
        },
        {
          path: "/admin/add-property",
          element: <AddProperty />,
        },
        {
          path: "/admin/update-property/:id",
          element: <UpdateProperty />,
        },
        {
          path: "/admin/messages",
          element: <AdminMessagesPanel />,
        },
        {
          path: "/admin/appointments",
          element: <AdminAppointments />,
        },
        {
          path: "/properties",
          element: <PropertiesPage />,
        },
        {
          path: "/property/:id",
          element: <PropertyDetailsPage />,
        },
        {
          path: "/wishlist",
          element: <WishlistPage />,
        },
        {
          path: "/about",
          element: <AboutUsPage />,
        },
        {
          path: "/appointment",
          element: <AppointmentCalendar />,
        },
        {
          path: "/join",
          element: <JoinMembershipPage />,
        },
        {
          path: "/profile/*",
          element:<ProtectedRoute ><ProfilePage /></ProtectedRoute>,
        },
        {
          path: "/contact",
          element: <ContactUsPage />,
        },
        {
          path: "/:id",
          element: <SinglePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
