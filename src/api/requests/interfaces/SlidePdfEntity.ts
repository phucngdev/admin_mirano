import type { DocumentEntity } from './DocumentEntity';

export interface SlidePdfEntity {
  id: string;
  slideUrl: string;
  description: string;
  documents: DocumentEntity[];
  discuss?: string[];
  lockRightClickAndCopy: boolean;
  allowContentDownloads: boolean;
  allowDiscussion: boolean;
}
