import { useMutation } from '@tanstack/react-query'; // Update path as needed
import { SAQSubmissionRequest, SAQSubmissionResponse, SAQSubmissionResponseData } from '@/types/exam/saq-exam';
import { toast } from 'sonner'; // or your preferred toast library
import { useState } from 'react';
import { submitSaqQuestionsData } from '@/action/exams/submit-saq';

export const useSubmitSaqExam = () => {
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [examResult, setExamResult] = useState<SAQSubmissionResponseData | null>(null);

  const mutation = useMutation<SAQSubmissionResponse, Error, SAQSubmissionRequest>({
    mutationFn: async (values: SAQSubmissionRequest) => await submitSaqQuestionsData(values),
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
      toast.error(error.message || 'Failed to submit SAQ exam');
    },
  });

  return {
    ...mutation,
    showResultDialog,
    setShowResultDialog,
    examResult,
  };
};