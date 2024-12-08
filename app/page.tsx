'use client'

import { useState } from 'react'
import { ArrowUpRight, Check, FilePen, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { formStyles as styles } from '@/styles/form'

export default function Home() {
  const [isPreview, setIsPreview] = useState(false)

  return (
    <div className="flex flex-col min-h-screen max-w-2xl mx-auto  border">
    
      <div className="mb-8 flex justify-between items-center b border-b px-4 md:px-6 pt-4 md:pt-6 pb-4 md:pb=6">
        <input
          type="text"
          placeholder="Untitled form"
          className="text-2xl font-medium w-full border-none focus:outline-none focus:ring-0 bg-transparent"
          value="Untitled Form"
        />
        <button
          onClick={() => setIsPreview(!isPreview)}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 border px-3 py-1 rounded-2xl"
        >
          Preview <ArrowUpRight className='w-4' />
        </button>
      </div>

      
      <div className="relative px-4 md:px-6 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => console.log("Add Question clicked")}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 px-4 py-2 bg-white border rounded-2xl shadow-sm"
        >
          <Plus size={20} />
          Add Question
        </motion.button>
      </div>

     
      <div className="flex-1 px-4 md:px-6"></div>

  
      <div className="flex justify-between bg-gray-200 items-center border-t pt-4 px-4 md:px-6 pb-4 md:pb=6">
        <button
          className={`${styles.button.secondary} flex px-4 py-2 rounded-2xl border bg-white text-gray-600 hover:bg-gray-50`}
        >
         <FilePen className='w-4 mr-1'/> Save as Draft
        </button>
        <button
          className={`${styles.button.primary} flex px-4 py-2 rounded-2xl bg-green-500 text-white hover:bg-green-600`}
        >
         <Check  className='w-4 mr-1'/> Publish Form
        </button>
      </div>
    </div>
  )
}
