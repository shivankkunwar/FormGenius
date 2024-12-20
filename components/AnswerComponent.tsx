import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
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
import React, { useEffect, useState } from "react";
import { MdOutlineShortText } from "react-icons/md";

type answerType = {
  type: string;
  question?: string;
  error?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dragHandleProps?: any;
};

const AnswerComponent = ({ type, question, error, onChange, dragHandleProps }: answerType) => {
  const [answerType, setAnswerType] = useState(type);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [options, setOptions] = useState(["Option 1", "Option 2"]);
  const [date, setDate] = useState("");
// @ts-expect-error: check deployment fix temporary
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const addOption = () => {
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  const updateOption = (index:number, value:string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleAnswerTypeChange = (type:string) => {
    setAnswerType(type);
    setShowTypeDropdown(false);
  };

  useEffect(() => {
    onChange({
      type: answerType,
      options: answerType === "single select" ? options : undefined,
    });
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerType, options, date,]);

  return (
    <motion.div
      animate={error ? { x: [-10, 10, -10, 10, 0] } : { x: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
       // @ts-expect-error: check deployment fix temporary
      className="px-2 sm:px-4"
    >
      <div
        className="border rounded-2xl m-2 p-4 sm:p-6 hover:bg-gray-100"
        // @ts-expect-error: check deployment fix temporary
        style={{ "--bg-color": "inherit" }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 space-y-2 sm:space-y-0">
          <div className="flex flex-col w-full space-y-2">
            <input
              type="text"
              className={`w-full rounded-md p-2 focus:outline-none font-semibold bg-[var(--bg-color)] ${
                error ? "placeholder-red-500" : "placeholder-gray-400"
              }`}
              placeholder="Write a Question"
              value={question || ''}
              onChange={(e) => onChange({ question: e.target.value })}
              style={error ? { color: "red" } : {}}
            />
            <input
              type="text"
              className="w-full rounded-md p-2 focus:outline-none font-normal bg-[var(--bg-color)]"
              placeholder="Write a help text or caption leave empty if not needed."
              onChange={(e) => onChange({ caption: e.target.value })}
            />
          </div>
          <div className="relative w-full sm:w-auto flex justify-between items-center">
            <button
              className="rounded-md px-2 py-2 flex items-center focus:outline-none focus:ring-blue-500"
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
              <div {...dragHandleProps}>
                <GripVertical className="ml-1 sm:ml-2 h-5 w-5 text-gray-500 cursor-grab active:cursor-grabbing" />
              </div>
            </button>
            {showTypeDropdown && (
              <div className="absolute top-full border z-10 right-0 mt-2 w-48 bg-white shadow-md rounded-md">
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
                    className="flex gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
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

        {answerType !== "single select" && (
          <div className="space-y-4 border-2 rounded-xl bg-gray-100">
            {answerType === "short answer" && (
              <input
                type="text"
                className="bg-gray-100 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Short answer"
                disabled={true}
              />
            )}

            {answerType === "long answer" && (
              <textarea
                className="bg-gray-100 rounded-md px-3 py-2 w-full h-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Long answer"
                rows={3}
                disabled={true}
              ></textarea>
            )}

            {answerType === "date" && (
              <div className="flex items-center">
                <input
                  type="date"
                  className="bg-gray-100 rounded-md px-3 py-2 text-base w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={date}
                  onChange={handleDateChange}
                  style={{
                    appearance: "none",
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                  }}
                  disabled={true}
                />
              </div>
            )}

            {answerType === "number" && (
              <input
                type="number"
                className="bg-gray-100 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Number"
                disabled={true}
              />
            )}

            {answerType === "url" && (
              <input
                type="url"
                className="bg-gray-100 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Link to your best work"
                disabled={true}
              />
            )}
          </div>
        )}

        <div className="space-y-4 mt-4">
          {answerType === "single select" && (
            <div className="space-y-4">
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 sm:space-x-4">
                  <Circle className="shrink-0" />
                  <input
                    type="text"
                    className="border rounded-md px-2 py-1 sm:px-3 sm:py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                  />
                  {index === options.length - 1 && <Plus className="shrink-0" onClick={addOption} />}
                </div>
              ))}
            </div>
          )}
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              // @ts-expect-error: check deployment fix temporary
              className="text-red-500 flex flex-row text-sm mt-2 pl-2"
            >
              <AlertCircle className="w-4 h-4 mr-1" />
              Please fill in the required field
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AnswerComponent;