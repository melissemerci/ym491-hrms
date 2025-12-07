"use client";

import * as React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Icons } from "./icons";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput, forgotPasswordSchema, ForgotPasswordInput } from "@/features/auth/schemas";
import { useLogin } from "@/features/auth/hooks/use-auth";

export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isForgotPassword, setIsForgotPassword] = React.useState(false);
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register: registerForgotPassword,
    handleSubmit: handleSubmitForgotPassword,
    formState: { errors: forgotPasswordErrors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: LoginInput) => {
    login(data);
  };

  const onSubmitForgotPassword = (data: ForgotPasswordInput) => {
    // TODO: Implement forgot password API call
    console.log("Forgot password:", data);
    // After successful submission, you might want to show a success message
  };

  const handleForgotPasswordClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setIsForgotPassword(false);
    reset();
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait">
        {!isForgotPassword ? (
          <motion.form
            key="login"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, x: -20, transition: { duration: 0.3 } }}
          >
            <motion.div variants={item} className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                leftIcon={<Icons.Mail />}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </motion.div>
            <motion.div variants={item} className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                leftIcon={<Icons.Lock />}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <Icons.VisibilityOff />
                    ) : (
                      <Icons.Visibility />
                    )}
                  </button>
                }
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </motion.div>
            <motion.div variants={item} className="flex items-center justify-end">
              <button
                type="button"
                onClick={handleForgotPasswordClick}
                className="text-primary hover:underline text-sm font-medium leading-normal transition-colors"
              >
                Forgot Password?
              </button>
            </motion.div>
            <motion.div variants={item}>
              <Button type="submit" className="relative overflow-hidden" disabled={isPending}>
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="truncate"
                >
                  {isPending ? "Logging in..." : "Login"}
                </motion.span>
              </Button>
            </motion.div>
          </motion.form>
        ) : (
          <motion.form
            key="forgot-password"
            onSubmit={handleSubmitForgotPassword(onSubmitForgotPassword)}
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, transition: { duration: 0.3 } }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col gap-2"
            >
              <Label htmlFor="forgot-email">Email</Label>
              <Input
                id="forgot-email"
                type="email"
                placeholder="Enter your email address"
                leftIcon={<Icons.Mail />}
                {...registerForgotPassword("email")}
              />
              {forgotPasswordErrors.email && (
                <p className="text-sm text-red-500">{forgotPasswordErrors.email.message}</p>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-slate-600 dark:text-[#93a5c8]"
            >
              <p>We&apos;ll send you a link to reset your password.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button type="submit" className="relative overflow-hidden">
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="truncate"
                >
                  Send Reset Link
                </motion.span>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center"
            >
              <button
                type="button"
                onClick={handleBackToLogin}
                className="text-primary hover:underline text-sm font-medium leading-normal transition-colors flex items-center gap-2"
              >
                <Icons.ArrowLeft className="w-4 h-4" />
                Back to Login
              </button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
