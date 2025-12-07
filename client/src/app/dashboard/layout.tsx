import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-background-light dark:bg-background-dark font-display text-text-primary-light dark:text-text-primary-dark">
      {/* SideNavBar */}
      <aside className="w-64 shrink-0 bg-card-light dark:bg-card-dark p-4 flex flex-col justify-between border-r border-border-light dark:border-border-dark fixed h-full overflow-y-auto z-20">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 px-2">
            <div className="bg-primary text-white flex items-center justify-center size-10 rounded-lg">
              <span className="material-symbols-outlined text-2xl">
                groups
              </span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-text-primary-light dark:text-text-primary-dark text-base font-bold leading-normal">
                HRMS AI
              </h1>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-normal">
                Human Resources
              </p>
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            <Link
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary"
              href="/dashboard"
            >
              <span className="material-symbols-outlined">dashboard</span>
              <p className="text-sm font-semibold leading-normal">Dashboard</p>
            </Link>
            <Link
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-white/5 transition-colors duration-200"
              href="/dashboard/employees"
            >
              <span className="material-symbols-outlined">person</span>
              <p className="text-sm font-medium leading-normal">Employees</p>
            </Link>
            <Link
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-white/5 transition-colors duration-200"
              href="#"
            >
              <span className="material-symbols-outlined">work</span>
              <p className="text-sm font-medium leading-normal">Recruitment</p>
            </Link>
            <Link
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-white/5 transition-colors duration-200"
              href="#"
            >
              <span className="material-symbols-outlined">bar_chart</span>
              <p className="text-sm font-medium leading-normal">Reports</p>
            </Link>
            <Link
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-white/5 transition-colors duration-200"
              href="#"
            >
              <span className="material-symbols-outlined">settings</span>
              <p className="text-sm font-medium leading-normal">Settings</p>
            </Link>
          </nav>
        </div>
        <div className="flex flex-col gap-2">
          <Link
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-white/5 transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">help</span>
            <p className="text-sm font-medium leading-normal">Support</p>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col ml-64">
        {/* TopNavBar */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-border-light dark:border-border-dark px-8 py-4 bg-card-light dark:bg-card-dark sticky top-0 z-10">
          <div className="flex items-center gap-8 w-full max-w-md">
            <label className="flex flex-col w-full">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-10">
                <div className="text-text-secondary-light dark:text-text-secondary-dark flex bg-background-light dark:bg-background-dark items-center justify-center pl-3 rounded-l-lg border border-border-light dark:border-border-dark border-r-0">
                  <span className="material-symbols-outlined text-lg">
                    search
                  </span>
                </div>
                <input
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark h-full placeholder:text-text-secondary-light placeholder:dark:text-text-secondary-dark px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal"
                  placeholder="Search employees, reports..."
                />
              </div>
            </label>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex cursor-pointer items-center justify-center rounded-lg h-10 w-10 bg-background-light dark:bg-background-dark text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors duration-200 border border-border-light dark:border-border-dark">
              <span className="material-symbols-outlined text-xl">
                notifications
              </span>
            </button>
            <button className="flex cursor-pointer items-center justify-center rounded-lg h-10 w-10 bg-background-light dark:bg-background-dark text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors duration-200 border border-border-light dark:border-border-dark">
              <span className="material-symbols-outlined text-xl">info</span>
            </button>
            <div className="h-10 w-px bg-border-light dark:bg-border-dark"></div>
            <div className="flex items-center gap-3">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCm6Twyyw2Rm4McyRxAacRMS1ixd58NPD3hbPD3uaOIgVgxx1m1MhyUOAMjrUd74fjYa0Z0SHEtkkwvJJdk-EIxCUIIb705oHcSQiWRC6g_K2rED0X4U0YoQzjDMeJLXboB6GhlEQzVU1GWDP986nBfRZoU5fP6Rp5PHL8M22tvx99Yf-tw-mWy1ya148clM8kowEjeuLZPYQHF2lUhzvnUDs__liQavgpXS8C9au3nvyxFW9t-HesqCVzSaWOBrTWPhIn0zxNISsWM")',
                }}
              ></div>
              <div className="flex-col hidden md:flex">
                <p className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark">
                  Alex Turner
                </p>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                  HR Manager
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-8 bg-background-light dark:bg-background-dark overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}

