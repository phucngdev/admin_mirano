import { uploadMultipleFileToS3 } from '#/api/services/uploadS3';
import BaseCKEditor from '#/shared/components/ckeditor/BaseCKEditor';
import { beforeUploadPdf } from '#/shared/props/beforeUpload';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { createQuestionGroup } from '#/src/redux/thunk/question-group.thunk';
import { createQuestionToGroup } from '#/src/redux/thunk/question.thunk';
import {
  CloseOutlined,
  DeleteOutlined,
  DownloadOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Button, Form, Modal, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './index.scss';
import { createDocumentQuestionService } from '#/api/services/questionService';

interface ModalCreateProps {
  open: boolean;
  onClose: () => void;
}

const ModalCreateTestFile = ({ open, onClose }: ModalCreateProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { lessonEdit } = useSelector((state: RootState) => state.lesson);

  const [listFile, setListFile] = useState<any[]>([]);

  const handleSubmit = async () => {
    if (!lessonEdit || !lessonEdit.exams) return;
    const values = await form.validateFields();

    // const qsg = await dispatch(
    //   createQuestionGroup({
    //     examId: lessonEdit.exams.id,
    //     type: QuestionGroupEntity
    //   }),
    // );
    // const qs = await dispatch(
    //   createQuestionToGroup({
    //     id: qsg.payload.data.id,
    //     data: {
    //       type: QuestionEntity.QuestionType.ESSAY_TEST,
    //       content: values.content,
    //       essayAnswers: [],
    //     },
    //   }),
    // );
    // const id = qs.payload.data.id;
    // const promiseReq = listFile.map(file =>
    //   createDocumentQuestionService(id, {
    //     name: file.publicUrl,
    //     url: file.publicUrl,
    //   }),
    // );

    // const result = await Promise.all(promiseReq);

    // if (result.payload.statusCode === 201) {
    //   message.success('Thêm thành công');
    //   form.resetFields();
    //   onClose();
    // } else {
    //   message.error('Thêm thất bại');
    // }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <>
      <Modal
        closeIcon={<CloseOutlined />}
        className="modal-create-test-file"
        footer={[
          <Button onClick={handleCancel}>Huỷ</Button>,
          <Button onClick={handleSubmit} type="primary">
            Lưu
          </Button>,
        ]}
        onCancel={handleCancel}
        open={open}
        style={{ top: 20 }}
        title={
          <>
            <span
              style={{
                color: 'rgba(16, 24, 40, 1)',
                fontSize: '30px',
                fontWeight: '500',
              }}
            >
              Thêm bài kiểm tra
            </span>
          </>
        }
        width={1000}
      >
        <Form
          form={form}
          layout="vertical"
          validateTrigger={['onBlur', 'onSubmit']}
        >
          <Form.Item
            validateTrigger={['onBlur', 'onChange']}
            name="content"
            label="Đề bài:"
            style={{
              width: '100%',
              marginTop: '24px',
            }}
            // rules={[{ required: true, message: 'Vui lòng nhập đề bài' }]}
          >
            <BaseCKEditor
              changeData={(value: string) => {
                form.setFieldsValue({ content: value });
              }}
              value={form.getFieldValue('content')}
            />
          </Form.Item>
          {/* <Form.Item
            validateTrigger={['onBlur', 'onChange']}
            name="content"
            label="Mô tả:"
            style={{
              width: '100%',
              marginTop: '24px',
            }}
            // rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
          >
            <BaseCKEditor
              changeData={(value: string) => {
                form.setFieldsValue({ content: value });
              }}
              value={form.getFieldValue('content')}
            />
          </Form.Item> */}
          <div className="document-content">
            <p>Danh sách tài liệu</p>
            <div className="list-document">
              {listFile.map(docs => (
                <a
                  href={docs.publicUrl}
                  className="document-item"
                  key={docs.key}
                >
                  <span>{docs.filename}</span>
                  <div
                    className=""
                    style={{
                      display: 'flex',
                      alignContent: 'center',
                      gap: '15px',
                    }}
                  >
                    <DownloadOutlined className="p-1 hover:bg-blue-400 hover:bg-opacity-20 hover:text-blue-400 rounded-sm" />
                    <DeleteOutlined
                      onClick={e => {
                        e.stopPropagation();
                        // handleDelete(docs._id);
                      }}
                      className="p-1 hover:bg-red-400 hover:bg-opacity-20 hover:text-red-400 rounded-sm"
                    />
                  </div>
                </a>
              ))}
            </div>
            <Upload
              beforeUpload={beforeUploadPdf}
              multiple
              onChange={async info => {
                const newFiles = info.fileList
                  .map(f => f.originFileObj)
                  .filter((f): f is RcFile => !!f);

                const uploaded = await uploadMultipleFileToS3(newFiles);

                // Cập nhật list file và file đã upload
                setListFile(prev => {
                  const existingNames = new Set(
                    prev.map(file => file.filename),
                  );
                  const uniqueNewFiles = uploaded.filter(
                    file => !existingNames.has(file.filename),
                  );
                  return [...prev, ...uniqueNewFiles];
                });
              }}
              showUploadList={false}
              onRemove={file => {
                setListFile(prev => prev.filter(f => f.filename !== file.name));
              }}
            >
              <Button icon={<UploadOutlined />}>Thêm tài liệu</Button>
            </Upload>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateTestFile;
