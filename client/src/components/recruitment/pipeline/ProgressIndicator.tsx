"use client";

import React from "react";
import { PipelineStage } from "@/features/recruitment/types";

const STAGES: Array<{ stage: PipelineStage; label: string }> = [
  { stage: "applied", label: "Applied" },
  { stage: "ai_review", label: "AI Review" },
  { stage: "exam", label: "Exam" },
  { stage: "ai_interview", label: "Interview" },
  { stage: "cv_verification", label: "Verification" },
  { stage: "proposal", label: "Proposal" },
];

interface ProgressIndicatorProps {
  currentStage: PipelineStage;
}

export default function ProgressIndicator({ currentStage }: ProgressIndicatorProps) {
  const currentIndex = STAGES.findIndex(s => s.stage === currentStage);

  return (
    <div className="flex items-center gap-2">
      {STAGES.map((stage, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isPending = index > currentIndex;

        return (
          <React.Fragment key={stage.stage}>
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isCurrent
                    ? "bg-primary text-white ring-4 ring-primary/20"
                    : "bg-background-light dark:bg-background-dark text-text-secondary-light dark:text-text-secondary-dark"
                }`}
              >
                {isCompleted ? (
                  <span className="material-symbols-outlined text-sm">check</span>
                ) : (
                  index + 1
                )}
              </div>
              <span className={`text-xs whitespace-nowrap ${
                isCurrent 
                  ? "text-primary font-bold" 
                  : "text-text-secondary-light dark:text-text-secondary-dark"
              }`}>
                {stage.label}
              </span>
            </div>
            {index < STAGES.length - 1 && (
              <div className={`h-0.5 w-8 flex-shrink-0 ${
                isCompleted ? "bg-green-500" : "bg-border-light dark:bg-border-dark"
              }`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}


