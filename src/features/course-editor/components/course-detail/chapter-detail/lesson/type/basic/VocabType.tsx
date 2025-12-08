import {
  Button,
  Form,
  FormInstance,
  Input,
  message,
  Popover,
  Upload,
} from 'antd';
import { useEffect, useState } from 'react';
import { ItemUpdate, TypeModal } from '../../LessonDetail';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { getVocabLesson } from '#/src/redux/thunk/vocab-lesson.thunk';
import {
  DownloadOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import ModalCreateUpdateVocabulary from '#/features/course-editor/components/modal/ModalCreateUpdateVocabulary';
import { LessonDetailEntity } from '#/api/requests/interfaces/LessonDetailEntity';
import { CourseVocabEntity } from '#/api/requests';
import { beforeUploadExcel } from '#/shared/props/beforeUpload';
import ms_excel from '#/assets/images/icon_button/ms_excel.png';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { importVocabLessonService } from '#/api/services/vocabLessonService';
interface VocabTypeProps {
  form: FormInstance;
  handleUpdate: <T extends keyof ItemUpdate>(
    type: T,
    data: ItemUpdate[T],
  ) => void;
  setActiveModal: (key: TypeModal) => void;
  lesson: LessonDetailEntity;
  itemUpdate: ItemUpdate;
  activeModal: TypeModal;
  handleClose: (key: 'vocab') => void;
}

const VocabType = ({
  handleUpdate,
  setActiveModal,
  lesson,
  form,
  itemUpdate,
  activeModal,
  handleClose,
}: VocabTypeProps) => {
  const dispatch = useAppDispatch();
  const { lessonEdit } = useSelector((state: RootState) => state.lesson);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (lesson) {
      await dispatch(getVocabLesson(lesson.id));
    }
  };

  useEffect(() => {
    if (lesson) {
      fetchData();
    }
  }, [lesson]);

  useEffect(() => {
    if (lessonEdit) {
      form.setFieldValue('videoUrlLesson', lesson.videoUrl || '');
    }
  }, [lessonEdit]);

  const handleDownloadVocabularyExcel = () => {
    const data = [
      {
        STT: 1,
        'Từ vựng': 'がっこう',
        'Dịch nghĩa': 'trường học',
        'Âm Hán': 'Học hiệu',
        Kanji: '学校',
        'Ví dụ': '私は学校へ行きます。',
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);

    const noteLines = [
      '* LƯU Ý:',
      '- Không được di chuyển bảng.',
      '- Thêm ảnh sau khi import',
      '- Xoá phần này khi import',
    ];

    const noteStartRow = data.length + 3;
    noteLines.forEach((line, index) => {
      const cell = `A${noteStartRow + index}`;
      XLSX.utils.sheet_add_aoa(worksheet, [[line]], { origin: cell });
    });

    worksheet['!cols'] = [
      { wch: 5 },
      { wch: 20 },
      { wch: 25 },
      { wch: 20 },
      { wch: 15 },
      { wch: 40 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'VOCABULARY');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });

    saveAs(blob, 'mau_tu_vung.xlsx');
  };

  return (
    lessonEdit && (
      <>
        <ModalCreateUpdateVocabulary
          open={activeModal === 'vocab'}
          onClose={() => handleClose('vocab')}
          itemUpdate={itemUpdate.vocab}
          lessonId={lesson.id}
        />

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
        <div className="list-vocab-content">
          <p className="p-title">Danh sách từ vựng</p>
          <div className="list-vocab">
            {lessonEdit.vocabs &&
              lessonEdit.vocabs.map((vocab: CourseVocabEntity) => (
                <button
                  onClick={() => handleUpdate('vocab', vocab)}
                  type="button"
                  key={vocab.id}
                  className="vocab-item"
                >
                  {vocab.originText || 'Chưa có'}
                </button>
              ))}
          </div>
          <div className="flex items-center gap-1 mt-4">
            <Button onClick={() => setActiveModal('vocab')}>
              <PlusOutlined /> Thêm mới
            </Button>
            <Popover
              title="Menu"
              trigger="click"
              placement="bottomRight"
              content={
                <div className="flex flex-col items-start gap-2">
                  <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    className="w-full"
                    onClick={handleDownloadVocabularyExcel}
                  >
                    Tải file mẫu
                  </Button>
                  <Upload
                    beforeUpload={beforeUploadExcel}
                    showUploadList={false}
                    customRequest={async ({ file }) => {
                      if (!file) return;

                      try {
                        setLoading(true);
                        await importVocabLessonService(lesson.id, file as File);
                        fetchData();
                      } catch (error) {
                        message.error('Tải lên thất bại');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    className="w-full"
                  >
                    <Button icon={<UploadOutlined />} className="w-full">
                      Import danh sách
                    </Button>
                  </Upload>
                </div>
              }
            >
              <Button
                icon={<img src={ms_excel} alt="icon-excel" />}
                className="ms-2"
              >
                Import excel
              </Button>
            </Popover>
          </div>
        </div>
      </>
    )
  );
};

export default VocabType;
