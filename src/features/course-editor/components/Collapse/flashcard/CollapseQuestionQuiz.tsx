import { QuestionFlashCardEntity } from '#/api/requests';
import ReadOnlyCK from '#/shared/components/ckeditor/ReadOnlyCK';
import { useAppDispatch } from '#/src/redux/store/store';
import { deleteQuestionQuiz } from '#/src/redux/thunk/question-quiz.thunk';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import {
  Collapse,
  Form,
  FormInstance,
  Input,
  message,
  Modal,
  Tooltip,
} from 'antd';

interface CollapseQuestionQuizProps {
  form: FormInstance;
  item: any;
  index: number;
  handleOpenQuestionQuiz: (question: QuestionFlashCardEntity) => void;
}
const CollapseQuestionQuiz = ({
  item,
  index,
  form,
  handleOpenQuestionQuiz,
}: CollapseQuestionQuizProps) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa câu hỏi?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        const result = await dispatch(deleteQuestionQuiz(item.id));
        if (result && result.payload.statusCode === 200) {
          message.success('Xoá thành công');
        } else {
          message.error('Xoá thất bại');
        }
      },
      title: 'Xác nhận xóa',
    });
  };

  return (
    <>
      <Collapse
        className="bg-[#ffffff]"
        defaultActiveKey={['1']}
        expandIconPosition="end"
        items={[
          {
            key: '1',
            label: `Câu hỏi ${index + 1}`,
            extra: (
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '15px' }}
              >
                <Tooltip title="Chỉnh sửa">
                  <button
                    type="button"
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleOpenQuestionQuiz(item)}
                  >
                    <EditTwoTone /> Chỉnh sửa
                  </button>
                </Tooltip>
                <Tooltip title="Xoá">
                  <button
                    type="button"
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={handleDelete}
                  >
                    <DeleteTwoTone twoToneColor="#f33832" /> Xoá câu hỏi
                  </button>
                </Tooltip>
              </div>
            ),
            children: (
              <>
                <div className="title-group-question">
                  <Form.Item
                    name={['questions', index, 'question']}
                    style={{ flex: '1', marginBottom: '0' }}
                  >
                    <ReadOnlyCK value={item.content} />
                  </Form.Item>
                </div>
                <div className="list-question-item-tree">
                  {item.answers.map((answer: any, ansIndex: number) => (
                    <div className="item-answer" key={answer.id}>
                      <Form.Item
                        name={[
                          'questions',
                          index,
                          'answers',
                          ansIndex,
                          'title',
                        ]}
                        style={{
                          flex: '1',
                          marginBottom: '0',
                        }}
                      >
                        <Input
                          readOnly
                          className={`custom-input ${answer.isCorrect ? 'isCorrect' : 'unCorrect'}`}
                          placeholder="Đáp án"
                        />
                      </Form.Item>
                    </div>
                  ))}
                </div>
                <Form.Item
                  name={['questions', index, 'explain']}
                  label="Giải thích"
                >
                  <ReadOnlyCK value={item.explain} />
                </Form.Item>
              </>
            ),
          },
        ]}
      />
    </>
  );
};

export default CollapseQuestionQuiz;
