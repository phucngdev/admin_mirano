/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TopicVocabEntity } from './TopicVocabEntity';

export type TopicEntity = {
  id: string;
  name: string;
  image: string;
  count?: number;
  topicVocabs?: Array<TopicVocabEntity>;
};

