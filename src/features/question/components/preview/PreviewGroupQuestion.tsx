import { QuestionEntity } from '#/api/requests';
import { MutedOutlined } from '@ant-design/icons';
import { Form, FormInstance } from 'antd';

interface PreviewGroupQuestionProps {
  form: FormInstance;
}

const PreviewGroupQuestion = ({ form }: PreviewGroupQuestionProps) => {
  const content = Form.useWatch('content', form);
  const imageUrl = Form.useWatch('imageUrl', form);
  const audioUrl = Form.useWatch('audioUrl', form);
  const questions = Form.useWatch('questions', form);

  return (
    <>
      <div className="modal-preview-group">
        <h3>Preview</h3>
        <div className="mt-5 flex items-start gap-3">
          <div className="flex-1 p-2 bg-[#fafafa] rounded-sm *:text-[8px]">
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
            {imageUrl && (
              <div className=" flex items-center justify-center">
                <img
                  src={imageUrl}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            )}
            {audioUrl && (
              <div className="flex items-center justify-center">
                <div className="inline-flex items-center text-[10px] justify-center p-2 text-white rounded-md bg-[#f37143]">
                  <MutedOutlined />
                </div>
              </div>
            )}
          </div>
          <div className="questions flex-1 flex flex-col gap-2 p-2 bg-[#fafafa] rounded-sm">
            {questions?.map((q: QuestionEntity, index: number) => (
              <div className="mb-2">
                <div className="flex items-start">
                  <div className="text-[8px]">{index + 1}.</div>
                  <div
                    className="*:text-[8px]"
                    dangerouslySetInnerHTML={{ __html: content }}
                  ></div>
                </div>
                <div className="flex flex-col gap-2">
                  {q.multipleChoiceAnswers?.map((as: any, index: number) => (
                    <div className="w-full text-[8px] flex items-center gap-2 shadow-sm">
                      <div className="shadow-sm text-center px-2 py-1">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <div className="flex-1 px-2 py-1 rounded-sm text-center">
                        {as.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewGroupQuestion;
