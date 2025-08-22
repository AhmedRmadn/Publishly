import React from "react";
import { Loader2 } from "lucide-react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = "button",
  className = "",
  icon,
  iconPosition = "left",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl focus:ring-black hover:scale-105 active:scale-95",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200 hover:border-gray-300 focus:ring-gray-500 hover:scale-105 active:scale-95",
    success:
      "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl focus:ring-green-600 hover:scale-105 active:scale-95",
    danger:
      "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl focus:ring-red-600 hover:scale-105 active:scale-95",
    warning:
      "bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg hover:shadow-xl focus:ring-yellow-600 hover:scale-105 active:scale-95",
    ghost:
      "bg-transparent hover:bg-gray-100 text-black hover:text-gray-700 focus:ring-gray-500",
    outline:
      "bg-transparent border-2 border-black text-black hover:bg-black hover:text-white focus:ring-black transition-colors",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm gap-2",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-3",
    xl: "px-8 py-4 text-lg gap-3",
  };

  const widthClass = fullWidth ? "w-full" : "";

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;

  const renderIcon = () => {
    if (loading) {
      return <Loader2 className="animate-spin" />;
    }
    if (icon) {
      return icon;
    }
    return null;
  };

  const renderContent = () => {
    if (iconPosition === "right") {
      return (
        <>
          {children}
          {renderIcon()}
        </>
      );
    }
    return (
      <>
        {renderIcon()}
        {children}
      </>
    );
  };

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
