"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { JobApplication } from "@/features/recruitment/types";
import { useAssignExam, useAdvanceApplication } from "@/features/recruitment/hooks/use-pipeline";
import StageCard from "./StageCard";
import StageActions from "./StageActions";
import ProgressIndicator from "./ProgressIndicator";

interface ExamStageProps {
  applications: JobApplication[];
  isLoading: boolean;
  jobId: number;
}

export default function ExamStage({ applications, isLoading, jobId }: ExamStageProps) {
  const assignExamMutation = useAssignExam();
  const advanceMutation = useAdvanceApplication();
  const [showAssignModal, setShowAssignModal] = useState<number | null>(null);

  const handleAssignExam = (appId: number, platform: string, examId: string) => {
    assignExamMutation.mutate({
      appId,
      examData: {
        platform,
        exam_id: examId,
        instructions: "Complete the exam within 48 hours"
      }
    });
    setShowAssignModal(null);
  };

  const handleAdvance = (appId: number) => {
    advanceMutation.mutate({
      appId,
      stageUpdate: { stage: "ai_interview", notes: "Exam completed successfully" }
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
          quiz
        </span>
        <div>
          <p className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
            No applications in exam stage
          </p>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
            Applications will appear here after AI review approval
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
        const hasExam = app.exam_assigned;
        const examCompleted = app.exam_completed_at !== null;

        return (
          <StageCard key={app.id} application={app}>
            <div className="flex flex-col gap-4">
              <ProgressIndicator currentStage={app.pipeline_stage} />
              
              {/* Exam Status */}
              <div className="bg-background-light dark:bg-background-dark rounded-lg p-4">
                {!hasExam ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark mb-1">
                        Ready to assign exam
                      </p>
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                        Assign a technical assessment to evaluate candidate skills
                      </p>
                    </div>
                    <button
                      onClick={() => setShowAssignModal(app.id)}
                      className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
                    >
                      Assign Exam
                    </button>
                  </div>
                ) : !examCompleted ? (
                  <div>
                    <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                      Exam Assigned
                    </p>
                    <div className="space-y-1 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      <p>Platform ID: {app.exam_platform_id}</p>
                      <p className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-yellow-500">
                          hourglass_empty
                        </span>
                        Waiting for candidate to complete exam...
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                      Exam Completed
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-text-secondary-light dark:text-text-secondary-dark">
                          Score:
                        </span>
                        <div className={`px-3 py-1 rounded-full font-bold ${
                          (app.exam_score || 0) >= 70
                            ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                            : (app.exam_score || 0) >= 50
                            ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                            : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                        }`}>
                          {app.exam_score}%
                        </div>
                      </div>
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                        Completed: {new Date(app.exam_completed_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Assign Exam Modal */}
              {showAssignModal === app.id && (
                <div className="bg-background-light dark:bg-background-dark rounded-lg p-4 border-2 border-primary">
                  <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark mb-3">
                    Assign Technical Exam
                  </p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-1 block">
                        Platform (External exam system details will be integrated)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., HackerRank, CodeSignal"
                        className="w-full px-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark text-text-primary-light dark:text-text-primary-dark text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-1 block">
                        Exam ID
                      </label>
                      <input
                        type="text"
                        placeholder="External platform exam ID"
                        className="w-full px-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark text-text-primary-light dark:text-text-primary-dark text-sm"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAssignExam(app.id, "Placeholder", "exam-123")}
                        className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90"
                      >
                        Assign
                      </button>
                      <button
                        onClick={() => setShowAssignModal(null)}
                        className="px-4 py-2 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-sm font-bold"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              {examCompleted && (
                <div className="flex justify-end">
                  <StageActions
                    onAdvance={() => handleAdvance(app.id)}
                    advanceLabel="Schedule Interview"
                    isLoading={advanceMutation.isPending}
                  />
                </div>
              )}
            </div>
          </StageCard>
        );
      })}
    </motion.div>
  );
}


