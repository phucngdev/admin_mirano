import { LessonDetailEntity } from '#/api/requests/interfaces/LessonDetailEntity';
import BaseCKEditor from '#/shared/components/ckeditor/BaseCKEditor';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { getGrammar } from '#/src/redux/thunk/grammar-lesson.thunk';
import { Form, FormInstance, Input } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

interface GrammarTypeProps {
  form: FormInstance;
  lesson: LessonDetailEntity;
}
const GrammarType = ({ form, lesson }: GrammarTypeProps) => {
  const dispatch = useAppDispatch();
  const { lessonEdit } = useSelector((state: RootState) => state.lesson);

  const fetchData = async () => {
    if (lesson) {
      await dispatch(getGrammar(lesson.id));
    }
  };

  useEffect(() => {
    if (lesson) {
      fetchData();
    }
  }, [lesson]);

  useEffect(() => {
    if (lessonEdit && lesson) {
      form.setFieldsValue({
        contentGrammar: lessonEdit.grammars?.content || '',
        videoUrlLesson: lesson.videoUrl || '',
      });
    }

    return () => {
      form.resetFields();
    };
  }, [lessonEdit]);

  return (
    <>
      <Form.Item
        validateTrigger={['onBlur', 'onChange']}
        name="videoUrlLesson"
        label="Video url:"
        style={{
          width: '100%',
        }}
        rules={[{ required: true, message: 'Vui lòng nhập url video' }]}
      >
        <Input className="custom-input" allowClear placeholder="Video url" />
      </Form.Item>
      <Form.Item
        validateTrigger={['onBlur', 'onChange']}
        name="contentGrammar"
        label="Nội dung:"
        style={{
          width: '100%',
        }}
        rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
      >
        <BaseCKEditor
          changeData={(value: string) => {
            form.setFieldsValue({ contentGrammar: value });
          }}
          value={form.getFieldValue('contentGrammar')}
        />
      </Form.Item>
    </>
  );
};

export default GrammarType;
