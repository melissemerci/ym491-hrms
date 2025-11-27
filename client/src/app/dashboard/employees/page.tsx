import React from "react";

export default function EmployeesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-[#0e121b] dark:text-white">
            Employees
          </h1>
          <p className="text-base text-[#4e6797] dark:text-gray-400">
            Manage all employees in your organization.
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
                  Employee ID
                </th>
                <th className="px-6 py-3" scope="col">
                  Department
                </th>
                <th className="px-6 py-3" scope="col">
                  Status
                </th>
                <th className="px-6 py-3" scope="col">
                  Start Date
                </th>
                <th className="px-6 py-3 text-right" scope="col">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr className="bg-white dark:bg-[#1a2233] border-b border-[#e7ebf3] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="p-4 w-4">
                  <input
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary bg-gray-100 dark:bg-gray-700"
                    type="checkbox"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBU2AFhKIVXtOq2OW5uRB1q3jFSD3YXyE3-nmJi6pUpvMGKI8RfjbU0Gsil-okq8OkHQufM-nMMiAjJjhhg-JKTAZnv7Sss4R6c6KY3x53cXj-j02pr_na8WfryDqt3dYmARXdPaQvAbN5R4kaPoWGBy-4Sck6lSFdon8klFhOhJjZmWcGXfYZMhBq5TD1Iicg8iBIqqbLYXsMpLkvKdaQRMsXfP5NPbrodBFGbIjWEbByyAwmyiwnthXajnwdKbXV3jK7pQFa8TBIS')",
                      }}
                    ></div>
                    <div className="flex flex-col">
                      <p className="font-medium text-[#0e121b] dark:text-white">
                        Jane Doe
                      </p>
                      <p className="text-xs text-[#4e6797] dark:text-gray-400">
                        jane.doe@example.com
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-[#4e6797] dark:text-gray-300">
                  EMP-00123
                </td>
                <td className="px-6 py-4 text-[#0e121b] dark:text-white">
                  Product & Engineering
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-green-100 dark:bg-green-900/50 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-300">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span>Active</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-[#0e121b] dark:text-white">
                  Oct 15, 2021
                </td>
                <td className="px-6 py-4 text-right">
                  <a
                    className="font-medium text-primary hover:underline"
                    href="/dashboard/employees/123"
                  >
                    View Profile
                  </a>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="bg-white dark:bg-[#1a2233] border-b border-[#e7ebf3] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="p-4 w-4">
                  <input
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary bg-gray-100 dark:bg-gray-700"
                    type="checkbox"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCBTH1oFF6iLRPPg9IPYIuRNAtQOQ9SabKRQznfn1u-nYTvGvP-c8pRkG-p48-s84Zg7hIsrBl2BX04T3ek_oGLH2qZYvc1YZ6mucOEuZjjvgrhxGM2lp4pblzKnnr0PCqJ23uxwpcy7e5Y-6i8w3_zTNt_Gt7u1KW9BZGOe0UGMEMovoXzUBuiK_ttNYs-m5_5XEWwXY_YWhZlG0P-hzllriLabPdRwksbVQndVrLZ6eR1BshPeF_2IvZ_LjjJAH1d-aHES3lBbKkX')",
                      }}
                    ></div>
                    <div className="flex flex-col">
                      <p className="font-medium text-[#0e121b] dark:text-white">
                        John Smith
                      </p>
                      <p className="text-xs text-[#4e6797] dark:text-gray-400">
                        john.smith@example.com
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-[#4e6797] dark:text-gray-300">
                  EMP-00124
                </td>
                <td className="px-6 py-4 text-[#0e121b] dark:text-white">
                  Marketing
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-green-100 dark:bg-green-900/50 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-300">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span>Active</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-[#0e121b] dark:text-white">
                  Sep 01, 2020
                </td>
                <td className="px-6 py-4 text-right">
                  <a
                    className="font-medium text-primary hover:underline"
                    href="/dashboard/employees/123"
                  >
                    View Profile
                  </a>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="bg-white dark:bg-[#1a2233] border-b border-[#e7ebf3] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="p-4 w-4">
                  <input
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary bg-gray-100 dark:bg-gray-700"
                    type="checkbox"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCBTH1oFF6iLRPPg9IPYIuRNAtQOQ9SabKRQznfn1u-nYTvGvP-c8pRkG-p48-s84Zg7hIsrBl2BX04T3ek_oGLH2qZYvc1YZ6mucOEuZjjvgrhxGM2lp4pblzKnnr0PCqJ23uxwpcy7e5Y-6i8w3_zTNt_Gt7u1KW9BZGOe0UGMEMovoXzUBuiK_ttNYs-m5_5XEWwXY_YWhZlG0P-hzllriLabPdRwksbVQndVrLZ6eR1BshPeF_2IvZ_LjjJAH1d-aHES3lBbKkX')",
                      }}
                    ></div>
                    <div className="flex flex-col">
                      <p className="font-medium text-[#0e121b] dark:text-white">
                        Emily Jones
                      </p>
                      <p className="text-xs text-[#4e6797] dark:text-gray-400">
                        emily.jones@example.com
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-[#4e6797] dark:text-gray-300">
                  EMP-00125
                </td>
                <td className="px-6 py-4 text-[#0e121b] dark:text-white">
                  Sales
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-red-100 dark:bg-red-900/50 px-2 py-1 text-xs font-medium text-red-700 dark:text-red-300">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span>Inactive</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-[#0e121b] dark:text-white">
                  Jun 22, 2022
                </td>
                <td className="px-6 py-4 text-right">
                  <a
                    className="font-medium text-primary hover:underline"
                    href="/dashboard/employees/123"
                  >
                    View Profile
                  </a>
                </td>
              </tr>

              {/* Row 4 */}
              <tr className="bg-white dark:bg-[#1a2233] border-b border-[#e7ebf3] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="p-4 w-4">
                  <input
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary bg-gray-100 dark:bg-gray-700"
                    type="checkbox"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCBTH1oFF6iLRPPg9IPYIuRNAtQOQ9SabKRQznfn1u-nYTvGvP-c8pRkG-p48-s84Zg7hIsrBl2BX04T3ek_oGLH2qZYvc1YZ6mucOEuZjjvgrhxGM2lp4pblzKnnr0PCqJ23uxwpcy7e5Y-6i8w3_zTNt_Gt7u1KW9BZGOe0UGMEMovoXzUBuiK_ttNYs-m5_5XEWwXY_YWhZlG0P-hzllriLabPdRwksbVQndVrLZ6eR1BshPeF_2IvZ_LjjJAH1d-aHES3lBbKkX')",
                      }}
                    ></div>
                    <div className="flex flex-col">
                      <p className="font-medium text-[#0e121b] dark:text-white">
                        Michael Brown
                      </p>
                      <p className="text-xs text-[#4e6797] dark:text-gray-400">
                        michael.brown@example.com
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-[#4e6797] dark:text-gray-300">
                  EMP-00126
                </td>
                <td className="px-6 py-4 text-[#0e121b] dark:text-white">
                  Human Resources
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-green-100 dark:bg-green-900/50 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-300">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span>Active</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-[#0e121b] dark:text-white">
                  Mar 12, 2023
                </td>
                <td className="px-6 py-4 text-right">
                  <a
                    className="font-medium text-primary hover:underline"
                    href="/dashboard/employees/123"
                  >
                    View Profile
                  </a>
                </td>
              </tr>

              {/* Row 5 */}
              <tr className="bg-white dark:bg-[#1a2233] hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="p-4 w-4">
                  <input
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary bg-gray-100 dark:bg-gray-700"
                    type="checkbox"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCBTH1oFF6iLRPPg9IPYIuRNAtQOQ9SabKRQznfn1u-nYTvGvP-c8pRkG-p48-s84Zg7hIsrBl2BX04T3ek_oGLH2qZYvc1YZ6mucOEuZjjvgrhxGM2lp4pblzKnnr0PCqJ23uxwpcy7e5Y-6i8w3_zTNt_Gt7u1KW9BZGOe0UGMEMovoXzUBuiK_ttNYs-m5_5XEWwXY_YWhZlG0P-hzllriLabPdRwksbVQndVrLZ6eR1BshPeF_2IvZ_LjjJAH1d-aHES3lBbKkX')",
                      }}
                    ></div>
                    <div className="flex flex-col">
                      <p className="font-medium text-[#0e121b] dark:text-white">
                        Jessica Williams
                      </p>
                      <p className="text-xs text-[#4e6797] dark:text-gray-400">
                        jessica.williams@example.com
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-[#4e6797] dark:text-gray-300">
                  EMP-00127
                </td>
                <td className="px-6 py-4 text-[#0e121b] dark:text-white">
                  Finance
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 dark:bg-yellow-900/50 px-2 py-1 text-xs font-medium text-yellow-800 dark:text-yellow-300">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    <span>On Leave</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-[#0e121b] dark:text-white">
                  Jan 05, 2019
                </td>
                <td className="px-6 py-4 text-right">
                  <a
                    className="font-medium text-primary hover:underline"
                    href="/dashboard/employees/123"
                  >
                    View Profile
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#e7ebf3] dark:border-gray-700">
          <p className="text-sm text-[#4e6797] dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-[#0e121b] dark:text-white">
              1-5
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#0e121b] dark:text-white">
              100
            </span>
          </p>
          <div className="flex items-center gap-2">
            <button
              className="flex items-center justify-center rounded-lg h-9 px-3 border border-[#d0d7e7] dark:border-gray-700 text-sm font-medium text-[#0e121b] dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
              disabled
            >
              Previous
            </button>
            <button className="flex items-center justify-center rounded-lg h-9 px-3 border border-[#d0d7e7] dark:border-gray-700 text-sm font-medium text-[#0e121b] dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

