import { useState, useEffect, useRef, memo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  AccessibilityHelp,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  CloudServices,
  Code,
  CodeBlock,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  FullPage,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Markdown,
  MediaEmbed,
  Mention,
  PageBreak,
  Paragraph,
  PasteFromMarkdownExperimental,
  PasteFromOffice,
  RemoveFormat,
  SelectAll,
  ShowBlocks,
  SourceEditing,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Undo,
  ImageInsert,
  SimpleUploadAdapter,
  HeadingOption,
} from 'ckeditor5';

import translations from 'ckeditor5/translations/vi.js';
import 'ckeditor5/ckeditor5.css';
import './readOnlyCK.scss';
// import '@ckeditor/ckeditor5-build-classic/build/ckeditor.css';

interface ReadOnlyCKProps {
  value: string;
}

function ReadOnlyCK({ value }: ReadOnlyCKProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const editorConfig = {
    toolbar: {
      items: [
        // 'undo',
        // 'redo',
        // '|',
        // 'sourceEditing',
        // 'showBlocks',
        // 'findAndReplace',
        // '|',
        // 'heading',
        // '|',
        // 'fontSize',
        // 'fontFamily',
        // 'fontColor',
        // 'fontBackgroundColor',
        // '|',
        // 'bold',
        // 'italic',
        // 'underline',
        // 'strikethrough',
        // 'subscript',
        // 'superscript',
        // 'code',
        // 'removeFormat',
        // '|',
        // 'specialCharacters',
        // 'horizontalLine',
        // 'pageBreak',
        // 'link',
        // 'mediaEmbed',
        // 'insertImage',
        // 'insertTable',
        // 'highlight',
        // 'blockQuote',
        // 'codeBlock',
        // 'htmlEmbed',
        // '|',
        // 'alignment',
        // '|',
        // 'bulletedList',
        // 'numberedList',
        // 'todoList',
        // 'outdent',
        // 'indent',
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp,
      Alignment,
      Autoformat,
      AutoImage,
      AutoLink,
      Autosave,
      BalloonToolbar,
      BlockQuote,
      Bold,
      CloudServices,
      Code,
      CodeBlock,
      Essentials,
      FindAndReplace,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      FullPage,
      GeneralHtmlSupport,
      Heading,
      Highlight,
      HorizontalLine,
      HtmlComment,
      HtmlEmbed,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      Markdown,
      MediaEmbed,
      Mention,
      PageBreak,
      Paragraph,
      PasteFromMarkdownExperimental,
      PasteFromOffice,
      RemoveFormat,
      SelectAll,
      ShowBlocks,
      SourceEditing,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Strikethrough,
      Subscript,
      Superscript,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextTransformation,
      TodoList,
      Underline,
      Undo,
      SimpleUploadAdapter,
    ],
    balloonToolbar: [
      'bold',
      'italic',
      '|',
      'link',
      '|',
      'bulletedList',
      'numberedList',
    ],
    fontFamily: {
      supportAllValues: true,
    },
    fontSize: {
      options: [10, 12, 14, 16, 'default', 18, 20, 22],
      supportAllValues: true,
    },
    heading: {
      options: [
        {
          model: 'paragraph',
          view: 'p',
          title: 'Paragraph',
          class: 'ck-heading_paragraph',
        },
        {
          model: 'heading1',
          view: 'h1',
          title: 'Heading 1',
          class: 'ck-heading_heading1',
        },
        {
          model: 'heading2',
          view: 'h2',
          title: 'Heading 2',
          class: 'ck-heading_heading2',
        },
        {
          model: 'heading3',
          view: 'h3',
          title: 'Heading 3',
          class: 'ck-heading_heading3',
        },
        {
          model: 'heading4',
          view: 'h4',
          title: 'Heading 4',
          class: 'ck-heading_heading4',
        },
        {
          model: 'heading5',
          view: 'h5',
          title: 'Heading 5',
          class: 'ck-heading_heading5',
        },
        {
          model: 'heading6',
          view: 'h6',
          title: 'Heading 6',
          class: 'ck-heading_heading6',
        },
      ] as HeadingOption[],
    },
    htmlSupport: {
      allow: [
        {
          name: /.+/,
          styles: [/.*/],
          attributes: [/.*/],
          classes: [/.*/],
        },
      ],
    },

    initialData: value,
    language: 'vi',
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual' as const,
          label: 'Downloadable',
          attributes: {
            download: 'file',
          },
        },
      },
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },

    image: {
      toolbar: [
        'toggleImageCaption',
        'imageTextAlternative',
        '|',
        'imageStyle:inline',
        'imageStyle:wrapText',
        'imageStyle:breakText',
        '|',
        'resizeImage',
      ],
    },

    placeholder: 'Nội dung...',

    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableProperties',
        'tableCellProperties',
      ],
    },
    translations: [translations],
  };

  return (
    <div className="readonly-ck-custom">
      <div className="opacity-readonly"></div>
      <div className="editor-container editor-container_classic-editor editor-container_include-style">
        <div className="editor-container__editor">
          <div ref={editorRef}>
            {isLayoutReady ? (
              <CKEditor
                data={value}
                editor={ClassicEditor}
                config={editorConfig}
              />
            ) : (
              <div style={{ textAlign: 'center' }}>Nội dung</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ReadOnlyCK);
