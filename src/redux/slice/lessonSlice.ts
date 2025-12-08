import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMeta, LessonEntity, QuestionGroupEntity } from '#/api/requests';
import {
  deleteLesson,
  getAllLesson,
  getOneLesson,
  updateLesson,
} from '../thunk/lesson.thunk';
import {
  createKanji,
  deleteKanji,
  getAllKanji,
  importAllKanji,
  updateKanji,
} from '../thunk/kanji-lesson.thunk';
import {
  createVocabLesson,
  deleteVocabLesson,
  getVocabLesson,
  updateVocabLesson,
} from '../thunk/vocab-lesson.thunk';
import {
  createDocumentPdfLesson,
  createPdfLesson,
  deleteDocumentPdfLesson,
  getPdfLesson,
  updatePdfLesson,
} from '../thunk/pdf-lesson.thunk';
import {
  createDocumentVideoLesson,
  createVideoLesson,
  deleteDocumentVideoLesson,
  getVideoLesson,
  updateVideoLesson,
} from '../thunk/video-lesson.thunk';
import {
  createQuestionGroup,
  deleteQuestionGroup,
  getQuestionGroup,
  updateQuestionGroup,
} from '../thunk/question-group.thunk';
import {
  createGrammar,
  getGrammar,
  updateGrammar,
} from '../thunk/grammar-lesson.thunk';
import {
  createDocumentTextLesson,
  createTextLesson,
  deleteDocumentTextLesson,
  getTextLesson,
  updateTextLesson,
} from '../thunk/text-lesson.thunk';
import {
  createAudioLesson,
  deleteAudioLesson,
  getAudioLesson,
  updateAudioLesson,
} from '../thunk/audio-lesson.thunk';
import {
  createQuestionToGroup,
  deleteQuestion,
  updateQuestion,
} from '../thunk/question.thunk';
import {
  createFlashcard,
  deleteFlashcard,
  getAllFlashcard,
  importFlashcard,
  updateFlashcard,
} from '../thunk/flash-card.thunk';
import {
  createQuizFlashcard,
  deleteQuizFlashcard,
  getQuizFlashcard,
  updateQuizFlashcard,
} from '../thunk/quiz-flash-card.thunk';
import {
  createQuestionQuiz,
  deleteQuestionQuiz,
  importExcelQuestionFlashcard,
  updateQuestionQuiz,
} from '../thunk/question-quiz.thunk';
import { LessonDetailEntity } from '#/api/requests/interfaces/LessonDetailEntity';
import {
  createAndAddExamLesson,
  getExamLesson,
} from '../thunk/exam-lesson.thunk';
import { deleteExam, updateExam } from '../thunk/exam.thunk';
import { deleteQuestionGroupReference } from '../thunk/question-group-reference.thunk';

interface LessonState {
  data: {
    items: LessonEntity[] | [];
    meta: IMeta;
  };
  lessonEdit: LessonDetailEntity | null;
}

const initialState: LessonState = {
  data: {
    items: [],
    meta: {
      limit: 0,
      offset: 0,
      total: 0,
      totalPages: 0,
    },
  },
  lessonEdit: null,
};

