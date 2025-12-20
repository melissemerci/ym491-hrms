"use client";

import React from "react";

interface StageActionsProps {
  onApprove?: () => void;
  onReject?: () => void;
  onAdvance?: () => void;
  approveLabel?: string;
  rejectLabel?: string;
  advanceLabel?: string;
  isLoading?: boolean;
}

export default function StageActions({
  onApprove,
  onReject,
  onAdvance,
  approveLabel = "Approve",
  rejectLabel = "Reject",
  advanceLabel = "Move to Next Stage",
  isLoading = false,
}: StageActionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {onAdvance && (
        <button
          onClick={onAdvance}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
          {advanceLabel}
        </button>
      )}
      
      {onApprove && (
        <button
          onClick={onApprove}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-bold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-lg">check_circle</span>
          {approveLabel}
        </button>
      )}
      
      {onReject && (
        <button
          onClick={onReject}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-bold hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-lg">cancel</span>
          {rejectLabel}
        </button>
      )}
    </div>
  );
}


