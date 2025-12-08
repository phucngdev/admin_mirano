import React, { useMemo } from 'react';
import { QuestionEntity } from '#/api/requests';
import { Form, FormInstance } from 'antd';
import './index.scss';
import { MutedOutlined } from '@ant-design/icons';

interface PreviewQuestionProps {
  type: QuestionEntity.type;
  form: FormInstance;
}

const shuffleArray = <T,>(array: T[]): T[] =>
  [...array].sort(() => Math.random() - 0.5);

const PreviewQuestion = ({ type, form }: PreviewQuestionProps) => {
  const content = Form.useWatch('content', form);
  const answers = Form.useWatch('answers', form);
  const options = Form.useWatch('options', form);
  const imageUrl = Form.useWatch('imageUrl', form);
  const audioUrl = Form.useWatch('audioUrl', form);
  const leftColumn = useMemo<string[]>(
    () =>
      type === QuestionEntity.type.MATCHING && answers?.length
        ? shuffleArray(answers.map((item: any) => item?.left))
        : [],
    [type, answers],
  );

  const rightColumn = useMemo<string[]>(
    () =>
      type === QuestionEntity.type.MATCHING && answers?.length
        ? shuffleArray(answers.map((item: any) => item?.right))
        : [],
    [type, answers],
  );

  const renderPreview = () => {
    switch (type) {
      case QuestionEntity.type.FILL_IN_BLANK:
        return (
          <div className="fill-in-blank">
            <div className="text-[10px] font-bold mt-3 text-center">
              Chọn từ vào ô trống
            </div>
            <div
              className="preview-html mt-2 text-center"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
            <div className="flex items-center justify-center mt-4 gap-3 flex-wrap">
              {options?.map((as: any) => (
                <div className="item-cols">{as.text}</div>
              ))}
              {answers?.map((as: any) => (
                <div className="item-cols">{as.correctAnswer}</div>
              ))}
            </div>
          </div>
        );
      case QuestionEntity.type.SORTING:
        return (
          <div className="sorting">
            <div className="flex items-start gap-3 !text-[8px] p-2 bg-[#fafafa]">
              <div
                className="flex-1 preview-html"
                dangerouslySetInnerHTML={{ __html: content }}
              ></div>
              <div className="flex-1 flex flex-col gap-2 items-start">
                {answers?.map((as: any, index: number) => (
                  <div className="w-full flex items-center gap-2 shadow-sm">
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
          </div>
        );

      case QuestionEntity.type.MATCHING:
        return (
          <div className="multiple-choice">
            <div
              className="preview-html mb-2 text-center font-bold mt-5"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
            <div className="grid grid-cols-2 gap-4 items-start">
              <div className="flex flex-wrap gap-2">
                {leftColumn?.map((item, index) => (
                  <div key={index} className="item-cols">
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {rightColumn?.map((item, index) => (
                  <div key={index} className="item-cols">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case QuestionEntity.type.MULTIPLE_CHOICE_HORIZONTAL:
        return (
          <div className="multiple-choice-horizontal">
            <div
              className="preview-html mb-2 text-center font-bold mt-5"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
            {imageUrl && (
              <div className=" flex items-center justify-center">
                <img
                  src={imageUrl}
                  className="w-[35%] h-full object-cover"
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
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 items-start mt-3">
              {answers?.map((as: any, index: number) => (
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
        );

      default:
        return <p>Không hỗ trợ hiển thị định dạng câu hỏi này.</p>;
    }
  };

  return (
    <div className="modal-preview">
      <h3>Preview</h3>
      {renderPreview()}
    </div>
  );
};

export default PreviewQuestion;
