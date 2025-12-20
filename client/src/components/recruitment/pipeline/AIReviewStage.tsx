"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { JobApplication } from "@/features/recruitment/types";
import { useAdvanceApplication, useUpdateAIReview } from "@/features/recruitment/hooks/use-pipeline";
import StageCard from "./StageCard";
import StageActions from "./StageActions";
import ProgressIndicator from "./ProgressIndicator";

interface AIReviewStageProps {
  applications: JobApplication[];
  isLoading: boolean;
  jobId: number;
}

export default function AIReviewStage({ applications, isLoading, jobId }: AIReviewStageProps) {
  const advanceMutation = useAdvanceApplication();
  const [expandedAppId, setExpandedAppId] = useState<number | null>(null);

  const handleAdvance = (appId: number) => {
    advanceMutation.mutate({
      appId,
      stageUpdate: { stage: "exam", notes: "Approved after AI review" }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          <p className="text-text-secondary-light dark:text-text-secondary-dark">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4 py-12 text-center"
      >
        <span className="material-symbols-outlined text-6xl text-text-secondary-light dark:text-text-secondary-dark">
          psychology
        </span>
        <div>
          <p className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
            No applications in AI review
          </p>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
            Move applications from "Apply" stage to start AI review
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4"
    >
      {applications.map((app) => {
        const isExpanded = expandedAppId === app.id;
        const reviewResult = app.ai_review_result;
        const hasReview = !!reviewResult;

        return (
          <StageCard key={app.id} application={app}>
            <div className="flex flex-col gap-4">
              <ProgressIndicator currentStage={app.pipeline_stage} />
              
              {/* AI Review Score */}
              {app.ai_review_score !== null && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-text-secondary-light dark:text-text-secondary-dark">
                      AI Match Score:
                    </span>
                    <div className={`px-3 py-1 rounded-full font-bold ${
                      app.ai_review_score >= 80 
                        ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                        : app.ai_review_score >= 60
                        ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                        : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                    }`}>
                      {app.ai_review_score}%
                    </div>
                  </div>
                  
                  {reviewResult && (
                    <button
                      onClick={() => setExpandedAppId(isExpanded ? null : app.id)}
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      {isExpanded ? "Hide" : "Show"} Details
                      <span className="material-symbols-outlined text-sm">
                        {isExpanded ? "expand_less" : "expand_more"}
                      </span>
                    </button>
                  )}
                </div>
              )}

              {/* AI Review Details (Expandable) */}
              {isExpanded && reviewResult && (
                <div className="bg-background-light dark:bg-background-dark rounded-lg p-4 space-y-4">
                  <div>
                    <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                      Explanation:
                    </p>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      {reviewResult.explanation}
                    </p>
                  </div>

                  {reviewResult.strengths && reviewResult.strengths.length > 0 && (
                    <div>
                      <p className="text-sm font-bold text-green-600 dark:text-green-400 mb-2">
                        Strengths:
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        {reviewResult.strengths.map((strength, idx) => (
                          <li key={idx} className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {reviewResult.concerns && reviewResult.concerns.length > 0 && (
                    <div>
                      <p className="text-sm font-bold text-red-600 dark:text-red-400 mb-2">
                        Concerns:
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        {reviewResult.concerns.map((concern, idx) => (
                          <li key={idx} className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                            {concern}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-between items-center">
                <div>
                  {!hasReview ? (
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Waiting for AI analysis...
                    </p>
                  ) : reviewResult.suitable ? (
                    <p className="text-sm text-green-600 dark:text-green-400">
                      ✓ Suitable for the role
                    </p>
                  ) : (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      ✗ Not recommended for the role
                    </p>
                  )}
                </div>
                {hasReview && (
                  <StageActions
                    onAdvance={() => handleAdvance(app.id)}
                    advanceLabel="Proceed to Exam"
                    isLoading={advanceMutation.isPending}
                  />
                )}
              </div>
            </div>
          </StageCard>
        );
      })}
    </motion.div>
  );
}