const lessonSlice = createSlice({
  initialState,
  name: 'lesson',
  reducers: {
    selectLesson: (
      state,
      action: PayloadAction<{
        lesson: LessonEntity;
      }>,
    ) => {
      state.lessonEdit = action.payload.lesson;
    },
    resetLessonEdit: state => {
      state.lessonEdit = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllLesson.fulfilled, (state, action) => {
        state.data = action.payload.data;
      })
      .addCase(getOneLesson.fulfilled, (state, action) => {
        state.lessonEdit = action.payload.data;
      })
      .addCase(updateLesson.fulfilled, (state, action) => {
        state.lessonEdit = { ...state.lessonEdit, ...action.payload.data };
      })
      .addCase(deleteLesson.fulfilled, (state, action) => {
        state.lessonEdit = null;
      })
      // exam
      .addCase(getExamLesson.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 200 && state.lessonEdit) {
          state.lessonEdit.exam_lesson = data;
        }
      })
      .addCase(deleteQuestionGroupReference.fulfilled, (state, action) => {
        const { statusCode } = action.payload;
        const { questionGroupId } = action.meta.arg;
        if (
          statusCode === 200 &&
          state.lessonEdit &&
          state.lessonEdit.exam_lesson
        ) {
          state.lessonEdit.exam_lesson.exam.questionMapping =
            state.lessonEdit.exam_lesson?.exam.questionMapping.filter(
              qs => qs.id !== questionGroupId,
            );
        }
      })

      // cud question | các question của nghe hiểu, đọc hiẻu, luyện tập
      .addCase(createQuestionToGroup.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        const { id } = action.meta.arg;
        if (
          statusCode === 201 &&
          state.lessonEdit &&
          state.lessonEdit.question_group
        ) {
          state.lessonEdit.question_group = state.lessonEdit.question_group.map(
            qs =>
              qs.id === id
                ? {
                    ...qs,
                    questions: [...qs.questions, data],
                  }
                : qs,
          );
        }
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        const { id } = action.meta.arg;
        if (
          statusCode === 200 &&
          state.lessonEdit &&
          state.lessonEdit.question_group
        ) {
          const question_group = state.lessonEdit.question_group.find(qs =>
            qs.questions.some(q => q.id === id),
          );

          if (question_group) {
            const new_questions = question_group.questions.map(q =>
              q.id === id ? data : q,
            );
            question_group.questions = new_questions;
          }
        }
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        const { statusCode } = action.payload;
        const id = action.meta.arg;
        if (
          statusCode === 200 &&
          state.lessonEdit &&
          state.lessonEdit.question_group
        ) {
          state.lessonEdit.question_group =
            state.lessonEdit.question_group.filter(qs => qs.id !== id);
        }
      })

      // crud flash card | các thẻ
      .addCase(getAllFlashcard.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 200 && state.lessonEdit) {
          state.lessonEdit.flashcard = data;
        }
      })
      .addCase(updateFlashcard.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        const { id } = action.meta.arg;
        if (
          statusCode === 200 &&
          state.lessonEdit &&
          state.lessonEdit.flashcard
        ) {
          state.lessonEdit.flashcard = state.lessonEdit.flashcard.map(fl =>
            fl.id === id ? data : fl,
          );
        }
      })
      .addCase(deleteFlashcard.fulfilled, (state, action) => {
        const { statusCode } = action.payload;
        const id = action.meta.arg;
        if (
          statusCode === 200 &&
          state.lessonEdit &&
          state.lessonEdit.flashcard
        ) {
          state.lessonEdit.flashcard = state.lessonEdit.flashcard.filter(
            fl => fl.id !== id,
          );
        }
      })
      .addCase(createFlashcard.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (
          statusCode === 201 &&
          state.lessonEdit &&
          state.lessonEdit.flashcard
        ) {
          state.lessonEdit.flashcard.push(data);
        }
      })
      .addCase(importFlashcard.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (
          statusCode === 201 &&
          state.lessonEdit &&
          state.lessonEdit.flashcard
        ) {
          state.lessonEdit.flashcard = data.items;
        }
      })
      .addCase(importExcelQuestionFlashcard.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 201 && state.lessonEdit && state.lessonEdit.quiz) {
          state.lessonEdit.quiz.questions.push(...data);
        }
      })
      // crud kanji
      .addCase(importAllKanji.fulfilled, (state, action) => {
        // const { data, statusCode } = action.payload;
        // if (statusCode === 200 && state.lessonEdit) {
        //   state.lessonEdit.kanjis = data.items;
        // }
      })
      .addCase(getAllKanji.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 200 && state.lessonEdit) {
          state.lessonEdit.kanjis = data.items;
        }
      })
      .addCase(createKanji.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 201 && state.lessonEdit) {
          if (!state.lessonEdit.kanjis) {
            state.lessonEdit.kanjis = [];
          }
          state.lessonEdit.kanjis.push(data);
        }
      })
      .addCase(deleteKanji.fulfilled, (state, action) => {
        const { statusCode } = action.payload;
        const id = action.meta.arg;
        if (statusCode === 200 && state.lessonEdit && state.lessonEdit.kanjis) {
          state.lessonEdit.kanjis = state.lessonEdit.kanjis.filter(
            v => v.id !== id,
          );
        }
      })
      .addCase(updateKanji.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        const { id } = action.meta.arg;
        if (statusCode === 200 && state.lessonEdit && state.lessonEdit.kanjis) {
          state.lessonEdit.kanjis = state.lessonEdit.kanjis.map(v =>
            v.id === id ? data : v,
          );
        }
      })
      // crud từ vựng
      .addCase(getVocabLesson.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 200 && state.lessonEdit) {
          state.lessonEdit.vocabs = data.items;
        }
      })
      .addCase(createVocabLesson.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 201 && state.lessonEdit && state.lessonEdit.vocabs) {
          state.lessonEdit.vocabs.push(data);
        }
      })
      .addCase(deleteVocabLesson.fulfilled, (state, action) => {
        const { statusCode } = action.payload;
        const id = action.meta.arg;
        if (statusCode === 200 && state.lessonEdit && state.lessonEdit.vocabs) {
          state.lessonEdit.vocabs = state.lessonEdit.vocabs.filter(
            v => v.id !== id,
          );
        }
      })
      .addCase(updateVocabLesson.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        const { id } = action.meta.arg;
        if (statusCode === 200 && state.lessonEdit && state.lessonEdit.vocabs) {
          state.lessonEdit.vocabs = state.lessonEdit.vocabs.map(v =>
            v.id === id ? data : v,
          );
        }
      })
      // cru pdf
      .addCase(getPdfLesson.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 200 && state.lessonEdit) {
          state.lessonEdit.pdfFile = data[0];
        }
      })
      .addCase(createPdfLesson.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 201 && state.lessonEdit) {
          state.lessonEdit.pdfFile = data;
        }
      })
      .addCase(updatePdfLesson.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 200 && state.lessonEdit) {
          state.lessonEdit.pdfFile = data;
        }
      })
      // cru video
      .addCase(getVideoLesson.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 200 && state.lessonEdit) {
          state.lessonEdit.video = data[0];
        }
      })
      .addCase(createVideoLesson.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 201 && state.lessonEdit) {
          state.lessonEdit.video = data;
        }
      })
      .addCase(updateVideoLesson.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 200 && state.lessonEdit) {
          state.lessonEdit.video = data;
        }
      })
      // document video
      .addCase(deleteDocumentVideoLesson.fulfilled, (state, action) => {
        const { statusCode } = action.payload;
        const { documentId } = action.meta.arg.data;
        if (statusCode === 200 && state.lessonEdit && state.lessonEdit.video) {
          state.lessonEdit.video.documents =
            state.lessonEdit.video.documents.filter(
              doc => doc.id !== documentId,
            );
        }
      })
      .addCase(createDocumentVideoLesson.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 201 && state.lessonEdit && state.lessonEdit.video) {
          state.lessonEdit.video.documents = data;
        }
      })
      // document pdf
      .addCase(deleteDocumentPdfLesson.fulfilled, (state, action) => {
        const { statusCode } = action.payload;
        const { documentId } = action.meta.arg.data;
        if (
          statusCode === 200 &&
          state.lessonEdit &&
          state.lessonEdit.pdfFile
        ) {
          state.lessonEdit.pdfFile.documents =
            state.lessonEdit.pdfFile.documents.filter(
              doc => doc.id !== documentId,
            );
        }
      })
      .addCase(createDocumentPdfLesson.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (
          statusCode === 201 &&
          state.lessonEdit &&
          state.lessonEdit.pdfFile
        ) {
          state.lessonEdit.pdfFile.documents = data;
        }
      })
      // document text
      .addCase(deleteDocumentTextLesson.fulfilled, (state, action) => {
        const { statusCode } = action.payload;
        const { documentId } = action.meta.arg.data;
        if (statusCode === 200 && state.lessonEdit && state.lessonEdit.text) {
          state.lessonEdit.text.documents =
            state.lessonEdit.text.documents.filter(
              doc => doc.id !== documentId,
            );
        }
      })
      .addCase(createDocumentTextLesson.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 201 && state.lessonEdit && state.lessonEdit.text) {
          state.lessonEdit.text.documents = data;
        }
      })
      // cru ngữ pháp
      .addCase(getGrammar.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 200 && state.lessonEdit) {
          state.lessonEdit.grammars = data.items[0];
        }
      })
      .addCase(createGrammar.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 201 && state.lessonEdit) {
          state.lessonEdit.grammars = data;
        }
      })
      .addCase(updateGrammar.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 200 && state.lessonEdit) {
          state.lessonEdit.grammars = data;
        }
      })
      // cru bài đọc | text
      .addCase(getTextLesson.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 200 && state.lessonEdit) {
          state.lessonEdit.text = data[0];
        }
      })
      .addCase(createTextLesson.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 201 && state.lessonEdit) {
          state.lessonEdit.text = data;
        }
      })
      .addCase(updateTextLesson.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 200 && state.lessonEdit) {
          state.lessonEdit.text = data;
        }
      })
      // crud kiểm tra của flash card
      .addCase(getQuizFlashcard.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 200 && state.lessonEdit) {
          state.lessonEdit.quiz = data[0];
        }
      })
      .addCase(createQuizFlashcard.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 201 && state.lessonEdit) {
          state.lessonEdit.quiz = data;
        }
      })
      .addCase(updateQuizFlashcard.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 200 && state.lessonEdit) {
          state.lessonEdit.quiz = data;
        }
      })
      .addCase(deleteQuizFlashcard.fulfilled, (state, action) => {
        const { statusCode } = action.payload;
        if (statusCode === 200 && state.lessonEdit) {
          state.lessonEdit.quiz = undefined;
        }
      })
      // rud question của kiểm tra flash card
      .addCase(createQuestionQuiz.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 201 && state.lessonEdit) {
          state.lessonEdit.quiz?.questions.push(data);
        }
      })
      .addCase(updateQuestionQuiz.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        const { id } = action.meta.arg;
        if (statusCode === 200 && state.lessonEdit && state.lessonEdit.quiz) {
          state.lessonEdit.quiz.questions = state.lessonEdit.quiz?.questions
            .map(qs => (qs.id === id ? data : qs))
            .sort((a, b) => a.position - b.position);
        }
      })
      .addCase(deleteQuestionQuiz.fulfilled, (state, action) => {
        const { statusCode } = action.payload;
        const id = action.meta.arg;
        if (statusCode === 200 && state.lessonEdit && state.lessonEdit.quiz) {
          state.lessonEdit.quiz.questions =
            state.lessonEdit.quiz?.questions.filter(qs => qs.id !== id);
        }
      });
    // crud audio
    // .addCase(getAudioLesson.fulfilled, (state, action) => {
    //   const { data, statusCode } = action.payload;
    //   if (statusCode === 200 && state.lessonEdit) {
    //     state.lessonEdit.audioScript = data;
    //   }
    // })
    // .addCase(createAudioLesson.fulfilled, (state, action) => {
    //   const { data, statusCode } = action.payload;
    //   if (
    //     statusCode === 201 &&
    //     state.lessonEdit &&
    //     state.lessonEdit.audioScript
    //   ) {
    //     state.lessonEdit.audioScript.push(data);
    //   }
    // })
    // .addCase(deleteAudioLesson.fulfilled, (state, action) => {
    //   const { statusCode } = action.payload;
    //   const id = action.meta.arg;
    //   if (
    //     statusCode === 200 &&
    //     state.lessonEdit &&
    //     state.lessonEdit.audioScript
    //   ) {
    //     state.lessonEdit.audioScript = state.lessonEdit.audioScript.filter(
    //       v => v.id !== id,
    //     );
    //   }
    // })
    // .addCase(updateAudioLesson.fulfilled, (state, action) => {
    //   const { data, statusCode } = action.payload;
    //   const { id } = action.meta.arg;
    //   if (
    //     statusCode === 200 &&
    //     state.lessonEdit &&
    //     state.lessonEdit.audioScript
    //   ) {
    //     state.lessonEdit.audioScript = state.lessonEdit.audioScript.map(s =>
    //       s.id === id ? data : s,
    //     );
    //   }
    // });
  },
});

export default lessonSlice.reducer;
export const { selectLesson, resetLessonEdit } = lessonSlice.actions;
