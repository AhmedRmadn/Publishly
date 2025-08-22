import React, { forwardRef } from "react";
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";

const Input = forwardRef(
  (
    {
      label,
      error,
      success,
      type = "text",
      placeholder,
      className = "",
      fullWidth = false,
      leftIcon,
      rightIcon,
      showPasswordToggle = false,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);

    const inputType =
      showPasswordToggle && type === "password"
        ? showPassword
          ? "text"
          : "password"
        : type;

    const baseClasses =
      "w-full px-4 py-3 bg-white border rounded-lg text-black placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white";

    const stateClasses = {
      default: "border-gray-200 focus:border-black focus:ring-black",
      error: "border-red-300 focus:border-red-500 focus:ring-red-500",
      success: "border-green-300 focus:border-green-500 focus:ring-green-500",
    };

    const getStateClass = () => {
      if (error) return stateClasses.error;
      if (success) return stateClasses.success;
      return stateClasses.default;
    };

    const widthClass = fullWidth ? "w-full" : "";
    const inputClasses = `${baseClasses} ${getStateClass()} ${widthClass} ${className}`;

    const renderLeftIcon = () => {
      if (leftIcon) {
        return (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {leftIcon}
          </div>
        );
      }
      return null;
    };

    const renderRightIcon = () => {
      if (showPasswordToggle && type === "password") {
        return (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        );
      }

      if (rightIcon) {
        return (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {rightIcon}
          </div>
        );
      }

      if (error) {
        return (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
            <AlertCircle size={20} />
          </div>
        );
      }

      if (success) {
        return (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
            <CheckCircle size={20} />
          </div>
        );
      }

      return null;
    };

    const renderLabel = () => {
      if (!label) return null;

      return (
        <label className="block text-sm font-medium text-black mb-2">
          {label}
        </label>
      );
    };

    const renderError = () => {
      if (!error) return null;

      return (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle size={16} />
          {error}
        </p>
      );
    };

    const renderSuccess = () => {
      if (!success) return null;

      return (
        <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
          <CheckCircle size={16} />
          {success}
        </p>
      );
    };

    const hasLeftIcon = leftIcon;
    const hasRightIcon = rightIcon || showPasswordToggle || error || success;

    return (
      <div className={`${fullWidth ? "w-full" : ""} ${className}`}>
        {renderLabel()}

        <div className="relative">
          {renderLeftIcon()}

          <input
            ref={ref}
            type={inputType}
            placeholder={placeholder}
            className={`${inputClasses} ${hasLeftIcon ? "pl-12" : ""} ${
              hasRightIcon ? "pr-12" : ""
            }`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />

          {renderRightIcon()}
        </div>

        {renderError()}
        {renderSuccess()}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
