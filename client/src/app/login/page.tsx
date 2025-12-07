"use client";

import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import { Icons } from "@/components/icons";
import { motion } from "motion/react";

export default function LoginPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden font-display">
      <div className="flex flex-1 w-full">
        <div className="flex w-full">
          {/* Left Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative hidden lg:flex flex-col justify-between w-1/2 bg-[#111722] p-8 xl:p-12"
          >
            <div className="z-10">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-center gap-3"
              >
                <Icons.Logo className="text-white" />
                <span className="text-white text-xl font-bold">HRiQ</span>
              </motion.div>
            </div>
            <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNW02d3lrbHdscHZmdHB3YmZrcW41cGFvY2JkMDNocGl3NnNnMmh1byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HUme5gGCrlo5Dc4/giphy.gif"
                alt="Abstract blue and purple gradient background"
                className="w-full h-full object-cover opacity-20"
                draggable={false}
                loading="eager"
              />
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="z-10"
            >
              <p className="text-white/80 text-xl font-medium">
                &quot;The only way to do great work is to love what you do.&quot;
              </p>
              <p className="text-white/60 text-base mt-2">- Steve Jobs</p>
            </motion.div>
          </motion.div>

          {/* Right Panel */}
          <div className="flex flex-1 flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-white dark:bg-[#1a2232]">
            <div className="flex w-full max-w-md flex-col gap-6 py-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-center text-center lg:items-start lg:text-left"
              >
                <h1 className="text-slate-800 dark:text-white tracking-tight text-[32px] font-bold leading-tight">
                  Log in to your account
                </h1>
                <p className="text-slate-600 dark:text-[#93a5c8] text-base mt-2">
                  Welcome back! Please enter your details.
                </p>
              </motion.div>

              <LoginForm />

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-center text-slate-500 dark:text-slate-400 text-sm"
              >
                <p>© 2024 HRiQ. All Rights Reserved.</p>
                <div className="mt-2">
                  <Link href="#" className="hover:underline">
                    Terms of Service
                  </Link>
                  <span className="mx-2">·</span>
                  <Link href="#" className="hover:underline">
                    Privacy Policy
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
