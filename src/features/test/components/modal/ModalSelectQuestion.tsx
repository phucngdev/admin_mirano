import {
  practiceTypeColorMap,
  practiceTypeLabelMap,
} from '#/api/requests/interfaces/LabelMap';
import {
  CloseOutlined,
  DeleteTwoTone,
  LinkOutlined,
  StopOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Tag,
  Table,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
import './index.scss';
import { ColumnsType } from 'antd/es/table';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { useSelector } from 'react-redux';
import { getAllQuestion } from '#/src/redux/thunk/question.thunk';
import { Tool } from '#/shared/utils';
import { updateQuestionGroup } from '#/src/redux/thunk/question-group.thunk';
import { QuestionEntity, QuestionGroupEntity } from '#/api/requests';

const columns = (): ColumnsType<any> => [
  {
    dataIndex: 'content',
    key: 'content',
    render: (_, record: any) => {
      return (
        <span className="question-title">{Tool.stripHtml(record.content)}</span>
      );
    },
    title: 'Câu hỏi',
  },
  {
    dataIndex: 'imageUrl',
    key: 'imageUrl',
    render: (imageUrl: string) => (
      <Image
        width={70}
        height={70}
        src={imageUrl}
        fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
      />
    ),
    title: 'Ảnh',
    width: 150,
  },
  {
    dataIndex: 'audioUrl',
    key: 'audioUrl',
    render: (audioUrl: string) =>
      audioUrl ? (
        <a href={audioUrl} target="_blank">
          <Tag icon={<LinkOutlined />} color="blue">
            Click to audio
          </Tag>
        </a>
      ) : (
        <Tag icon={<StopOutlined />} color="blue">
          ----------
        </Tag>
      ),
    title: 'Audio',
    width: 150,
  },
  {
    dataIndex: 'type',
    key: 'type',
    render: (type: QuestionEntity.type) => {
      const label = practiceTypeLabelMap[type] || 'Không xác định';
      const color = practiceTypeColorMap[type] || 'default';

      return <Tag color={color}>{label}</Tag>;
    },
    title: 'Loại',
    width: 150,
  },
];

interface ModalSelectQuestionProps {
  open: boolean;
  onClose: () => void;
  questionGroup: QuestionGroupEntity | null;
}

const ModalSelectQuestion = ({
  open,
  onClose,
  questionGroup,
}: ModalSelectQuestionProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { data } = useSelector((state: RootState) => state.question);

  const typeQuestion = Form.useWatch('type_question', form);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [pagination, setPagination] = useState({
    limit: 10, // Số item mỗi trang
    offset: 0, // Vị trí bắt đầu
    current: 1, // Trang hiện tại
    query: '',
    tag: '',
  });

  const fetchData = async () => {
    if (!questionGroup) return;
    await dispatch(
      getAllQuestion({
        limit: pagination.limit,
        offset: pagination.offset,
        query: pagination.query,
        type: QuestionEntity.type.MULTIPLE_CHOICE,
        tag: pagination.tag,
      }),
    );
  };

  useEffect(() => {
    fetchData();
  }, [pagination, typeQuestion, questionGroup]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const { current, pageSize } = pagination;

    setPagination(prev => ({
      ...prev,
      current,
      limit: pageSize,
      offset: (current - 1) * pageSize,
    }));
  };

  const handleSubmit = async () => {
    if (!questionGroup) return;
    // const list_id = questionGroup.questions.map(q => {
    //   return q.id;
    // });
    // const result = await dispatch(
    //   updateQuestionGroup({
    //     id: questionGroup.id,
    //     data: {
    //       ...questionGroup,
    //       questions: [...list_id, ...selectedRowKeys],
    //     },
    //   }),
    // );
    // if (result.payload.statusCode === 200) {
    //   message.success('Thêm thành công');
    //   onClose();
    //   setSelectedRowKeys([]);
    // } else {
    //   message.error('Thêm thất bại');
    // }
  };

  return (
    <>
      <Modal
        closeIcon={<CloseOutlined />}
        className="modal-select-question"
        footer={[
          <Button key="cancel" onClick={onClose}>
            Hủy
          </Button>,
          <Button key="submit" onClick={handleSubmit} type="primary">
            Lưu
          </Button>,
        ]}
        onCancel={onClose}
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
              Thêm câu hỏi
            </span>
          </>
        }
        width={1000}
      >
        <Form
          form={form}
          layout="vertical"
          validateTrigger={['onBlur', 'onSubmit']}
          className="form-new-question"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type_question"
                label="Loại câu hỏi:"
                style={{ width: '100%' }}
              >
                {/* <Select
                  onChange={value => {
                    if (type === 'nopractice') {
                      message.info('Mục hiện tại không thể đổi loại câu hỏi');
                      form.setFieldValue(
                        'type_question',
                        QuestionEntity.QuestionType.MultipleChoice,
                      );
                      return;
                    }
                    form.setFieldValue('type_question', value);
                  }}
                  placeholder="Loại câu hỏi"
                  className="custom-select"
                  defaultValue={
                    practiceTypeLabelMap[
                      QuestionEntity.QuestionType.MultipleChoice
                    ]
                  }
                  options={Object.values(QuestionEntity.QuestionType).map(
                    value => ({
                      value,
                      label: practiceTypeLabelMap[value],
                    }),
                  )}
                /> */}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                validateTrigger={['onBlur', 'onChange']}
                name="search"
                label="Tìm kiếm:"
                style={{
                  width: '100%',
                }}
              >
                <Input
                  className="custom-input"
                  placeholder="Tìm kiếm"
                  onChange={e =>
                    setPagination({
                      ...pagination,
                      query: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div className="title-list-question">
          Danh sách câu hỏi:{'   '}
          {selectedRowKeys.length > 0 && (
            <>
              <Tag color="blue">Đã chọn {selectedRowKeys.length}</Tag>{' '}
              <Tag
                closable={{
                  closeIcon: <DeleteTwoTone twoToneColor="#cf1322" />,
                  'aria-label': 'Close Button',
                }}
                onClose={() => setSelectedRowKeys([])}
                color="red"
              >
                Bỏ chọn
              </Tag>
            </>
          )}
        </div>
        <Table
          rowKey="id"
          columns={columns()}
          dataSource={data.items}
          scroll={{ y: 340 }}
          pagination={{
            pageSize: pagination.limit,
            showSizeChanger: true,
            showTotal: total => `Tổng số ${total} câu hỏi`,
            total: data.meta.total,
          }}
          onChange={handleTableChange}
          rowSelection={rowSelection}
        />
      </Modal>
    </>
  );
};

export default ModalSelectQuestion;
