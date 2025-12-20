"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PipelineStage } from "@/features/recruitment/types";
import { usePipelineApplications } from "@/features/recruitment/hooks/use-pipeline";
import ApplyStage from "./pipeline/ApplyStage";
import AIReviewStage from "./pipeline/AIReviewStage";
import ExamStage from "./pipeline/ExamStage";
import AIInterviewStage from "./pipeline/AIInterviewStage";
import CVVerificationStage from "./pipeline/CVVerificationStage";
import ProposalStage from "./pipeline/ProposalStage";

const PIPELINE_STAGES: Array<{
  stage: PipelineStage;
  label: string;
  icon: string;
  description: string;
}> = [
  { stage: "applied", label: "Apply", icon: "person_add", description: "New applications" },
  { stage: "ai_review", label: "AI Review", icon: "psychology", description: "AI matching analysis" },
  { stage: "exam", label: "Exam", icon: "quiz", description: "Technical assessment" },
  { stage: "ai_interview", label: "AI Interview", icon: "video_chat", description: "AI-powered interview" },
  { stage: "cv_verification", label: "CV Verification", icon: "verified", description: "Document verification" },
  { stage: "proposal", label: "Proposal", icon: "handshake", description: "Job offer" },
];

interface PipelineTabProps {
  jobId: number;
}

export default function PipelineTab({ jobId }: PipelineTabProps) {
  const [activeStage, setActiveStage] = useState<PipelineStage>("applied");
  
  // Fetch applications for the active stage
  const { data: applications = [], isLoading } = usePipelineApplications(jobId, activeStage);

  // Get counts for each stage (simplified - in production, you'd fetch these separately)
  const stageCounts = PIPELINE_STAGES.reduce((acc, { stage }) => {
    acc[stage] = stage === activeStage ? applications.length : 0;
    return acc;
  }, {} as Record<PipelineStage, number>);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col gap-6"
    >
      {/* Pipeline Stage Tabs */}
      <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {PIPELINE_STAGES.map(({ stage, label, icon, description }) => {
            const isActive = activeStage === stage;
            const count = stageCounts[stage];
            
            return (
              <button
                key={stage}
                onClick={() => setActiveStage(stage)}
                className={`relative flex flex-col items-center gap-2 p-4 rounded-lg transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "hover:bg-background-light dark:hover:bg-background-dark text-text-secondary-light dark:text-text-secondary-dark"
                }`}
              >
                <span className="material-symbols-outlined text-2xl">
                  {icon}
                </span>
                <div className="text-center">
                  <p className="text-xs font-bold">{label}</p>
                  {count > 0 && (
                    <span className={`text-xs ${isActive ? "text-white/80" : "text-text-secondary-light dark:text-text-secondary-dark"}`}>
                      ({count})
                    </span>
                  )}
                </div>
                {isActive && (
                  <motion.div
                    layoutId="activeStage"
                    className="absolute inset-0 rounded-lg border-2 border-primary"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage Description */}
      <div className="flex items-center gap-3 px-2">
        <span className="material-symbols-outlined text-primary text-2xl">
          {PIPELINE_STAGES.find(s => s.stage === activeStage)?.icon}
        </span>
        <div>
          <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
            {PIPELINE_STAGES.find(s => s.stage === activeStage)?.label}
          </h3>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
            {PIPELINE_STAGES.find(s => s.stage === activeStage)?.description}
          </p>
        </div>
      </div>

      {/* Stage Content */}
      <AnimatePresence mode="wait">
        {activeStage === "applied" && (
          <ApplyStage key="applied" applications={applications} isLoading={isLoading} jobId={jobId} />
        )}
        {activeStage === "ai_review" && (
          <AIReviewStage key="ai_review" applications={applications} isLoading={isLoading} jobId={jobId} />
        )}
        {activeStage === "exam" && (
          <ExamStage key="exam" applications={applications} isLoading={isLoading} jobId={jobId} />
        )}
        {activeStage === "ai_interview" && (
          <AIInterviewStage key="ai_interview" applications={applications} isLoading={isLoading} jobId={jobId} />
        )}
        {activeStage === "cv_verification" && (
          <CVVerificationStage key="cv_verification" applications={applications} isLoading={isLoading} jobId={jobId} />
        )}
        {activeStage === "proposal" && (
          <ProposalStage key="proposal" applications={applications} isLoading={isLoading} jobId={jobId} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}


