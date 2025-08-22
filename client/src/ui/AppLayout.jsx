import { Outlet } from "react-router-dom";
import Header from "./Header";
import ErrorBoundary from "../components/ErrorBoundary";

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-1 container mx-auto px-6 py-8">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Publishly. Crafted with passion.
      </footer>
    </div>
  );
}

export default AppLayout;
