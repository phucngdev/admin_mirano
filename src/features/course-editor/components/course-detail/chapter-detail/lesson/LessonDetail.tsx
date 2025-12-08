import React, { useEffect, useState } from 'react';
import './LessonDetail.scss';
import { Button, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { deleteLesson, updateLesson } from '#/src/redux/thunk/lesson.thunk';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { useSelector } from 'react-redux';
import {
  createGrammar,
  updateGrammar,
} from '#/src/redux/thunk/grammar-lesson.thunk';
import {
  createVideoLesson,
  updateVideoLesson,
} from '#/src/redux/thunk/video-lesson.thunk';
import { useLessonFormWatch } from '#/shared/hooks/useLessonFormWatch';
import {
  createPdfLesson,
  updatePdfLesson,
} from '#/src/redux/thunk/pdf-lesson.thunk';
import { selectLesson } from '#/src/redux/slice/lessonSlice';
import {
  createTextLesson,
  updateTextLesson,
} from '#/src/redux/thunk/text-lesson.thunk';
import {
  CourseVocabEntity,
  KanjiEntity,
  LessonEntity,
  QuestionEntity,
  SessonEntity,
} from '#/api/requests';
import TextType from './type/advance/TextType';
import VideoType from './type/advance/VideoType';
import PdfType from './type/advance/PdfType';
import AudioScriptType from './type/advance/AudioScriptType';
import TestType from './type/advance/TestType';
import GrammarType from './type/basic/GrammarType';
import KanjiType from './type/basic/KanjiType';
import ReadingType from './type/basic/ReadingType';
import ListeningType from './type/basic/ListeningType';
import PracticeType from './type/basic/PracticeType';
import { lessonTypeLabels } from '../../../Collapse/chapter/CollapseCourse';
import VocabType from './type/basic/VocabType';
import FlashCardType from './type/advance/FlashCardType';

export interface ItemUpdate {
  vocab: CourseVocabEntity | null;
  kanji: KanjiEntity | null;
  reading: QuestionEntity | null;
  listening: QuestionEntity | null;
  question_listening: QuestionEntity | null;
  question_reading: QuestionEntity | null;
  pratices: QuestionEntity | null;
  group_question: any | null;
}

export type TypeModal =
  | 'vocab'
  | 'kanji'
  | 'reading'
  | 'listening'
  | 'question_reading'
  | 'question_listening'
  | 'pratices'
  | 'group_question'
  | 'select-question'
  | 'test-file'
  | null;

interface LessonDetailProps {
  lesson: LessonEntity;
  chapterId: string;
  handleItemClick: (item: SessonEntity) => void;
}

const LessonDetail: React.FC<LessonDetailProps> = ({
  lesson,
  chapterId,
  handleItemClick,
}) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { lessonEdit } = useSelector((state: RootState) => state.lesson);
  console.log('🚀 ~ LessonDetail ~ lessonEdit:', lessonEdit);
  const chapterStore = useSelector(
    (state: RootState) => state.chapter.data.items,
  );
  const {
    // lesson
    title,
    videoUrlLesson,
    isRequired,
    // grammar
    contentGrammar,
    // video
    descriptionVideo,
    videoUrlType,
    allowPreviewVideo,
    videoRewindLockVideo,
    allowDiscussionVideo,
    // pdf
    descriptionPdf,
    slideUrl,
    lockRightClickAndCopyPdf,
    allowContentDownloadsPdf,
    allowDiscussionPdf,
    // text
    contentText,
    descriptionText,
    lockRightClickAndCopyText,
    allowPreviewText,
    allowDiscussionText,
    //
  } = useLessonFormWatch(form);
  const [itemUpdate, setItemUpdate] = useState<ItemUpdate>({
    vocab: null,
    kanji: null,
    reading: null,
    listening: null,
    question_reading: null,
    question_listening: null,
    group_question: null,
    pratices: null,
  });
  const [activeModal, setActiveModal] = useState<TypeModal>(null);

  const fetchData = async () => {
    await dispatch(selectLesson({ lesson }));
  };

  useEffect(() => {
    fetchData();
  }, [lesson]);

  useEffect(() => {
    if (lessonEdit) {
      form.setFieldsValue({
        title: lessonEdit.title,
        isRequired: lessonEdit.isRequired,
        videoUrlLesson: lessonEdit.videoUrl,
      });
    } else {
      form.resetFields();
    }

    return () => {
      form.resetFields();
    };
  }, [lesson, lessonEdit]);

  const handleClose = (
    key:
      | 'vocab'
      | 'kanji'
      | 'reading'
      | 'listening'
      | 'question_reading'
      | 'question_listening'
      | 'pratices'
      | 'group_question'
      | 'select-question'
      | 'test-file',
  ) => {
    setItemUpdate({
      ...itemUpdate,
      [key]: null,
    });
    setActiveModal(null);
  };

  const handleUpdate = <T extends keyof ItemUpdate>(
    type: T,
    data: ItemUpdate[T],
  ) => {
    setItemUpdate(prev => ({ ...prev, [type]: data }));
    setActiveModal(type);
  };

  const handleUpdateLesson = async () => {
    if (!lessonEdit) return;
    if (lesson.type !== LessonEntity.type.AUDIO) {
      await form.validateFields();
    }

    if (
      !contentGrammar &&
      !videoUrlLesson &&
      !title &&
      !descriptionVideo &&
      !videoUrlType
    ) {
      message.info('Không có thay đổi nào để cập nhật');
      return;
    }

    const promises: Promise<any>[] = [];
    if (videoUrlLesson || title || isRequired) {
      promises.push(updateLessonPromise());
    }

    if (contentGrammar) {
      promises.push(updateGrammarPromise());
    }

    if (
      descriptionVideo ||
      videoUrlType ||
      allowPreviewVideo ||
      videoRewindLockVideo ||
      allowDiscussionVideo
    ) {
      promises.push(updateVideoPromise());
    }

    if (
      descriptionPdf ||
      slideUrl ||
      lockRightClickAndCopyPdf ||
      allowContentDownloadsPdf ||
      allowDiscussionPdf
    ) {
      promises.push(updatePdfPromise());
    }

    if (
      contentText ||
      descriptionText ||
      lockRightClickAndCopyText ||
      allowPreviewText ||
      allowDiscussionText
    ) {
      promises.push(updateTextPromise());
    }

    const results = await Promise.all(promises);

    const allSuccess = results.every(
      res =>
        res?.payload?.statusCode === 200 || res?.payload?.statusCode === 201,
    );

    if (allSuccess) {
      message.success('Cập nhật thành công');
    } else {
      message.error('Một số cập nhật đã thất bại, vui lòng tải lại trang');
    }
  };

  const updateLessonPromise = () => {
    return dispatch(
      updateLesson({
        id: lesson.id,
        data: {
          title: title,
          videoUrl: videoUrlLesson,
          pos: lesson.pos,
          isRequired: isRequired,
        },
      }),
    );
  };

  const updateGrammarPromise = () => {
    const grammar = lessonEdit?.grammars;
    if (!grammar) {
      return dispatch(
        createGrammar({
          content: contentGrammar,
          lessonId: lesson.id,
        }),
      );
    } else {
      if (!grammar) return Promise.resolve(null);
      return dispatch(
        updateGrammar({
          id: grammar.id,
          data: {
            content: contentGrammar,
            pos: grammar.pos,
          },
        }),
      );
    }
  };

  const updatePdfPromise = () => {
    const pdfFile = lessonEdit?.pdfFile;
    if (!pdfFile) {
      return dispatch(
        createPdfLesson({
          slideUrl: slideUrl,
          description: descriptionPdf,
          lessonId: lesson.id,
        }),
      );
    } else {
      if (!pdfFile) return Promise.resolve(null);
      return dispatch(
        updatePdfLesson({
          id: pdfFile.id,
          data: {
            slideUrl: slideUrl,
            description: descriptionPdf,
            lockRightClickAndCopy: lockRightClickAndCopyPdf,
            allowContentDownloads: allowContentDownloadsPdf,
            allowDiscussion: allowDiscussionPdf,
          },
        }),
      );
    }
  };

  const updateVideoPromise = () => {
    const video = lessonEdit?.video;
    if (!video) {
      return dispatch(
        createVideoLesson({
          videoUrl: videoUrlType,
          description: descriptionVideo,
          lessonId: lesson.id,
        }),
      );
    } else {
      if (!video) return Promise.resolve(null);
      return dispatch(
        updateVideoLesson({
          id: video.id,
          data: {
            videoUrl: videoUrlType,
            description: descriptionVideo,
            allowPreview: allowPreviewVideo,
            videoRewindLock: videoRewindLockVideo,
            allowDiscussion: allowDiscussionVideo,
          },
        }),
      );
    }
  };

  const updateTextPromise = () => {
    const text = lessonEdit?.text;
    if (!text) {
      return dispatch(
        createTextLesson({
          content: contentText,
          description: descriptionText,
          lessonId: lesson.id,
        }),
      );
    } else {
      if (!text) return Promise.resolve(null);
      return dispatch(
        updateTextLesson({
          id: text.id,
          data: {
            content: contentText,
            description: descriptionText,
            allowPreview: allowPreviewText,
            lockRightClickAndCopy: lockRightClickAndCopyText,
            allowDiscussion: allowDiscussionText,
          },
        }),
      );
    }
  };

  const handleDelete = () => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa bài giảng này?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        const result = await dispatch(deleteLesson(lesson.id));
        if (result.payload.statusCode === 200) {
          message.success('Xoá thành công');
          const chapterActive = chapterStore.find(c => c.id === chapterId)!; // giữ nguyên active collapse chương
          handleItemClick(chapterActive);
        } else {
          message.error('Xoá thất bại');
        }
      },
      title: 'Xác nhận xóa',
    });
  };

  const renderLessonBody = () => {
    const { type } = lesson;
    if (!lessonEdit) return;
    switch (type) {
      /* ----- nâng cao ----- */
      case LessonEntity.type.TEXT:
        return <TextType form={form} lesson={lesson} />;
      case LessonEntity.type.VIDEO:
        return <VideoType form={form} lesson={lesson} />;
      case LessonEntity.type.SLIDE:
        return <PdfType form={form} lesson={lesson} />;
      case LessonEntity.type.AUDIO:
        return (
          <AudioScriptType
            form={form}
            lesson={lesson}
            setActiveModal={setActiveModal}
            activeModal={activeModal}
            handleClose={handleClose}
          />
        );
      case LessonEntity.type.QUIZ:
        return (
          <TestType
            form={form}
            lesson={lesson}
            setActiveModal={setActiveModal}
            activeModal={activeModal}
            handleClose={handleClose}
          />
        );
      case LessonEntity.type.FLASH_CARD:
        return <FlashCardType lesson={lesson} />;

      /* ---------- cơ bản ---------- */
      case LessonEntity.type.VOCAB:
        return (
          <VocabType
            form={form}
            lesson={lesson}
            handleUpdate={handleUpdate}
            setActiveModal={setActiveModal}
            itemUpdate={itemUpdate}
            activeModal={activeModal}
            handleClose={handleClose}
          />
        );
      case LessonEntity.type.KANJI:
        return (
          <KanjiType
            form={form}
            lesson={lesson}
            handleUpdate={handleUpdate}
            setActiveModal={setActiveModal}
            itemUpdate={itemUpdate}
            activeModal={activeModal}
            handleClose={handleClose}
          />
        );
      case LessonEntity.type.GRAMMAR:
        return <GrammarType form={form} lesson={lesson} />;
      case LessonEntity.type.READING:
        return (
          <ReadingType
            form={form}
            lesson={lesson}
            setActiveModal={setActiveModal}
            activeModal={activeModal}
            handleClose={handleClose}
          />
        );
      case LessonEntity.type.LISTENING:
        return (
          <ListeningType
            form={form}
            lesson={lesson}
            setActiveModal={setActiveModal}
            activeModal={activeModal}
            handleClose={handleClose}
          />
        );
      case LessonEntity.type.PRACTICE_THROUGH:
        return (
          <PracticeType
            form={form}
            lesson={lesson}
            setActiveModal={setActiveModal}
            activeModal={activeModal}
            handleClose={handleClose}
          />
        );

      /* ----- Mặc định ----- */
      default:
        return null;
    }
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        validateTrigger={['onBlur', 'onSubmit']}
      >
        <div className="lesson-detail">
          <div className="header">
            <h2>
              {lessonTypeLabels.find(item => item.type === lesson.type)?.label}
            </h2>

            <Button type="primary" onClick={handleUpdateLesson}>
              Cập nhật
            </Button>
          </div>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                validateTrigger={['onBlur', 'onChange']}
                name="title"
                label="Tiêu đề bài giảng:"
                style={{
                  width: '100%',
                }}
                rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
              >
                <Input
                  className="custom-input"
                  allowClear
                  placeholder="Tiêu đề"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                validateTrigger={['onBlur', 'onChange']}
                name="isRequired"
                label="Bắt buộc làm:"
                style={{
                  width: '100%',
                }}
                rules={[{ required: true, message: 'Vui lòng chọn' }]}
              >
                <Select
                  placeholder="Chọn loại"
                  onChange={value => {
                    form.setFieldValue('isRequired', value);
                  }}
                  className="h-10"
                  options={[
                    {
                      value: true,
                      label: 'Bắt buộc',
                    },
                    {
                      value: false,
                      label: 'Không bắt buộc',
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          {renderLessonBody()}

          <Button
            type="primary"
            danger
            onClick={handleDelete}
            style={{ marginTop: '40px', width: '140px' }}
          >
            <DeleteOutlined /> Xoá bài giảng
          </Button>
        </div>
      </Form>
    </>
  );
};

export default LessonDetail;
