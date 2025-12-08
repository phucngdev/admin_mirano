import { deleteQuestionGroupReferenceService } from '#/api/services/questionGroupReference';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const deleteQuestionGroupReference = createAsyncThunk(
  'question-group-reference/delete-question-group-reference',
  async ({
    parentId,
    questionGroupId,
  }: {
    parentId: string;
    questionGroupId: string;
  }) => {
    try {
      const response = await deleteQuestionGroupReferenceService(
        parentId,
        questionGroupId,
      );
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
