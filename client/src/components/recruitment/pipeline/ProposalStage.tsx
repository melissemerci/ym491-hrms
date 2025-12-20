"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { JobApplication } from "@/features/recruitment/types";
import { useSendProposal } from "@/features/recruitment/hooks/use-pipeline";
import StageCard from "./StageCard";
import ProgressIndicator from "./ProgressIndicator";

interface ProposalStageProps {
  applications: JobApplication[];
  isLoading: boolean;
  jobId: number;
}

export default function ProposalStage({ applications, isLoading, jobId }: ProposalStageProps) {
  const sendProposalMutation = useSendProposal();
  const [showProposalModal, setShowProposalModal] = useState<number | null>(null);

  const handleSendProposal = (appId: number, position: string, salary: number) => {
    sendProposalMutation.mutate({
      appId,
      proposalData: {
        position,
        salary_offer: salary,
        benefits: ["Health Insurance", "401k", "Flexible Hours"],
        additional_notes: "Looking forward to having you on our team!"
      }
    });
    setShowProposalModal(null);
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
          handshake
        </span>
        <div>
          <p className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
            No applications ready for proposal
          </p>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
            Applications will appear here after document verification
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
        const proposalSent = app.proposal_sent_at !== null;
        const proposalAccepted = app.proposal_accepted;

        return (
          <StageCard key={app.id} application={app}>
            <div className="flex flex-col gap-4">
              <ProgressIndicator currentStage={app.pipeline_stage} />
              
              {/* Proposal Status */}
              <div className="bg-background-light dark:bg-background-dark rounded-lg p-4">
                {!proposalSent ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark mb-1">
                        Ready to send job proposal
                      </p>
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                        Send official job offer to the candidate
                      </p>
                    </div>
                    <button
                      onClick={() => setShowProposalModal(app.id)}
                      className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
                    >
                      Send Proposal
                    </button>
                  </div>
                ) : proposalAccepted === null ? (
                  <div>
                    <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                      Proposal Sent
                    </p>
                    <div className="space-y-1 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      <p className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">mail</span>
                        Sent: {new Date(app.proposal_sent_at).toLocaleString()}
                      </p>
                      <p className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                        <span className="material-symbols-outlined text-sm">pending</span>
                        Waiting for candidate's response...
                      </p>
                    </div>
                  </div>
                ) : proposalAccepted ? (
                  <div className="p-4 bg-green-100 dark:bg-green-900/20 border-2 border-green-500 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-3xl text-green-600 dark:text-green-400">
                        celebration
                      </span>
                      <div>
                        <p className="text-sm font-bold text-green-800 dark:text-green-200 mb-1">
                          Proposal Accepted!
                        </p>
                        <p className="text-xs text-green-700 dark:text-green-300">
                          Candidate has accepted the job offer. Proceed with onboarding.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-red-100 dark:bg-red-900/20 border-2 border-red-500 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-3xl text-red-600 dark:text-red-400">
                        cancel
                      </span>
                      <div>
                        <p className="text-sm font-bold text-red-800 dark:text-red-200 mb-1">
                          Proposal Declined
                        </p>
                        <p className="text-xs text-red-700 dark:text-red-300">
                          Candidate has declined the job offer.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Send Proposal Modal */}
              {showProposalModal === app.id && (
                <div className="bg-background-light dark:bg-background-dark rounded-lg p-4 border-2 border-primary">
                  <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark mb-3">
                    Send Job Proposal
                  </p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-1 block">
                        Position Title
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Senior Product Designer"
                        className="w-full px-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark text-text-primary-light dark:text-text-primary-dark text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-1 block">
                        Salary Offer
                      </label>
                      <input
                        type="number"
                        placeholder="Annual salary"
                        className="w-full px-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark text-text-primary-light dark:text-text-primary-dark text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-1 block">
                        Start Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark text-text-primary-light dark:text-text-primary-dark text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-1 block">
                        Additional Notes
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Welcome message, additional benefits, etc."
                        className="w-full px-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark text-text-primary-light dark:text-text-primary-dark text-sm resize-none"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSendProposal(app.id, "Position Title", 100000)}
                        className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90"
                      >
                        Send Proposal
                      </button>
                      <button
                        onClick={() => setShowProposalModal(null)}
                        className="px-4 py-2 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-sm font-bold"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </StageCard>
        );
      })}
    </motion.div>
  );
}


