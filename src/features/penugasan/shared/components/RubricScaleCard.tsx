import React from 'react';
import { RUBRIC_GRADES } from '../constants/rubric';

export const RubricScaleCard: React.FC = () => {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50/60 p-4">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        Standar &amp; Acuan Rentang Nilai
      </p>
      <div className="flex flex-col gap-2">
        {RUBRIC_GRADES.map((item) => (
          <div key={item.grade} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className={`flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-extrabold border ${item.badgeClass}`}
              >
                {item.grade}
              </span>
              <span className="text-sm text-gray-700 font-medium">{item.label}</span>
            </div>
            <span className="text-xs text-gray-400 font-mono flex-shrink-0 font-medium">
              {item.range}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
