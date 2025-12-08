import { CourseEntity } from '#/api/requests';
import { RootState } from '#/src/redux/store/store';
import {
  ClockCircleTwoTone,
  DollarTwoTone,
  DownOutlined,
  FileTextTwoTone,
  RightOutlined,
} from '@ant-design/icons';
import { Card, Collapse, Image, List, Progress, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useSelector } from 'react-redux';

const columns: ColumnsType<CourseEntity> = [
  {
    dataIndex: 'thumbnailUrl',
    key: 'thumbnailUrl',
    render: (thumbnailUrl: string) => (
      <Image className="w-16 h-16 object-cover rounded" src={thumbnailUrl} />
    ),
    title: 'Ảnh',
    width: 100,
  },
  {
    dataIndex: 'title',
    key: 'title',
    render: (_, record: CourseEntity) => (
      <span style={{ cursor: 'pointer', color: '#1890ff' }}>
        {record.title}
      </span>
    ),
    title: 'Tên khóa học',
  },
  {
    dataIndex: 'type',
    key: 'type',
    render: (type: string) => (
      <Tag color={type === CourseEntity.type.BASIC ? 'success' : 'error'}>
        {type === CourseEntity.type.BASIC ? 'Sơ cấp' : 'Nâng cao'}
      </Tag>
    ),
    title: 'Loại',
  },
  {
    dataIndex: 'lessonCount',
    key: 'lessonCount',
    render: (count: number) => (
      <span style={{ cursor: 'pointer', color: '#1890ff' }}>{10}</span>
    ),
    title: 'Bài học',
  },
  {
    dataIndex: 'status',
    key: 'status',
    render: () => <Progress type="circle" percent={30} size={80} />,
    title: 'Trạng thái',
  },
];

const TableStudentCourse = () => {
  // const { userFakeData } = useSelector((state: RootState) => state.users);

  return (
    <>
      <Card className="student-detail-page table-course-student">
        <span className="span-title">Danh sách khoá học</span>
        <Table
          //   loading={loading}
          className="table-course-of-student"
          columns={columns}
          dataSource={[]}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: total => `Tổng số ${total} khóa học`,
            total: 10,
          }}
          expandable={{
            expandIcon: ({ expanded, onExpand, record }) =>
              expanded ? (
                <DownOutlined onClick={e => onExpand(record, e)} />
              ) : (
                <RightOutlined onClick={e => onExpand(record, e)} />
              ),
            expandedRowRender: (record: any) => (
              <Collapse>
                <Collapse.Panel header="Chi tiết khóa học" key="1">
                  <div className="course-detail">
                    <div className="detail-item">
                      <span className="label">
                        <FileTextTwoTone twoToneColor="#d88202" /> Mô tả:
                      </span>
                      <span className="value">{record.description}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">
                        <DollarTwoTone twoToneColor="#b12c1d" /> Giá:
                      </span>
                      <span className="value">
                        {record.price.toLocaleString()} VNĐ
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="label">
                        <ClockCircleTwoTone /> Ngày tạo:
                      </span>
                      <span className="value">{record.createdAt}</span>
                    </div>
                  </div>
                </Collapse.Panel>
                <Collapse.Panel header="Danh sách lịch học" key="2">
                  <List
                    itemLayout="vertical"
                    dataSource={record.sesson}
                    renderItem={(sesson: any) => (
                      <List.Item key={sesson.id}>
                        <div className="list-working-date">
                          <div
                            className={`title-sesson ${sesson.status === 'DONE' ? 'title-sesson-done' : sesson.status === 'TODO' ? 'title-sesson-todo' : 'title-sesson-late'}`}
                          >
                            {sesson.title}
                          </div>
                          |
                          <div className="list-date">
                            {sesson.workingDates.map(
                              (date: string, index: number) => (
                                <Tag key={index} color="blue">
                                  {/* {dayjs(date).format('DD/MM/YYYY')} */}
                                  {date}
                                </Tag>
                              ),
                            )}
                            <Tag
                              color={
                                sesson.status === 'DONE'
                                  ? 'green'
                                  : sesson.status === 'TODO'
                                    ? 'blue'
                                    : 'red'
                              }
                            >
                              {sesson.status === 'DONE'
                                ? 'Hoàn thành'
                                : sesson.status === 'TODO'
                                  ? 'Đang thực hiện'
                                  : 'Chưa hoàn thành'}
                            </Tag>
                          </div>
                        </div>
                      </List.Item>
                    )}
                  />
                </Collapse.Panel>
              </Collapse>
            ),
            rowExpandable: () => true,
          }}
          rowKey="id"
        />
      </Card>
    </>
  );
};

export default TableStudentCourse;
