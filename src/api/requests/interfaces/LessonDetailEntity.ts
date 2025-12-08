import type { AudioUrlEntity } from '../models/AudioUrlEntity';
import type { CourseVocabEntity } from '../models/CourseVocabEntity';
import type { ExamEntity } from '../models/ExamEntity';
import type { ExamLessonEntity } from '../models/ExamLessonEntity';
import type { ExamLessonWithMappingEntity } from '../models/ExamLessonWithMappingEntity';
import type { FlashCardEntity } from '../models/FlashCardEntity';
import type { GrammarEntity } from '../models/GrammarEntity';
import type { KanjiEntity } from '../models/KanjiEntity';
import type { LessonEntity } from '../models/LessonEntity';
import type { QuestionGroupEntity } from '../models/QuestionGroupEntity';
import type { QuizFlashCardEntity } from '../models/QuizFlashCardEntity';
import type { SlideEntity } from '../models/SlideEntity';
import type { TextEntity } from '../models/TextEntity';
import type { VideoUrlEntity } from '../models/VideoUrlEntity';
import { ExamLessonResponse } from '../response/ExamLessonResponse';

export interface LessonDetailEntity {
  id: string;
  title: string;
  videoUrl?: string;
  pos: number;
  type: LessonEntity.type;
  isRequired: boolean;
  vocabs?: CourseVocabEntity[];

  kanjis?: KanjiEntity[];
  grammars?: GrammarEntity;

  question_group?: QuestionGroupEntity[];

  video?: VideoUrlEntity;
  text?: TextEntity;
  pdfFile?: SlideEntity;
  audioScript?: AudioUrlEntity[];
  flashcard?: FlashCardEntity[];
  quiz?: QuizFlashCardEntity;

  exams?: ExamEntity;

  exam_lesson?: ExamLessonWithMappingEntity;
}
