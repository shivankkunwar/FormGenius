
'use client'
import React, { useCallback, useState } from "react";
import {
  AlignLeft,
  ArrowUpRight,
  CalendarDays,
  Check,
  CircleDot,
  FilePen,
  Hash,
  Layout,
  Link,
  Pencil,
  Plus,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import DraggableAnswerComponent from "../components/DraggableAnswerComponent";
import FormPreview from "../components/formPreview";
import { SubmissionsView } from "../components/forms/SubmissionsView";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { MdOutlineShortText } from "react-icons/md";
import { FormSubmission } from "../types/form";
import { Toast } from "../components/ui/Toast";

type questions = {
  id: string;
  type: string;
  question?: string;
  error?: boolean;
  options?: string[];
  caption?: string;
};

type View = 'editor' | 'submissions';

export default function Home() {
  const [currentView, setCurrentView] = useState<View>('editor');
  const [isPreview, setIsPreview] = useState(false);
  const [questions, setQuestions] = useState<questions[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [dropdownDirection, setDropdownDirection] = useState("down");
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [title , setTitle]= useState("Untitled Form")
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setQuestions((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

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
    setQuestions([
      ...questions,
      { id: crypto.randomUUID(), type: type }
    ]);
    setShowModal(false);
  };
  
  const handleQuestionChange = useCallback((questionId: string, updatedQuestion: Partial<questions>) => {
    setQuestions((prevQuestions) => 
      prevQuestions.map((q) =>
        q.id === questionId
          ? { ...q, ...updatedQuestion, error: false }
          : q
      )
    );
  }, []);
  const handleFormSubmit = () => {
    const newSubmission: FormSubmission = {
      id: crypto.randomUUID(),
      title: title?title:"Untitled Form",
      responses: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSubmissions([...submissions, newSubmission]);
    setToast({ show: true, message: 'Form published successfully!' });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
    setCurrentView('submissions');
  };

  const showComingSoonToast = (feature: string) => {
    setToast({ show: true, message: `${feature} feature coming soon!` });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen  bg-gray-50">
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Layout className="w-6 h-6 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">FormBuilder</span>
            </div>
            <nav className="flex space-x-4">
              <button
                onClick={() => setCurrentView('editor')}
                className={`px-1 py-2 rounded-md text-sm font-medium ${
                  currentView === 'editor'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Form Editor
              </button>
              <button
                onClick={() => setCurrentView('submissions')}
                className={`px-1 py-2 rounded-md text-sm font-medium ${
                  currentView === 'submissions'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Submissions
              </button>
            </nav>
          </div>
        </div>
      </div>

      <main className=" w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'editor' ? (
          <div className="flex flex-col h-[calc(100vh-8rem)] max-w-screen-md mx-auto border rounded-lg bg-white">
            <div className="mb-8 flex justify-between items-center border-b px-4 md:px-6 pt-4 md:pt-6 pb-4">
              <input
                type="text"
                placeholder="Untitled form"
                className="text-2xl font-medium w-full border-none focus:outline-none focus:ring-0 bg-transparent"
                defaultValue="Untitled Form"
                onChange={(e)=>{
                  setTitle(e.target.value)
                }} 
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
                {isPreview ? <Pencil className="w-4"/> : <ArrowUpRight className="w-4" />}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {isPreview ? (
                <FormPreview questions={questions}/>
              ) : (
                <>
                  <div className="px-4 md:px-6">
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                        items={questions}
                        strategy={verticalListSortingStrategy}
                      >
                        {questions.length>0 &&questions.map((question) => (
                          <DraggableAnswerComponent
                            key={question?.id}
                            id={question?.id}
                            type={question?.type}
                            question={question?.question}
                            error={question?.error}
                            onChange={(updatedQuestion) => 
                              handleQuestionChange(question.id, updatedQuestion)
                            }
                          />
                        ))}
                      </SortableContext>
                    </DndContext>
                  </div>

                  <AnimatePresence>
                    {showModal && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        // @ts-expect-error: check deployment fix temporary
                        className="fixed inset-0 flex items-center justify-center z-10"
                      >
                        <div
                          className="absolute inset-0 bg-gray-900 opacity-50 cursor-pointer"
                          onClick={toggleModal}
                        />
                        <div className="bg-white rounded-lg p-6 relative z-20 w-full max-w-md">
                          <h2 className="text-2xl font-bold mb-4">Add Question</h2>
                          <div
                            className={`relative ${
                              dropdownDirection === "up"
                                ? "top-auto bottom-full mb-2"
                                : "bottom-auto top-full mt-2"
                            }`}
                          >
                            <div className="bg-white border rounded-lg p-4 w-full">
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
                                  className="flex gap-2 hover:bg-gray-100 p-2 cursor-pointer"
                                  onClick={() => addQuestionType("number")}
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
                              className="bg-gray-200 rounded-xl hover:bg-gray-300 text-gray-700 font-bold py-2 px-4"
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
                      // @ts-expect-error: check deployment fix temporary
                      onClick={toggleModal}
                      className="flex items-center gap-2 text-black hover:text-gray-700 font-semibold px-4 py-2 bg-white border rounded-2xl shadow-sm"
                    >
                      <Plus size={20} />
                      Add Question
                    </motion.button>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-between bg-gray-50 items-center border-t mt-auto pt-4 px-4 md:px-6 pb-4">
              <button 
                onClick={() => showComingSoonToast('Save as Draft')}
                className="flex px-4 py-2 rounded-2xl text-black font-semibold border bg-white hover:bg-gray-50"
              >
                <FilePen className="w-4 mr-1 text-black font-semibold" /> Save as Draft
              </button>
              <button 
                onClick={handleFormSubmit}
                className="flex px-4 py-2 rounded-2xl bg-blue-600 text-white hover:bg-blue-700"
              >
                <Check className="w-4 mr-1" /> Publish Form
              </button>
            </div>
          </div>
        ) : (
          <SubmissionsView submissions={submissions} />
        )}
      </main>
      <Toast show={toast.show} message={toast.message} />
    </div>
  );
}