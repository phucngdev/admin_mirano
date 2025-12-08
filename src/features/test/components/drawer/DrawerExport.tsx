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
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { exportReportClassService } from '#/api/services/classService';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import useExportExcel from '#/shared/hooks/useExportExcel';
import { getAllTest } from '#/src/redux/thunk/test.thunk';
import { getTestCategory } from '#/src/redux/thunk/test-category.thunk';
import { exportScoreTestResultService } from '#/api/services/testResultService';

const { RangePicker } = DatePicker;

export enum ClassReportScope {
  CUSTOM = 'CUSTOM',
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}

interface DrawerExportProps {
  open: boolean;
  onClose: () => void;
}

const DrawerExport = ({ open, onClose }: DrawerExportProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const scope = Form.useWatch('scope', form);
  const { data, dataTest } = useSelector((state: RootState) => state.test);
  const [loading, setLoading] = useState<
    'test-category' | 'test' | 'result' | ''
  >('');
  const [selectedTestCategoryId, setSelectedTestCategoryId] = useState<
    string | undefined
  >(undefined);
  const [selectedTestId, setSelectedTestId] = useState<string | undefined>(
    undefined,
  );

  const fetchDataTestCategory = async () => {
    setLoading('test-category');
    dispatch(
      getTestCategory({
        limit: 100,
        offset: 0,
      }),
    );
    setLoading('');
  };

  useEffect(() => {
    if (open) {
      fetchDataTestCategory();
    }
  }, []);

  const fetchDataTest = async () => {
    if (!selectedTestCategoryId) return;
    setLoading('test');
    await dispatch(
      getAllTest({
        categoryId: selectedTestCategoryId,
        limit: 100,
        offset: 0,
      }),
    );
    setLoading('');
  };

  useEffect(() => {
    if (open) {
      fetchDataTest();
    }
  }, [selectedTestCategoryId]);

  useEffect(() => {
    form.resetFields();
    form.setFieldValue('export_type', 'excel');
    form.setFieldValue('options', ['31', '32']);
  }, [open]);

  const handleExport = async () => {
    try {
      if (!selectedTestId) return;
      const values = await form.validateFields();
      setLoading('result');
      const res = await exportScoreTestResultService(
        selectedTestId,
        scope,
        undefined,
        values?.range?.[0],
        values?.range?.[1],
      );

      let fileName = `Bảng_điểm_thi_thử.xlsx`;

      useExportExcel(res.data, fileName);
      message.success('Xuất báo cáo thành công!');
    } catch (err) {
      console.log('🚀 ~ handleExport ~ err:', err);
      message.error('Xuất báo cáo thất bại!');
    } finally {
      setLoading('');
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
            loading={loading === 'result'}
          >
            Export
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Chọn bài thi"
          rules={[{ required: true, message: 'Vui lòng chọn bài thi!' }]}
        >
          <Select
            placeholder="Chọn bài thi"
            loading={loading === 'test-category'}
            value={selectedTestCategoryId}
            onChange={value => setSelectedTestCategoryId(value)}
            options={data?.items.map(c => {
              return {
                label: c.name,
                value: c.id,
              };
            })}
          />
        </Form.Item>
        <Form.Item
          label="Chọn đề thi"
          name="homeworkCourseId"
          rules={[{ required: true, message: 'Vui lòng chọn đề thi!' }]}
        >
          <Select
            placeholder="Chọn đề thi"
            loading={loading === 'test'}
            value={selectedTestId}
            onChange={value => setSelectedTestId(value)}
            options={dataTest?.items.map(c => {
              return {
                label: c.name,
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
                {scope === ClassReportScope.DAY && 'Hôm nay'}
                {scope === ClassReportScope.WEEK && 'Theo tuần'}
                {scope === ClassReportScope.MONTH && 'Theo tháng'}
                {scope === ClassReportScope.YEAR && 'Theo năm'}
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
              { label: 'Lịch sử nộp bài', value: '31' },
              { label: 'Lịch sử nộp bài', value: '32' },
              { label: 'Lịch sử nộp bài', value: '2' },
              { label: 'Lịch sử nộp bài', value: '1' },
              { label: 'Lịch sử nộp bài', value: '4' },
              { label: 'Lịch sử nộp bài', value: '5' },
              { label: 'Lịch sử nộp bài', value: '6' },
              { label: 'Lịch sử nộp bài', value: '7' },
              { label: 'Lịch sử nộp bài', value: '8' },
            ]}
            disabled
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
