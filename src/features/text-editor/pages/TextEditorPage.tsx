import BaseCKEditor from '#/shared/components/ckeditor/BaseCKEditor';
import React, { useState } from 'react';
import './index.scss';
import { ClearOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Input, message } from 'antd';
import CKEditorToHTML from '../components/tab/CKEditorToHTML';
import { useNavigate } from 'react-router-dom';

const tabs = [
  {
    key: 'text',
    label: 'Text',
    items: [
      {
        key: 'ckeditor-to-html',
        label: 'ckeditor to html',
      },
    ],
  },
];

const TextEditorPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(tabs[0].items[0].key);

  const renderContent = () => {
    switch (tab) {
      case 'ckeditor-to-html':
        return <CKEditorToHTML />;
      default:
        return <div className="p-4">Vui lòng chọn tab.</div>;
    }
  };

  return (
    <>
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between relative">
        <button
          onClick={() => navigate(-1)}
          className="border-none bg-transparent flex items-center justify-center cursor-pointer text-white gap-2"
        >
          <CloseOutlined /> <h3>Quay lại</h3>
        </button>
        <h3>Rika Soft</h3>
        <h2 className="text-lg font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Transform
        </h2>
      </div>
      <div className="flex items-start gap-2 min-h-[100vh]">
        <div
          className="w-[250px] height-[100vh] overflow-auto p-4"
          style={{ borderRight: '1px solid #d9d9d9' }}
        >
          <Input placeholder="Tìm kiếm" className="w-full" />
          <div className="flex flex-col gap-2 mt-10">
            {tabs.map(item => (
              <>
                <h3 key={item.key}>{item.label}</h3>
                {item.items.map(b => (
                  <>
                    <Button onClick={() => setTab(b.key)} key={b.key}>
                      {b.label}
                    </Button>
                  </>
                ))}
              </>
            ))}
          </div>
        </div>
        {renderContent()}
      </div>
    </>
  );
};

export default TextEditorPage;
