"use client";

import React from "react";
import Link from "next/link";
import { JobApplication } from "@/features/recruitment/types";

interface StageCardProps {
  application: JobApplication;
  children?: React.ReactNode;
}

export default function StageCard({ application, children }: StageCardProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-6 hover:shadow-lg hover:border-primary/50 transition-all">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <Link 
              href={`#`}
              className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark hover:text-primary transition-colors"
            >
              {application.candidate_name}
            </Link>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
              {application.email}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
              Applied: {formatDate(application.applied_at)}
            </span>
            {application.pipeline_stage_updated_at && (
              <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                Updated: {formatDate(application.pipeline_stage_updated_at)}
              </span>
            )}
          </div>
        </div>

        {/* Basic Info */}
        <div className="flex flex-wrap gap-4 text-sm">
          {application.phone && (
            <div className="flex items-center gap-2 text-text-secondary-light dark:text-text-secondary-dark">
              <span className="material-symbols-outlined text-lg">phone</span>
              {application.phone}
            </div>
          )}
          {application.source && (
            <div className="flex items-center gap-2 text-text-secondary-light dark:text-text-secondary-dark">
              <span className="material-symbols-outlined text-lg">source</span>
              {application.source}
            </div>
          )}
          {application.resume_url && (
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}${application.resume_url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <span className="material-symbols-outlined text-lg">description</span>
              View Resume
            </a>
          )}
        </div>

        {/* Stage-specific content */}
        {children && (
          <div className="border-t border-border-light dark:border-border-dark pt-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}


