import BaseCKEditor from '#/shared/components/ckeditor/BaseCKEditor';
import { useState } from 'react';
import { ClearOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';

const CKEditorToHTML = () => {
  const [value, setValue] = useState('');

  const prettifyHTML = (html: string) => {
    if (!html) return '<p>Start typing to see HTML output...</p>';
    let formatted = html;
    let indent = 0;
    const tab = '  ';
    formatted = formatted.replace(/</g, '\n<');
    const lines = formatted.split('\n').filter(line => line.trim());

    const formattedLines = lines.map(line => {
      const trimmed = line.trim();

      if (trimmed.startsWith('</')) indent = Math.max(0, indent - 1);
      const indentedLine = tab.repeat(indent) + trimmed;

      if (
        trimmed.startsWith('<') &&
        !trimmed.startsWith('</') &&
        !trimmed.endsWith('/>')
      ) {
        const tagName = trimmed.match(/<(\w+)/)?.[1];
        const selfClosingTags = ['br', 'img', 'hr', 'input', 'meta', 'link'];
        if (tagName && !selfClosingTags.includes(tagName.toLowerCase())) {
          indent++;
        }
      }

      return indentedLine;
    });

    return formattedLines.join('\n');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      message.success('Copied');
    } catch (err) {
      message.error('Lỗi copy');
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <>
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">CKEDITOR</h3>
          <Button type="primary" danger onClick={() => setValue('')}>
            <ClearOutlined /> Làm mới
          </Button>
        </div>
        <BaseCKEditor
          changeData={(text: string) => {
            setValue(text);
          }}
          value={value}
        />
      </div>
      <div className="flex-1 height-[100vh] overflow-auto">
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">HTML Preview</h3>
            <Button onClick={handleCopy} disabled={!value} type="primary">
              Copy HTML
            </Button>
          </div>

          {/* Rendered HTML */}
          {/* <div className="mb-4 render-output">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Rendered Output:
              </h4>
              <div
                className="border rounded p-3 bg-gray-50 min-h-[100px] rendered-content"
                dangerouslySetInnerHTML={{ __html: value }}
              />
            </div> */}

          {/* Raw HTML */}
          <div>
            {/* <h4 className="text-sm font-medium text-gray-700 mb-2">
                Raw HTML:
              </h4> */}
            <pre className="bg-gray-100 p-3 rounded text-sm border">
              <code>{prettifyHTML(value)}</code>
            </pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default CKEditorToHTML;
