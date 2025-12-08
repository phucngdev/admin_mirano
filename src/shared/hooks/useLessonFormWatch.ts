import { Form, FormInstance } from 'antd';

export const useLessonFormWatch = (form: FormInstance) => {
  const title = Form.useWatch('title', form); // title lesson
  const isRequired = Form.useWatch('isRequired', form);
  const videoUrlLesson = Form.useWatch('videoUrlLesson', form);
  // ngữ pháp
  const contentGrammar = Form.useWatch('contentGrammar', form);

  // video
  const descriptionVideo = Form.useWatch('descriptionVideo', form);
  const videoUrlType = Form.useWatch('videoUrlType', form);
  const allowPreviewVideo = Form.useWatch('allowPreviewVideo', form);
  const videoRewindLockVideo = Form.useWatch('videoRewindLockVideo', form);
  const allowDiscussionVideo = Form.useWatch('allowDiscussionVideo', form);

  // pdf slide
  const descriptionPdf = Form.useWatch('descriptionPdf', form);
  const slideUrl = Form.useWatch('slideUrl', form);
  const lockRightClickAndCopyPdf = Form.useWatch(
    'lockRightClickAndCopyPdf',
    form,
  );
  const allowContentDownloadsPdf = Form.useWatch(
    'allowContentDownloadsPdf',
    form,
  );
  const allowDiscussionPdf = Form.useWatch('allowDiscussionPdf', form);

  // text
  const contentText = Form.useWatch('contentText', form);
  const descriptionText = Form.useWatch('descriptionText', form);
  const lockRightClickAndCopyText = Form.useWatch(
    'lockRightClickAndCopyText',
    form,
  );
  const allowPreviewText = Form.useWatch('allowPreviewText', form);
  const allowDiscussionText = Form.useWatch('allowDiscussionText', form);

  return {
    contentGrammar,
    title,
    isRequired,
    videoUrlLesson,
    descriptionVideo,
    videoUrlType,
    descriptionPdf,
    slideUrl,
    contentText,
    descriptionText,
    lockRightClickAndCopyText,
    allowPreviewText,
    allowDiscussionText,
    lockRightClickAndCopyPdf,
    allowContentDownloadsPdf,
    allowDiscussionPdf,
    allowPreviewVideo,
    videoRewindLockVideo,
    allowDiscussionVideo,
  };
};
