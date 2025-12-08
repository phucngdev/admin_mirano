import { jsonAxios } from '../axios/axios';
import type {
  CreateQuestionGroupDto,
  CreateQuestionGroupReferenceDto,
  UpdateQuestionGroupDto,
} from '../requests';

export const createQuestionGroupReferenceService = async (
  data: CreateQuestionGroupReferenceDto,
) => await jsonAxios.post(`question-groups-references`, data);

export const deleteQuestionGroupReferenceService = async (
  parentId: string,
  questionGroupId: string,
) =>
  await jsonAxios.delete(
    `question-groups-references?parentId=${parentId}&questionGroupId=${questionGroupId}`,
  );
