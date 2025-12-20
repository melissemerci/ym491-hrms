"use client";

import React from "react";
import { motion } from "motion/react";
import { JobApplication, DocumentRequirement } from "@/features/recruitment/types";
import { useAdvanceApplication } from "@/features/recruitment/hooks/use-pipeline";
import StageCard from "./StageCard";
import StageActions from "./StageActions";
import ProgressIndicator from "./ProgressIndicator";

interface CVVerificationStageProps {
  applications: JobApplication[];
  isLoading: boolean;
  jobId: number;
}

export default function CVVerificationStage({ applications, isLoading, jobId }: CVVerificationStageProps) {
  const advanceMutation = useAdvanceApplication();

  const handleAdvance = (appId: number) => {
    advanceMutation.mutate({
      appId,
      stageUpdate: { stage: "proposal", notes: "All documents verified" }
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
          verified
        </span>
        <div>
          <p className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
            No applications in verification stage
          </p>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
            Applications will appear here after completing the interview
          </p>
        </div>
      </motion.div>
    );
  }

  // Sample document checklist
  const defaultDocuments: DocumentRequirement[] = [
    { document_type: "id_card", title: "Government-issued ID", description: "Passport, Driver's License, or National ID", required: true, submitted: false },
    { document_type: "diploma", title: "Educational Diploma", description: "Degree certificate or diploma", required: true, submitted: false },
    { document_type: "certificate", title: "Professional Certificates", description: "Relevant certifications", required: false, submitted: false },
    { document_type: "reference", title: "Professional References", description: "2-3 professional references", required: true, submitted: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4"
    >
      {applications.map((app) => {
        const documents = app.documents_required || defaultDocuments;
        const submittedDocuments = app.documents_submitted || [];
        const totalRequired = documents.filter(d => d.required).length;
        const totalSubmitted = submittedDocuments.filter(d => d.submitted).length;
        const allSubmitted = totalRequired === totalSubmitted;

        return (
          <StageCard key={app.id} application={app}>
            <div className="flex flex-col gap-4">
              <ProgressIndicator currentStage={app.pipeline_stage} />
              
              {/* Document Checklist */}
              <div className="bg-background-light dark:bg-background-dark rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark">
                    Document Verification Checklist
                  </p>
                  <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                    {totalSubmitted} / {totalRequired} required
                  </span>
                </div>
                
                <div className="space-y-3">
                  {documents.map((doc, idx) => {
                    const isSubmitted = submittedDocuments.some(
                      d => d.document_type === doc.document_type && d.submitted
                    );

                    return (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border border-border-light dark:border-border-dark">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                          isSubmitted 
                            ? "bg-green-500 text-white" 
                            : "bg-background-light dark:bg-background-dark border-2 border-border-light dark:border-border-dark"
                        }`}>
                          {isSubmitted && (
                            <span className="material-symbols-outlined text-sm">check</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark">
                              {doc.title}
                            </p>
                            {doc.required && (
                              <span className="text-xs px-2 py-0.5 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">
                                Required
                              </span>
                            )}
                          </div>
                          {doc.description && (
                            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
                              {doc.description}
                            </p>
                          )}
                          {isSubmitted && doc.file_url && (
                            <a
                              href={doc.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:underline mt-1 inline-block"
                            >
                              View Document →
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {!allSubmitted && (
                  <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-500 rounded-lg">
                    <p className="text-xs text-yellow-800 dark:text-yellow-400">
                      ⚠ Waiting for candidate to submit required documents
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              {allSubmitted && (
                <div className="flex justify-end">
                  <StageActions
                    onAdvance={() => handleAdvance(app.id)}
                    advanceLabel="Send Proposal"
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


