import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// In your main entry (e.g., index.jsx or App.jsx)
import "froala-editor/js/froala_editor.pkgd.min.js";

// CSS files
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./components/ErrorBoundary";

import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Upload from "./pages/Upload";
import User from "./pages/User";
import articleLoader from "./loaders/articleLoader";
import profileLoader from "./loaders/profileLoader";
import Article from "./pages/Article";
// React Query setup
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

// Router setup
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate replace to="home" /> },
      { path: "home", element: <Home /> },
      {
        path: "article/:articleId",
        element: <Article />,
        loader: articleLoader, // <-- loader runs before rendering
      },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "upload", element: <Upload /> },
      { path: "user/:userName", element: <User />, loader: profileLoader },
    ],
  },
]);

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
              style: {
                background: "#000000",
                color: "white",
                fontWeight: "600",
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                borderRadius: "12px",
              },
            },
            error: {
              duration: 5000,
              style: {
                background: "#dc2626",
                color: "white",
                fontWeight: "600",
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                boxShadow: "0 4px 15px rgba(220, 38, 38, 0.3)",
                borderRadius: "12px",
              },
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "#ffffff",
              color: "#000000",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              fontWeight: "500",
              border: "1px solid #e5e5e5",
            },
          }}
        />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
