"use client";

import Link from "next/link";
import { useJobs } from "@/features/recruitment/hooks/use-jobs";

export default function CareersPage() {
  const { data: jobs, isLoading, error } = useJobs();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case "Active":
        return (
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-400">
            Active
          </span>
        );
      case "Closed":
        return (
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-gray-500/10 text-gray-400">
            Closed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-display bg-background-dark text-gray-300 antialiased selection:bg-primary selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background-dark/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="size-8 text-primary">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"></path>
              </svg>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">HRiQ Careers</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="rounded-lg bg-[#243047] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#2f3e5b]"
            >
              Log In
            </Link>
          </div>
        </div>
      </header>

      <main className="grow">
        {/* Hero Section */}
        <div className="relative border-b border-border-dark bg-card-dark pt-16 pb-12 shadow-lg">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-black text-white tracking-tight sm:text-5xl mb-4">
              Join Our Team
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Discover exciting career opportunities and help us build the future of HR technology.
            </p>
          </div>
        </div>

        {/* Job Listings */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse rounded-xl border border-border-dark bg-card-dark p-6">
                  <div className="h-6 w-64 rounded bg-gray-700 mb-3"></div>
                  <div className="h-4 w-48 rounded bg-gray-700"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-6xl text-gray-500 mb-4">error</span>
              <h2 className="text-xl font-bold text-white mb-2">Error Loading Jobs</h2>
              <p className="text-gray-400">Please try again later.</p>
            </div>
          ) : jobs && jobs.length > 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-400 mb-6">
                Showing <span className="font-semibold text-white">{jobs.length}</span> open positions
              </p>
              {jobs
                .filter((job) => job.status === "Active")
                .map((job) => (
                  <Link
                    key={job.id}
                    href={`/careers/${job.id}`}
                    className="block rounded-xl border border-border-dark bg-card-dark p-6 transition-all hover:border-primary/50 hover:-translate-y-1"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold text-white">{job.title}</h3>
                          {getStatusBadge(job.status)}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                          {job.department && (
                            <div className="flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[16px]">apartment</span>
                              <span>{job.department}</span>
                            </div>
                          )}
                          {job.location && (
                            <div className="flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[16px]">location_on</span>
                              <span>{job.location}</span>
                            </div>
                          )}
                          {job.work_type && (
                            <div className="flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[16px]">work</span>
                              <span>{job.work_type}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {job.posting_date && (
                          <span className="text-sm text-gray-500">
                            Posted {formatDate(job.posting_date)}
                          </span>
                        )}
                        <span className="material-symbols-outlined text-primary">arrow_forward</span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-6xl text-gray-500 mb-4">work_off</span>
              <h2 className="text-xl font-bold text-white mb-2">No Open Positions</h2>
              <p className="text-gray-400">Check back soon for new opportunities.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 bg-background-dark py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <p className="text-sm text-gray-500">&copy; 2024 HRiQ Inc. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a className="hover:text-white" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-white" href="#">
              Terms of Service
            </a>
            <a className="hover:text-white" href="#">
              Cookie Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

