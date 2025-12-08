import { Button, Card, Breadcrumb, Popover } from 'antd';
import { useState } from 'react';
import './index.scss';
import QuestionTab from '../components/tab/QuestionTab';
import GroupQuestionTab from '../components/tab/GroupQuestionTab';
import ExamTab from '../components/tab/ExamTab';
import ms_excel from '#/assets/images/icon_button/ms_excel.png';
import { DownloadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';

const QuestionManager = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'question' | 'exam' | 'group'>('question');

  const handleDownloadMultipleChoiSampleExcel = () => {
    const data = [
      {
        STT: 1,
        Content: "Chọn từ đúng nghĩa với 'Hello'",
        // 'Audio Url': 'link audio',
        // 'Image Url': 'link img',
        Tag: 'nhãn câu hỏi',
        Explanation: 'có thể này và kia',
        'Option 1': 'Xin chào',
        'Option 2': 'Tạm biệt',
        'Option 3': 'Cảm ơn',
        'Option 4': 'Xin lỗi',
        'Option 5': 'kaka',
        'Correct Answer': 1,
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);

    const noteLines = [
      '* LƯU Ý:',
      '- Không được di chuyển bảng và đổi tên sheet.',
      '- Có thể thêm dòng để thêm câu hỏi.',
      '- Mỗi câu có thể có số đáp án khác nhau. (Câu 1: 5 đáp án ; Câu 2: 4 đáp án)',
      '- Trường Audio Url, Image Url, Explanation có thể trống.',
      '- Có thể thêm cột Option để thêm đáp án chọn. (Nhưng phải đúng tên là Option và số thứ tự phải lớn hơn cột trước)',
      '- Khi up file cần xoá phần lưu ý này',
    ];

    const noteStartRow = data.length + 3;
    noteLines.forEach((line, index) => {
      const cell = `A${noteStartRow + index}`;
      XLSX.utils.sheet_add_aoa(worksheet, [[line]], { origin: cell });
    });

    worksheet['!cols'] = [
      { wch: 5 },
      { wch: 40 },
      // { wch: 20 },
      // { wch: 20 },
      { wch: 20 },
      { wch: 50 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'MULTIPLE CHOICE (basic)',
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });

    saveAs(blob, 'mau_cau_hoi_trac_nghiem.xlsx');
  };

  const handleDownloadSingleMultipleChoiSampleExcel = () => {
    const data = [
      {
        STT: 1,
        Content: "Chọn từ đúng nghĩa với 'Hello'",
        'Audio Url': 'link audio',
        'Image Url': 'link img',
        Tag: 'nhãn câu hỏi',
        Explanation: 'có thể này và kia',
        'Option 1': 'Xin chào',
        'Option 2': 'Tạm biệt',
        'Option 3': 'Cảm ơn',
        'Option 4': 'Xin lỗi',
        'Option 5': 'kaka',
        'Correct Answer': 1,
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);

    const noteLines = [
      '* LƯU Ý:',
      '- Không được di chuyển bảng và đổi tên sheet.',
      '- Có thể thêm dòng để thêm câu hỏi.',
      '- Mỗi câu có thể có số đáp án khác nhau. (Câu 1: 5 đáp án ; Câu 2: 4 đáp án)',
      '- Trường Audio Url, Image Url, Explanation có thể trống.',
      '- Có thể thêm cột Option để thêm đáp án chọn. (Nhưng phải đúng tên là Option và số thứ tự phải lớn hơn cột trước)',
      '- Khi up file cần xoá phần lưu ý này',
    ];

    const noteStartRow = data.length + 3;
    noteLines.forEach((line, index) => {
      const cell = `A${noteStartRow + index}`;
      XLSX.utils.sheet_add_aoa(worksheet, [[line]], { origin: cell });
    });

    worksheet['!cols'] = [
      { wch: 5 },
      { wch: 40 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 50 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'MULTIPLE CHOICE (Advanced)',
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });

    saveAs(blob, 'mau_cau_hoi_trac_nghiem_don.xlsx');
  };

  const handleDownloadSortingSampleExcel = () => {
    const data = [
      {
        STT: 1,
        Content: 'Sắp xếp các bước học tiếng Nhật',
        // 'Audio Url': 'link audio',
        // 'Image Url': 'link image',
        Tag: 'nhãn câu hỏi',
        Explanation: 'Giải thích cách học hợp lý',
        'Item 1': 'Học Hiragana',
        'Item 2': 'Học Katakana',
        'Item 3': 'Học Kanji',
        'Item 4': 'Học Grammar',
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);

    const noteLines = [
      '* LƯU Ý:',
      '- Không được di chuyển bảng và đổi tên sheet.',
      '- Có thể thêm dòng để thêm câu hỏi.',
      '- Mỗi câu có thể có số lượng item khác nhau (Item 1, Item 2, ...)',
      '- Trường Audio Url, Image Url, Explanation có thể trống.',
      '- Có thể thêm cột Item để thêm bước sắp xếp (Nhưng phải đúng tên là Item và số thứ tự phải lớn hơn cột trước).',
      '- Khi upload file, cần xóa phần lưu ý này.',
    ];

    const noteStartRow = data.length + 3;
    noteLines.forEach((line, index) => {
      const cell = `A${noteStartRow + index}`;
      XLSX.utils.sheet_add_aoa(worksheet, [[line]], { origin: cell });
    });

    worksheet['!cols'] = [
      { wch: 5 },
      { wch: 40 },
      // { wch: 20 },
      // { wch: 20 },
      { wch: 20 },
      { wch: 50 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SORTING');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });

    saveAs(blob, 'mau_cau_hoi_sap_xep.xlsx');
  };

  const handleDownloadMatchingSampleExcel = () => {
    const data = [
      {
        STT: 1,
        Content: 'Ghép cặp từ tiếng Anh-Việt',
        // 'Audio Url': 'audio1.mp3',
        // 'Image Url': 'img1.jpg',
        Tag: 'nhãn câu hỏi',
        Explanation: 'Ghép đúng từng cặp',
        'Left 1': 'Hello',
        'Right 1': 'Xin chào',
        'Left 2': 'Goodbye',
        'Right 2': 'Tạm biệt',
        'Left 3': 'Thank you',
        'Right 3': 'Cảm ơn',
        'Left 4': 'Sorry',
        'Right 4': 'Xin lỗi',
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);

    const noteLines = [
      '* LƯU Ý:',
      '- Không được di chuyển bảng và đổi tên sheet.',
      '- Có thể thêm dòng để thêm câu hỏi.',
      '- Mỗi câu có thể có số cặp ghép (Left/Right) khác nhau (Left 1 / Right 1, Left 2 / Right 2, ...)',
      '- Trường Audio Url, Image Url, Explanation có thể để trống.',
      '- Có thể thêm cặp ghép bằng cách thêm cột Left N / Right N (số N tăng dần, không được bỏ qua thứ tự).',
      '- Khi upload file, cần xóa phần lưu ý này.',
    ];

    const noteStartRow = data.length + 3;
    noteLines.forEach((line, index) => {
      const cell = `A${noteStartRow + index}`;
      XLSX.utils.sheet_add_aoa(worksheet, [[line]], { origin: cell });
    });

    worksheet['!cols'] = [
      { wch: 5 },
      { wch: 40 },
      // { wch: 20 },
      // { wch: 20 },
      { wch: 20 },
      { wch: 50 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'MATCHING');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });

    saveAs(blob, 'mau_cau_hoi_ghep_tu.xlsx');
  };

  const handleDownloadChosekSampleExcel = () => {
    const data = [
      {
        STT: 1,
        Content: 'She __ to the __ every day.',
        'Audio Url': 'audio1.mp3',
        Tag: 'nhãn câu hỏi',
        Explanation: 'có thể này và kia',
        Options: 'go1 ; goes1 ; gone1',
        'Answer 1': 'go',
        'Explain 1': 'nó phải như vậy',
        'Answer 2': 'gone',
        'Explain 2': 'nó phải như vậy',
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);

    const noteLines = [
      '* LƯU Ý:',
      '- Không được di chuyển bảng và đổi tên sheet.',
      '- Có thể thêm dòng để thêm câu hỏi.',
      '- Phần từ cần điền phải thay bằng ký tự __ (2 lần shift -).',
      '- Trường Audio Url, Image Url, Explanation có thể trống.',
      '- Cột Options chứa danh sách đáp án sai ngăn cách bởi dấu ;',
      '- Số lượng Answer/Explain phụ thuộc vào số chỗ trống trong câu hỏi.',
      '- Khi upload file, cần xóa phần lưu ý này.',
    ];

    const noteStartRow = data.length + 3;
    noteLines.forEach((line, index) => {
      const cell = `A${noteStartRow + index}`;
      XLSX.utils.sheet_add_aoa(worksheet, [[line]], { origin: cell });
    });

    worksheet['!cols'] = [
      { wch: 5 },
      { wch: 50 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 40 },
      { wch: 30 },
      { wch: 15 },
      { wch: 30 },
      { wch: 15 },
      { wch: 30 },
      { wch: 15 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'CHOOSE ANSWER IN BLANK');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });

    saveAs(blob, 'mau_cau_hoi_chon_vao_cho_trong.xlsx');
  };

  const handleDownloadFillInBlankExcel = () => {
    const data = [
      {
        STT: 1,
        Content: '私は毎朝__を__ます.',
        Tag: 'ngữ pháp N5',
        Explanation: 'Câu diễn tả hành động buổi sáng',
        'Answer 1': 'ごはん',
        'Explain 1': 'Ăn gì đó (cơm)',
        'Answer 2': '食べ',
        'Explain 2': 'Động từ "ăn" (thể masu)',
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);

    const noteLines = [
      '* LƯU Ý:',
      '- Không được di chuyển bảng và đổi tên sheet.',
      '- Có thể thêm dòng để thêm câu hỏi.',
      '- Phần từ cần điền phải thay bằng ký tự __ (2 lần shift -).',
      '- Trường Audio Url, Image Url, Explanation có thể trống.',
      '- Cột Options chứa danh sách đáp án sai ngăn cách bởi dấu ;',
      '- Số lượng Answer/Explain phụ thuộc vào số chỗ trống trong câu hỏi.',
      '- Khi upload file, cần xóa phần lưu ý này.',
    ];

    const noteStartRow = data.length + 3;
    noteLines.forEach((line, index) => {
      const cell = `A${noteStartRow + index}`;
      XLSX.utils.sheet_add_aoa(worksheet, [[line]], { origin: cell });
    });

    worksheet['!cols'] = [
      { wch: 5 },
      { wch: 50 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 40 },
      { wch: 30 },
      { wch: 15 },
      { wch: 30 },
      { wch: 15 },
      { wch: 30 },
      { wch: 15 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'FILL IN BLANK');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });

    saveAs(blob, 'mau_cau_hoi_dien_tu.xlsx');
  };

  return (
    <>
      <div className="question-table-container">
        <Card>
          <Breadcrumb
            items={[
              {
                title: <span>Quản lý nội dung</span>,
              },
              {
                title: <span>Bộ câu hỏi</span>,
              },
            ]}
          />
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <Button
                type={tab === 'question' ? 'primary' : 'default'}
                onClick={() => setTab('question')}
              >
                Quản lý câu hỏi
              </Button>
              <Button
                type={tab === 'group' ? 'primary' : 'default'}
                onClick={() => setTab('group')}
              >
                Quản lý nhóm câu hỏi
              </Button>
              <Button
                type={tab === 'exam' ? 'primary' : 'default'}
                onClick={() => setTab('exam')}
              >
                Quản lý bộ đề
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => navigate('/text-editor')}>
                Trình soạn thảo
              </Button>
              <Popover
                title="Menu"
                trigger="click"
                placement="bottomRight"
                content={
                  <div className="flex flex-col items-start gap-2">
                    <Button
                      className="w-full mt-3"
                      onClick={handleDownloadMultipleChoiSampleExcel}
                      icon={<DownloadOutlined />}
                    >
                      File trắc nghiệm
                    </Button>
                    <Button
                      className="w-full mt-3"
                      onClick={handleDownloadSingleMultipleChoiSampleExcel}
                      icon={<DownloadOutlined />}
                    >
                      File trắc nghiệm đơn
                    </Button>
                    <Button
                      className="w-full mt-3"
                      onClick={handleDownloadSortingSampleExcel}
                      icon={<DownloadOutlined />}
                    >
                      File sắp xếp câu
                    </Button>
                    <Button
                      className="w-full mt-3"
                      onClick={handleDownloadMatchingSampleExcel}
                      icon={<DownloadOutlined />}
                    >
                      File ghép đôi
                    </Button>
                    <Button
                      className="w-full mt-3"
                      onClick={handleDownloadFillInBlankExcel}
                      icon={<DownloadOutlined />}
                    >
                      File điền từ
                    </Button>
                    <Button
                      className="w-full mt-3"
                      onClick={handleDownloadChosekSampleExcel}
                      icon={<DownloadOutlined />}
                    >
                      File chọn đáp án vào chỗ trống
                    </Button>
                  </div>
                }
              >
                <Button type="primary" icon={<DownloadOutlined />} className="">
                  Tải file mẫu
                </Button>
              </Popover>
            </div>
          </div>
        </Card>
        <br />
        {tab === 'question' && <QuestionTab />}
        {tab === 'group' && <GroupQuestionTab />}
        {tab === 'exam' && <ExamTab />}
      </div>
    </>
  );
};

export default QuestionManager;
