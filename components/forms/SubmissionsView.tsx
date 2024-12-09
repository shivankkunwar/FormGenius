'use Client'
import React from 'react';
import { SubmissionsTable } from './SubmissionsTable';
import { FormSubmission } from '../../types/form';
import { ClipboardList, Search } from 'lucide-react';

type SubmissionsViewProps = {
  submissions: FormSubmission[];
};

export const SubmissionsView = ({ submissions }: SubmissionsViewProps) => {
  return (
    <div className="space-y-6 max-w-screen-md  flex flex-col h-[calc(100vh-8rem)] mx-auto  rounded-lg ">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-gray-600" />
          <h1 className="text-2xl font-semibold text-gray-900">Form Submissions</h1>
        </div>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search forms..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {submissions.length > 0 ? (
        <SubmissionsTable submissions={submissions} />
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed">
          <ClipboardList className="w-12 h-12 mx-auto text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No submissions yet</h3>
          <p className="mt-2 text-gray-500">Forms that are submitted will appear here.</p>
        </div>
      )}
    </div>
  );
};