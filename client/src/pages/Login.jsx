import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSignIn } from "../hooks/useSignIn";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { LogIn, User, Lock, SquarePlay } from "lucide-react";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { isSigning, signIn } = useSignIn();
  const isLoading = isSubmitting || isSigning;

  const onSubmit = async (data) => {
    if (isLoading) return; // prevent double clicks
    signIn(data); // now will send { username, password }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-black rounded-full flex items-center justify-center shadow-2xl">
            <SquarePlay className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">Welcome Back</h1>
          <p className="text-gray-600 text-lg">
            Sign in to your Publishly account
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Username */}
            <Input
              label="Username"
              type="text"
              placeholder="yourusername"
              leftIcon={<User size={20} />}
              error={errors.username?.message}
              fullWidth
              disabled={isLoading}
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
            />

            {/* Password */}
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock size={20} />}
              showPasswordToggle
              error={errors.password?.message}
              fullWidth
              disabled={isLoading}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              icon={<LogIn size={20} />}
              className="mt-8"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-600">
                New to Publishly?
              </span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 text-black hover:text-gray-700 font-medium transition-colors duration-200 hover:scale-105"
            >
              Create your account
              <span className="text-lg">→</span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}

export default Login;
