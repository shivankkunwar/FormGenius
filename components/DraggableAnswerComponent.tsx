import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import AnswerComponent from './AnswerComponent';

type DraggableAnswerComponentProps = {
  id: string;
  type: string;
  question?: string;
  error?: boolean;
  onChange: (value: any) => void;
};

const DraggableAnswerComponent = ({ id, ...props }: DraggableAnswerComponentProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <AnswerComponent
        {...props}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
};

export default DraggableAnswerComponent;