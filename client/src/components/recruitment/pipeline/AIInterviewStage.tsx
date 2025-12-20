"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { JobApplication } from "@/features/recruitment/types";
import { useScheduleInterview, useAdvanceApplication } from "@/features/recruitment/hooks/use-pipeline";
import StageCard from "./StageCard";
import StageActions from "./StageActions";
import ProgressIndicator from "./ProgressIndicator";

interface AIInterviewStageProps {
  applications: JobApplication[];
  isLoading: boolean;
  jobId: number;
}

export default function AIInterviewStage({ applications, isLoading, jobId }: AIInterviewStageProps) {
  const scheduleInterviewMutation = useScheduleInterview();
  const advanceMutation = useAdvanceApplication();
  const [showScheduleModal, setShowScheduleModal] = useState<number | null>(null);

  const handleScheduleInterview = (appId: number, type: 'video' | 'voice', scheduledAt: string) => {
    scheduleInterviewMutation.mutate({
      appId,
      interviewData: {
        interview_type: type,
        scheduled_at: scheduledAt,
        duration_minutes: 30,
        instructions: "AI interview instructions will be sent via email"
      }
    });
    setShowScheduleModal(null);
  };

  const handleAdvance = (appId: number) => {
    advanceMutation.mutate({
      appId,
      stageUpdate: { stage: "cv_verification", notes: "Interview completed, ready for verification" }
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
          video_chat
        </span>
        <div>
          <p className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
            No applications in interview stage
          </p>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
            Applications will appear here after completing the exam
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
        const isScheduled = app.ai_interview_scheduled_at !== null;
        const isCompleted = app.ai_interview_completed_at !== null;

        return (
          <StageCard key={app.id} application={app}>
            <div className="flex flex-col gap-4">
              <ProgressIndicator currentStage={app.pipeline_stage} />
              
              {/* Interview Status */}
              <div className="bg-background-light dark:bg-background-dark rounded-lg p-4">
                {!isScheduled ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark mb-1">
                        Ready to schedule AI interview
                      </p>
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                        Choose between video or voice AI interview
                      </p>
                    </div>
                    <button
                      onClick={() => setShowScheduleModal(app.id)}
                      className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
                    >
                      Schedule Interview
                    </button>
                  </div>
                ) : !isCompleted ? (
                  <div>
                    <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                      Interview Scheduled
                    </p>
                    <div className="space-y-1 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      <p className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">
                          {app.ai_interview_type === 'video' ? 'videocam' : 'mic'}
                        </span>
                        Type: {app.ai_interview_type === 'video' ? 'Video Interview' : 'Voice Chat'}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        Scheduled: {new Date(app.ai_interview_scheduled_at).toLocaleString()}
                      </p>
                      <p className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                        <span className="material-symbols-outlined text-sm">pending</span>
                        Waiting for candidate...
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                      Interview Completed
                    </p>
                    <div className="space-y-1 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      <p className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-green-500">check_circle</span>
                        Completed: {new Date(app.ai_interview_completed_at).toLocaleString()}
                      </p>
                      <p>Type: {app.ai_interview_type === 'video' ? 'Video Interview' : 'Voice Chat'}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Schedule Interview Modal */}
              {showScheduleModal === app.id && (
                <div className="bg-background-light dark:bg-background-dark rounded-lg p-4 border-2 border-primary">
                  <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark mb-3">
                    Schedule AI Interview
                  </p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-2 block">
                        Interview Type
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="flex flex-col items-center gap-2 p-3 border-2 border-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors">
                          <span className="material-symbols-outlined text-2xl text-primary">videocam</span>
                          <span className="text-sm font-bold text-primary">Video Interview</span>
                        </button>
                        <button className="flex flex-col items-center gap-2 p-3 border border-border-light dark:border-border-dark rounded-lg hover:bg-background-light dark:hover:bg-background-dark transition-colors">
                          <span className="material-symbols-outlined text-2xl">mic</span>
                          <span className="text-sm font-bold">Voice Chat</span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-1 block">
                        Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        className="w-full px-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark text-text-primary-light dark:text-text-primary-dark text-sm"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleScheduleInterview(app.id, 'video', new Date().toISOString())}
                        className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90"
                      >
                        Schedule
                      </button>
                      <button
                        onClick={() => setShowScheduleModal(null)}
                        className="px-4 py-2 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-sm font-bold"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              {isCompleted && (
                <div className="flex justify-end">
                  <StageActions
                    onAdvance={() => handleAdvance(app.id)}
                    advanceLabel="Proceed to Verification"
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


