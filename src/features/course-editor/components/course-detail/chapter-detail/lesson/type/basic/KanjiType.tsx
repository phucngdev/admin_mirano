import {
  Button,
  Form,
  FormInstance,
  Input,
  message,
  Popover,
  Upload,
} from 'antd';
import { ItemUpdate, TypeModal } from '../../LessonDetail';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { useEffect, useState } from 'react';
import {
  getAllKanji,
  importAllKanji,
} from '#/src/redux/thunk/kanji-lesson.thunk';
import {
  DownloadOutlined,
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import ModalCreateUpdateKanji from '#/features/course-editor/components/modal/ModalCreateUpdateKanji';
import { LessonDetailEntity } from '#/api/requests/interfaces/LessonDetailEntity';
import { KanjiEntity } from '#/api/requests';
import { beforeUploadExcel } from '#/shared/props/beforeUpload';
import ms_excel from '#/assets/images/icon_button/ms_excel.png';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
interface KanjiTypeProps {
  form: FormInstance;
  handleUpdate: <T extends keyof ItemUpdate>(
    type: T,
    data: ItemUpdate[T],
  ) => void;
  setActiveModal: (key: TypeModal) => void;
  lesson: LessonDetailEntity;
  itemUpdate: ItemUpdate;
  activeModal: TypeModal;
  handleClose: (key: 'kanji') => void;
}

const KanjiType = ({
  handleUpdate,
  setActiveModal,
  lesson,
  form,
  itemUpdate,
  activeModal,
  handleClose,
}: KanjiTypeProps) => {
  const dispatch = useAppDispatch();
  const { lessonEdit } = useSelector((state: RootState) => state.lesson);

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (lesson) {
      await dispatch(getAllKanji(lesson.id));
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

  const handleDownloadKanjiExcel = () => {
    const data = [
      {
        STT: 1,
        'Ký tự': '日',
        'Âm Hán': 'Nhật',
        'Dịch nghĩa': 'mặt trời, ngày',
        'Mô tả': 'Chữ thể hiện mặt trời, liên quan thời gian, ánh sáng.',
        'Ví dụ': '日本 (Nhật Bản), 日曜日 (Chủ nhật)',
        Onyomi: 'ニチ (nichi), ジツ (jitsu)',
        Kunyomi: 'ひ (hi), -び (-bi), -か (-ka)',
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
      { wch: 10 },
      { wch: 15 },
      { wch: 25 },
      { wch: 35 },
      { wch: 40 },
      { wch: 20 },
      { wch: 20 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'KANJI');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });

    saveAs(blob, 'mau_kanji.xlsx');
  };

  return (
    lessonEdit && (
      <>
        <ModalCreateUpdateKanji
          open={activeModal === 'kanji'}
          onClose={() => handleClose('kanji')}
          itemUpdate={itemUpdate.kanji}
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
          <p className="p-title">Danh sách từ vựng (kanji)</p>
          <div className="list-vocab">
            {lessonEdit.kanjis &&
              lessonEdit.kanjis.map((kanji: KanjiEntity) => (
                <button
                  onClick={() => handleUpdate('kanji', kanji)}
                  type="button"
                  key={kanji.id}
                  className="vocab-item"
                >
                  {kanji.character || 'Chưa có'}
                </button>
              ))}
          </div>
          <div className="flex items-center gap-1 mt-4">
            <Button onClick={() => setActiveModal('kanji')}>
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
                    onClick={handleDownloadKanjiExcel}
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
                        await dispatch(
                          importAllKanji({
                            id: lesson.id,
                            data: file as File,
                          }),
                        );
                        fetchData();
                      } catch (error) {
                        message.error('Tải lên thất bại');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    className="w-full"
                  >
                    <Button
                      icon={loading ? <LoadingOutlined /> : <UploadOutlined />}
                      className="w-full"
                    >
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

export default KanjiType;
