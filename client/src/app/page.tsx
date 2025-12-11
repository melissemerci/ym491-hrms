"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useAuth } from "@/providers/auth-provider";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function LandingPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-dark">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden font-display">
      <div className="layout-container flex h-full grow flex-col">
        {/* Navbar */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-white/10 dark:border-b-[#243047] bg-background-dark/80 backdrop-blur-md px-6 lg:px-10 py-4"
        >
          <div className="flex items-center gap-4 text-white">
            <div className="text-primary">
              <Icons.Logo />
            </div>
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
              HRiQ
            </h2>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-9">
              <Link
                href="#features"
                className="text-white/80 hover:text-white transition-colors text-sm font-medium leading-normal"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-white/80 hover:text-white transition-colors text-sm font-medium leading-normal"
              >
                Pricing
              </Link>
              <Link
                href="#about"
                className="text-white/80 hover:text-white transition-colors text-sm font-medium leading-normal"
              >
                About Us
              </Link>
            </div>
            <div className="flex gap-2">
              <Button className="h-10 text-sm">Request a Demo</Button>
              <Button
                className="h-10 bg-[#243047] hover:bg-[#344465] text-sm"
                asChild
              >
                <Link href="/login">Sign Up</Link>
              </Button>
            </div>
          </div>
          <div className="lg:hidden">
            <button className="text-white">
              <span className="material-symbols-outlined text-3xl">menu</span>
            </button>
          </div>
        </motion.header>

        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-16 md:py-24 relative overflow-hidden">
            <div className="px-4 sm:px-8 md:px-20 lg:px-40">
              <div className="flex flex-col-reverse gap-12 lg:flex-row lg:items-center">
                <motion.div
                  className="flex flex-col gap-6 text-left lg:w-1/2 lg:gap-8"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={stagger}
                >
                  <motion.div variants={fadeInUp} className="flex flex-col gap-4">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl lg:text-6xl">
                      Revolutionize Your HR with the Power of AI
                    </h1>
                    <h2 className="text-white/80 text-lg font-normal leading-relaxed max-w-xl">
                      Our intelligent platform simplifies complex HR tasks, from
                      unbiased recruitment to seamless employee management,
                      empowering you to build a better workforce.
                    </h2>
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <Button className="w-fit h-12 px-8 text-base">
                      Get Started
                    </Button>
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="w-full lg:w-1/2 aspect-square rounded-2xl overflow-hidden relative shadow-2xl shadow-primary/20"
                >
                   <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBxUYDfAMB4wiWblcFnx81h4CsqqVogziHRl6W9wFDOZm0R_iAwa2BZrRXT2Do6gcbxLurgcPM6N-fmnJDg22JrNutlg3oHnvoHMmA3ZAggEiotG81b1fUoX5y_ruZqa9BRkuR7bd6dDIX1Fp-TvwZ1wWUwsirg8WgFIuBRquIRHI4Gbt0ZIsFOTxw050nUpQkR65vBDAFHvrLcnvMgGQ5uhS673KrZXt0_zZbPrLy1e_Yhye3PwGZePJ4rBt98ILJCGfR24XeujvSK")',
                    }}
                  />
                  <div className="absolute inset-0 bg-linear-to-tr from-background-dark/50 to-transparent" />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-16 md:py-24 bg-[#1a2232]/50">
            <div className="px-4 sm:px-8 md:px-20 lg:px-40">
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={stagger}
                className="flex flex-col gap-16"
              >
                <motion.div
                  variants={fadeInUp}
                  className="flex flex-col gap-4 items-center text-center"
                >
                  <h2 className="text-white tracking-tight text-3xl font-bold leading-tight max-w-2xl sm:text-4xl">
                    Transforming HR with Intelligent Automation
                  </h2>
                  <p className="text-white/80 text-lg font-normal leading-relaxed max-w-2xl">
                    Discover our core features designed to streamline your
                    workflow, enhance fairness, and bring all your HR needs into
                    one powerful platform.
                  </p>
                </motion.div>
                
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      icon: "description",
                      title: "Automated CV Standardization",
                      desc: "Our AI automatically parses and formats resumes for unbiased, efficient review, ensuring you focus on the best talent.",
                    },
                    {
                      icon: "psychology",
                      title: "Transparent AI Insights (XAI)",
                      desc: "We provide clear, explainable reasons for AI-driven recommendations, building trust and promoting fair decision-making.",
                    },
                    {
                      icon: "widgets",
                      title: "Your Complete HR Hub",
                      desc: "Integrate recruitment, onboarding, performance management, and more into a single, seamless platform.",
                    },
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      variants={fadeInUp}
                      whileHover={{ y: -5 }}
                      className="flex flex-col gap-6 rounded-2xl border border-[#344465] bg-[#1a2232] p-8 text-center items-center hover:border-primary/50 transition-colors duration-300 group"
                    >
                      <div className="flex items-center justify-center size-16 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                        <span className="material-symbols-outlined text-3xl">
                          {feature.icon}
                        </span>
                      </div>
                      <div className="flex flex-col gap-3">
                        <h3 className="text-white text-xl font-bold leading-tight">
                          {feature.title}
                        </h3>
                        <p className="text-[#93a5c8] text-base font-normal leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                      <Link
                        className="font-bold text-primary hover:text-primary/80 transition-colors mt-auto flex items-center gap-1"
                        href="#"
                      >
                        Learn More <span className="text-xs">→</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 md:py-24">
            <div className="px-4 sm:px-8 md:px-20 lg:px-40">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center gap-8 rounded-3xl bg-linear-to-br from-[#1a2232] to-[#111722] border border-[#344465] px-4 py-16 text-center sm:px-10 sm:py-24 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10" />
                <div className="flex flex-col gap-4 z-10 max-w-2xl">
                  <h2 className="text-white tracking-tight text-3xl font-bold leading-tight sm:text-4xl">
                    Ready to Empower Your HR Team?
                  </h2>
                  <p className="text-white/80 text-lg font-normal leading-relaxed">
                    Join leading companies who are transforming their human
                    resources with our intelligent platform.
          </p>
        </div>
                <div className="flex justify-center z-10">
                  <Button className="h-12 px-8 text-base">
                    Request a Demo
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 dark:border-[#243047] bg-[#111722] py-12">
          <div className="px-4 sm:px-8 md:px-20 lg:px-40 flex flex-col gap-8 items-center text-center">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {["Features", "Pricing", "About Us", "Privacy Policy", "Terms of Service", "Contact Us"].map((link) => (
                <Link
                  key={link}
                  className="text-[#93a5c8] hover:text-white transition-colors text-base font-normal leading-normal"
                  href="#"
                >
                  {link}
                </Link>
              ))}
            </div>
            <div className="flex justify-center gap-6">
              {[
                // Facebook
                "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
                // Twitter
                "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.793 4.649-.65.177-1.354.23-2.073.188.599 1.884 2.333 3.256 4.393 3.294-1.611 1.264-3.644 2.016-5.86 2.016-.379 0-.75-.022-1.112-.065 2.083 1.342 4.568 2.122 7.252 2.122 8.704 0 13.465-7.222 13.465-13.465 0-.204-.005-.407-.013-.61a9.618 9.618 0 002.323-2.408z",
                // LinkedIn
                "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
              ].map((d, i) => (
                <a
                  key={i}
                  className="text-[#93a5c8] hover:text-white transition-colors"
                  href="#"
                >
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path clipRule="evenodd" d={d} fillRule="evenodd"></path>
                  </svg>
                </a>
              ))}
            </div>
            <p className="text-[#93a5c8] text-sm font-normal leading-normal">
              © 2025 HRiQ Inc. All rights reserved.
            </p>
          </div>
        </footer>
        </div>
    </div>
  );
}
