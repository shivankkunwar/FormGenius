"use client";

import { useState } from "react";
import {
  AlignLeft,
  ArrowUpRight,
  CalendarDays,
  Check,
  CircleDot,
  FilePen,
  Hash,
  Link,
  Pencil,
  Plus,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { formStyles as styles } from "@/styles/form";
import AnswerComponent from "@/components/AnswerComponent";
import { FormBuilder } from "@/components/formBuilder";
import { FormProvider } from "@/context/form-context";
import { MdOutlineShortText } from "react-icons/md";
import FormPreview from "@/components/formPreview";
type questions ={
  type:string,
  question?:string,
  error?:boolean
  options?:any
  caption?:string
}
export default function Home() {
  const [isPreview, setIsPreview] = useState(false);
  const [questions, setQuestions] = useState<questions[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [dropdownDirection, setDropdownDirection] = useState("down");
  const toggleModal = () => {
    setShowModal(!showModal);

    const windowHeight = window.innerHeight;
    const modalHeight = 400;
    const dropdownHeight = 200;
    const screenBottom = windowHeight - modalHeight / 2 - dropdownHeight / 2;

    if (screenBottom < 0) {
      setDropdownDirection("up");
    } else {
      setDropdownDirection("down");
    }
  };
  const addQuestionType = (type: string) => {
    setQuestions([...questions, {type:type} ]);
    setShowModal(false);
  };
  console.log(questions)

  return (
    <div className="flex flex-col min-h-screen max-w-2xl mx-auto  border z-0">
      <div className="mb-8 flex justify-between items-center b border-b px-4 md:px-6 pt-4 md:pt-6 pb-4 md:pb=6">
        <input
          type="text"
          placeholder="Untitled form"
          className="text-2xl font-medium w-full border-none focus:outline-none focus:ring-0 bg-transparent"
          value="Untitled Form"
        />
          <button
          onClick={() => {
            const hasEmptyQuestions = questions.some(q => !q.question?.trim());
            if (hasEmptyQuestions) {
              const updatedQuestions = questions.map(q => ({
                ...q,
                error: !q.question?.trim()
              }));
              setQuestions(updatedQuestions);
              return;
            }
            setIsPreview(!isPreview);
          }}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 border px-3 py-1 rounded-2xl"
        >
          {isPreview ? 'Edit' : 'Preview'} 
          
          {isPreview?<Pencil className="w-4"/>:<ArrowUpRight className="w-4" />}
        </button>
      </div>
      
      {isPreview?
      <FormPreview questions={questions}/>:(
        <>
        <div className=" px-4 md:px-6  ">
        {questions.map((question, i) => (
          <AnswerComponent
            key={i}
            type={question.type}
            question={question?.question}
            error={question.error}
            onChange={(updatedQuestion) => {
              const newQuestions = [...questions];
              newQuestions[i] = { ...newQuestions[i],...updatedQuestion, error: false };
              setQuestions(newQuestions);
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-10"
          >
            <div
              className="absolute inset-0 bg-gray-900 opacity-50 cursor-pointer"
              onClick={toggleModal}
            />
            <div className="bg-white rounded-lg  p-6 relative z-20 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Add Question</h2>
              <div
                className={`relative ${
                  dropdownDirection === "up"
                    ? "top-auto bottom-full mb-2"
                    : "bottom-auto top-full mt-2"
                }`}
              >
                <div className="bg-white border rounded-lg  p-4 w-full">
                  <ul>
                    <li
                      className="flex gap-2 hover:bg-gray-100 p-2 cursor-pointer"
                      onClick={() => addQuestionType("short answer")}
                    >
                      <MdOutlineShortText className="h-6 w-6 text-gray-500" />
                      Short answer
                    </li>
                    <li
                      className="flex gap-2 hover:bg-gray-100 p-2 cursor-pointer"
                      onClick={() => addQuestionType("long answer")}
                    >
                      <AlignLeft className="h-5 w-5 text-gray-500" />
                      Long answer
                    </li>
                    <li
                      className="flex gap-2 hover:bg-gray-100 p-2 cursor-pointer"
                      onClick={() => addQuestionType("single select")}
                    >
                      <CircleDot className="h-5 w-5 text-gray-500" />
                      Single select
                    </li>
                    <li
                      className=" flex gap-2 hover:bg-gray-100 p-2 cursor-pointer"
                      onClick={() => addQuestionType("url")}
                    >
                      <Hash className="h-5 w-5 text-gray-500" />
                      Number
                    </li>
                    <li
                      className="flex gap-2 hover:bg-gray-100 p-2 cursor-pointer"
                      onClick={() => addQuestionType("url")}
                    >
                      <Link className="h-5 w-5 text-gray-500" />
                      URL
                    </li>
                    <li
                      className="flex gap-2 hover:bg-gray-100 p-2 cursor-pointer"
                      onClick={() => addQuestionType("date")}
                    >
                      <CalendarDays className="h-5 w-5 text-gray-500" />
                      Date
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-gray-200 rounded-xl hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 "
                  onClick={toggleModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative px-4 pb-4 md:px-6 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => toggleModal()}
          className="flex items-center gap-2  text-black hover:text-gray-700 font-semibold px-4 py-2 bg-white border rounded-2xl shadow-sm"
        >
          <Plus size={20} />
          Add Question
        </motion.button>
      </div>
      </>
      )}
      <div className="flex-1"></div>
      
      <div className="flex justify-between bg-gray-200 items-center border-t pt-4 px-4 md:px-6 pb-4 md:pb=6">
        <button
          className={`${styles.button.secondary} flex px-4 py-2 rounded-2xl  text-black font-semiboldborder bg-white  hover:bg-gray-50`}
        >
          <FilePen className="w-4 mr-1 text-black font-semibold" /> Save as
          Draft
        </button>
        <button
          className={`${styles.button.primary} flex px-4 py-2 rounded-2xl bg-green-500 text-white hover:bg-green-600`}
        >
          <Check className="w-4 mr-1" /> Publish Form
        </button>
      </div>
    </div>
  );
}
