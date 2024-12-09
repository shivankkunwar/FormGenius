'use client'

import { useState, useEffect } from 'react'
import { Circle, AlertCircle } from 'lucide-react'

interface PreviewProps {
  questions: Array<{
    id: string;
    type: string;
    question?: string;
    error?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options?: any;
    caption?: string;
  }>
}

export default function FormPreview({ questions }: PreviewProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [errors, setErrors] = useState<Record<number, boolean>>({})
  const [completeness, setCompleteness] = useState(0)

  useEffect(() => {
    const filledFields = Object.values(answers).filter(answer => answer?.trim()).length
    const newCompleteness = Math.round((filledFields / questions.length) * 100)
    setCompleteness(newCompleteness)
  }, [answers, questions])

  const handleInputChange = (index: number, value: string) => {
    setAnswers(prev => ({ ...prev, [index]: value }))
    if (value.trim()) {
      setErrors(prev => ({ ...prev, [index]: false }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<number, boolean> = {}
    let hasErrors = false

    questions.forEach((_, index) => {
      if (!answers[index]?.trim()) {
        newErrors[index] = true
        hasErrors = true
      }
    })

    setErrors(newErrors)
    if (!hasErrors) {
      console.log('Form submitted:', answers)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 w-full">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Form completeness</span>
          <span className="text-sm font-medium">{completeness}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completeness}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((q, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
              <label className="block text-sm font-bold text-gray-900">
                {q.question || 'Untitled Question'}
              </label>
              <label className="block text-sm font-medium text-gray-500">
                {q?.caption || 'Untitled Question'}
              </label>
              </div>
              
              {errors[index] && (
                <div className="flex items-center text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Required
                </div>
              )}
            </div>
            {q.type === 'short answer' && (
              <input
                type="text"
                className={`w-full p-2 border rounded-lg ${
                  errors[index] ? 'border-red-500' : 'border-gray-300'
                }`}
                onChange={(e) => handleInputChange(index, e.target.value)}
                value={answers[index] || ''}
              />
            )}
            {q.type === 'long answer' && (
              <textarea
                className={`w-full p-2 border rounded-lg ${
                  errors[index] ? 'border-red-500' : 'border-gray-300'
                }`}
                rows={3}
                onChange={(e) => handleInputChange(index, e.target.value)}
                value={answers[index] || ''}
              />
            )}
            {q.type === 'single select' && (
              <div className="space-y-2">
                
                {// @ts-ignore
                q.options?.map((option, optionIndex) => (
                  <label key={optionIndex} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      className="hidden"
                      onChange={() => handleInputChange(index, option)}
                      checked={answers[index] === option}
                    />
                    <div className="flex items-center space-x-2 cursor-pointer">
                      <Circle className={`w-4 h-4 ${answers[index] === option ? 'text-green-500 fill-green-500' : 'text-gray-300'}`} />
                      <span>{option}</span>
                    </div>
                  </label>
                ))}
              </div>
            )}
            {q.type === 'number' && (
              <input
                type="number"
                className={`w-full p-2 border rounded-lg ${
                  errors[index] ? 'border-red-500' : 'border-gray-300'
                }`}
                onChange={(e) => handleInputChange(index, e.target.value)}
                value={answers[index] || ''}
              />
            )}
            {q.type === 'url' && (
              <input
                type="url"
                className={`w-full p-2 border rounded-lg ${
                  errors[index] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://"
                onChange={(e) => handleInputChange(index, e.target.value)}
                value={answers[index] || ''}
              />
            )}
            {q.type === 'date' && (
              <input
                type="date"
                className={`w-full p-2 border rounded-lg ${
                  errors[index] ? 'border-red-500' : 'border-gray-300'
                }`}
                onChange={(e) => handleInputChange(index, e.target.value)}
                value={answers[index] || ''}
              />
            )}
          </div>
        ))}
        <div className="w-full flex justify-end">
        <button
          type="submit"
          className="w-50  bg-green-500 text-white rounded-lg py-2 px-4 hover:bg-green-600 transition-colors"
        >
          Submit
        </button>

        </div>
        
      </form>
    </div>
  )
}

