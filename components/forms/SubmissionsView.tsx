'use client'
import React, { useState } from 'react';
import { SubmissionsTable } from './SubmissionsTable';
import { FormSubmission } from '../../types/form';
import { ClipboardList, Search, X } from 'lucide-react';

type SubmissionsViewProps = {
  submissions: FormSubmission[];
};

export const SubmissionsView = ({ submissions }: SubmissionsViewProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="w-full px-4 sm:px-6 md:max-w-screen-md md:mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
        <div className="flex items-center gap-2 w-full">
          <ClipboardList className="w-6 h-6 text-gray-600 shrink-0" />
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 truncate">
            Form Submissions
          </h1>
        </div>
        
        <div className="w-full sm:w-auto relative">
          {isSearchOpen ? (
            <div className="flex items-center w-full">
              <div className="relative flex-grow">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search forms..."
                  className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchTerm && (
                  <button 
                    onClick={clearSearch} 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                )}
              </div>
              <button 
                onClick={() => setIsSearchOpen(false)} 
                className="ml-2 text-gray-600"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsSearchOpen(true)} 
              className="w-full sm:w-auto flex justify-center items-center p-2 bg-gray-100 rounded-lg"
            >
              <Search className="w-5 h-5 text-gray-600" />
              <span className="ml-2 sm:hidden">Search</span>
            </button>
          )}
        </div>
      </div>

      {submissions.length > 0 ? (
        <div className="overflow-x-auto">
          <SubmissionsTable submissions={submissions} />
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed">
          <ClipboardList className="w-12 h-12 mx-auto text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No submissions yet</h3>
          <p className="mt-2 text-gray-500 px-4">Forms that are submitted will appear here.</p>
        </div>
      )}
    </div>
  );
};