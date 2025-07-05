import { useMutation } from '@tanstack/react-query'; // Update path as needed
import { FinalExamSubmitRequest, FinalExamSubmitResponse, FinalExamSubmitData } from '@/types/exam/final-exam';
import { toast } from 'sonner'; // or your preferred toast library
import { useState } from 'react';
import { submitFinalExam } from '@/action/exams/submit-final-exam';

export const useSubmitFinalExam = () => {
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [examResult, setExamResult] = useState<FinalExamSubmitData | null>(null);

  const mutation = useMutation<FinalExamSubmitResponse, Error, FinalExamSubmitRequest>({
    mutationFn: async (values: FinalExamSubmitRequest) => await submitFinalExam(values),
    onSuccess: (data) => {
      if (data.success && data.data) {
        setExamResult(data.data);
        setShowResultDialog(true);
      } else {
        // Keep toast for actual errors
        toast.error(data.message || 'Submission failed');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to submit Final exam');
    },
  });

  return {
    ...mutation,
    showResultDialog,
    setShowResultDialog,
    examResult,
  };
};