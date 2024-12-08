import { AlignLeft, ChevronDown, ChevronUp, CircleDot, GripVertical, Hash, Link } from 'lucide-react';
import React, { useState } from 'react';
import { MdOutlineShortText } from 'react-icons/md';
type answerType = {
    type : string,

}
const AnswerComponent = ({type}:answerType) => {
  const [answerType, setAnswerType] = useState(type);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const handleAnswerTypeChange = (type) => {
    setAnswerType(type);
    setShowTypeDropdown(false);
  };

  return (
    <div className=" border rounded-2xl p-6 m-4 hover:bg-gray-100 "  style={{ "--bg-color": "inherit" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-between w-full ">
          <input
            type="text"
            className=" rounded-md p py-2 md:p flex-1 focus:outline-none  font-semibold  bg-[var(--bg-color)] "
            placeholder="Write a Question"
            
          />
          <div className="relative">
            <button
              className=" rounded-md px py-2 flex items-center  focus:outline-none  focus:ring-blue-500"
              onClick={() => setShowTypeDropdown(!showTypeDropdown)}
            >
              
              {answerType === "short"?
                <MdOutlineShortText className="h-5 w-5 text-gray-500" />:
                answerType === "long"?
                <AlignLeft className="h-5 w-5 text-gray-500"/>:
                answerType === "single"?
                <CircleDot className="h-5 w-5 text-gray-500"/>:
                answerType === "number"?
                <Hash className="h-5 w-5 text-gray-500" />:
                answerType === "url"?
                <Link className="h-5 w-5 text-gray-500"/>:<></>
            
            }
              {showTypeDropdown?<ChevronUp className="h-4 w-4 text-gray-500"/>:<ChevronDown className="h-4 w-4 text-gray-500" />}
              <GripVertical className="ml-3 md:ml-2 h-5 w-5 text-gray-500" />
            </button>
            {showTypeDropdown && (
              <div className="absolute top-full z-10  right-0 mt-2 w-48 bg-white shadow-md rounded-md">
                {['short', 'long', 'single', 'number', 'url'].map((type) => (
                  <button
                    key={type}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    onClick={() => handleAnswerTypeChange(type)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4 border-2 rounded-xl bg-gray-100">
        

        {answerType === 'short' && (
          <input
            type="text"
            className="bg-gray-100 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Short answer"
          />
        )}

        {answerType === 'long' && (
          <textarea
            className="bg-gray-100 rounded-md px-3 py-2 w-full h-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Long answer"
            rows={3}
          ></textarea>
        )}

        {answerType === 'single' && (
          <div className="flex items-center space-x-4">
            <input
              type="text"
              className="bg-gray-100 rounded-md px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Single select"
            />
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                className="form-radio text-blue-500 focus:ring-blue-500"
              />
              <span className="text-gray-700">Option 1</span>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                className="form-radio text-blue-500 focus:ring-blue-500"
              />
              <span className="text-gray-700">Option 2</span>
            </div>
          </div>
        )}

        {answerType === 'number' && (
          <input
            type="number"
            className="bg-gray-100 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Number"
          />
        )}

        {answerType === 'url' && (
          <input
            type="url"
            className="bg-gray-100 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Link to your best work"
          />
        )}
      </div>
    </div>
  );
};

export default AnswerComponent;