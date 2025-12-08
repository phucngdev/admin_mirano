import { Button, Card, Table } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '#/src/redux/store/store';
import dayjs from 'dayjs';
import { CloseOutlined } from '@ant-design/icons';

interface StudentScoreTableProps {
  onClose: () => void;
}

const StudentScoreTable = ({ onClose }: StudentScoreTableProps) => {
  const columns = [
    {
      title: 'Bài',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Điểm',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: 'Lượt làm',
      dataIndex: 'attempt',
      key: 'attempt',
    },
    {
      title: 'Ngày làm',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
  ];

  return (
    <Card className="table-score">
      <div className="header-table">
        <span className="title-stable-score">Bảng điểm sinh viên</span>
        <Button onClick={onClose} icon={<CloseOutlined />} />
      </div>

      <Table columns={columns} dataSource={[]} pagination={false} bordered />
    </Card>
  );
};

export default StudentScoreTable;
