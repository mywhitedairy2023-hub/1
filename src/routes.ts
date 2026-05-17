import { createBrowserRouter } from "react-router";
import { DairyLayout } from "./components/DairyLayout";
import { DairyHome } from "./pages/DairyHome";
import { OrderPage } from "./pages/OrderPage";
import { AdminDashboard } from "./pages/AdminDashboard";

export const router = createBrowserRouter([
  // 1. Customer-Facing Routes (Wrapped inside your main layout)
  {
    path: "/",
    Component: DairyLayout,
    children: [
      { index: true, Component: DairyHome },
      { path: "order", Component: OrderPage },
    ],
  },
  
  // 2. Isolated Admin Route (No floating bubbles, navbars, or footers)
  {
    path: "/admin",
    Component: AdminDashboard,
  },
]);