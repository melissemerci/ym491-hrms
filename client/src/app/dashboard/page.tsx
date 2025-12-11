"use client";

import { HeadcountChart } from "@/components/dashboard/headcount-chart";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { useEmployeeStatistics } from "@/features/employees/hooks/use-employees";

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: stats, isLoading } = useEmployeeStatistics();

  // Format user's first name for greeting
  const firstName = user?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'User';

  return (
    <div className="flex flex-col gap-8">
      {/* PageHeading */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-text-primary-light dark:text-text-primary-dark text-3xl font-bold leading-tight tracking-tight">
            Welcome back, {firstName}!
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-base font-normal leading-normal">
            Here is your HR overview for today, {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-background-light dark:bg-card-dark text-text-primary-light dark:text-text-primary-dark border border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-white/5">
            <span className="truncate">Post a Job</span>
          </Button>
          <Button className="bg-primary text-white hover:bg-primary/90">
            <span className="truncate">Add New Employee</span>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex flex-col gap-2 rounded-xl p-6 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark shadow-sm">
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium leading-normal">
            Total Employees
          </p>
          <div className="flex items-end gap-2">
            {isLoading ? (
              <div className="h-9 w-20 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
            ) : (
              <p className="text-text-primary-light dark:text-text-primary-dark tracking-tight text-3xl font-bold leading-tight">
                {stats?.total_employees?.toLocaleString() || 0}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 rounded-xl p-6 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark shadow-sm">
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium leading-normal">
            Turnover Rate
          </p>
          <div className="flex items-end gap-2">
            <p className="text-text-primary-light dark:text-text-primary-dark tracking-tight text-3xl font-bold leading-tight">
              5.2%
            </p>
            <p className="text-red-500 text-sm font-medium leading-normal">
              -0.2%
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 rounded-xl p-6 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark shadow-sm">
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium leading-normal">
            Open Positions
          </p>
          <div className="flex items-end gap-2">
            <p className="text-text-primary-light dark:text-text-primary-dark tracking-tight text-3xl font-bold leading-tight">
              12
            </p>
            <p className="text-green-500 text-sm font-medium leading-normal">
              +2
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 rounded-xl p-6 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark shadow-sm">
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium leading-normal">
            Pending Approvals
          </p>
          <p className="text-text-primary-light dark:text-text-primary-dark tracking-tight text-3xl font-bold leading-tight">
            8
          </p>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          {/* Recruitment Funnel */}
          <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
              Recruitment Pipeline
            </h3>
            <div className="flex items-center justify-between text-center text-sm text-text-secondary-light dark:text-text-secondary-dark">
              <div className="flex flex-col items-center w-1/4">
                <p className="font-bold text-2xl text-text-primary-light dark:text-text-primary-dark">
                  480
                </p>
                <p>Applied</p>
              </div>
              <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">
                chevron_right
              </span>
              <div className="flex flex-col items-center w-1/4">
                <p className="font-bold text-2xl text-text-primary-light dark:text-text-primary-dark">
                  120
                </p>
                <p>Screened</p>
              </div>
              <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">
                chevron_right
              </span>
              <div className="flex flex-col items-center w-1/4">
                <p className="font-bold text-2xl text-text-primary-light dark:text-text-primary-dark">
                  45
                </p>
                <p>Interviewed</p>
              </div>
              <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">
                chevron_right
              </span>
              <div className="flex flex-col items-center w-1/4">
                <p className="font-bold text-2xl text-primary">12</p>
                <p>Hired</p>
              </div>
            </div>
          </div>

          {/* Employee Headcount */}
          <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
              Employee Headcount by Department
            </h3>
            <HeadcountChart />
          </div>

          {/* Task/Approval List */}
          <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
              My Tasks
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-blue-100 dark:bg-blue-900/40 text-blue-500 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">
                      flight_takeoff
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-text-primary-light dark:text-text-primary-dark">
                      Approve Leave Request
                    </p>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      David Lee - 3 days
                    </p>
                  </div>
                </div>
                <button className="text-primary text-sm font-semibold hover:underline">
                  View
                </button>
              </li>
              <li className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-green-100 dark:bg-green-900/40 text-green-500 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">
                      receipt_long
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-text-primary-light dark:text-text-primary-dark">
                      Review Performance Form
                    </p>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      Sarah Chen - Q3 Review
                    </p>
                  </div>
                </div>
                <button className="text-primary text-sm font-semibold hover:underline">
                  View
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* AI Insights */}
          <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-amber-500 text-2xl">
                auto_awesome
              </span>
              <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
                AI Insights
              </h3>
            </div>
            <div className="space-y-4">
              <div className="bg-amber-500/10 dark:bg-amber-500/20 p-4 rounded-lg border border-amber-500/20">
                <p className="font-semibold text-sm text-amber-700 dark:text-amber-400">
                  High Attrition Risk
                </p>
                <p className="text-xs text-amber-600 dark:text-amber-500 mt-1">
                  3 employees in the Sales team show patterns indicating a high
                  risk of leaving.
                </p>
              </div>
              <div className="bg-teal-500/10 dark:bg-teal-500/20 p-4 rounded-lg border border-teal-500/20">
                <p className="font-semibold text-sm text-teal-700 dark:text-teal-400">
                  Top Candidate Match
                </p>
                <p className="text-xs text-teal-600 dark:text-teal-500 mt-1">
                  Maria Garcia is an 92% match for the Senior Developer role.
                </p>
              </div>
            </div>
          </div>

          {/* Calendar/Upcoming Events */}
          <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
              Upcoming Events
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center bg-primary/10 text-primary w-12 h-12 rounded-lg">
                  <span className="text-xs font-bold uppercase">OCT</span>
                  <span className="text-lg font-bold">28</span>
                </div>
                <div>
                  <p className="font-semibold text-sm text-text-primary-light dark:text-text-primary-dark">
                    Michael Scott's Anniversary
                  </p>
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                    5 years
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center bg-primary/10 text-primary w-12 h-12 rounded-lg">
                  <span className="text-xs font-bold uppercase">NOV</span>
                  <span className="text-lg font-bold">02</span>
                </div>
                <div>
                  <p className="font-semibold text-sm text-text-primary-light dark:text-text-primary-dark">
                    Emily White's Birthday
                  </p>
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                    Happy Birthday!
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-white/10 text-text-secondary-light dark:text-text-secondary-dark w-12 h-12 rounded-lg">
                  <span className="text-xs font-bold uppercase">NOV</span>
                  <span className="text-lg font-bold">10</span>
                </div>
                <div>
                  <p className="font-semibold text-sm text-text-primary-light dark:text-text-primary-dark">
                    Company Town Hall
                  </p>
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                    10:00 AM
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

