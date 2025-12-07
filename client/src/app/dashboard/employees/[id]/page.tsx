"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmployeeDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumbs */}
      <div className="flex flex-wrap gap-2">
        <Link
          className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium leading-normal hover:text-primary transition-colors"
          href="/dashboard"
        >
          HRMS
        </Link>
        <span className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium leading-normal">
          /
        </span>
        <Link
          className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium leading-normal hover:text-primary transition-colors"
          href="/dashboard/employees"
        >
          Employees
        </Link>
        <span className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium leading-normal">
          /
        </span>
        <span className="text-text-primary-light dark:text-text-primary-dark text-sm font-medium leading-normal">
          Jane Doe
        </span>
      </div>

      {/* Profile Header */}
      <div className="flex w-full flex-col gap-4 @container md:flex-row md:justify-between md:items-center">
        <div className="flex gap-4">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-24 w-24"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAlVvPZovUPmoHAaMh55Zw4zPqt-wHkt4YjwjGENxgN59UMmTzxbGspPUWbKumfps_DZ5grq8Resgqo7d5sEExRMhi6sTblmsXUd6KtnqfonVBu0yOFTkZXMImMrRC162moGrYxHzT6kCs95J-OOxl01sj3xaM470sHuWEBqJE-ztSuoUQrmUnUIK0K1JX8JFg3yR1dOfWJNZfK5uysv8KK1PtrR2zB6oksqOixSLn5I4TVFj_Zgb5PrB0Kq8i05NzFglHJLbfSqwYY')",
            }}
          ></div>
          <div className="flex flex-col justify-center">
            <p className="text-text-primary-light dark:text-text-primary-dark text-[22px] font-bold leading-tight tracking-[-0.015em]">
              Jane Doe
            </p>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-base font-normal leading-normal">
              Senior Product Designer, Product Team
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-base font-normal leading-normal">
                Status: Active
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-3 md:w-auto">
          <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-200 dark:bg-gray-700 text-text-primary-light dark:text-text-primary-dark text-sm font-bold leading-normal tracking-[0.015em] flex-1 md:flex-auto hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            <span className="truncate">Edit Profile</span>
          </button>
          <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] flex-1 md:flex-auto hover:bg-primary/90 transition-colors">
            <span className="truncate">More Actions</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="pb-3 border-b border-border-light dark:border-border-dark">
        <div className="flex gap-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("personal")}
            className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 whitespace-nowrap transition-colors ${
              activeTab === "personal"
                ? "border-b-primary text-text-primary-light dark:text-text-primary-dark"
                : "border-b-transparent text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark"
            }`}
          >
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">
              Personal Details
            </p>
          </button>
          <button
            onClick={() => setActiveTab("employment")}
            className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 whitespace-nowrap transition-colors ${
              activeTab === "employment"
                ? "border-b-primary text-text-primary-light dark:text-text-primary-dark"
                : "border-b-transparent text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark"
            }`}
          >
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">
              Employment & Job History
            </p>
          </button>
          <button
            onClick={() => setActiveTab("performance")}
            className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 whitespace-nowrap transition-colors ${
              activeTab === "performance"
                ? "border-b-primary text-text-primary-light dark:text-text-primary-dark"
                : "border-b-transparent text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark"
            }`}
          >
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">
              Performance
            </p>
          </button>
          <button
            onClick={() => setActiveTab("compensation")}
            className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 whitespace-nowrap transition-colors ${
              activeTab === "compensation"
                ? "border-b-primary text-text-primary-light dark:text-text-primary-dark"
                : "border-b-transparent text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark"
            }`}
          >
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">
              Compensation & Benefits
            </p>
          </button>
          <button
            onClick={() => setActiveTab("documents")}
            className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 whitespace-nowrap transition-colors ${
              activeTab === "documents"
                ? "border-b-primary text-text-primary-light dark:text-text-primary-dark"
                : "border-b-transparent text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark"
            }`}
          >
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">
              Documents
            </p>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Personal Details Tab Content */}
          {activeTab === "personal" && (
            <>
              {/* Information Cards */}
              <div className="bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
                    Contact Information
                  </h3>
                  <button className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">
                      edit
                    </span>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Email Address
                    </p>
                    <p className="font-medium text-text-primary-light dark:text-text-primary-dark">
                      jane.doe@company.com
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Phone
                    </p>
                    <p className="font-medium text-text-primary-light dark:text-text-primary-dark">
                      (123) 456-7890
                    </p>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Address
                    </p>
                    <p className="font-medium text-text-primary-light dark:text-text-primary-dark">
                      123 Main St, Anytown, USA 12345
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
                    Emergency Contact
                  </h3>
                  <button className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">
                      edit
                    </span>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Name
                    </p>
                    <p className="font-medium text-text-primary-light dark:text-text-primary-dark">
                      John Doe
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Relationship
                    </p>
                    <p className="font-medium text-text-primary-light dark:text-text-primary-dark">
                      Spouse
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Phone
                    </p>
                    <p className="font-medium text-text-primary-light dark:text-text-primary-dark">
                      (098) 765-4321
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline/History View */}
              <div className="bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
                <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                  Career Milestones
                </h3>
                <div className="relative pl-6 border-l-2 border-gray-200 dark:border-gray-700">
                  {/* Milestone 1 */}
                  <div className="mb-8 last:mb-0">
                    <div className="absolute -left-[11px] top-1 w-5 h-5 bg-primary rounded-full border-4 border-white dark:border-background-dark"></div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      August 15, 2022
                    </p>
                    <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                      Promoted to Senior Product Designer
                    </h4>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Recognized for outstanding contributions to the flagship
                      product redesign.
                    </p>
                  </div>
                  {/* Milestone 2 */}
                  <div className="mb-8 last:mb-0">
                    <div className="absolute -left-[11px] top-1 w-5 h-5 bg-primary/50 rounded-full border-4 border-white dark:border-background-dark"></div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      March 1, 2020
                    </p>
                    <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                      Joined as Product Designer
                    </h4>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Hired to the Product team.
                    </p>
                  </div>
                  {/* Milestone 3 */}
                  <div className="mb-8 last:mb-0">
                    <div className="absolute -left-[11px] top-1 w-5 h-5 bg-primary/50 rounded-full border-4 border-white dark:border-background-dark"></div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      February 20, 2020
                    </p>
                    <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                      Offer Letter Signed
                    </h4>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Official start of employment process.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Employment & Job History Tab Content */}
          {activeTab === "employment" && (
            <div className="flex flex-col gap-6">
              <div className="bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
                <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                  Current Role
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Job Title
                    </p>
                    <p className="font-medium text-text-primary-light dark:text-text-primary-dark">
                      Senior Product Designer
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Department
                    </p>
                    <p className="font-medium text-text-primary-light dark:text-text-primary-dark">
                      Product & Engineering
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Manager
                    </p>
                    <p className="font-medium text-text-primary-light dark:text-text-primary-dark">
                      Sarah Connor
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Start Date
                    </p>
                    <p className="font-medium text-text-primary-light dark:text-text-primary-dark">
                      March 1, 2020
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Employment Type
                    </p>
                    <p className="font-medium text-text-primary-light dark:text-text-primary-dark">
                      Full-Time
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Work Location
                    </p>
                    <p className="font-medium text-text-primary-light dark:text-text-primary-dark">
                      Remote (San Francisco)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
                <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                  Previous Roles
                </h3>
                <div className="space-y-6">
                  <div className="flex flex-col gap-1 pb-6 border-b border-border-light dark:border-border-dark last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                          Product Designer
                        </h4>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                          TechStart Inc.
                        </p>
                      </div>
                      <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        2018 - 2020
                      </span>
                    </div>
                    <p className="text-sm text-text-primary-light dark:text-text-primary-dark mt-2">
                      Led design for the mobile application team, improving user
                      retention by 15%.
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                          Junior UI Designer
                        </h4>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                          Creative Solutions Agency
                        </p>
                      </div>
                      <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        2016 - 2018
                      </span>
                    </div>
                    <p className="text-sm text-text-primary-light dark:text-text-primary-dark mt-2">
                      Created visual assets and marketing materials for various
                      clients.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Performance Tab Content */}
          {activeTab === "performance" && (
            <div className="flex flex-col gap-6">
              <div className="bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
                    Recent Reviews
                  </h3>
                  <button className="flex items-center gap-2 text-primary text-sm font-medium hover:underline">
                    <span className="material-symbols-outlined text-lg">
                      add
                    </span>
                    Add Review
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="p-4 border border-border-light dark:border-border-dark rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                        Q3 2023 Performance Review
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-green-500">
                          Exceeds Expectations
                        </span>
                        <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                          Oct 15, 2023
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-3">
                      Jane has shown exceptional leadership in the recent design
                      system overhaul. Her attention to detail and ability to
                      collaborate with engineering has been outstanding.
                    </p>
                    <div className="flex gap-2">
                      <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                        Leadership
                      </span>
                      <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                        Technical Skill
                      </span>
                      <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                        Communication
                      </span>
                    </div>
                  </div>

                  <div className="p-4 border border-border-light dark:border-border-dark rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                        Q1 2023 Performance Review
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-green-500">
                          Meets Expectations
                        </span>
                        <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                          Apr 10, 2023
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-3">
                      Solid performance this quarter. Delivered all key projects
                      on time. Area for improvement: mentoring junior designers.
                    </p>
                    <div className="flex gap-2">
                      <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                        Delivery
                      </span>
                      <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                        Quality
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
                <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                  Goals & OKRs
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-text-primary-light dark:text-text-primary-dark">
                        Launch New Design System
                      </span>
                      <span className="text-text-secondary-light dark:text-text-secondary-dark">
                        85%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-text-primary-light dark:text-text-primary-dark">
                        Mentor 2 Junior Designers
                      </span>
                      <span className="text-text-secondary-light dark:text-text-secondary-dark">
                        50%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-amber-500 h-2 rounded-full"
                        style={{ width: "50%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-text-primary-light dark:text-text-primary-dark">
                        Complete Advanced UX Certification
                      </span>
                      <span className="text-text-secondary-light dark:text-text-secondary-dark">
                        20%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: "20%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Compensation & Benefits Tab Content */}
          {activeTab === "compensation" && (
            <div className="flex flex-col gap-6">
              <div className="bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
                <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                  Compensation Package
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Annual Base Salary
                    </p>
                    <p className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
                      $145,000
                    </p>
                    <p className="text-xs text-green-500 mt-1">
                      +5% from last year
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Performance Bonus
                    </p>
                    <p className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
                      Up to 15%
                    </p>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
                      Based on company & personal goals
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Stock Options
                    </p>
                    <p className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
                      5,000 Units
                    </p>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
                      Vesting over 4 years
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Next Review Date
                    </p>
                    <p className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
                      Mar 2024
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
                <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                  Active Benefits
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-3 border border-border-light dark:border-border-dark rounded-lg">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                      <span className="material-symbols-outlined">
                        medical_services
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                        Health Insurance
                      </h4>
                      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        Premium Plan (Family)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border border-border-light dark:border-border-dark rounded-lg">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                      <span className="material-symbols-outlined">
                        dentistry
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                        Dental & Vision
                      </h4>
                      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        Standard Coverage
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border border-border-light dark:border-border-dark rounded-lg">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg">
                      <span className="material-symbols-outlined">savings</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                        401(k) Matching
                      </h4>
                      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        5% Company Match
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border border-border-light dark:border-border-dark rounded-lg">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                      <span className="material-symbols-outlined">fitness_center</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                        Wellness Stipend
                      </h4>
                      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        $50/month
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab Content */}
          {activeTab === "documents" && (
            <div className="bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
                  Employee Documents
                </h3>
                <button className="flex items-center gap-2 bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  <span className="material-symbols-outlined text-lg">
                    upload_file
                  </span>
                  Upload Document
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-text-secondary-light dark:text-text-secondary-dark uppercase bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      <th className="px-4 py-3 rounded-l-lg">Document Name</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Date Added</th>
                      <th className="px-4 py-3 rounded-r-lg text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-4 py-4 font-medium text-text-primary-light dark:text-text-primary-dark flex items-center gap-3">
                        <span className="material-symbols-outlined text-red-500">
                          picture_as_pdf
                        </span>
                        Employment Contract.pdf
                      </td>
                      <td className="px-4 py-4 text-text-secondary-light dark:text-text-secondary-dark">
                        Contract
                      </td>
                      <td className="px-4 py-4 text-text-secondary-light dark:text-text-secondary-dark">
                        Feb 20, 2020
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button className="text-primary hover:underline">
                          Download
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-4 py-4 font-medium text-text-primary-light dark:text-text-primary-dark flex items-center gap-3">
                        <span className="material-symbols-outlined text-red-500">
                          picture_as_pdf
                        </span>
                        Offer Letter.pdf
                      </td>
                      <td className="px-4 py-4 text-text-secondary-light dark:text-text-secondary-dark">
                        Offer
                      </td>
                      <td className="px-4 py-4 text-text-secondary-light dark:text-text-secondary-dark">
                        Feb 15, 2020
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button className="text-primary hover:underline">
                          Download
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-4 py-4 font-medium text-text-primary-light dark:text-text-primary-dark flex items-center gap-3">
                        <span className="material-symbols-outlined text-blue-500">
                          description
                        </span>
                        Tax Forms 2023.docx
                      </td>
                      <td className="px-4 py-4 text-text-secondary-light dark:text-text-secondary-dark">
                        Tax
                      </td>
                      <td className="px-4 py-4 text-text-secondary-light dark:text-text-secondary-dark">
                        Jan 15, 2023
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button className="text-primary hover:underline">
                          Download
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-4 py-4 font-medium text-text-primary-light dark:text-text-primary-dark flex items-center gap-3">
                        <span className="material-symbols-outlined text-red-500">
                          picture_as_pdf
                        </span>
                        Non-Disclosure Agreement.pdf
                      </td>
                      <td className="px-4 py-4 text-text-secondary-light dark:text-text-secondary-dark">
                        Legal
                      </td>
                      <td className="px-4 py-4 text-text-secondary-light dark:text-text-secondary-dark">
                        Feb 20, 2020
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button className="text-primary hover:underline">
                          Download
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* AI Insights Widget */}
        <div className="lg:col-span-1">
          <div className="bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark sticky top-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-500/20 rounded-lg text-amber-500">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
                AI Insights
              </h3>
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <h4 className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                  Performance Trajectory
                </h4>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-green-500">
                    Strong
                  </span>
                </div>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
                  Consistently exceeds expectations in quarterly reviews.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                  Skills Gap Analysis
                </h4>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                    Recommended Skill:{" "}
                    <span className="font-bold text-amber-500">
                      UX Research
                    </span>
                  </p>
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                    Recommended Skill:{" "}
                    <span className="font-bold text-amber-500">
                      Design Leadership
                    </span>
                  </p>
                </div>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
                  Developing these skills could open up leadership opportunities.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                  Flight Risk Prediction
                </h4>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-amber-500 h-2 rounded-full"
                      style={{ width: "20%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-amber-500">Low</span>
                </div>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
                  Employee shows high engagement and satisfaction scores.
                </p>
              </div>
              <button className="text-center w-full rounded-lg h-10 px-4 bg-primary/10 dark:bg-primary/20 text-primary text-sm font-bold flex items-center justify-center hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors">
                View Full AI Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
