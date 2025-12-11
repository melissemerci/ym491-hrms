"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useJob } from "@/features/recruitment/hooks/use-jobs";

export default function JobDetailsPage() {
  const params = useParams();
  const jobId = Number(params.id);
  const { data: job, isLoading, error } = useJob(jobId);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatSalary = (min: number | null, max: number | null, currency: string | null) => {
    if (!min && !max) return "Competitive";
    const cur = currency || "USD";
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cur,
      maximumFractionDigits: 0,
    });
    if (min && max) return `${formatter.format(min)} - ${formatter.format(max)}`;
    if (min) return `From ${formatter.format(min)}`;
    if (max) return `Up to ${formatter.format(max)}`;
    return "Competitive";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-dark">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 w-48 rounded bg-card-dark"></div>
            <div className="h-16 w-96 rounded bg-card-dark"></div>
            <div className="h-4 w-64 rounded bg-card-dark"></div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-48 rounded-xl bg-card-dark"></div>
                <div className="h-48 rounded-xl bg-card-dark"></div>
              </div>
              <div className="space-y-6">
                <div className="h-64 rounded-xl bg-card-dark"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
        <div className="text-center space-y-4">
          <span className="material-symbols-outlined text-6xl text-gray-500">error</span>
          <h1 className="text-2xl font-bold text-white">Job Not Found</h1>
          <p className="text-gray-400">The job posting you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary/90 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            View All Jobs
          </Link>
        </div>
      </div>
    );
  }

  const benefitIcons: Record<string, { icon: string; color: string }> = {
    salary: { icon: "paid", color: "text-primary bg-primary/10" },
    health: { icon: "favorite", color: "text-green-400 bg-green-500/10" },
    pto: { icon: "flight_takeoff", color: "text-purple-400 bg-purple-500/10" },
    remote: { icon: "computer", color: "text-orange-400 bg-orange-500/10" },
    learning: { icon: "school", color: "text-blue-400 bg-blue-500/10" },
    equity: { icon: "trending_up", color: "text-emerald-400 bg-emerald-500/10" },
  };

  const getBenefitStyle = (index: number) => {
    const styles = Object.values(benefitIcons);
    return styles[index % styles.length];
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
              href="/careers"
              className="hidden text-sm font-medium text-gray-300 hover:text-white transition-colors sm:block"
            >
              View all jobs
            </Link>
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
        <div className="relative border-b border-border-dark bg-card-dark pt-12 pb-10 shadow-lg">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <span className="hover:underline">{job.department || "General"}</span>
                  <span className="text-gray-600">•</span>
                  <span>Job ID: {job.id}</span>
                </div>
                <h1 className="text-4xl font-black text-white tracking-tight sm:text-5xl">
                  {job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-base text-gray-400">
                  {job.department && (
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[20px]">apartment</span>
                      <span>{job.department}</span>
                    </div>
                  )}
                  {job.location && (
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[20px]">location_on</span>
                      <span>{job.location}</span>
                    </div>
                  )}
                  {job.work_type && (
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[20px]">work</span>
                      <span>{job.work_type}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[20px]">schedule</span>
                    <span>Full-time</span>
                  </div>
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:mt-0">
                <button className="flex items-center justify-center rounded-lg bg-[#243047] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#2f3e5b]">
                  <span className="material-symbols-outlined mr-2 text-lg">share</span>
                  Share
                </button>
                <button className="flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="lg:col-span-2 space-y-10">
            {/* About the Role */}
            {job.description && (
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white">About the Role</h3>
                <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
                  {job.description.split("\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </section>
            )}

            {/* Key Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white">Key Responsibilities</h3>
                <ul className="space-y-3">
                  {job.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="material-symbols-outlined mt-1 text-primary shrink-0">
                        check_circle
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white">Requirements</h3>
                <ul className="space-y-3">
                  {job.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Perks & Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <section className="space-y-6 pt-4">
                <h3 className="text-2xl font-bold text-white">Perks &amp; Benefits</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {job.benefits.map((benefit, index) => {
                    const style = getBenefitStyle(index);
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-4 rounded-xl border border-border-dark bg-card-dark p-4 transition-transform hover:-translate-y-1"
                      >
                        <div
                          className={`flex size-12 items-center justify-center rounded-lg ${style.color}`}
                        >
                          <span className="material-symbols-outlined">{style.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-white">{benefit}</h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Job Overview Card */}
              <div className="rounded-2xl border border-border-dark bg-card-dark p-6 shadow-lg">
                <h4 className="mb-4 text-lg font-bold text-white">Job Overview</h4>
                <div className="space-y-4">
                  <div className="flex items-start justify-between border-b border-border-dark pb-3">
                    <span className="text-gray-400">Posted Date</span>
                    <span className="font-medium text-white">{formatDate(job.posting_date || job.created_at)}</span>
                  </div>
                  {job.expiration_date && (
                    <div className="flex items-start justify-between border-b border-border-dark pb-3">
                      <span className="text-gray-400">Deadline</span>
                      <span className="font-medium text-white">{formatDate(job.expiration_date)}</span>
                    </div>
                  )}
                  <div className="flex items-start justify-between border-b border-border-dark pb-3">
                    <span className="text-gray-400">Salary Range</span>
                    <span className="font-medium text-white">
                      {formatSalary(job.salary_range_min, job.salary_range_max, job.salary_currency)}
                    </span>
                  </div>
                  <div className="flex items-start justify-between pb-1">
                    <span className="text-gray-400">Job Type</span>
                    <span className="font-medium text-white">{job.work_type || "Full-time"}</span>
                  </div>
                </div>
                <div className="mt-6 pt-2">
                  <button className="w-full rounded-lg bg-primary py-3 text-center text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/40">
                    Apply for this Job
                  </button>
                </div>
              </div>

              {/* Company Info Card */}
              <div className="rounded-2xl border border-border-dark bg-card-dark p-6 shadow-lg">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-white text-background-dark">
                    <svg
                      className="size-6"
                      fill="currentColor"
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">HRiQ Inc.</h4>
                    <Link href="#" className="text-xs text-primary hover:underline">
                      View Profile
                    </Link>
                  </div>
                </div>
                <p className="mb-4 text-sm text-gray-400">
                  HRiQ is an industry leader in AI-driven HR solutions. We empower businesses to
                  optimize their workforce through intelligent data and human-centric design.
                </p>
                <div className="flex gap-2">
                  <a
                    className="flex size-8 items-center justify-center rounded-full bg-[#243047] text-gray-300 hover:bg-[#2f3e5b] hover:text-white transition-colors"
                    href="#"
                  >
                    <span className="text-xs font-bold">In</span>
                  </a>
                  <a
                    className="flex size-8 items-center justify-center rounded-full bg-[#243047] text-gray-300 hover:bg-[#2f3e5b] hover:text-white transition-colors"
                    href="#"
                  >
                    <span className="text-xs font-bold">Tw</span>
                  </a>
                  <a
                    className="flex size-8 items-center justify-center rounded-full bg-[#243047] text-gray-300 hover:bg-[#2f3e5b] hover:text-white transition-colors"
                    href="#"
                  >
                    <span className="material-symbols-outlined text-sm">language</span>
                  </a>
                </div>
              </div>
            </div>
          </aside>
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

