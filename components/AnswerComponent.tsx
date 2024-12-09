import {
  AlignLeft,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Circle,
  CircleDot,
  GripVertical,
  Hash,
  Link,
  Plus,
} from "lucide-react";
import React, { useState } from "react";
import { MdOutlineShortText } from "react-icons/md";
type answerType = {
  type: string;
};
const AnswerComponent = ({ type }: answerType) => {
  const [answerType, setAnswerType] = useState(type);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [options, setOptions] = useState(["Option 1", "Option 2"]);
  const [date, setDate] = useState("");

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const addOption = () => {
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  const updateOption = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };
  const handleAnswerTypeChange = (type) => {
    setAnswerType(type);
    setShowTypeDropdown(false);
  };

  return (
    <div
      className=" border rounded-2xl p-6 m-4 hover:bg-gray-100 "
      style={{ "--bg-color": "inherit" }}
    >
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
              {answerType === "short answer" ? (
                <MdOutlineShortText className="h-5 w-5 text-gray-500" />
              ) : answerType === "long answer" ? (
                <AlignLeft className="h-5 w-5 text-gray-500" />
              ) : answerType === "single select" ? (
                <CircleDot className="h-5 w-5 text-gray-500" />
              ) : answerType === "number" ? (
                <Hash className="h-5 w-5 text-gray-500" />
              ) : answerType === "url" ? (
                <Link className="h-5 w-5 text-gray-500" />
              ) : answerType === "date" ? (
                <CalendarDays className="h-5 w-5 text-gray-500" />
              ) : (
                <></>
              )}
              {showTypeDropdown ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
              <GripVertical className="ml-3 md:ml-2 h-5 w-5 text-gray-500" />
            </button>
            {showTypeDropdown && (
              <div className="absolute top-full border z-10  right-0 mt-2 w-48 bg-white shadow-md rounded-md">
                {[
                  "short answer",
                  "long answer",
                  "single select",
                  "number",
                  "url",
                  "date",
                ].map((type) => (
                  <button
                    key={type}
                    className=" flex gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    onClick={() => handleAnswerTypeChange(type)}
                  >
                    {type === "short answer" ? (
                      <MdOutlineShortText className="h-5 w-5 text-gray-500" />
                    ) : type === "long answer" ? (
                      <AlignLeft className="h-5 w-5 text-gray-500" />
                    ) : type === "single select" ? (
                      <CircleDot className="h-5 w-5 text-gray-500" />
                    ) : type === "number" ? (
                      <Hash className="h-5 w-5 text-gray-500" />
                    ) : type === "url" ? (
                      <Link className="h-5 w-5 text-gray-500" />
                    ) : type === "date" ? (
                      <CalendarDays className="h-5 w-5 text-gray-500" />
                    ) : (
                      <></>
                    )}
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {answerType !== "single select" && (
        <div className="space-y-4 border-2 rounded-xl bg-gray-100">
          {answerType === "short answer" && (
            <input
              type="text"
              className="bg-gray-100 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Short answer"
            />
          )}

          {answerType === "long answer" && (
            <textarea
              className="bg-gray-100 rounded-md px-3 py-2 w-full h-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Long answer"
              rows={3}
            ></textarea>
          )}
          {answerType === "date" && (
            <div className="flex items-center">
              <input
                type="date"
                className="bg-gray-100 rounded-md px-3 py-2 text-base flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={date}
                onChange={handleDateChange}
                style={{
                  appearance: "none",
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                }}
              />
            </div>
          )}

          {answerType === "number" && (
            <input
              type="number"
              className="bg-gray-100 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Number"
            />
          )}

          {answerType === "url" && (
            <input
              type="url"
              className="bg-gray-100 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Link to your best work"
            />
          )}
        </div>
      )}
      <div className="space-y-4 ">
        {answerType === "single select" && (
          <div className="space-y-4">
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Circle />
                <input
                  type="text"
                  className=" border rounded-md px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                />
                {index === options.length - 1 && <Plus onClick={addOption} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnswerComponent;
