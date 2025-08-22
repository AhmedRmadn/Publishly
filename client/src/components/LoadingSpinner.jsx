import React from "react";

const LoadingSpinner = ({
  size = "md",
  variant = "default",
  text = "Loading...",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const variants = {
    default: "border-black",
    primary: "border-gray-800",
    secondary: "border-gray-600",
    success: "border-green-600",
    warning: "border-yellow-600",
    error: "border-red-600",
  };

  const spinnerVariants = {
    default: (
      <div
        className={`animate-spin rounded-full border-2 border-gray-200 ${variants[variant]} border-t-transparent ${sizeClasses[size]} ${className}`}
      />
    ),
    dots: (
      <div className="flex space-x-1">
        <div
          className="w-2 h-2 bg-black rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="w-2 h-2 bg-black rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        ></div>
        <div
          className="w-2 h-2 bg-black rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></div>
      </div>
    ),
    pulse: (
      <div className={`${sizeClasses[size]} ${className}`}>
        <div
          className={`w-full h-full rounded-full bg-black animate-pulse`}
        ></div>
      </div>
    ),
    bars: (
      <div className="flex space-x-1">
        <div
          className="w-1 h-4 bg-black rounded-full animate-pulse"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="w-1 h-4 bg-black rounded-full animate-pulse"
          style={{ animationDelay: "150ms" }}
        ></div>
        <div
          className="w-1 h-4 bg-black rounded-full animate-pulse"
          style={{ animationDelay: "300ms" }}
        ></div>
      </div>
    ),
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      {spinnerVariants[variant]}
      {text && (
        <p className="text-black text-sm font-medium animate-pulse">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
