"use client";

import React from "react";
import Link from "next/link";
import { useEmployees } from "@/features/employees/hooks/use-employees";

export default function EmployeesPage() {
  const { data: employees, isLoading, error } = useEmployees();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusBadge = (isActive: boolean) => {
    if (isActive) {
      return (
        <div className="inline-flex items-center gap-2 rounded-full bg-green-100 dark:bg-green-900/50 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-300">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span>Active</span>
        </div>
      );
    }
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-red-100 dark:bg-red-900/50 px-2 py-1 text-xs font-medium text-red-700 dark:text-red-300">
        <span className="w-2 h-2 rounded-full bg-red-500"></span>
        <span>Inactive</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-[#0e121b] dark:text-white">
            Employees
          </h1>
          <p className="text-base text-[#4e6797] dark:text-gray-400">
            Manage all employees in your organization. {employees && `(${employees.length} total)`}
          </p>
        </div>
        <button className="flex w-full md:w-auto cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors">
          <span className="material-symbols-outlined text-lg">add</span>
          <span className="truncate">Add New Employee</span>
        </button>
      </div>

      <div className="bg-white dark:bg-[#1a2233] rounded-xl border border-[#e7ebf3] dark:border-gray-700">
        <div className="p-4 sm:p-6 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:max-w-xs">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 text-sm border border-[#d0d7e7] dark:border-gray-700 rounded-lg bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                placeholder="Search employees..."
                type="text"
              />
            </div>
            <div className="w-full sm:w-auto flex items-center gap-4">
              <button className="flex w-full sm:w-auto items-center justify-center gap-2 text-sm font-medium text-[#4e6797] dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg">
                  filter_list
                </span>
                <span>Filter</span>
              </button>
              <button className="flex w-full sm:w-auto items-center justify-center gap-2 text-sm font-medium text-[#4e6797] dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg">
                  swap_vert
                </span>
                <span>Sort</span>
              </button>
            </div>
            <div className="sm:ml-auto flex items-center gap-2">
              <button className="flex items-center justify-center gap-2 rounded-lg h-9 px-3 border border-[#d0d7e7] dark:border-gray-700 text-sm font-medium text-[#0e121b] dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <span>Bulk Actions</span>
                <span className="material-symbols-outlined text-base">
                  expand_more
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-[#4e6797] dark:text-gray-400 uppercase bg-background-light dark:bg-gray-800 border-b border-t border-[#e7ebf3] dark:border-gray-700">
              <tr>
                <th className="p-4 w-4" scope="col">
                  <input
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary bg-gray-100 dark:bg-gray-700"
                    type="checkbox"
                  />
                </th>
                <th className="px-6 py-3" scope="col">
                  Employee Name
                </th>
                <th className="px-6 py-3" scope="col">
                  Title
                </th>
                <th className="px-6 py-3" scope="col">
                  Department
                </th>
                <th className="px-6 py-3" scope="col">
                  Status
                </th>
                <th className="px-6 py-3" scope="col">
                  Hire Date
                </th>
                <th className="px-6 py-3 text-right" scope="col">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center">
                    <div className="flex items-center justify-center gap-2 text-[#4e6797] dark:text-gray-400">
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading employees...</span>
                    </div>
                  </td>
                </tr>
              )}
              
              {error && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center">
                    <div className="text-red-500">
                      Error loading employees. Please try again.
                    </div>
                  </td>
                </tr>
              )}

              {!isLoading && !error && employees && employees.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-[#4e6797] dark:text-gray-400">
                    No employees found.
                  </td>
                </tr>
              )}

              {!isLoading && !error && employees && employees.map((employee) => (
                <tr 
                  key={employee.id}
                  className="bg-white dark:bg-[#1a2233] border-b last:border-b-0 border-[#e7ebf3] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="p-4 w-4">
                    <input
                      className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary bg-gray-100 dark:bg-gray-700"
                      type="checkbox"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/20 text-primary rounded-full size-10 flex items-center justify-center font-semibold">
                        {employee.first_name[0]}{employee.last_name[0]}
                      </div>
                      <div className="flex flex-col">
                        <p className="font-medium text-[#0e121b] dark:text-white">
                          {employee.first_name} {employee.last_name}
                        </p>
                        <p className="text-xs text-[#4e6797] dark:text-gray-400">
                          {employee.first_name.toLowerCase()}.{employee.last_name.toLowerCase()}@company.com
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#0e121b] dark:text-white">
                    {employee.title || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-[#0e121b] dark:text-white">
                    {employee.department || 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(employee.is_active)}
                  </td>
                  <td className="px-6 py-4 text-[#0e121b] dark:text-white">
                    {formatDate(employee.hire_date)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      className="font-medium text-primary hover:underline"
                      href={`/dashboard/employees/${employee.id}`}
                    >
                      View Profile
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#e7ebf3] dark:border-gray-700">
          <p className="text-sm text-[#4e6797] dark:text-gray-400">
            {employees && (
              <>
                Showing{" "}
                <span className="font-semibold text-[#0e121b] dark:text-white">
                  {employees.length > 0 ? 1 : 0}-{employees.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-[#0e121b] dark:text-white">
                  {employees.length}
                </span>
              </>
            )}
          </p>
          <div className="flex items-center gap-2">
            <button
              className="flex items-center justify-center rounded-lg h-9 px-3 border border-[#d0d7e7] dark:border-gray-700 text-sm font-medium text-[#0e121b] dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
              disabled
            >
              Previous
            </button>
            <button 
              className="flex items-center justify-center rounded-lg h-9 px-3 border border-[#d0d7e7] dark:border-gray-700 text-sm font-medium text-[#0e121b] dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

