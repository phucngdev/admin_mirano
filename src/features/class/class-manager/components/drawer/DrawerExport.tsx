import React, { useEffect, useState } from 'react';
import {
  Drawer,
  Form,
  Select,
  DatePicker,
  Button,
  Space,
  Typography,
  Checkbox,
  message,
  Spin,
} from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '#/src/redux/store/store';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { exportReportClassService } from '#/api/services/classService';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import useExportExcel from '#/shared/hooks/useExportExcel';

const { RangePicker } = DatePicker;

export enum ClassReportScope {
  CUSTOM = 'CUSTOM',
  REALTIME = 'REALTIME',
  FULL_SCOPE = 'FULL_SCOPE',
}

interface DrawerExportProps {
  open: boolean;
  onClose: () => void;
}

const DrawerExport = ({ open, onClose }: DrawerExportProps) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const scope = Form.useWatch('scope', form);
  const data = useSelector((state: RootState) => state.class.classEdit);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.resetFields();
    form.setFieldValue('export_type', 'excel');
    form.setFieldValue('options', ['31', '32']);
  }, [open]);

  const handleExport = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      let params_service: any = {
        id: id as string,
        scope: values.scope,
        attendanceCourseId: values.attendanceCourseId,
        homeworkCourseId: values.homeworkCourseId,
      };

      if (
        values.range &&
        values.range[0] &&
        values.range[1] &&
        scope === ClassReportScope.CUSTOM
      ) {
        params_service.fromDate = values.range[0];
        params_service.toDate = values.range[1];
      }

      const res = await exportReportClassService(
        params_service.id,
        params_service.scope,
        params_service.attendanceCourseId,
        params_service.homeworkCourseId,
        params_service.fromDate,
        params_service.toDate,
      );

      let fileName = `Báo cáo lớp ${data?.name}`;
      if (values.scope === ClassReportScope.FULL_SCOPE) {
        fileName += ` - Toàn bộ khoá học`;
      } else if (values.scope === ClassReportScope.REALTIME) {
        fileName += ` - Từ ${dayjs(data?.startDate).format('DD-MM-YYYY')} đến hiện tại (${dayjs().format('DD-MM-YYYY')})`;
      } else if (values.scope === ClassReportScope.CUSTOM && values.range) {
        const from = dayjs(values.range[0]).format('DD-MM-YYYY');
        const to = dayjs(values.range[1]).format('DD-MM-YYYY');
        fileName += ` - Từ ${from} đến ${to}`;
      }
      fileName += `.xlsx`;

      useExportExcel(res.data, fileName);

      message.success('Xuất báo cáo thành công!');
    } catch (err) {
      console.log('🚀 ~ handleExport ~ err:', err);
      message.error('Xuất báo cáo thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title="Xuất báo cáo"
      open={open}
      onClose={onClose}
      width={500}
      footer={
        <div className="p-4 flex items-center gap-4 justify-between">
          <Button className="flex-1" onClick={onClose}>
            Huỷ
          </Button>
          <Button
            icon={<ExportOutlined />}
            className="flex-1"
            type="primary"
            onClick={handleExport}
            loading={loading}
          >
            Export
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Chọn khoá học điểm danh"
          name="attendanceCourseId"
          rules={[
            { required: true, message: 'Vui lòng chọn khoá học điểm danh!' },
          ]}
        >
          <Select
            placeholder="Chọn khoá học điểm danh"
            options={data?.courses.map(c => {
              return {
                label: c.title,
                value: c.id,
              };
            })}
          />
        </Form.Item>
        <Form.Item
          label="Chọn khoá học bài tập"
          name="homeworkCourseId"
          rules={[
            { required: true, message: 'Vui lòng chọn khoá học bài tập!' },
          ]}
        >
          <Select
            placeholder="Chọn khoá học bài tập"
            options={data?.courses.map(c => {
              return {
                label: c.title,
                value: c.id,
              };
            })}
          />
        </Form.Item>

        <Form.Item
          label="Chọn phạm vi"
          name="scope"
          rules={[{ required: true, message: 'Vui lòng chọn khoá học!' }]}
        >
          <Select placeholder="Chọn phạm vi">
            {Object.values(ClassReportScope).map(scope => (
              <Select.Option key={scope} value={scope}>
                {scope === ClassReportScope.CUSTOM && 'Tuỳ chỉnh thời gian'}
                {scope === ClassReportScope.REALTIME &&
                  'Bắt đầu lớp học cho tới hiện tại'}
                {scope === ClassReportScope.FULL_SCOPE && 'Toàn bộ khoá học'}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {scope === ClassReportScope.CUSTOM && (
          <>
            <Form.Item
              label="Chọn khoảng thời gian"
              name="range"
              rules={[
                { required: true, message: 'Vui lòng chọn khoảng thời gian!' },
              ]}
            >
              <RangePicker className="w-full" />
            </Form.Item>
          </>
        )}

        <Form.Item label="Chọn dữ liệu xuất" name="options">
          <Checkbox.Group
            options={[
              { label: 'Tỷ lệ điểm danh', value: '31' },
              { label: 'Tỷ lệ làm bài tập', value: '32' },
              { label: 'Bảng điểm', value: '2', disabled: true },
              { label: 'Điểm chuyên cần', value: '1', disabled: true },
              { label: 'Lịch sử nộp bài', value: '4', disabled: true },
              { label: 'Danh sách bài tự luận', value: '5', disabled: true },
              { label: 'Thông tin học viên', value: '6', disabled: true },
              { label: 'Thời lượng tham gia học', value: '7', disabled: true },
              { label: 'So sánh thành tích', value: '8', disabled: true },
            ]}
            defaultValue={['31', '32']}
            className="flex flex-col gap-2"
          />
        </Form.Item>
        <Form.Item
          label="Chọn định dạng"
          name="export_type"
          rules={[{ required: true, message: 'Vui lòng chọn định dạng!' }]}
        >
          <Checkbox.Group
            defaultValue={['excel']}
            options={[
              { label: 'Excel', value: 'excel' },
              { label: 'PDF', value: 'pdf', disabled: true },
            ]}
            className="flex flex-col gap-2"
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default DrawerExport;
