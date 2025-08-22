import React from "react";
import { AlertCircle, RefreshCw, XCircle } from "lucide-react";

const ErrorMessage = ({
  error,
  onRetry,
  title = "Something went wrong",
  variant = "error",
  className = "",
  showRetry = true,
}) => {
  const variants = {
    error: {
      icon: XCircle,
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-800",
      iconColor: "text-red-600",
    },
    warning: {
      icon: AlertCircle,
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-800",
      iconColor: "text-yellow-600",
    },
    info: {
      icon: AlertCircle,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-800",
      iconColor: "text-blue-600",
    },
  };

  const currentVariant = variants[variant];
  const IconComponent = currentVariant.icon;

  return (
    <div
      className={`rounded-xl border ${currentVariant.bgColor} ${currentVariant.borderColor} p-6 ${className}`}
    >
      <div className="flex items-start space-x-3">
        <IconComponent
          className={`w-6 h-6 mt-0.5 ${currentVariant.iconColor} flex-shrink-0`}
        />

        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg font-semibold ${currentVariant.textColor} mb-2`}
          >
            {title}
          </h3>

          {error && (
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              {typeof error === "string"
                ? error
                : error.message || "An unexpected error occurred"}
            </p>
          )}

          {showRetry && onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
