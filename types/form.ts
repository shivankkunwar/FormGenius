export type QuestionType = 'short' | 'long' | 'single' | 'number' | 'url';

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  required: boolean;
  options?: string[]; 
  order: number;
}

export interface Form {
  id: string;
  title: string;
  questions: Question[];
  createdAt: Date;
}

export interface FormResponse {
  id: string;
  formId: string;
  answers: {
    questionId: string;
    value: string;
  }[];
  submittedAt: Date;
}

export type FormSubmission = {
  id: string;
  title: string;
  responses: FormResponse[];
  createdAt: Date;
  updatedAt: Date;
};