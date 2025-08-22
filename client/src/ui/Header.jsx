import { Link } from "react-router-dom";
import { Menu, X, LogIn, LogOut, Upload, Newspaper } from "lucide-react";
import { useState, useEffect } from "react";
import { useUserProfile } from "../hooks/useUserProfile";
import { useSignOut } from "../hooks/useSignOut";
import { useQueryClient } from "@tanstack/react-query";

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { profileLoading, isError, user } = useUserProfile();
  const { isSigningOut, signOut } = useSignOut();
  const queryClient = useQueryClient();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function logout() {
    signOut();
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-lg border-b border-gray-200"
          : "bg-white border-b border-gray-100"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 font-bold text-xl group hover:scale-105 transition-transform duration-200"
        >
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <Newspaper size={20} className="text-white" />
          </div>
          <span className="text-black">Publishly</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {!user || isError ? (
            <Link
              to="/login"
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-black hover:bg-gray-800 text-white border border-black hover:border-gray-800 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              <LogIn size={16} />
              <span className="font-medium">Sign In</span>
            </Link>
          ) : (
            <div className="flex items-center gap-6 text-black">
              <Link
                to={`/user/${user.username}`}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                title="Go to your profile"
              >
                <div className="relative">
                  <img
                    src={user.profile_image_url || "/no_profile.png"}
                    alt={`${user.first_name} ${user.last_name}`}
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 group-hover:border-black transition-colors duration-200"
                    onError={(e) => {
                      e.target.src = "/no_profile.png";
                    }}
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-600 rounded-full border-2 border-white"></div>
                </div>
                <div className="text-left">
                  <span className="block font-medium group-hover:text-gray-700 transition-colors duration-200">
                    {user.first_name} {user.last_name}
                  </span>
                  <span className="block text-xs text-gray-500">
                    @{user.username}
                  </span>
                </div>
              </Link>

              <Link
                to="/upload"
                className="p-3 rounded-lg bg-black hover:bg-gray-800 text-white border border-black hover:border-gray-800 transition-all duration-200 hover:scale-105 active:scale-95"
                title="Upload Article"
              >
                <Upload size={20} />
              </Link>

              <button
                onClick={logout}
                className="p-3 rounded-lg hover:bg-red-50 hover:border-red-200 border border-gray-200 transition-all duration-200 hover:scale-105 active:scale-95 text-red-600"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-black"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          {!user || isError ? (
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-6 py-3 hover:bg-gray-50 text-black"
            >
              <LogIn size={16} />
              Login
            </Link>
          ) : (
            <>
              <Link
                to={`/user/${user.username}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-6 py-3 border-b border-gray-200 hover:bg-gray-50 text-black"
                title="Go to your profile"
              >
                <img
                  src={user.profile_image_url || "/no_profile.png"}
                  alt={`${user.first_name} ${user.last_name}`}
                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                />
                <span>
                  {user.first_name} {user.last_name}
                </span>
              </Link>
              <Link
                to="/upload"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-6 py-3 hover:bg-gray-50 text-black"
              >
                <Upload size={16} />
                Upload
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="flex items-center gap-2 px-6 py-3 w-full hover:bg-red-50 text-red-600 bg-transparent border-none cursor-pointer"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header;
