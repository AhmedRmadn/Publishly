import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSignUp } from "../hooks/useSignUp";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { UserPlus, Mail, Lock, IdCard, Hash, SquarePlay } from "lucide-react";

function SignUp() {
  const { isSigningUp, signUp } = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    signUp(data);
  };

  const isLoading = isSubmitting || isSigningUp;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-black rounded-full flex items-center justify-center shadow-2xl">
            <SquarePlay className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">
            Create your account
          </h1>
          <p className="text-gray-600">
            Join Publishly and start sharing your articles
          </p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="First Name"
                placeholder="John"
                leftIcon={<IdCard size={20} />}
                error={errors.firstName?.message}
                fullWidth
                disabled={isLoading}
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
              <Input
                label="Last Name"
                placeholder="Doe"
                leftIcon={<IdCard size={20} />}
                error={errors.lastName?.message}
                fullWidth
                disabled={isLoading}
                {...register("lastName", { required: "Last name is required" })}
              />
            </div>

            <Input
              label="Username"
              placeholder="yourusername"
              leftIcon={<Hash size={20} />}
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

            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              leftIcon={<Mail size={20} />}
              error={errors.email?.message}
              fullWidth
              disabled={isLoading}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />

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

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              icon={<UserPlus size={20} />}
              className="mt-2"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-600">
                Already have an account?
              </span>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-black hover:text-gray-700 font-medium transition-colors duration-200 hover:scale-105"
            >
              Sign in
              <span className="text-lg">→</span>
            </Link>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          By creating an account, you agree to our Terms of Service and Privacy
          Policy
        </p>
      </div>
    </div>
  );
}

export default SignUp;
