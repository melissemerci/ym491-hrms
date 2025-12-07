import React from "react";

export const Icons = {
  Logo: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      fill="none"
      height="32"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      <rect height="10" width="4" x="2" y="10"></rect>
      <rect height="10" width="4" x="18" y="10"></rect>
    </svg>
  ),
  Mail: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      fill="currentColor"
      {...props}
    >
      <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
    </svg>
  ),
  Lock: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      fill="currentColor"
      {...props}
    >
      <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
    </svg>
  ),
  Visibility: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      fill="currentColor"
      {...props}
    >
      <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-200Z" />
    </svg>
  ),
  VisibilityOff: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      fill="currentColor"
      {...props}
    >
      <path d="M796-135 533-398q-13-10-27.5-14.5T480-417q-35 0-58.5 23.5T398-335q0 16 5.5 29.5T417-277L164-524q12-23 26.5-44t31.5-39q-16-12-25-30t-9-39q0-38 26.5-64.5T280-766q21 0 39 9t30 25q18-17 39-31.5t44-26.5l253-253 57 57-636 636-57-57Zm-64-198-76-76q6-10 8-21.5t2-24.5q0-45-31.5-76.5T603-563q-13 0-24.5 2t-21.5 8L481-629q22-6 45.5-9t47.5-3q77 0 140.5 29t110.5 79q-15 25-35 46.5T732-433v100Zm-252-75-48-48q-5-2-9-3.5t-9-1.5q-45 0-76.5 31.5T306-354q0 5 1.5 9t3.5 9l-48 48q-25-27-39-60.5T210-417q26-67 84-111.5T449-573l31 31v34Z"/>
    </svg>
  ),
  ArrowLeft: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      fill="currentColor"
      {...props}
    >
      <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/>
    </svg>
  ),
};


