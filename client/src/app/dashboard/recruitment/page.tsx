"use client";

import Link from "next/link";

export default function RecruitmentPage() {
  const jobPostings = [
    {
      id: 1,
      title: "AI/ML Engineer",
      department: "Technology",
      location: "Remote (US)",
      deadline: "2024-12-31",
      status: "Active",
    },
    {
      id: 2,
      title: "Product Designer",
      department: "Design",
      location: "San Francisco, CA",
      deadline: "2024-12-15",
      status: "Active",
    },
    {
      id: 3,
      title: "HR Business Partner",
      department: "Human Resources",
      location: "New York, NY",
      deadline: "2024-11-30",
      status: "Closed",
    },
    {
      id: 4,
      title: "Marketing Manager",
      department: "Marketing",
      location: "London, UK",
      deadline: "2025-01-10",
      status: "Active",
    },
    {
      id: 5,
      title: "Frontend Developer",
      department: "Technology",
      location: "Remote (Global)",
      deadline: "2024-12-20",
      status: "Draft",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
            Active
          </span>
        );
      case "Closed":
        return (
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
            Closed
          </span>
        );
      case "Draft":
        return (
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
            Draft
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Page Heading */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary-light dark:text-text-primary-dark">
            Job Postings
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-base font-normal">
            Manage all current job openings in your organization.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-primary text-white text-sm font-bold leading-normal hover:bg-primary/90 transition-colors">
          <span className="material-symbols-outlined">add</span>
          <span className="truncate">Create New Job Posting</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-card-light dark:bg-card-dark p-4 rounded-xl border border-border-light dark:border-border-dark">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <label className="flex flex-col h-10 w-full">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                <div className="text-text-secondary-light dark:text-text-secondary-dark flex bg-background-light dark:bg-background-dark items-center justify-center pl-4 rounded-l-lg border border-border-light dark:border-border-dark border-r-0">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary h-full placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark"
                  placeholder="Search by title, department..."
                />
              </div>
            </label>
          </div>
          <div className="flex gap-3 items-center col-span-1 md:col-span-2 lg:col-span-2">
            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-background-light dark:bg-background-dark pl-4 pr-3 border border-border-light dark:border-border-dark w-full text-text-primary-light dark:text-text-primary-dark">
              <p className="text-sm font-medium">Department</p>
              <span className="material-symbols-outlined text-xl">
                expand_more
              </span>
            </button>
            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-background-light dark:bg-background-dark pl-4 pr-3 border border-border-light dark:border-border-dark w-full text-text-primary-light dark:text-text-primary-dark">
              <p className="text-sm font-medium">Location</p>
              <span className="material-symbols-outlined text-xl">
                expand_more
              </span>
            </button>
            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-background-light dark:bg-background-dark pl-4 pr-3 border border-border-light dark:border-border-dark w-full text-text-primary-light dark:text-text-primary-dark">
              <p className="text-sm font-medium">Status</p>
              <span className="material-symbols-outlined text-xl">
                expand_more
              </span>
            </button>
            <button className="h-10 px-3 shrink-0 rounded-lg border border-border-light dark:border-border-dark hover:bg-primary/10 text-text-secondary-light dark:text-text-secondary-dark transition-colors">
              <span className="material-symbols-outlined">refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Job Postings Table */}
      <div className="overflow-x-auto bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark">
        <table className="w-full text-sm text-left">
          <thead className="border-b border-border-light dark:border-border-dark">
            <tr>
              <th
                className="px-6 py-4 font-bold text-text-primary-light dark:text-text-primary-dark"
                scope="col"
              >
                Job Title
              </th>
              <th
                className="px-6 py-4 font-bold text-text-primary-light dark:text-text-primary-dark"
                scope="col"
              >
                Department
              </th>
              <th
                className="px-6 py-4 font-bold text-text-primary-light dark:text-text-primary-dark"
                scope="col"
              >
                Location
              </th>
              <th
                className="px-6 py-4 font-bold text-text-primary-light dark:text-text-primary-dark"
                scope="col"
              >
                Application Deadline
              </th>
              <th
                className="px-6 py-4 font-bold text-text-primary-light dark:text-text-primary-dark text-center"
                scope="col"
              >
                Status
              </th>
              <th
                className="px-6 py-4 font-bold text-text-primary-light dark:text-text-primary-dark text-right"
                scope="col"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {jobPostings.map((job) => (
              <tr
                key={job.id}
                className="border-b border-border-light dark:border-border-dark hover:bg-background-light dark:hover:bg-background-dark transition-colors"
              >
                <td className="px-6 py-4 font-medium text-text-primary-light dark:text-text-primary-dark whitespace-nowrap">
                  <Link href={`/dashboard/recruitment/${job.id}`} className="hover:text-primary hover:underline">
                    {job.title}
                  </Link>
                </td>
                <td className="px-6 py-4 text-text-secondary-light dark:text-text-secondary-dark">
                  {job.department}
                </td>
                <td className="px-6 py-4 text-text-secondary-light dark:text-text-secondary-dark">
                  {job.location}
                </td>
                <td className="px-6 py-4 text-text-secondary-light dark:text-text-secondary-dark">
                  {job.deadline}
                </td>
                <td className="px-6 py-4 text-center">
                  {getStatusBadge(job.status)}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/dashboard/recruitment/${job.id}`} className="p-2 rounded-lg hover:bg-primary/10 text-text-secondary-light dark:text-text-secondary-dark transition-colors">
                      <span className="material-symbols-outlined text-lg">
                        edit
                      </span>
                    </Link>
                    <button className="p-2 rounded-lg hover:bg-primary/10 text-text-secondary-light dark:text-text-secondary-dark transition-colors">
                      <span className="material-symbols-outlined text-lg">
                        group
                      </span>
                    </button>
                    <button className="p-2 rounded-lg hover:bg-primary/10 text-text-secondary-light dark:text-text-secondary-dark transition-colors">
                      <span className="material-symbols-outlined text-lg">
                        more_horiz
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
          Showing{" "}
          <span className="font-semibold text-text-primary-light dark:text-text-primary-dark">
            1-5
          </span>{" "}
          of{" "}
          <span className="font-semibold text-text-primary-light dark:text-text-primary-dark">
            23
          </span>
        </span>
        <div className="inline-flex items-center gap-2">
          <button className="flex items-center justify-center h-8 w-8 rounded-lg border border-border-light dark:border-border-dark hover:bg-primary/10 text-text-primary-light dark:text-text-primary-dark transition-colors">
            <span className="material-symbols-outlined text-lg">
              chevron_left
            </span>
          </button>
          <button className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary text-white text-sm font-bold">
            1
          </button>
          <button className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-primary/10 text-sm text-text-primary-light dark:text-text-primary-dark transition-colors">
            2
          </button>
          <button className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-primary/10 text-sm text-text-primary-light dark:text-text-primary-dark transition-colors">
            3
          </button>
          <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
            ...
          </span>
          <button className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-primary/10 text-sm text-text-primary-light dark:text-text-primary-dark transition-colors">
            5
          </button>
          <button className="flex items-center justify-center h-8 w-8 rounded-lg border border-border-light dark:border-border-dark hover:bg-primary/10 text-text-primary-light dark:text-text-primary-dark transition-colors">
            <span className="material-symbols-outlined text-lg">
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

