// generated with @7nohe/openapi-react-query-codegen@0.5.3 
import { useQuery, useMutation, UseQueryResult, UseQueryOptions, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import { AddCourseDto } from "../requests/models/AddCourseDto";
import { AddStudentDto } from "../requests/models/AddStudentDto";
import { AddTeacherDto } from "../requests/models/AddTeacherDto";
import { AdminUpdateUserDto } from "../requests/models/AdminUpdateUserDto";
import { AnswerDto } from "../requests/models/AnswerDto";
import { AnswerEntiti } from "../requests/models/AnswerEntiti";
import { AppConfigEntity } from "../requests/models/AppConfigEntity";
import { BlogEntity } from "../requests/models/BlogEntity";
import { ClassDetailEntity } from "../requests/models/ClassDetailEntity";
import { ClassDetailOfStudentEntity } from "../requests/models/ClassDetailOfStudentEntity";
import { ClassEntity } from "../requests/models/ClassEntity";
import { ClassExamResultDetailEntity } from "../requests/models/ClassExamResultDetailEntity";
import { ClassExamResultEntity } from "../requests/models/ClassExamResultEntity";
import { ClassReviewEntity } from "../requests/models/ClassReviewEntity";
import { ClassStudentDetailEntity } from "../requests/models/ClassStudentDetailEntity";
import { CloneScheduleDto } from "../requests/models/CloneScheduleDto";
import { ConfirmRegisterDto } from "../requests/models/ConfirmRegisterDto";
import { CourseDetailOfStudentEntity } from "../requests/models/CourseDetailOfStudentEntity";
import { CourseEntity } from "../requests/models/CourseEntity";
import { CourseVocabEntity } from "../requests/models/CourseVocabEntity";
import { CreateClassDto } from "../requests/models/CreateClassDto";
import { CreateClassReviewDto } from "../requests/models/CreateClassReviewDto";
import { CreateClassSessonScheduleDto } from "../requests/models/CreateClassSessonScheduleDto";
import { CreateCourseDto } from "../requests/models/CreateCourseDto";
import { CreateCourseVocabDto } from "../requests/models/CreateCourseVocabDto";
import { CreateDocumentType } from "../requests/models/CreateDocumentType";
import { CreateEssayTestDto } from "../requests/models/CreateEssayTestDto";
import { CreateExamAndAddToLessonDto } from "../requests/models/CreateExamAndAddToLessonDto";
import { CreateExamDto } from "../requests/models/CreateExamDto";
import { CreateExamLessonDto } from "../requests/models/CreateExamLessonDto";
import { CreateFlashCardDto } from "../requests/models/CreateFlashCardDto";
import { CreateGrammarDto } from "../requests/models/CreateGrammarDto";
import { CreateKanjiDto } from "../requests/models/CreateKanjiDto";
import { CreateLessonCommentDto } from "../requests/models/CreateLessonCommentDto";
import { CreateLessonDto } from "../requests/models/CreateLessonDto";
import { CreateNotificationTokenDto } from "../requests/models/CreateNotificationTokenDto";
import { CreateQuestionDto } from "../requests/models/CreateQuestionDto";
import { CreateQuestionFlashCardDto } from "../requests/models/CreateQuestionFlashCardDto";
import { CreateQuestionGroupAndReferenceDto } from "../requests/models/CreateQuestionGroupAndReferenceDto";
import { CreateQuestionGroupDto } from "../requests/models/CreateQuestionGroupDto";
import { CreateQuestionGroupReferenceDto } from "../requests/models/CreateQuestionGroupReferenceDto";
import { CreateQuizFlashCardDto } from "../requests/models/CreateQuizFlashCardDto";
import { CreateSessonDto } from "../requests/models/CreateSessonDto";
import { CreateSlideDto } from "../requests/models/CreateSlideDto";
import { CreateTestCategoryDto } from "../requests/models/CreateTestCategoryDto";
import { CreateTestDetailDto } from "../requests/models/CreateTestDetailDto";
import { CreateTestDto } from "../requests/models/CreateTestDto";
import { CreateTestProgressDto } from "../requests/models/CreateTestProgressDto";
import { CreateTestResultDto } from "../requests/models/CreateTestResultDto";
import { CreateTextDto } from "../requests/models/CreateTextDto";
import { CreateTopicDto } from "../requests/models/CreateTopicDto";
import { CreateTopicVocabDto } from "../requests/models/CreateTopicVocabDto";
import { CreateVideoUrlDto } from "../requests/models/CreateVideoUrlDto";
import { DeleteDocumentType } from "../requests/models/DeleteDocumentType";
import { DocumentEntityType } from "../requests/models/DocumentEntityType";
import { EncryptedResponse } from "../requests/models/EncryptedResponse";
import { EnrolledCourseEntity } from "../requests/models/EnrolledCourseEntity";
import { EssayAnswerDto } from "../requests/models/EssayAnswerDto";
import { EssayAnswerEntity } from "../requests/models/EssayAnswerEntity";
import { EssayTestEntity } from "../requests/models/EssayTestEntity";
import { ExamEntity } from "../requests/models/ExamEntity";
import { ExamLessonEntity } from "../requests/models/ExamLessonEntity";
import { ExamLessonWithMappingEntity } from "../requests/models/ExamLessonWithMappingEntity";
import { ExamResulEntity } from "../requests/models/ExamResulEntity";
import { ExamResulHistoryDetailEntity } from "../requests/models/ExamResulHistoryDetailEntity";
import { ExamResulHistoryEntity } from "../requests/models/ExamResulHistoryEntity";
import { ExamResultInCourseOfStudentEntity } from "../requests/models/ExamResultInCourseOfStudentEntity";
import { ExamResultWithExamEntity } from "../requests/models/ExamResultWithExamEntity";
import { ExamWithMappingEntity } from "../requests/models/ExamWithMappingEntity";
import { FlashCardEntity } from "../requests/models/FlashCardEntity";
import { FlashCardStatusEntity } from "../requests/models/FlashCardStatusEntity";
import { ForgotPasswordInputDto } from "../requests/models/ForgotPasswordInputDto";
import { GrammarEntity } from "../requests/models/GrammarEntity";
import { GroupedTestDetailEntity } from "../requests/models/GroupedTestDetailEntity";
import { IBaseResponse } from "../requests/models/IBaseResponse";
import { IContextUser } from "../requests/models/IContextUser";
import { ILoginResponse } from "../requests/models/ILoginResponse";
import { IMessageResponse } from "../requests/models/IMessageResponse";
import { IMeta } from "../requests/models/IMeta";
import { InBlankAnswerDto } from "../requests/models/InBlankAnswerDto";
import { InformationEssayTestEntity } from "../requests/models/InformationEssayTestEntity";
import { IPaginatedResponse } from "../requests/models/IPaginatedResponse";
import { KanjiDictionaryEntity } from "../requests/models/KanjiDictionaryEntity";
import { KanjiEntity } from "../requests/models/KanjiEntity";
import { LessonCommentEntity } from "../requests/models/LessonCommentEntity";
import { LessonEntity } from "../requests/models/LessonEntity";
import { LessonProgressEntity } from "../requests/models/LessonProgressEntity";
import { LessonStudentEntity } from "../requests/models/LessonStudentEntity";
import { LoginAppleDto } from "../requests/models/LoginAppleDto";
import { LoginGoogleDto } from "../requests/models/LoginGoogleDto";
import { LoginInputDto } from "../requests/models/LoginInputDto";
import { ManagerHasSubmittedEntity } from "../requests/models/ManagerHasSubmittedEntity";
import { MatchingAnswerDto } from "../requests/models/MatchingAnswerDto";
import { MultipleChoiceAnswerDto } from "../requests/models/MultipleChoiceAnswerDto";
import { MultipleChoiceHorizontalDto } from "../requests/models/MultipleChoiceHorizontalDto";
import { NotificationEntity } from "../requests/models/NotificationEntity";
import { NotificationTokenEntity } from "../requests/models/NotificationTokenEntity";
import { ObjectId } from "../requests/models/ObjectId";
import { QuestionEntity } from "../requests/models/QuestionEntity";
import { QuestionFlashCardEntity } from "../requests/models/QuestionFlashCardEntity";
import { QuestionGroupEntity } from "../requests/models/QuestionGroupEntity";
import { QuestionGroupReferenceEntity } from "../requests/models/QuestionGroupReferenceEntity";
import { QuestionGroupUserAnswerEntity } from "../requests/models/QuestionGroupUserAnswerEntity";
import { QuestionUserAnswerEntity } from "../requests/models/QuestionUserAnswerEntity";
import { QuizFlashCardEntity } from "../requests/models/QuizFlashCardEntity";
import { RefreshTokenInputDto } from "../requests/models/RefreshTokenInputDto";
import { RegisterInputDto } from "../requests/models/RegisterInputDto";
import { ResendCodeInputDto } from "../requests/models/ResendCodeInputDto";
import { ResetPasswordInputDto } from "../requests/models/ResetPasswordInputDto";
import { SessonEntity } from "../requests/models/SessonEntity";
import { SessonProgressOfStudentEntity } from "../requests/models/SessonProgressOfStudentEntity";
import { SessonScheduleEntity } from "../requests/models/SessonScheduleEntity";
import { SessonScheduleLessonEntity } from "../requests/models/SessonScheduleLessonEntity";
import { SessonScheduleSessonEntity } from "../requests/models/SessonScheduleSessonEntity";
import { SessonScheduleStatusEntity } from "../requests/models/SessonScheduleStatusEntity";
import { SessonScheduleWithLessonEntity } from "../requests/models/SessonScheduleWithLessonEntity";
import { SessonStudentEntity } from "../requests/models/SessonStudentEntity";
import { SlideEntity } from "../requests/models/SlideEntity";
import { SortingAnswerDto } from "../requests/models/SortingAnswerDto";
import { StudentDetailEntity } from "../requests/models/StudentDetailEntity";
import { TestCategoryEntity } from "../requests/models/TestCategoryEntity";
import { TestDetailEntity } from "../requests/models/TestDetailEntity";
import { TestDetailGroupEntity } from "../requests/models/TestDetailGroupEntity";
import { TestDetailWithoutTestEntity } from "../requests/models/TestDetailWithoutTestEntity";
import { TestEntity } from "../requests/models/TestEntity";
import { TestProgressEntity } from "../requests/models/TestProgressEntity";
import { TestResultAdminAttemptCountEntity } from "../requests/models/TestResultAdminAttemptCountEntity";
import { TestResultAdminEntity } from "../requests/models/TestResultAdminEntity";
import { TestResultAdminSummaryEntity } from "../requests/models/TestResultAdminSummaryEntity";
import { TestResultEntity } from "../requests/models/TestResultEntity";
import { TestResultUserDetailEntity } from "../requests/models/TestResultUserDetailEntity";
import { TestResultUserDetailGroupEntity } from "../requests/models/TestResultUserDetailGroupEntity";
import { TestResultUserDetailWithoutTestEntity } from "../requests/models/TestResultUserDetailWithoutTestEntity";
import { TextEntity } from "../requests/models/TextEntity";
import { TopicEntity } from "../requests/models/TopicEntity";
import { TopicVocabEntity } from "../requests/models/TopicVocabEntity";
import { UpdateClassDto } from "../requests/models/UpdateClassDto";
import { UpdateClassReviewDto } from "../requests/models/UpdateClassReviewDto";
import { UpdateCourseDto } from "../requests/models/UpdateCourseDto";
import { UpdateCourseVocabDto } from "../requests/models/UpdateCourseVocabDto";
import { UpdateDocumentType } from "../requests/models/UpdateDocumentType";
import { UpdateEssayTestDto } from "../requests/models/UpdateEssayTestDto";
import { UpdateExamDto } from "../requests/models/UpdateExamDto";
import { UpdateExamLessonDto } from "../requests/models/UpdateExamLessonDto";
import { UpdateFlashCardDto } from "../requests/models/UpdateFlashCardDto";
import { UpdateGrammarDto } from "../requests/models/UpdateGrammarDto";
import { UpdateKanjiDto } from "../requests/models/UpdateKanjiDto";
import { UpdateLessonCommentDto } from "../requests/models/UpdateLessonCommentDto";
import { UpdateLessonDto } from "../requests/models/UpdateLessonDto";
import { UpdateLessonsSessonSchedulesDto } from "../requests/models/UpdateLessonsSessonSchedulesDto";
import { UpdateLocaleDto } from "../requests/models/UpdateLocaleDto";
import { UpdateNotificationDto } from "../requests/models/UpdateNotificationDto";
import { UpdateQuestionDto } from "../requests/models/UpdateQuestionDto";
import { UpdateQuestionFlashCardDto } from "../requests/models/UpdateQuestionFlashCardDto";
import { UpdateQuestionGroupDto } from "../requests/models/UpdateQuestionGroupDto";
import { UpdateQuizFlashCardDto } from "../requests/models/UpdateQuizFlashCardDto";
import { UpdateSessonDto } from "../requests/models/UpdateSessonDto";
import { UpdateSlideDto } from "../requests/models/UpdateSlideDto";
import { UpdateSubmitEssayUserDto } from "../requests/models/UpdateSubmitEssayUserDto";
import { UpdateTagMultipleQuestionDto } from "../requests/models/UpdateTagMultipleQuestionDto";
import { UpdateTestCategoryDto } from "../requests/models/UpdateTestCategoryDto";
import { UpdateTestDetailDto } from "../requests/models/UpdateTestDetailDto";
import { UpdateTestDto } from "../requests/models/UpdateTestDto";
import { UpdateTestProgressDto } from "../requests/models/UpdateTestProgressDto";
import { UpdateTestResultDto } from "../requests/models/UpdateTestResultDto";
import { UpdateTextDto } from "../requests/models/UpdateTextDto";
import { UpdateTopicDto } from "../requests/models/UpdateTopicDto";
import { UpdateTopicVocabDto } from "../requests/models/UpdateTopicVocabDto";
import { UpdateUserDto } from "../requests/models/UpdateUserDto";
import { UpdateUserPasswordDto } from "../requests/models/UpdateUserPasswordDto";
import { UpdateUserStatusDto } from "../requests/models/UpdateUserStatusDto";
import { UpdateVideoUrlDto } from "../requests/models/UpdateVideoUrlDto";
import { UpsertExamResultStudentDto } from "../requests/models/UpsertExamResultStudentDto";
import { UpsertLessonProgressDto } from "../requests/models/UpsertLessonProgressDto";
import { UpsertUserDto } from "../requests/models/UpsertUserDto";
import { UserAnswerDto } from "../requests/models/UserAnswerDto";
import { UserAnswerEntity } from "../requests/models/UserAnswerEntity";
import { UserBaseEntity } from "../requests/models/UserBaseEntity";
import { UserEntity } from "../requests/models/UserEntity";
import { VerifyCodeInputDto } from "../requests/models/VerifyCodeInputDto";
import { VideoUrlEntity } from "../requests/models/VideoUrlEntity";
import { AppService } from "../requests/services/AppService";
import { AuthService } from "../requests/services/AuthService";
import { ClassReviewService } from "../requests/services/ClassReviewService";
import { ClassService } from "../requests/services/ClassService";
import { ConfigsService } from "../requests/services/ConfigsService";
import { CourseService } from "../requests/services/CourseService";
import { CourseVocabService } from "../requests/services/CourseVocabService";
import { EssayTestService } from "../requests/services/EssayTestService";
import { ExamLessonService } from "../requests/services/ExamLessonService";
import { ExamResultService } from "../requests/services/ExamResultService";
import { ExamService } from "../requests/services/ExamService";
import { FlashCardService } from "../requests/services/FlashCardService";
import { GrammarService } from "../requests/services/GrammarService";
import { KanjiDictionaryService } from "../requests/services/KanjiDictionaryService";
import { KanjiService } from "../requests/services/KanjiService";
import { LessonCommentService } from "../requests/services/LessonCommentService";
import { LessonProgressService } from "../requests/services/LessonProgressService";
import { LessonService } from "../requests/services/LessonService";
import { NotificationsService } from "../requests/services/NotificationsService";
import { NotificationTokensService } from "../requests/services/NotificationTokensService";
import { QuestionFlashCardService } from "../requests/services/QuestionFlashCardService";
import { QuestionGroupService } from "../requests/services/QuestionGroupService";
import { QuestionGroupsReferencesService } from "../requests/services/QuestionGroupsReferencesService";
import { QuestionService } from "../requests/services/QuestionService";
import { QuizFlashCardService } from "../requests/services/QuizFlashCardService";
import { SessonScheduleService } from "../requests/services/SessonScheduleService";
import { SessonService } from "../requests/services/SessonService";
import { SlideService } from "../requests/services/SlideService";
import { TestCategoryService } from "../requests/services/TestCategoryService";
import { TestDetailService } from "../requests/services/TestDetailService";
import { TestProgressService } from "../requests/services/TestProgressService";
import { TestResultService } from "../requests/services/TestResultService";
import { TestService } from "../requests/services/TestService";
import { TextService } from "../requests/services/TextService";
import { TopicService } from "../requests/services/TopicService";
import { TopicVocabService } from "../requests/services/TopicVocabService";
import { UploadS3Service } from "../requests/services/UploadS3Service";
import { UsersService } from "../requests/services/UsersService";
import { VideoUrlService } from "../requests/services/VideoUrlService";
export type AppServiceAppControllerCheckDefaultResponse = Awaited<ReturnType<typeof AppService.appControllerCheck>>;
export type AppServiceAppControllerCheckQueryResult<TData = AppServiceAppControllerCheckDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useAppServiceAppControllerCheckKey = "AppServiceAppControllerCheck";
export const useAppServiceAppControllerCheck = <TData = AppServiceAppControllerCheckDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useAppServiceAppControllerCheckKey, ...(queryKey ?? [])], queryFn: () => AppService.appControllerCheck() as TData, ...options });
export type AppServiceAppControllerCallbackDefaultResponse = Awaited<ReturnType<typeof AppService.appControllerCallback>>;
export type AppServiceAppControllerCallbackQueryResult<TData = AppServiceAppControllerCallbackDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useAppServiceAppControllerCallbackKey = "AppServiceAppControllerCallback";
export const useAppServiceAppControllerCallback = <TData = AppServiceAppControllerCallbackDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useAppServiceAppControllerCallbackKey, ...(queryKey ?? [])], queryFn: () => AppService.appControllerCallback() as TData, ...options });
export type AuthServiceAuthControllerRegisterMutationResult = Awaited<ReturnType<typeof AuthService.authControllerRegister>>;
/**
 * Register a new customer
 */
export const useAuthServiceAuthControllerRegister = <TData = AuthServiceAuthControllerRegisterMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: RegisterInputDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: RegisterInputDto;
}, TContext>({ mutationFn: ({ requestBody }) => AuthService.authControllerRegister(requestBody) as unknown as Promise<TData>, ...options });
export type AuthServiceAuthControllerConfirmRegisterMutationResult = Awaited<ReturnType<typeof AuthService.authControllerConfirmRegister>>;
/**
 * Verify new registration with OTP code
 */
export const useAuthServiceAuthControllerConfirmRegister = <TData = AuthServiceAuthControllerConfirmRegisterMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: ConfirmRegisterDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: ConfirmRegisterDto;
}, TContext>({ mutationFn: ({ requestBody }) => AuthService.authControllerConfirmRegister(requestBody) as unknown as Promise<TData>, ...options });
export type AuthServiceAuthControllerLoginMutationResult = Awaited<ReturnType<typeof AuthService.authControllerLogin>>;
/**
 * Login
 */
export const useAuthServiceAuthControllerLogin = <TData = AuthServiceAuthControllerLoginMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: LoginInputDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: LoginInputDto;
}, TContext>({ mutationFn: ({ requestBody }) => AuthService.authControllerLogin(requestBody) as unknown as Promise<TData>, ...options });
export type AuthServiceAuthControllerRefreshTokenMutationResult = Awaited<ReturnType<typeof AuthService.authControllerRefreshToken>>;
/**
 * Refresh access token when expired
 */
export const useAuthServiceAuthControllerRefreshToken = <TData = AuthServiceAuthControllerRefreshTokenMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: RefreshTokenInputDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: RefreshTokenInputDto;
}, TContext>({ mutationFn: ({ requestBody }) => AuthService.authControllerRefreshToken(requestBody) as unknown as Promise<TData>, ...options });
export type AuthServiceAuthControllerForgotPasswordMutationResult = Awaited<ReturnType<typeof AuthService.authControllerForgotPassword>>;
/**
 * Request OTP when forgot password
 */
export const useAuthServiceAuthControllerForgotPassword = <TData = AuthServiceAuthControllerForgotPasswordMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: ForgotPasswordInputDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: ForgotPasswordInputDto;
}, TContext>({ mutationFn: ({ requestBody }) => AuthService.authControllerForgotPassword(requestBody) as unknown as Promise<TData>, ...options });
export type AuthServiceAuthControllerResetPasswordMutationResult = Awaited<ReturnType<typeof AuthService.authControllerResetPassword>>;
/**
 * Set a new password with the verification code correct
 */
export const useAuthServiceAuthControllerResetPassword = <TData = AuthServiceAuthControllerResetPasswordMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: ResetPasswordInputDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: ResetPasswordInputDto;
}, TContext>({ mutationFn: ({ requestBody }) => AuthService.authControllerResetPassword(requestBody) as unknown as Promise<TData>, ...options });
export type AuthServiceAuthControllerLoginByGoogleMutationResult = Awaited<ReturnType<typeof AuthService.authControllerLoginByGoogle>>;
/**
 * Login with google
 */
export const useAuthServiceAuthControllerLoginByGoogle = <TData = AuthServiceAuthControllerLoginByGoogleMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: LoginGoogleDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: LoginGoogleDto;
}, TContext>({ mutationFn: ({ requestBody }) => AuthService.authControllerLoginByGoogle(requestBody) as unknown as Promise<TData>, ...options });
export type AuthServiceAuthControllerLoginByAppleMutationResult = Awaited<ReturnType<typeof AuthService.authControllerLoginByApple>>;
/**
 * Login with apple
 */
export const useAuthServiceAuthControllerLoginByApple = <TData = AuthServiceAuthControllerLoginByAppleMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: LoginAppleDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: LoginAppleDto;
}, TContext>({ mutationFn: ({ requestBody }) => AuthService.authControllerLoginByApple(requestBody) as unknown as Promise<TData>, ...options });
export type AuthServiceAuthControllerRenewOtpMutationResult = Awaited<ReturnType<typeof AuthService.authControllerRenewOtp>>;
/**
 * Resend a new OTP code
 */
export const useAuthServiceAuthControllerRenewOtp = <TData = AuthServiceAuthControllerRenewOtpMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: ResendCodeInputDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: ResendCodeInputDto;
}, TContext>({ mutationFn: ({ requestBody }) => AuthService.authControllerRenewOtp(requestBody) as unknown as Promise<TData>, ...options });
export type AuthServiceAuthControllerVerifyOtpMutationResult = Awaited<ReturnType<typeof AuthService.authControllerVerifyOtp>>;
/**
 * Verify OTP code is correct
 */
export const useAuthServiceAuthControllerVerifyOtp = <TData = AuthServiceAuthControllerVerifyOtpMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: VerifyCodeInputDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: VerifyCodeInputDto;
}, TContext>({ mutationFn: ({ requestBody }) => AuthService.authControllerVerifyOtp(requestBody) as unknown as Promise<TData>, ...options });
export type AuthServiceAuthControllerLogoutMutationResult = Awaited<ReturnType<typeof AuthService.authControllerLogout>>;
/**
 * Logout
 */
export const useAuthServiceAuthControllerLogout = <TData = AuthServiceAuthControllerLogoutMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, void, TContext>, "mutationFn">) => useMutation<TData, TError, void, TContext>({ mutationFn: () => AuthService.authControllerLogout() as unknown as Promise<TData>, ...options });
export type ClassReviewServiceClassReviewControllerGetClassReviewOfStudentDefaultResponse = Awaited<ReturnType<typeof ClassReviewService.classReviewControllerGetClassReviewOfStudent>>;
export type ClassReviewServiceClassReviewControllerGetClassReviewOfStudentQueryResult<TData = ClassReviewServiceClassReviewControllerGetClassReviewOfStudentDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useClassReviewServiceClassReviewControllerGetClassReviewOfStudentKey = "ClassReviewServiceClassReviewControllerGetClassReviewOfStudent";
/**
 * Get class review of student
 */
export const useClassReviewServiceClassReviewControllerGetClassReviewOfStudent = <TData = ClassReviewServiceClassReviewControllerGetClassReviewOfStudentDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ classId, studentId }: {
    classId: string;
    studentId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useClassReviewServiceClassReviewControllerGetClassReviewOfStudentKey, ...(queryKey ?? [{ classId, studentId }])], queryFn: () => ClassReviewService.classReviewControllerGetClassReviewOfStudent(classId, studentId) as TData, ...options });
export type ClassReviewServiceClassReviewControllerCreateClassReviewMutationResult = Awaited<ReturnType<typeof ClassReviewService.classReviewControllerCreateClassReview>>;
/**
 * Create class review
 */
export const useClassReviewServiceClassReviewControllerCreateClassReview = <TData = ClassReviewServiceClassReviewControllerCreateClassReviewMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateClassReviewDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateClassReviewDto;
}, TContext>({ mutationFn: ({ requestBody }) => ClassReviewService.classReviewControllerCreateClassReview(requestBody) as unknown as Promise<TData>, ...options });
export type ClassReviewServiceClassReviewControllerUpdateClassReviewMutationResult = Awaited<ReturnType<typeof ClassReviewService.classReviewControllerUpdateClassReview>>;
/**
 * Update class review
 */
export const useClassReviewServiceClassReviewControllerUpdateClassReview = <TData = ClassReviewServiceClassReviewControllerUpdateClassReviewMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateClassReviewDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateClassReviewDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => ClassReviewService.classReviewControllerUpdateClassReview(id, requestBody) as unknown as Promise<TData>, ...options });
export type ClassReviewServiceClassReviewControllerDeleteClassReviewMutationResult = Awaited<ReturnType<typeof ClassReviewService.classReviewControllerDeleteClassReview>>;
/**
 * Delete class review
 */
export const useClassReviewServiceClassReviewControllerDeleteClassReview = <TData = ClassReviewServiceClassReviewControllerDeleteClassReviewMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => ClassReviewService.classReviewControllerDeleteClassReview(id) as unknown as Promise<TData>, ...options });
export type ClassServiceClassControllerGetAllClassDefaultResponse = Awaited<ReturnType<typeof ClassService.classControllerGetAllClass>>;
export type ClassServiceClassControllerGetAllClassQueryResult<TData = ClassServiceClassControllerGetAllClassDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useClassServiceClassControllerGetAllClassKey = "ClassServiceClassControllerGetAllClass";
/**
 * Get all class
 */
export const useClassServiceClassControllerGetAllClass = <TData = ClassServiceClassControllerGetAllClassDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ limit, offset, q, fromDate, toDate, order }: {
    limit?: number;
    offset: number;
    q?: string | null;
    fromDate?: string | null;
    toDate?: string | null;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useClassServiceClassControllerGetAllClassKey, ...(queryKey ?? [{ limit, offset, q, fromDate, toDate, order }])], queryFn: () => ClassService.classControllerGetAllClass(limit, offset, q, fromDate, toDate, order) as TData, ...options });
export type ClassServiceClassControllerCreateClassMutationResult = Awaited<ReturnType<typeof ClassService.classControllerCreateClass>>;
/**
 * Create class
 */
export const useClassServiceClassControllerCreateClass = <TData = ClassServiceClassControllerCreateClassMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateClassDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateClassDto;
}, TContext>({ mutationFn: ({ requestBody }) => ClassService.classControllerCreateClass(requestBody) as unknown as Promise<TData>, ...options });
export type ClassServiceClassControllerAddCourseToClassMutationResult = Awaited<ReturnType<typeof ClassService.classControllerAddCourseToClass>>;
/**
 * Add course to class
 */
export const useClassServiceClassControllerAddCourseToClass = <TData = ClassServiceClassControllerAddCourseToClassMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: AddCourseDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: AddCourseDto;
}, TContext>({ mutationFn: ({ requestBody }) => ClassService.classControllerAddCourseToClass(requestBody) as unknown as Promise<TData>, ...options });
export type ClassServiceClassControllerClassReportDefaultResponse = Awaited<ReturnType<typeof ClassService.classControllerClassReport>>;
export type ClassServiceClassControllerClassReportQueryResult<TData = ClassServiceClassControllerClassReportDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useClassServiceClassControllerClassReportKey = "ClassServiceClassControllerClassReport";
/**
 * Export excel class report
 */
export const useClassServiceClassControllerClassReport = <TData = ClassServiceClassControllerClassReportDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ classId, scope, attendanceCourseId, homeworkCourseId, fromDate, toDate }: {
    classId: string;
    scope: string;
    attendanceCourseId: string;
    homeworkCourseId: string;
    fromDate?: string;
    toDate?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useClassServiceClassControllerClassReportKey, ...(queryKey ?? [{ classId, scope, attendanceCourseId, homeworkCourseId, fromDate, toDate }])], queryFn: () => ClassService.classControllerClassReport(classId, scope, attendanceCourseId, homeworkCourseId, fromDate, toDate) as TData, ...options });
export type ClassServiceClassControllerAddStudentToClassMutationResult = Awaited<ReturnType<typeof ClassService.classControllerAddStudentToClass>>;
/**
 * Add student to class
 */
export const useClassServiceClassControllerAddStudentToClass = <TData = ClassServiceClassControllerAddStudentToClassMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: AddStudentDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: AddStudentDto;
}, TContext>({ mutationFn: ({ requestBody }) => ClassService.classControllerAddStudentToClass(requestBody) as unknown as Promise<TData>, ...options });
export type ClassServiceClassControllerAddTeacherToClassMutationResult = Awaited<ReturnType<typeof ClassService.classControllerAddTeacherToClass>>;
/**
 * Add student to class
 */
export const useClassServiceClassControllerAddTeacherToClass = <TData = ClassServiceClassControllerAddTeacherToClassMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: AddTeacherDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: AddTeacherDto;
}, TContext>({ mutationFn: ({ requestBody }) => ClassService.classControllerAddTeacherToClass(requestBody) as unknown as Promise<TData>, ...options });
export type ClassServiceClassControllerGetExamResultDefaultResponse = Awaited<ReturnType<typeof ClassService.classControllerGetExamResult>>;
export type ClassServiceClassControllerGetExamResultQueryResult<TData = ClassServiceClassControllerGetExamResultDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useClassServiceClassControllerGetExamResultKey = "ClassServiceClassControllerGetExamResult";
/**
 * Get exam result in class
 */
export const useClassServiceClassControllerGetExamResult = <TData = ClassServiceClassControllerGetExamResultDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ classId, courseId }: {
    classId: string;
    courseId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useClassServiceClassControllerGetExamResultKey, ...(queryKey ?? [{ classId, courseId }])], queryFn: () => ClassService.classControllerGetExamResult(classId, courseId) as TData, ...options });
export type ClassServiceClassControllerGetExamResultDetailDefaultResponse = Awaited<ReturnType<typeof ClassService.classControllerGetExamResultDetail>>;
export type ClassServiceClassControllerGetExamResultDetailQueryResult<TData = ClassServiceClassControllerGetExamResultDetailDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useClassServiceClassControllerGetExamResultDetailKey = "ClassServiceClassControllerGetExamResultDetail";
/**
 * Get exam result in class
 */
export const useClassServiceClassControllerGetExamResultDetail = <TData = ClassServiceClassControllerGetExamResultDetailDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ classId, courseId, examId }: {
    classId: string;
    courseId: string;
    examId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useClassServiceClassControllerGetExamResultDetailKey, ...(queryKey ?? [{ classId, courseId, examId }])], queryFn: () => ClassService.classControllerGetExamResultDetail(classId, courseId, examId) as TData, ...options });
export type ClassServiceClassControllerGetStudentDetailDefaultResponse = Awaited<ReturnType<typeof ClassService.classControllerGetStudentDetail>>;
export type ClassServiceClassControllerGetStudentDetailQueryResult<TData = ClassServiceClassControllerGetStudentDetailDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useClassServiceClassControllerGetStudentDetailKey = "ClassServiceClassControllerGetStudentDetail";
/**
 * Get student info in class
 */
export const useClassServiceClassControllerGetStudentDetail = <TData = ClassServiceClassControllerGetStudentDetailDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ studentId }: {
    studentId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useClassServiceClassControllerGetStudentDetailKey, ...(queryKey ?? [{ studentId }])], queryFn: () => ClassService.classControllerGetStudentDetail(studentId) as TData, ...options });
export type ClassServiceClassControllerGetClassDetailOfStudentDefaultResponse = Awaited<ReturnType<typeof ClassService.classControllerGetClassDetailOfStudent>>;
export type ClassServiceClassControllerGetClassDetailOfStudentQueryResult<TData = ClassServiceClassControllerGetClassDetailOfStudentDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useClassServiceClassControllerGetClassDetailOfStudentKey = "ClassServiceClassControllerGetClassDetailOfStudent";
/**
 * Get student info in class
 */
export const useClassServiceClassControllerGetClassDetailOfStudent = <TData = ClassServiceClassControllerGetClassDetailOfStudentDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ classId, studentId }: {
    classId: string;
    studentId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useClassServiceClassControllerGetClassDetailOfStudentKey, ...(queryKey ?? [{ classId, studentId }])], queryFn: () => ClassService.classControllerGetClassDetailOfStudent(classId, studentId) as TData, ...options });
export type ClassServiceClassControllerGetCourseDetailOfStudentDefaultResponse = Awaited<ReturnType<typeof ClassService.classControllerGetCourseDetailOfStudent>>;
export type ClassServiceClassControllerGetCourseDetailOfStudentQueryResult<TData = ClassServiceClassControllerGetCourseDetailOfStudentDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useClassServiceClassControllerGetCourseDetailOfStudentKey = "ClassServiceClassControllerGetCourseDetailOfStudent";
/**
 * Get student info in class
 */
export const useClassServiceClassControllerGetCourseDetailOfStudent = <TData = ClassServiceClassControllerGetCourseDetailOfStudentDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ classId, studentId, courseId }: {
    classId: string;
    studentId: string;
    courseId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useClassServiceClassControllerGetCourseDetailOfStudentKey, ...(queryKey ?? [{ classId, studentId, courseId }])], queryFn: () => ClassService.classControllerGetCourseDetailOfStudent(classId, studentId, courseId) as TData, ...options });
export type ClassServiceClassControllerGetCourseAndUserByClassIdDefaultResponse = Awaited<ReturnType<typeof ClassService.classControllerGetCourseAndUserByClassId>>;
export type ClassServiceClassControllerGetCourseAndUserByClassIdQueryResult<TData = ClassServiceClassControllerGetCourseAndUserByClassIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useClassServiceClassControllerGetCourseAndUserByClassIdKey = "ClassServiceClassControllerGetCourseAndUserByClassId";
/**
 * Get class by id
 */
export const useClassServiceClassControllerGetCourseAndUserByClassId = <TData = ClassServiceClassControllerGetCourseAndUserByClassIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useClassServiceClassControllerGetCourseAndUserByClassIdKey, ...(queryKey ?? [{ id }])], queryFn: () => ClassService.classControllerGetCourseAndUserByClassId(id) as TData, ...options });
export type ClassServiceClassControllerUpdateClassMutationResult = Awaited<ReturnType<typeof ClassService.classControllerUpdateClass>>;
/**
 * Update class
 */
export const useClassServiceClassControllerUpdateClass = <TData = ClassServiceClassControllerUpdateClassMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateClassDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateClassDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => ClassService.classControllerUpdateClass(id, requestBody) as unknown as Promise<TData>, ...options });
export type ClassServiceClassControllerDeleteClassMutationResult = Awaited<ReturnType<typeof ClassService.classControllerDeleteClass>>;
/**
 * Delete class
 */
export const useClassServiceClassControllerDeleteClass = <TData = ClassServiceClassControllerDeleteClassMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => ClassService.classControllerDeleteClass(id) as unknown as Promise<TData>, ...options });
export type ClassServiceClassControllerRemoveCourseFromClassMutationResult = Awaited<ReturnType<typeof ClassService.classControllerRemoveCourseFromClass>>;
/**
 * Remove course from class
 */
export const useClassServiceClassControllerRemoveCourseFromClass = <TData = ClassServiceClassControllerRemoveCourseFromClassMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    classId: string;
    courseId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    classId: string;
    courseId: string;
}, TContext>({ mutationFn: ({ classId, courseId }) => ClassService.classControllerRemoveCourseFromClass(classId, courseId) as unknown as Promise<TData>, ...options });
export type ClassServiceClassControllerRemoveStudentFromClassMutationResult = Awaited<ReturnType<typeof ClassService.classControllerRemoveStudentFromClass>>;
/**
 * Remove student from class
 */
export const useClassServiceClassControllerRemoveStudentFromClass = <TData = ClassServiceClassControllerRemoveStudentFromClassMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    classId: string;
    studentId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    classId: string;
    studentId: string;
}, TContext>({ mutationFn: ({ classId, studentId }) => ClassService.classControllerRemoveStudentFromClass(classId, studentId) as unknown as Promise<TData>, ...options });
export type ClassServiceClassControllerRemoveTeacherFromClassMutationResult = Awaited<ReturnType<typeof ClassService.classControllerRemoveTeacherFromClass>>;
/**
 * Remove teacher from class
 */
export const useClassServiceClassControllerRemoveTeacherFromClass = <TData = ClassServiceClassControllerRemoveTeacherFromClassMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    classId: string;
    teacherId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    classId: string;
    teacherId: string;
}, TContext>({ mutationFn: ({ classId, teacherId }) => ClassService.classControllerRemoveTeacherFromClass(classId, teacherId) as unknown as Promise<TData>, ...options });
export type ClassServiceClassStudentControllerGetAllClassesDefaultResponse = Awaited<ReturnType<typeof ClassService.classStudentControllerGetAllClasses>>;
export type ClassServiceClassStudentControllerGetAllClassesQueryResult<TData = ClassServiceClassStudentControllerGetAllClassesDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useClassServiceClassStudentControllerGetAllClassesKey = "ClassServiceClassStudentControllerGetAllClasses";
/**
 * Get all classes of student
 */
export const useClassServiceClassStudentControllerGetAllClasses = <TData = ClassServiceClassStudentControllerGetAllClassesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useClassServiceClassStudentControllerGetAllClassesKey, ...(queryKey ?? [])], queryFn: () => ClassService.classStudentControllerGetAllClasses() as TData, ...options });
export type ClassServiceClassStudentControllerGetCourseAndUserByClassIdDefaultResponse = Awaited<ReturnType<typeof ClassService.classStudentControllerGetCourseAndUserByClassId>>;
export type ClassServiceClassStudentControllerGetCourseAndUserByClassIdQueryResult<TData = ClassServiceClassStudentControllerGetCourseAndUserByClassIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useClassServiceClassStudentControllerGetCourseAndUserByClassIdKey = "ClassServiceClassStudentControllerGetCourseAndUserByClassId";
/**
 * Get class by id
 */
export const useClassServiceClassStudentControllerGetCourseAndUserByClassId = <TData = ClassServiceClassStudentControllerGetCourseAndUserByClassIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ classId }: {
    classId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useClassServiceClassStudentControllerGetCourseAndUserByClassIdKey, ...(queryKey ?? [{ classId }])], queryFn: () => ClassService.classStudentControllerGetCourseAndUserByClassId(classId) as TData, ...options });
export type ConfigsServiceAppConfigControllerGetAppConfigsDefaultResponse = Awaited<ReturnType<typeof ConfigsService.appConfigControllerGetAppConfigs>>;
export type ConfigsServiceAppConfigControllerGetAppConfigsQueryResult<TData = ConfigsServiceAppConfigControllerGetAppConfigsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useConfigsServiceAppConfigControllerGetAppConfigsKey = "ConfigsServiceAppConfigControllerGetAppConfigs";
/**
 * Get app configs
 */
export const useConfigsServiceAppConfigControllerGetAppConfigs = <TData = ConfigsServiceAppConfigControllerGetAppConfigsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useConfigsServiceAppConfigControllerGetAppConfigsKey, ...(queryKey ?? [])], queryFn: () => ConfigsService.appConfigControllerGetAppConfigs() as TData, ...options });
export type ConfigsServiceAppConfigControllerGetBlogsDefaultResponse = Awaited<ReturnType<typeof ConfigsService.appConfigControllerGetBlogs>>;
export type ConfigsServiceAppConfigControllerGetBlogsQueryResult<TData = ConfigsServiceAppConfigControllerGetBlogsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useConfigsServiceAppConfigControllerGetBlogsKey = "ConfigsServiceAppConfigControllerGetBlogs";
/**
 * Get list blogs
 */
export const useConfigsServiceAppConfigControllerGetBlogs = <TData = ConfigsServiceAppConfigControllerGetBlogsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useConfigsServiceAppConfigControllerGetBlogsKey, ...(queryKey ?? [])], queryFn: () => ConfigsService.appConfigControllerGetBlogs() as TData, ...options });
export type ConfigsServiceAppConfigControllerCreateAdminDefaultResponse = Awaited<ReturnType<typeof ConfigsService.appConfigControllerCreateAdmin>>;
export type ConfigsServiceAppConfigControllerCreateAdminQueryResult<TData = ConfigsServiceAppConfigControllerCreateAdminDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useConfigsServiceAppConfigControllerCreateAdminKey = "ConfigsServiceAppConfigControllerCreateAdmin";
/**
 * Create Admin
 */
export const useConfigsServiceAppConfigControllerCreateAdmin = <TData = ConfigsServiceAppConfigControllerCreateAdminDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useConfigsServiceAppConfigControllerCreateAdminKey, ...(queryKey ?? [])], queryFn: () => ConfigsService.appConfigControllerCreateAdmin() as TData, ...options });
export type ConfigsServiceAppConfigControllerMigrateDataDefaultResponse = Awaited<ReturnType<typeof ConfigsService.appConfigControllerMigrateData>>;
export type ConfigsServiceAppConfigControllerMigrateDataQueryResult<TData = ConfigsServiceAppConfigControllerMigrateDataDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useConfigsServiceAppConfigControllerMigrateDataKey = "ConfigsServiceAppConfigControllerMigrateData";
/**
 * Migrate data
 */
export const useConfigsServiceAppConfigControllerMigrateData = <TData = ConfigsServiceAppConfigControllerMigrateDataDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useConfigsServiceAppConfigControllerMigrateDataKey, ...(queryKey ?? [])], queryFn: () => ConfigsService.appConfigControllerMigrateData() as TData, ...options });
export type CourseServiceCourseControllerGetAllCourseDefaultResponse = Awaited<ReturnType<typeof CourseService.courseControllerGetAllCourse>>;
export type CourseServiceCourseControllerGetAllCourseQueryResult<TData = CourseServiceCourseControllerGetAllCourseDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useCourseServiceCourseControllerGetAllCourseKey = "CourseServiceCourseControllerGetAllCourse";
/**
 * Get all course
 */
export const useCourseServiceCourseControllerGetAllCourse = <TData = CourseServiceCourseControllerGetAllCourseDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ limit, offset, status, type, q, order }: {
    limit?: number;
    offset: number;
    status?: "ACTIVE" | "INACTIVE" | null;
    type?: "BASIC" | "ADVANCED" | null;
    q?: string | null;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useCourseServiceCourseControllerGetAllCourseKey, ...(queryKey ?? [{ limit, offset, status, type, q, order }])], queryFn: () => CourseService.courseControllerGetAllCourse(limit, offset, status, type, q, order) as TData, ...options });
export type CourseServiceCourseControllerCreateCourseMutationResult = Awaited<ReturnType<typeof CourseService.courseControllerCreateCourse>>;
/**
 * Create course
 */
export const useCourseServiceCourseControllerCreateCourse = <TData = CourseServiceCourseControllerCreateCourseMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateCourseDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateCourseDto;
}, TContext>({ mutationFn: ({ requestBody }) => CourseService.courseControllerCreateCourse(requestBody) as unknown as Promise<TData>, ...options });
export type CourseServiceCourseControllerGetCoursesNotInClassDefaultResponse = Awaited<ReturnType<typeof CourseService.courseControllerGetCoursesNotInClass>>;
export type CourseServiceCourseControllerGetCoursesNotInClassQueryResult<TData = CourseServiceCourseControllerGetCoursesNotInClassDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useCourseServiceCourseControllerGetCoursesNotInClassKey = "CourseServiceCourseControllerGetCoursesNotInClass";
/**
 * Get courses not in class
 */
export const useCourseServiceCourseControllerGetCoursesNotInClass = <TData = CourseServiceCourseControllerGetCoursesNotInClassDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ classId, limit, offset, status, type, q, order }: {
    classId: string;
    limit?: number;
    offset: number;
    status?: "ACTIVE" | "INACTIVE" | null;
    type?: "BASIC" | "ADVANCED" | null;
    q?: string | null;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useCourseServiceCourseControllerGetCoursesNotInClassKey, ...(queryKey ?? [{ classId, limit, offset, status, type, q, order }])], queryFn: () => CourseService.courseControllerGetCoursesNotInClass(classId, limit, offset, status, type, q, order) as TData, ...options });
export type CourseServiceCourseControllerGetCourseByIdDefaultResponse = Awaited<ReturnType<typeof CourseService.courseControllerGetCourseById>>;
export type CourseServiceCourseControllerGetCourseByIdQueryResult<TData = CourseServiceCourseControllerGetCourseByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useCourseServiceCourseControllerGetCourseByIdKey = "CourseServiceCourseControllerGetCourseById";
/**
 * Get course by id
 */
export const useCourseServiceCourseControllerGetCourseById = <TData = CourseServiceCourseControllerGetCourseByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useCourseServiceCourseControllerGetCourseByIdKey, ...(queryKey ?? [{ id }])], queryFn: () => CourseService.courseControllerGetCourseById(id) as TData, ...options });
export type CourseServiceCourseControllerUpdateCourseMutationResult = Awaited<ReturnType<typeof CourseService.courseControllerUpdateCourse>>;
/**
 * Update course
 */
export const useCourseServiceCourseControllerUpdateCourse = <TData = CourseServiceCourseControllerUpdateCourseMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateCourseDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateCourseDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => CourseService.courseControllerUpdateCourse(id, requestBody) as unknown as Promise<TData>, ...options });
export type CourseServiceCourseControllerDeleteCourseMutationResult = Awaited<ReturnType<typeof CourseService.courseControllerDeleteCourse>>;
/**
 * Delete course
 */
export const useCourseServiceCourseControllerDeleteCourse = <TData = CourseServiceCourseControllerDeleteCourseMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => CourseService.courseControllerDeleteCourse(id) as unknown as Promise<TData>, ...options });
export type CourseServiceCourseStudentControllerGetAllCoursesDefaultResponse = Awaited<ReturnType<typeof CourseService.courseStudentControllerGetAllCourses>>;
export type CourseServiceCourseStudentControllerGetAllCoursesQueryResult<TData = CourseServiceCourseStudentControllerGetAllCoursesDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useCourseServiceCourseStudentControllerGetAllCoursesKey = "CourseServiceCourseStudentControllerGetAllCourses";
/**
 * Get all courses for student
 */
export const useCourseServiceCourseStudentControllerGetAllCourses = <TData = CourseServiceCourseStudentControllerGetAllCoursesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useCourseServiceCourseStudentControllerGetAllCoursesKey, ...(queryKey ?? [])], queryFn: () => CourseService.courseStudentControllerGetAllCourses() as TData, ...options });
export type CourseServiceCourseStudentControllerGetCourseByIdDefaultResponse = Awaited<ReturnType<typeof CourseService.courseStudentControllerGetCourseById>>;
export type CourseServiceCourseStudentControllerGetCourseByIdQueryResult<TData = CourseServiceCourseStudentControllerGetCourseByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useCourseServiceCourseStudentControllerGetCourseByIdKey = "CourseServiceCourseStudentControllerGetCourseById";
/**
 * Get course by id
 */
export const useCourseServiceCourseStudentControllerGetCourseById = <TData = CourseServiceCourseStudentControllerGetCourseByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useCourseServiceCourseStudentControllerGetCourseByIdKey, ...(queryKey ?? [{ id }])], queryFn: () => CourseService.courseStudentControllerGetCourseById(id) as TData, ...options });
export type CourseVocabServiceCourseVocabControllerGetAllCourseVocabDefaultResponse = Awaited<ReturnType<typeof CourseVocabService.courseVocabControllerGetAllCourseVocab>>;
export type CourseVocabServiceCourseVocabControllerGetAllCourseVocabQueryResult<TData = CourseVocabServiceCourseVocabControllerGetAllCourseVocabDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useCourseVocabServiceCourseVocabControllerGetAllCourseVocabKey = "CourseVocabServiceCourseVocabControllerGetAllCourseVocab";
/**
 * Get all course vocabularies
 */
export const useCourseVocabServiceCourseVocabControllerGetAllCourseVocab = <TData = CourseVocabServiceCourseVocabControllerGetAllCourseVocabDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ lessonId, limit, offset, order }: {
    lessonId: string;
    limit?: number;
    offset: number;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useCourseVocabServiceCourseVocabControllerGetAllCourseVocabKey, ...(queryKey ?? [{ lessonId, limit, offset, order }])], queryFn: () => CourseVocabService.courseVocabControllerGetAllCourseVocab(lessonId, limit, offset, order) as TData, ...options });
export type CourseVocabServiceCourseVocabControllerCreateCourseVocabMutationResult = Awaited<ReturnType<typeof CourseVocabService.courseVocabControllerCreateCourseVocab>>;
/**
 * Create course vocabulary
 */
export const useCourseVocabServiceCourseVocabControllerCreateCourseVocab = <TData = CourseVocabServiceCourseVocabControllerCreateCourseVocabMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateCourseVocabDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateCourseVocabDto;
}, TContext>({ mutationFn: ({ requestBody }) => CourseVocabService.courseVocabControllerCreateCourseVocab(requestBody) as unknown as Promise<TData>, ...options });
export type CourseVocabServiceCourseVocabControllerGetCourseVocabByIdDefaultResponse = Awaited<ReturnType<typeof CourseVocabService.courseVocabControllerGetCourseVocabById>>;
export type CourseVocabServiceCourseVocabControllerGetCourseVocabByIdQueryResult<TData = CourseVocabServiceCourseVocabControllerGetCourseVocabByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useCourseVocabServiceCourseVocabControllerGetCourseVocabByIdKey = "CourseVocabServiceCourseVocabControllerGetCourseVocabById";
/**
 * Get course vocabulary by id
 */
export const useCourseVocabServiceCourseVocabControllerGetCourseVocabById = <TData = CourseVocabServiceCourseVocabControllerGetCourseVocabByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useCourseVocabServiceCourseVocabControllerGetCourseVocabByIdKey, ...(queryKey ?? [{ id }])], queryFn: () => CourseVocabService.courseVocabControllerGetCourseVocabById(id) as TData, ...options });
export type CourseVocabServiceCourseVocabControllerUpdateCourseVocabMutationResult = Awaited<ReturnType<typeof CourseVocabService.courseVocabControllerUpdateCourseVocab>>;
/**
 * Update course vocabulary
 */
export const useCourseVocabServiceCourseVocabControllerUpdateCourseVocab = <TData = CourseVocabServiceCourseVocabControllerUpdateCourseVocabMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateCourseVocabDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateCourseVocabDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => CourseVocabService.courseVocabControllerUpdateCourseVocab(id, requestBody) as unknown as Promise<TData>, ...options });
export type CourseVocabServiceCourseVocabControllerDeleteCourseVocabMutationResult = Awaited<ReturnType<typeof CourseVocabService.courseVocabControllerDeleteCourseVocab>>;
/**
 * Delete course vocabulary
 */
export const useCourseVocabServiceCourseVocabControllerDeleteCourseVocab = <TData = CourseVocabServiceCourseVocabControllerDeleteCourseVocabMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => CourseVocabService.courseVocabControllerDeleteCourseVocab(id) as unknown as Promise<TData>, ...options });
export type CourseVocabServiceCourseVocabControllerImportExcelVocabsMutationResult = Awaited<ReturnType<typeof CourseVocabService.courseVocabControllerImportExcelVocabs>>;
/**
 * Import excel course vocab
 */
export const useCourseVocabServiceCourseVocabControllerImportExcelVocabs = <TData = CourseVocabServiceCourseVocabControllerImportExcelVocabsMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    lessonId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    lessonId: string;
}, TContext>({ mutationFn: ({ lessonId }) => CourseVocabService.courseVocabControllerImportExcelVocabs(lessonId) as unknown as Promise<TData>, ...options });
export type CourseVocabServiceCourseVocabUserControllerGetAllCourseVocabDefaultResponse = Awaited<ReturnType<typeof CourseVocabService.courseVocabUserControllerGetAllCourseVocab>>;
export type CourseVocabServiceCourseVocabUserControllerGetAllCourseVocabQueryResult<TData = CourseVocabServiceCourseVocabUserControllerGetAllCourseVocabDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useCourseVocabServiceCourseVocabUserControllerGetAllCourseVocabKey = "CourseVocabServiceCourseVocabUserControllerGetAllCourseVocab";
/**
 * Get all course vocabularies
 */
export const useCourseVocabServiceCourseVocabUserControllerGetAllCourseVocab = <TData = CourseVocabServiceCourseVocabUserControllerGetAllCourseVocabDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ lessonId, limit, offset, order }: {
    lessonId: string;
    limit?: number;
    offset: number;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useCourseVocabServiceCourseVocabUserControllerGetAllCourseVocabKey, ...(queryKey ?? [{ lessonId, limit, offset, order }])], queryFn: () => CourseVocabService.courseVocabUserControllerGetAllCourseVocab(lessonId, limit, offset, order) as TData, ...options });
export type CourseVocabServiceCourseVocabUserControllerGetCourseVocabByIdDefaultResponse = Awaited<ReturnType<typeof CourseVocabService.courseVocabUserControllerGetCourseVocabById>>;
export type CourseVocabServiceCourseVocabUserControllerGetCourseVocabByIdQueryResult<TData = CourseVocabServiceCourseVocabUserControllerGetCourseVocabByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useCourseVocabServiceCourseVocabUserControllerGetCourseVocabByIdKey = "CourseVocabServiceCourseVocabUserControllerGetCourseVocabById";
/**
 * Get course vocabulary by id
 */
export const useCourseVocabServiceCourseVocabUserControllerGetCourseVocabById = <TData = CourseVocabServiceCourseVocabUserControllerGetCourseVocabByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useCourseVocabServiceCourseVocabUserControllerGetCourseVocabByIdKey, ...(queryKey ?? [{ id }])], queryFn: () => CourseVocabService.courseVocabUserControllerGetCourseVocabById(id) as TData, ...options });
export type EssayTestServiceEssayTestControllerSubmitEssayTestMutationResult = Awaited<ReturnType<typeof EssayTestService.essayTestControllerSubmitEssayTest>>;
/**
 * submit essay test url
 */
export const useEssayTestServiceEssayTestControllerSubmitEssayTest = <TData = EssayTestServiceEssayTestControllerSubmitEssayTestMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateEssayTestDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateEssayTestDto;
}, TContext>({ mutationFn: ({ requestBody }) => EssayTestService.essayTestControllerSubmitEssayTest(requestBody) as unknown as Promise<TData>, ...options });
export type EssayTestServiceEssayTestControllerGetEssayTestDefaultResponse = Awaited<ReturnType<typeof EssayTestService.essayTestControllerGetEssayTest>>;
export type EssayTestServiceEssayTestControllerGetEssayTestQueryResult<TData = EssayTestServiceEssayTestControllerGetEssayTestDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useEssayTestServiceEssayTestControllerGetEssayTestKey = "EssayTestServiceEssayTestControllerGetEssayTest";
/**
 * get essay test by exam id and class id
 */
export const useEssayTestServiceEssayTestControllerGetEssayTest = <TData = EssayTestServiceEssayTestControllerGetEssayTestDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ examId, classId }: {
    examId: string;
    classId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useEssayTestServiceEssayTestControllerGetEssayTestKey, ...(queryKey ?? [{ examId, classId }])], queryFn: () => EssayTestService.essayTestControllerGetEssayTest(examId, classId) as TData, ...options });
export type EssayTestServiceEssayTestControllerGetInformationEssayExamDefaultResponse = Awaited<ReturnType<typeof EssayTestService.essayTestControllerGetInformationEssayExam>>;
export type EssayTestServiceEssayTestControllerGetInformationEssayExamQueryResult<TData = EssayTestServiceEssayTestControllerGetInformationEssayExamDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useEssayTestServiceEssayTestControllerGetInformationEssayExamKey = "EssayTestServiceEssayTestControllerGetInformationEssayExam";
/**
 * get name and id of exam essay by course id
 */
export const useEssayTestServiceEssayTestControllerGetInformationEssayExam = <TData = EssayTestServiceEssayTestControllerGetInformationEssayExamDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ courseId }: {
    courseId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useEssayTestServiceEssayTestControllerGetInformationEssayExamKey, ...(queryKey ?? [{ courseId }])], queryFn: () => EssayTestService.essayTestControllerGetInformationEssayExam(courseId) as TData, ...options });
export type EssayTestServiceEssayTestControllerGetEssayTestByUserDefaultResponse = Awaited<ReturnType<typeof EssayTestService.essayTestControllerGetEssayTestByUser>>;
export type EssayTestServiceEssayTestControllerGetEssayTestByUserQueryResult<TData = EssayTestServiceEssayTestControllerGetEssayTestByUserDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useEssayTestServiceEssayTestControllerGetEssayTestByUserKey = "EssayTestServiceEssayTestControllerGetEssayTestByUser";
/**
 * get essay test by user id and exam id
 */
export const useEssayTestServiceEssayTestControllerGetEssayTestByUser = <TData = EssayTestServiceEssayTestControllerGetEssayTestByUserDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ userId, examId }: {
    userId: string;
    examId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useEssayTestServiceEssayTestControllerGetEssayTestByUserKey, ...(queryKey ?? [{ userId, examId }])], queryFn: () => EssayTestService.essayTestControllerGetEssayTestByUser(userId, examId) as TData, ...options });
export type EssayTestServiceEssayTestControllerUpdateSubmitEssayTestMutationResult = Awaited<ReturnType<typeof EssayTestService.essayTestControllerUpdateSubmitEssayTest>>;
/**
 * update submit essay test by id
 */
export const useEssayTestServiceEssayTestControllerUpdateSubmitEssayTest = <TData = EssayTestServiceEssayTestControllerUpdateSubmitEssayTestMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateSubmitEssayUserDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateSubmitEssayUserDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => EssayTestService.essayTestControllerUpdateSubmitEssayTest(id, requestBody) as unknown as Promise<TData>, ...options });
export type EssayTestServiceEssayTestControllerUpdateEssayTestMutationResult = Awaited<ReturnType<typeof EssayTestService.essayTestControllerUpdateEssayTest>>;
/**
 * update essay test by id
 */
export const useEssayTestServiceEssayTestControllerUpdateEssayTest = <TData = EssayTestServiceEssayTestControllerUpdateEssayTestMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateEssayTestDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateEssayTestDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => EssayTestService.essayTestControllerUpdateEssayTest(id, requestBody) as unknown as Promise<TData>, ...options });
export type EssayTestServiceEssayTestControllerDeleteEssayTestMutationResult = Awaited<ReturnType<typeof EssayTestService.essayTestControllerDeleteEssayTest>>;
/**
 * delete essay test by id
 */
export const useEssayTestServiceEssayTestControllerDeleteEssayTest = <TData = EssayTestServiceEssayTestControllerDeleteEssayTestMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => EssayTestService.essayTestControllerDeleteEssayTest(id) as unknown as Promise<TData>, ...options });
export type ExamLessonServiceExamLessonControllerGetExamsByLessonAdminDefaultResponse = Awaited<ReturnType<typeof ExamLessonService.examLessonControllerGetExamsByLessonAdmin>>;
export type ExamLessonServiceExamLessonControllerGetExamsByLessonAdminQueryResult<TData = ExamLessonServiceExamLessonControllerGetExamsByLessonAdminDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useExamLessonServiceExamLessonControllerGetExamsByLessonAdminKey = "ExamLessonServiceExamLessonControllerGetExamsByLessonAdmin";
/**
 * Get exams by lessonId (admin)
 */
export const useExamLessonServiceExamLessonControllerGetExamsByLessonAdmin = <TData = ExamLessonServiceExamLessonControllerGetExamsByLessonAdminDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ lessonId }: {
    lessonId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useExamLessonServiceExamLessonControllerGetExamsByLessonAdminKey, ...(queryKey ?? [{ lessonId }])], queryFn: () => ExamLessonService.examLessonControllerGetExamsByLessonAdmin(lessonId) as TData, ...options });
export type ExamLessonServiceExamLessonControllerGetExamsByLessonUserDefaultResponse = Awaited<ReturnType<typeof ExamLessonService.examLessonControllerGetExamsByLessonUser>>;
export type ExamLessonServiceExamLessonControllerGetExamsByLessonUserQueryResult<TData = ExamLessonServiceExamLessonControllerGetExamsByLessonUserDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useExamLessonServiceExamLessonControllerGetExamsByLessonUserKey = "ExamLessonServiceExamLessonControllerGetExamsByLessonUser";
/**
 * Get exams by lessonId (user)
 */
export const useExamLessonServiceExamLessonControllerGetExamsByLessonUser = <TData = ExamLessonServiceExamLessonControllerGetExamsByLessonUserDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ lessonId }: {
    lessonId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useExamLessonServiceExamLessonControllerGetExamsByLessonUserKey, ...(queryKey ?? [{ lessonId }])], queryFn: () => ExamLessonService.examLessonControllerGetExamsByLessonUser(lessonId) as TData, ...options });
export type ExamLessonServiceExamLessonControllerAddExamToLessonMutationResult = Awaited<ReturnType<typeof ExamLessonService.examLessonControllerAddExamToLesson>>;
/**
 * Add exam to lesson (admin)
 */
export const useExamLessonServiceExamLessonControllerAddExamToLesson = <TData = ExamLessonServiceExamLessonControllerAddExamToLessonMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    lessonId: string;
    requestBody: CreateExamLessonDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    lessonId: string;
    requestBody: CreateExamLessonDto;
}, TContext>({ mutationFn: ({ lessonId, requestBody }) => ExamLessonService.examLessonControllerAddExamToLesson(lessonId, requestBody) as unknown as Promise<TData>, ...options });
export type ExamLessonServiceExamLessonControllerCreateExamAndAddToLessonMutationResult = Awaited<ReturnType<typeof ExamLessonService.examLessonControllerCreateExamAndAddToLesson>>;
/**
 * Create new exam and add to lesson (admin)
 */
export const useExamLessonServiceExamLessonControllerCreateExamAndAddToLesson = <TData = ExamLessonServiceExamLessonControllerCreateExamAndAddToLessonMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    lessonId: string;
    requestBody: CreateExamAndAddToLessonDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    lessonId: string;
    requestBody: CreateExamAndAddToLessonDto;
}, TContext>({ mutationFn: ({ lessonId, requestBody }) => ExamLessonService.examLessonControllerCreateExamAndAddToLesson(lessonId, requestBody) as unknown as Promise<TData>, ...options });
export type ExamLessonServiceExamLessonControllerUpdateExamLessonMutationResult = Awaited<ReturnType<typeof ExamLessonService.examLessonControllerUpdateExamLesson>>;
/**
 * Update exam lesson by examId and lessonId (admin)
 */
export const useExamLessonServiceExamLessonControllerUpdateExamLesson = <TData = ExamLessonServiceExamLessonControllerUpdateExamLessonMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    examId: string;
    lessonId: string;
    requestBody: UpdateExamLessonDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    examId: string;
    lessonId: string;
    requestBody: UpdateExamLessonDto;
}, TContext>({ mutationFn: ({ examId, lessonId, requestBody }) => ExamLessonService.examLessonControllerUpdateExamLesson(examId, lessonId, requestBody) as unknown as Promise<TData>, ...options });
export type ExamLessonServiceExamLessonControllerRemoveExamFromLessonMutationResult = Awaited<ReturnType<typeof ExamLessonService.examLessonControllerRemoveExamFromLesson>>;
/**
 * Remove exam from lesson (admin)
 */
export const useExamLessonServiceExamLessonControllerRemoveExamFromLesson = <TData = ExamLessonServiceExamLessonControllerRemoveExamFromLessonMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    examId: string;
    lessonId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    examId: string;
    lessonId: string;
}, TContext>({ mutationFn: ({ examId, lessonId }) => ExamLessonService.examLessonControllerRemoveExamFromLesson(examId, lessonId) as unknown as Promise<TData>, ...options });
export type ExamResultServiceExamResultStudentControllerGetExamResultInCourseDefaultResponse = Awaited<ReturnType<typeof ExamResultService.examResultStudentControllerGetExamResultInCourse>>;
export type ExamResultServiceExamResultStudentControllerGetExamResultInCourseQueryResult<TData = ExamResultServiceExamResultStudentControllerGetExamResultInCourseDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useExamResultServiceExamResultStudentControllerGetExamResultInCourseKey = "ExamResultServiceExamResultStudentControllerGetExamResultInCourse";
/**
 * Get exam result of course in class by student
 */
export const useExamResultServiceExamResultStudentControllerGetExamResultInCourse = <TData = ExamResultServiceExamResultStudentControllerGetExamResultInCourseDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ classId, courseId }: {
    classId: string;
    courseId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useExamResultServiceExamResultStudentControllerGetExamResultInCourseKey, ...(queryKey ?? [{ classId, courseId }])], queryFn: () => ExamResultService.examResultStudentControllerGetExamResultInCourse(classId, courseId) as TData, ...options });
export type ExamResultServiceExamResultStudentControllerCreateExamResultMutationResult = Awaited<ReturnType<typeof ExamResultService.examResultStudentControllerCreateExamResult>>;
/**
 * Create or update exam result
 */
export const useExamResultServiceExamResultStudentControllerCreateExamResult = <TData = ExamResultServiceExamResultStudentControllerCreateExamResultMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: UpsertExamResultStudentDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: UpsertExamResultStudentDto;
}, TContext>({ mutationFn: ({ requestBody }) => ExamResultService.examResultStudentControllerCreateExamResult(requestBody) as unknown as Promise<TData>, ...options });
export type ExamResultServiceExamResultStudentControllerGetExamResultByStudentDefaultResponse = Awaited<ReturnType<typeof ExamResultService.examResultStudentControllerGetExamResultByStudent>>;
export type ExamResultServiceExamResultStudentControllerGetExamResultByStudentQueryResult<TData = ExamResultServiceExamResultStudentControllerGetExamResultByStudentDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useExamResultServiceExamResultStudentControllerGetExamResultByStudentKey = "ExamResultServiceExamResultStudentControllerGetExamResultByStudent";
/**
 * Get exam result by student
 */
export const useExamResultServiceExamResultStudentControllerGetExamResultByStudent = <TData = ExamResultServiceExamResultStudentControllerGetExamResultByStudentDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ examId }: {
    examId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useExamResultServiceExamResultStudentControllerGetExamResultByStudentKey, ...(queryKey ?? [{ examId }])], queryFn: () => ExamResultService.examResultStudentControllerGetExamResultByStudent(examId) as TData, ...options });
export type ExamResultServiceExamResultStudentControllerGetExamResultHistoryDefaultResponse = Awaited<ReturnType<typeof ExamResultService.examResultStudentControllerGetExamResultHistory>>;
export type ExamResultServiceExamResultStudentControllerGetExamResultHistoryQueryResult<TData = ExamResultServiceExamResultStudentControllerGetExamResultHistoryDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useExamResultServiceExamResultStudentControllerGetExamResultHistoryKey = "ExamResultServiceExamResultStudentControllerGetExamResultHistory";
/**
 * Get exam result history by and exam id and user id
 */
export const useExamResultServiceExamResultStudentControllerGetExamResultHistory = <TData = ExamResultServiceExamResultStudentControllerGetExamResultHistoryDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ userId, examId }: {
    userId: string;
    examId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useExamResultServiceExamResultStudentControllerGetExamResultHistoryKey, ...(queryKey ?? [{ userId, examId }])], queryFn: () => ExamResultService.examResultStudentControllerGetExamResultHistory(userId, examId) as TData, ...options });
export type ExamResultServiceExamResultStudentControllerGetExamResultHistoryDetailDefaultResponse = Awaited<ReturnType<typeof ExamResultService.examResultStudentControllerGetExamResultHistoryDetail>>;
export type ExamResultServiceExamResultStudentControllerGetExamResultHistoryDetailQueryResult<TData = ExamResultServiceExamResultStudentControllerGetExamResultHistoryDetailDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useExamResultServiceExamResultStudentControllerGetExamResultHistoryDetailKey = "ExamResultServiceExamResultStudentControllerGetExamResultHistoryDetail";
/**
 * Get exam result history detail by and exam result id
 */
export const useExamResultServiceExamResultStudentControllerGetExamResultHistoryDetail = <TData = ExamResultServiceExamResultStudentControllerGetExamResultHistoryDetailDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ examResultId }: {
    examResultId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useExamResultServiceExamResultStudentControllerGetExamResultHistoryDetailKey, ...(queryKey ?? [{ examResultId }])], queryFn: () => ExamResultService.examResultStudentControllerGetExamResultHistoryDetail(examResultId) as TData, ...options });
export type ExamServiceExamControllerGetAllExamDefaultResponse = Awaited<ReturnType<typeof ExamService.examControllerGetAllExam>>;
export type ExamServiceExamControllerGetAllExamQueryResult<TData = ExamServiceExamControllerGetAllExamDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useExamServiceExamControllerGetAllExamKey = "ExamServiceExamControllerGetAllExam";
/**
 * Get all exam
 */
export const useExamServiceExamControllerGetAllExam = <TData = ExamServiceExamControllerGetAllExamDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ q, limit, offset, order }: {
    q?: string | null;
    limit?: number;
    offset: number;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useExamServiceExamControllerGetAllExamKey, ...(queryKey ?? [{ q, limit, offset, order }])], queryFn: () => ExamService.examControllerGetAllExam(q, limit, offset, order) as TData, ...options });
export type ExamServiceExamControllerCreateExamMutationResult = Awaited<ReturnType<typeof ExamService.examControllerCreateExam>>;
/**
 * Create exam
 */
export const useExamServiceExamControllerCreateExam = <TData = ExamServiceExamControllerCreateExamMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateExamDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateExamDto;
}, TContext>({ mutationFn: ({ requestBody }) => ExamService.examControllerCreateExam(requestBody) as unknown as Promise<TData>, ...options });
export type ExamServiceExamControllerGetExamByIdDefaultResponse = Awaited<ReturnType<typeof ExamService.examControllerGetExamById>>;
export type ExamServiceExamControllerGetExamByIdQueryResult<TData = ExamServiceExamControllerGetExamByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useExamServiceExamControllerGetExamByIdKey = "ExamServiceExamControllerGetExamById";
/**
 * Get exam by id
 */
export const useExamServiceExamControllerGetExamById = <TData = ExamServiceExamControllerGetExamByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useExamServiceExamControllerGetExamByIdKey, ...(queryKey ?? [{ id }])], queryFn: () => ExamService.examControllerGetExamById(id) as TData, ...options });
export type ExamServiceExamControllerUpdateExamMutationResult = Awaited<ReturnType<typeof ExamService.examControllerUpdateExam>>;
/**
 * Update exam
 */
export const useExamServiceExamControllerUpdateExam = <TData = ExamServiceExamControllerUpdateExamMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateExamDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateExamDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => ExamService.examControllerUpdateExam(id, requestBody) as unknown as Promise<TData>, ...options });
export type ExamServiceExamControllerDeleteExamMutationResult = Awaited<ReturnType<typeof ExamService.examControllerDeleteExam>>;
/**
 * Delete exam
 */
export const useExamServiceExamControllerDeleteExam = <TData = ExamServiceExamControllerDeleteExamMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => ExamService.examControllerDeleteExam(id) as unknown as Promise<TData>, ...options });
export type FlashCardServiceFlashCardControllerAddFlashCardMutationResult = Awaited<ReturnType<typeof FlashCardService.flashCardControllerAddFlashCard>>;
/**
 * add flash card
 */
export const useFlashCardServiceFlashCardControllerAddFlashCard = <TData = FlashCardServiceFlashCardControllerAddFlashCardMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateFlashCardDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateFlashCardDto;
}, TContext>({ mutationFn: ({ requestBody }) => FlashCardService.flashCardControllerAddFlashCard(requestBody) as unknown as Promise<TData>, ...options });
export type FlashCardServiceFlashCardControllerGetFlashCardDefaultResponse = Awaited<ReturnType<typeof FlashCardService.flashCardControllerGetFlashCard>>;
export type FlashCardServiceFlashCardControllerGetFlashCardQueryResult<TData = FlashCardServiceFlashCardControllerGetFlashCardDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useFlashCardServiceFlashCardControllerGetFlashCardKey = "FlashCardServiceFlashCardControllerGetFlashCard";
/**
 * get flash card by lesson id
 */
export const useFlashCardServiceFlashCardControllerGetFlashCard = <TData = FlashCardServiceFlashCardControllerGetFlashCardDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useFlashCardServiceFlashCardControllerGetFlashCardKey, ...(queryKey ?? [{ id }])], queryFn: () => FlashCardService.flashCardControllerGetFlashCard(id) as TData, ...options });
export type FlashCardServiceFlashCardControllerUpdateFlashCardMutationResult = Awaited<ReturnType<typeof FlashCardService.flashCardControllerUpdateFlashCard>>;
/**
 * update flash card by id
 */
export const useFlashCardServiceFlashCardControllerUpdateFlashCard = <TData = FlashCardServiceFlashCardControllerUpdateFlashCardMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateFlashCardDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateFlashCardDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => FlashCardService.flashCardControllerUpdateFlashCard(id, requestBody) as unknown as Promise<TData>, ...options });
export type FlashCardServiceFlashCardControllerDeleteFlashCardMutationResult = Awaited<ReturnType<typeof FlashCardService.flashCardControllerDeleteFlashCard>>;
/**
 * delete flash card by id
 */
export const useFlashCardServiceFlashCardControllerDeleteFlashCard = <TData = FlashCardServiceFlashCardControllerDeleteFlashCardMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => FlashCardService.flashCardControllerDeleteFlashCard(id) as unknown as Promise<TData>, ...options });
export type FlashCardServiceFlashCardControllerGetFlashCardUserDefaultResponse = Awaited<ReturnType<typeof FlashCardService.flashCardControllerGetFlashCardUser>>;
export type FlashCardServiceFlashCardControllerGetFlashCardUserQueryResult<TData = FlashCardServiceFlashCardControllerGetFlashCardUserDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useFlashCardServiceFlashCardControllerGetFlashCardUserKey = "FlashCardServiceFlashCardControllerGetFlashCardUser";
/**
 * get flash card user by lesson id
 */
export const useFlashCardServiceFlashCardControllerGetFlashCardUser = <TData = FlashCardServiceFlashCardControllerGetFlashCardUserDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id, limit, offset, order }: {
    id: string;
    limit?: number;
    offset: number;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useFlashCardServiceFlashCardControllerGetFlashCardUserKey, ...(queryKey ?? [{ id, limit, offset, order }])], queryFn: () => FlashCardService.flashCardControllerGetFlashCardUser(id, limit, offset, order) as TData, ...options });
export type FlashCardServiceFlashCardControllerUpdateStatusFlashCardUserMutationResult = Awaited<ReturnType<typeof FlashCardService.flashCardControllerUpdateStatusFlashCardUser>>;
/**
 * Update status flash card user by id
 */
export const useFlashCardServiceFlashCardControllerUpdateStatusFlashCardUser = <TData = FlashCardServiceFlashCardControllerUpdateStatusFlashCardUserMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => FlashCardService.flashCardControllerUpdateStatusFlashCardUser(id) as unknown as Promise<TData>, ...options });
export type FlashCardServiceFlashCardControllerImportFlashCardsMutationResult = Awaited<ReturnType<typeof FlashCardService.flashCardControllerImportFlashCards>>;
/**
 * Import flash cards from Excel file , If an error occurs, the file will be returned.
 */
export const useFlashCardServiceFlashCardControllerImportFlashCards = <TData = FlashCardServiceFlashCardControllerImportFlashCardsMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    lessonId: string;
    limit?: number;
    offset: number;
    order?: string | null;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    lessonId: string;
    limit?: number;
    offset: number;
    order?: string | null;
}, TContext>({ mutationFn: ({ lessonId, limit, offset, order }) => FlashCardService.flashCardControllerImportFlashCards(lessonId, limit, offset, order) as unknown as Promise<TData>, ...options });
export type GrammarServiceGrammarControllerGetAllGrammarDefaultResponse = Awaited<ReturnType<typeof GrammarService.grammarControllerGetAllGrammar>>;
export type GrammarServiceGrammarControllerGetAllGrammarQueryResult<TData = GrammarServiceGrammarControllerGetAllGrammarDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGrammarServiceGrammarControllerGetAllGrammarKey = "GrammarServiceGrammarControllerGetAllGrammar";
/**
 * Get all grammar
 */
export const useGrammarServiceGrammarControllerGetAllGrammar = <TData = GrammarServiceGrammarControllerGetAllGrammarDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ lessonId, limit, offset, order }: {
    lessonId: string;
    limit?: number;
    offset: number;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useGrammarServiceGrammarControllerGetAllGrammarKey, ...(queryKey ?? [{ lessonId, limit, offset, order }])], queryFn: () => GrammarService.grammarControllerGetAllGrammar(lessonId, limit, offset, order) as TData, ...options });
export type GrammarServiceGrammarControllerCreateGrammarMutationResult = Awaited<ReturnType<typeof GrammarService.grammarControllerCreateGrammar>>;
/**
 * Create grammar
 */
export const useGrammarServiceGrammarControllerCreateGrammar = <TData = GrammarServiceGrammarControllerCreateGrammarMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateGrammarDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateGrammarDto;
}, TContext>({ mutationFn: ({ requestBody }) => GrammarService.grammarControllerCreateGrammar(requestBody) as unknown as Promise<TData>, ...options });
export type GrammarServiceGrammarControllerGetGrammarByIdDefaultResponse = Awaited<ReturnType<typeof GrammarService.grammarControllerGetGrammarById>>;
export type GrammarServiceGrammarControllerGetGrammarByIdQueryResult<TData = GrammarServiceGrammarControllerGetGrammarByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGrammarServiceGrammarControllerGetGrammarByIdKey = "GrammarServiceGrammarControllerGetGrammarById";
/**
 * Get grammar by id
 */
export const useGrammarServiceGrammarControllerGetGrammarById = <TData = GrammarServiceGrammarControllerGetGrammarByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useGrammarServiceGrammarControllerGetGrammarByIdKey, ...(queryKey ?? [{ id }])], queryFn: () => GrammarService.grammarControllerGetGrammarById(id) as TData, ...options });
export type GrammarServiceGrammarControllerUpdateGrammarMutationResult = Awaited<ReturnType<typeof GrammarService.grammarControllerUpdateGrammar>>;
/**
 * Update grammar
 */
export const useGrammarServiceGrammarControllerUpdateGrammar = <TData = GrammarServiceGrammarControllerUpdateGrammarMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateGrammarDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateGrammarDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => GrammarService.grammarControllerUpdateGrammar(id, requestBody) as unknown as Promise<TData>, ...options });
export type GrammarServiceGrammarControllerDeleteGrammarMutationResult = Awaited<ReturnType<typeof GrammarService.grammarControllerDeleteGrammar>>;
/**
 * Delete grammar
 */
export const useGrammarServiceGrammarControllerDeleteGrammar = <TData = GrammarServiceGrammarControllerDeleteGrammarMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => GrammarService.grammarControllerDeleteGrammar(id) as unknown as Promise<TData>, ...options });
export type GrammarServiceGrammarUserControllerGetAllGrammarDefaultResponse = Awaited<ReturnType<typeof GrammarService.grammarUserControllerGetAllGrammar>>;
export type GrammarServiceGrammarUserControllerGetAllGrammarQueryResult<TData = GrammarServiceGrammarUserControllerGetAllGrammarDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGrammarServiceGrammarUserControllerGetAllGrammarKey = "GrammarServiceGrammarUserControllerGetAllGrammar";
/**
 * Get all grammar
 */
export const useGrammarServiceGrammarUserControllerGetAllGrammar = <TData = GrammarServiceGrammarUserControllerGetAllGrammarDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ lessonId, limit, offset, order }: {
    lessonId: string;
    limit?: number;
    offset: number;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useGrammarServiceGrammarUserControllerGetAllGrammarKey, ...(queryKey ?? [{ lessonId, limit, offset, order }])], queryFn: () => GrammarService.grammarUserControllerGetAllGrammar(lessonId, limit, offset, order) as TData, ...options });
export type GrammarServiceGrammarUserControllerGetGrammarByIdDefaultResponse = Awaited<ReturnType<typeof GrammarService.grammarUserControllerGetGrammarById>>;
export type GrammarServiceGrammarUserControllerGetGrammarByIdQueryResult<TData = GrammarServiceGrammarUserControllerGetGrammarByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGrammarServiceGrammarUserControllerGetGrammarByIdKey = "GrammarServiceGrammarUserControllerGetGrammarById";
/**
 * Get grammar by id
 */
export const useGrammarServiceGrammarUserControllerGetGrammarById = <TData = GrammarServiceGrammarUserControllerGetGrammarByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useGrammarServiceGrammarUserControllerGetGrammarByIdKey, ...(queryKey ?? [{ id }])], queryFn: () => GrammarService.grammarUserControllerGetGrammarById(id) as TData, ...options });
export type KanjiDictionaryServiceKanjiDictionaryControllerGetAllKanjiDictionaryDefaultResponse = Awaited<ReturnType<typeof KanjiDictionaryService.kanjiDictionaryControllerGetAllKanjiDictionary>>;
export type KanjiDictionaryServiceKanjiDictionaryControllerGetAllKanjiDictionaryQueryResult<TData = KanjiDictionaryServiceKanjiDictionaryControllerGetAllKanjiDictionaryDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useKanjiDictionaryServiceKanjiDictionaryControllerGetAllKanjiDictionaryKey = "KanjiDictionaryServiceKanjiDictionaryControllerGetAllKanjiDictionary";
/**
 * Get all dictionary with limit 10
 */
export const useKanjiDictionaryServiceKanjiDictionaryControllerGetAllKanjiDictionary = <TData = KanjiDictionaryServiceKanjiDictionaryControllerGetAllKanjiDictionaryDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ limit, offset, search, order }: {
    limit?: number;
    offset: number;
    search?: string;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useKanjiDictionaryServiceKanjiDictionaryControllerGetAllKanjiDictionaryKey, ...(queryKey ?? [{ limit, offset, search, order }])], queryFn: () => KanjiDictionaryService.kanjiDictionaryControllerGetAllKanjiDictionary(limit, offset, search, order) as TData, ...options });
export type KanjiDictionaryServiceKanjiDictionaryControllerImportDictionaryMutationResult = Awaited<ReturnType<typeof KanjiDictionaryService.kanjiDictionaryControllerImportDictionary>>;
/**
 * Import kanji dictionary
 */
export const useKanjiDictionaryServiceKanjiDictionaryControllerImportDictionary = <TData = KanjiDictionaryServiceKanjiDictionaryControllerImportDictionaryMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, void, TContext>, "mutationFn">) => useMutation<TData, TError, void, TContext>({ mutationFn: () => KanjiDictionaryService.kanjiDictionaryControllerImportDictionary() as unknown as Promise<TData>, ...options });
export type KanjiDictionaryServiceKanjiDictionaryStudentControllerGetAllKanjiDictionaryDefaultResponse = Awaited<ReturnType<typeof KanjiDictionaryService.kanjiDictionaryStudentControllerGetAllKanjiDictionary>>;
export type KanjiDictionaryServiceKanjiDictionaryStudentControllerGetAllKanjiDictionaryQueryResult<TData = KanjiDictionaryServiceKanjiDictionaryStudentControllerGetAllKanjiDictionaryDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useKanjiDictionaryServiceKanjiDictionaryStudentControllerGetAllKanjiDictionaryKey = "KanjiDictionaryServiceKanjiDictionaryStudentControllerGetAllKanjiDictionary";
/**
 * Get all dictionary with limit 10
 */
export const useKanjiDictionaryServiceKanjiDictionaryStudentControllerGetAllKanjiDictionary = <TData = KanjiDictionaryServiceKanjiDictionaryStudentControllerGetAllKanjiDictionaryDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ limit, offset, search, order }: {
    limit?: number;
    offset: number;
    search?: string;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useKanjiDictionaryServiceKanjiDictionaryStudentControllerGetAllKanjiDictionaryKey, ...(queryKey ?? [{ limit, offset, search, order }])], queryFn: () => KanjiDictionaryService.kanjiDictionaryStudentControllerGetAllKanjiDictionary(limit, offset, search, order) as TData, ...options });
export type KanjiServiceKanjiControllerGetAllKanjiDefaultResponse = Awaited<ReturnType<typeof KanjiService.kanjiControllerGetAllKanji>>;
export type KanjiServiceKanjiControllerGetAllKanjiQueryResult<TData = KanjiServiceKanjiControllerGetAllKanjiDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useKanjiServiceKanjiControllerGetAllKanjiKey = "KanjiServiceKanjiControllerGetAllKanji";
/**
 * Get all kanji
 */
export const useKanjiServiceKanjiControllerGetAllKanji = <TData = KanjiServiceKanjiControllerGetAllKanjiDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ lessonId, limit, offset, q, order }: {
    lessonId: string;
    limit?: number;
    offset: number;
    q?: string | null;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useKanjiServiceKanjiControllerGetAllKanjiKey, ...(queryKey ?? [{ lessonId, limit, offset, q, order }])], queryFn: () => KanjiService.kanjiControllerGetAllKanji(lessonId, limit, offset, q, order) as TData, ...options });
export type KanjiServiceKanjiControllerCreateKanjiMutationResult = Awaited<ReturnType<typeof KanjiService.kanjiControllerCreateKanji>>;
/**
 * Create kanji
 */
export const useKanjiServiceKanjiControllerCreateKanji = <TData = KanjiServiceKanjiControllerCreateKanjiMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateKanjiDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateKanjiDto;
}, TContext>({ mutationFn: ({ requestBody }) => KanjiService.kanjiControllerCreateKanji(requestBody) as unknown as Promise<TData>, ...options });
export type KanjiServiceKanjiControllerGetKanjiByIdDefaultResponse = Awaited<ReturnType<typeof KanjiService.kanjiControllerGetKanjiById>>;
export type KanjiServiceKanjiControllerGetKanjiByIdQueryResult<TData = KanjiServiceKanjiControllerGetKanjiByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useKanjiServiceKanjiControllerGetKanjiByIdKey = "KanjiServiceKanjiControllerGetKanjiById";
/**
 * Get kanji by id
 */
export const useKanjiServiceKanjiControllerGetKanjiById = <TData = KanjiServiceKanjiControllerGetKanjiByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useKanjiServiceKanjiControllerGetKanjiByIdKey, ...(queryKey ?? [{ id }])], queryFn: () => KanjiService.kanjiControllerGetKanjiById(id) as TData, ...options });
export type KanjiServiceKanjiControllerUpdateKanjiMutationResult = Awaited<ReturnType<typeof KanjiService.kanjiControllerUpdateKanji>>;
/**
 * Update kanji
 */
export const useKanjiServiceKanjiControllerUpdateKanji = <TData = KanjiServiceKanjiControllerUpdateKanjiMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateKanjiDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateKanjiDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => KanjiService.kanjiControllerUpdateKanji(id, requestBody) as unknown as Promise<TData>, ...options });
export type KanjiServiceKanjiControllerDeleteKanjiMutationResult = Awaited<ReturnType<typeof KanjiService.kanjiControllerDeleteKanji>>;
/**
 * Delete kanji
 */
export const useKanjiServiceKanjiControllerDeleteKanji = <TData = KanjiServiceKanjiControllerDeleteKanjiMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => KanjiService.kanjiControllerDeleteKanji(id) as unknown as Promise<TData>, ...options });
export type KanjiServiceKanjiControllerImportExcelKanjisMutationResult = Awaited<ReturnType<typeof KanjiService.kanjiControllerImportExcelKanjis>>;
/**
 * Import excel kanji
 */
export const useKanjiServiceKanjiControllerImportExcelKanjis = <TData = KanjiServiceKanjiControllerImportExcelKanjisMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    lessonId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    lessonId: string;
}, TContext>({ mutationFn: ({ lessonId }) => KanjiService.kanjiControllerImportExcelKanjis(lessonId) as unknown as Promise<TData>, ...options });
export type KanjiServiceKanjiUserControllerGetAllKanjiDefaultResponse = Awaited<ReturnType<typeof KanjiService.kanjiUserControllerGetAllKanji>>;
export type KanjiServiceKanjiUserControllerGetAllKanjiQueryResult<TData = KanjiServiceKanjiUserControllerGetAllKanjiDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useKanjiServiceKanjiUserControllerGetAllKanjiKey = "KanjiServiceKanjiUserControllerGetAllKanji";
/**
 * Get all kanji
 */
export const useKanjiServiceKanjiUserControllerGetAllKanji = <TData = KanjiServiceKanjiUserControllerGetAllKanjiDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ lessonId, limit, offset, q, order }: {
    lessonId: string;
    limit?: number;
    offset: number;
    q?: string | null;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useKanjiServiceKanjiUserControllerGetAllKanjiKey, ...(queryKey ?? [{ lessonId, limit, offset, q, order }])], queryFn: () => KanjiService.kanjiUserControllerGetAllKanji(lessonId, limit, offset, q, order) as TData, ...options });
export type KanjiServiceKanjiUserControllerGetKanjiByIdDefaultResponse = Awaited<ReturnType<typeof KanjiService.kanjiUserControllerGetKanjiById>>;
export type KanjiServiceKanjiUserControllerGetKanjiByIdQueryResult<TData = KanjiServiceKanjiUserControllerGetKanjiByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useKanjiServiceKanjiUserControllerGetKanjiByIdKey = "KanjiServiceKanjiUserControllerGetKanjiById";
/**
 * Get kanji by id
 */
export const useKanjiServiceKanjiUserControllerGetKanjiById = <TData = KanjiServiceKanjiUserControllerGetKanjiByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useKanjiServiceKanjiUserControllerGetKanjiByIdKey, ...(queryKey ?? [{ id }])], queryFn: () => KanjiService.kanjiUserControllerGetKanjiById(id) as TData, ...options });
export type LessonCommentServiceLessonCommentControllerAddCommentMutationResult = Awaited<ReturnType<typeof LessonCommentService.lessonCommentControllerAddComment>>;
/**
 * add comment
 */
export const useLessonCommentServiceLessonCommentControllerAddComment = <TData = LessonCommentServiceLessonCommentControllerAddCommentMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateLessonCommentDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateLessonCommentDto;
}, TContext>({ mutationFn: ({ requestBody }) => LessonCommentService.lessonCommentControllerAddComment(requestBody) as unknown as Promise<TData>, ...options });
export type LessonCommentServiceLessonCommentControllerGetCommentsDefaultResponse = Awaited<ReturnType<typeof LessonCommentService.lessonCommentControllerGetComments>>;
export type LessonCommentServiceLessonCommentControllerGetCommentsQueryResult<TData = LessonCommentServiceLessonCommentControllerGetCommentsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useLessonCommentServiceLessonCommentControllerGetCommentsKey = "LessonCommentServiceLessonCommentControllerGetComments";
/**
 * get comment bt lesson id
 */
export const useLessonCommentServiceLessonCommentControllerGetComments = <TData = LessonCommentServiceLessonCommentControllerGetCommentsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useLessonCommentServiceLessonCommentControllerGetCommentsKey, ...(queryKey ?? [{ id }])], queryFn: () => LessonCommentService.lessonCommentControllerGetComments(id) as TData, ...options });
export type LessonCommentServiceLessonCommentControllerUpdateCommentMutationResult = Awaited<ReturnType<typeof LessonCommentService.lessonCommentControllerUpdateComment>>;
/**
 * update comment by id
 */
export const useLessonCommentServiceLessonCommentControllerUpdateComment = <TData = LessonCommentServiceLessonCommentControllerUpdateCommentMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateLessonCommentDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateLessonCommentDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => LessonCommentService.lessonCommentControllerUpdateComment(id, requestBody) as unknown as Promise<TData>, ...options });
export type LessonCommentServiceLessonCommentControllerDeleteCommentMutationResult = Awaited<ReturnType<typeof LessonCommentService.lessonCommentControllerDeleteComment>>;
/**
 * delete comment by id
 */
export const useLessonCommentServiceLessonCommentControllerDeleteComment = <TData = LessonCommentServiceLessonCommentControllerDeleteCommentMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => LessonCommentService.lessonCommentControllerDeleteComment(id) as unknown as Promise<TData>, ...options });
export type LessonProgressServiceLessonProgressControllerUpsertLessonProgressMutationResult = Awaited<ReturnType<typeof LessonProgressService.lessonProgressControllerUpsertLessonProgress>>;
/**
 * Create lesson progress
 */
export const useLessonProgressServiceLessonProgressControllerUpsertLessonProgress = <TData = LessonProgressServiceLessonProgressControllerUpsertLessonProgressMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: UpsertLessonProgressDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: UpsertLessonProgressDto;
}, TContext>({ mutationFn: ({ requestBody }) => LessonProgressService.lessonProgressControllerUpsertLessonProgress(requestBody) as unknown as Promise<TData>, ...options });
export type LessonServiceLessonControllerGetAllLessonDefaultResponse = Awaited<ReturnType<typeof LessonService.lessonControllerGetAllLesson>>;
export type LessonServiceLessonControllerGetAllLessonQueryResult<TData = LessonServiceLessonControllerGetAllLessonDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useLessonServiceLessonControllerGetAllLessonKey = "LessonServiceLessonControllerGetAllLesson";
/**
 * Get all lessons
 */
export const useLessonServiceLessonControllerGetAllLesson = <TData = LessonServiceLessonControllerGetAllLessonDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ sessonId, limit, offset, type, order }: {
    sessonId: string;
    limit?: number;
    offset: number;
    type?: "LISTENING" | "READING" | "PRACTICE_THROUGH" | "VOCAB" | "GRAMMAR" | "KANJI" | "VIDEO" | "AUDIO" | "FLASH_CARD" | "QUIZ" | "SLIDE" | "TEXT" | "FILE" | "HINAGAN" | "KATAKANA" | "COUNTVOCAB" | "TESTVOCAB" | "HIRAGANA" | null;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useLessonServiceLessonControllerGetAllLessonKey, ...(queryKey ?? [{ sessonId, limit, offset, type, order }])], queryFn: () => LessonService.lessonControllerGetAllLesson(sessonId, limit, offset, type, order) as TData, ...options });
export type LessonServiceLessonControllerCreateLessonMutationResult = Awaited<ReturnType<typeof LessonService.lessonControllerCreateLesson>>;
/**
 * Create lesson
 */
export const useLessonServiceLessonControllerCreateLesson = <TData = LessonServiceLessonControllerCreateLessonMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateLessonDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateLessonDto;
}, TContext>({ mutationFn: ({ requestBody }) => LessonService.lessonControllerCreateLesson(requestBody) as unknown as Promise<TData>, ...options });
export type LessonServiceLessonControllerGetLessonByIdDefaultResponse = Awaited<ReturnType<typeof LessonService.lessonControllerGetLessonById>>;
export type LessonServiceLessonControllerGetLessonByIdQueryResult<TData = LessonServiceLessonControllerGetLessonByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useLessonServiceLessonControllerGetLessonByIdKey = "LessonServiceLessonControllerGetLessonById";
/**
 * Get lesson by id
 */
export const useLessonServiceLessonControllerGetLessonById = <TData = LessonServiceLessonControllerGetLessonByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useLessonServiceLessonControllerGetLessonByIdKey, ...(queryKey ?? [{ id }])], queryFn: () => LessonService.lessonControllerGetLessonById(id) as TData, ...options });
export type LessonServiceLessonControllerUpdateLessonMutationResult = Awaited<ReturnType<typeof LessonService.lessonControllerUpdateLesson>>;
/**
 * Update lesson
 */
export const useLessonServiceLessonControllerUpdateLesson = <TData = LessonServiceLessonControllerUpdateLessonMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateLessonDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateLessonDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => LessonService.lessonControllerUpdateLesson(id, requestBody) as unknown as Promise<TData>, ...options });
export type LessonServiceLessonControllerDeleteLessonMutationResult = Awaited<ReturnType<typeof LessonService.lessonControllerDeleteLesson>>;
/**
 * Delete lesson by id
 */
export const useLessonServiceLessonControllerDeleteLesson = <TData = LessonServiceLessonControllerDeleteLessonMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => LessonService.lessonControllerDeleteLesson(id) as unknown as Promise<TData>, ...options });
export type LessonServiceLessonUserControllerGetAllLessonDefaultResponse = Awaited<ReturnType<typeof LessonService.lessonUserControllerGetAllLesson>>;
export type LessonServiceLessonUserControllerGetAllLessonQueryResult<TData = LessonServiceLessonUserControllerGetAllLessonDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useLessonServiceLessonUserControllerGetAllLessonKey = "LessonServiceLessonUserControllerGetAllLesson";
/**
 * Get all lessons by session
 */
export const useLessonServiceLessonUserControllerGetAllLesson = <TData = LessonServiceLessonUserControllerGetAllLessonDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ sessonId }: {
    sessonId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useLessonServiceLessonUserControllerGetAllLessonKey, ...(queryKey ?? [{ sessonId }])], queryFn: () => LessonService.lessonUserControllerGetAllLesson(sessonId) as TData, ...options });
export type LessonServiceLessonUserControllerGetLessonByIdDefaultResponse = Awaited<ReturnType<typeof LessonService.lessonUserControllerGetLessonById>>;
export type LessonServiceLessonUserControllerGetLessonByIdQueryResult<TData = LessonServiceLessonUserControllerGetLessonByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useLessonServiceLessonUserControllerGetLessonByIdKey = "LessonServiceLessonUserControllerGetLessonById";
/**
 * Get lesson by id
 */
export const useLessonServiceLessonUserControllerGetLessonById = <TData = LessonServiceLessonUserControllerGetLessonByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useLessonServiceLessonUserControllerGetLessonByIdKey, ...(queryKey ?? [{ id }])], queryFn: () => LessonService.lessonUserControllerGetLessonById(id) as TData, ...options });
export type NotificationsServiceNotificationControllerGetNotificationsDefaultResponse = Awaited<ReturnType<typeof NotificationsService.notificationControllerGetNotifications>>;
export type NotificationsServiceNotificationControllerGetNotificationsQueryResult<TData = NotificationsServiceNotificationControllerGetNotificationsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useNotificationsServiceNotificationControllerGetNotificationsKey = "NotificationsServiceNotificationControllerGetNotifications";
/**
 * Get list of notifications
 */
export const useNotificationsServiceNotificationControllerGetNotifications = <TData = NotificationsServiceNotificationControllerGetNotificationsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ limit, offset, notificationType, fromDate, toDate, order }: {
    limit?: number;
    offset: number;
    notificationType?: any;
    fromDate?: string | null;
    toDate?: string | null;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useNotificationsServiceNotificationControllerGetNotificationsKey, ...(queryKey ?? [{ limit, offset, notificationType, fromDate, toDate, order }])], queryFn: () => NotificationsService.notificationControllerGetNotifications(limit, offset, notificationType, fromDate, toDate, order) as TData, ...options });
export type NotificationsServiceNotificationControllerGetNotificationDefaultResponse = Awaited<ReturnType<typeof NotificationsService.notificationControllerGetNotification>>;
export type NotificationsServiceNotificationControllerGetNotificationQueryResult<TData = NotificationsServiceNotificationControllerGetNotificationDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useNotificationsServiceNotificationControllerGetNotificationKey = "NotificationsServiceNotificationControllerGetNotification";
/**
 * Get a notification
 */
export const useNotificationsServiceNotificationControllerGetNotification = <TData = NotificationsServiceNotificationControllerGetNotificationDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useNotificationsServiceNotificationControllerGetNotificationKey, ...(queryKey ?? [{ id }])], queryFn: () => NotificationsService.notificationControllerGetNotification(id) as TData, ...options });
export type NotificationsServiceNotificationControllerDeleteNotificationMutationResult = Awaited<ReturnType<typeof NotificationsService.notificationControllerDeleteNotification>>;
/**
 * Delete a notification
 */
export const useNotificationsServiceNotificationControllerDeleteNotification = <TData = NotificationsServiceNotificationControllerDeleteNotificationMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => NotificationsService.notificationControllerDeleteNotification(id) as unknown as Promise<TData>, ...options });
export type NotificationsServiceNotificationControllerUpdateNotificationMutationResult = Awaited<ReturnType<typeof NotificationsService.notificationControllerUpdateNotification>>;
/**
 * Read a notification
 */
export const useNotificationsServiceNotificationControllerUpdateNotification = <TData = NotificationsServiceNotificationControllerUpdateNotificationMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateNotificationDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateNotificationDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => NotificationsService.notificationControllerUpdateNotification(id, requestBody) as unknown as Promise<TData>, ...options });
export type NotificationsServiceNotificationAdminControllerGetNotificationsDefaultResponse = Awaited<ReturnType<typeof NotificationsService.notificationAdminControllerGetNotifications>>;
export type NotificationsServiceNotificationAdminControllerGetNotificationsQueryResult<TData = NotificationsServiceNotificationAdminControllerGetNotificationsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useNotificationsServiceNotificationAdminControllerGetNotificationsKey = "NotificationsServiceNotificationAdminControllerGetNotifications";
/**
 * Get list of notifications of a business
 */
export const useNotificationsServiceNotificationAdminControllerGetNotifications = <TData = NotificationsServiceNotificationAdminControllerGetNotificationsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ businessId, limit, offset, notificationType, fromDate, toDate, order }: {
    businessId: string;
    limit?: number;
    offset: number;
    notificationType?: any;
    fromDate?: string | null;
    toDate?: string | null;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useNotificationsServiceNotificationAdminControllerGetNotificationsKey, ...(queryKey ?? [{ businessId, limit, offset, notificationType, fromDate, toDate, order }])], queryFn: () => NotificationsService.notificationAdminControllerGetNotifications(businessId, limit, offset, notificationType, fromDate, toDate, order) as TData, ...options });
export type NotificationTokensServiceNotificationTokenControllerCreateNotificationTokenMutationResult = Awaited<ReturnType<typeof NotificationTokensService.notificationTokenControllerCreateNotificationToken>>;
/**
 * Register a fcm token
 */
export const useNotificationTokensServiceNotificationTokenControllerCreateNotificationToken = <TData = NotificationTokensServiceNotificationTokenControllerCreateNotificationTokenMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateNotificationTokenDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateNotificationTokenDto;
}, TContext>({ mutationFn: ({ requestBody }) => NotificationTokensService.notificationTokenControllerCreateNotificationToken(requestBody) as unknown as Promise<TData>, ...options });
export type NotificationTokensServiceNotificationTokenControllerDeleteNotificationTokenMutationResult = Awaited<ReturnType<typeof NotificationTokensService.notificationTokenControllerDeleteNotificationToken>>;
/**
 * Delete a notification token when logout
 */
export const useNotificationTokensServiceNotificationTokenControllerDeleteNotificationToken = <TData = NotificationTokensServiceNotificationTokenControllerDeleteNotificationTokenMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => NotificationTokensService.notificationTokenControllerDeleteNotificationToken(id) as unknown as Promise<TData>, ...options });
export type QuestionFlashCardServiceQuestionFlashCardControllerAddQuestionFlashCardMutationResult = Awaited<ReturnType<typeof QuestionFlashCardService.questionFlashCardControllerAddQuestionFlashCard>>;
/**
 * add question of flash card by quiz id
 */
export const useQuestionFlashCardServiceQuestionFlashCardControllerAddQuestionFlashCard = <TData = QuestionFlashCardServiceQuestionFlashCardControllerAddQuestionFlashCardMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: CreateQuestionFlashCardDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: CreateQuestionFlashCardDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => QuestionFlashCardService.questionFlashCardControllerAddQuestionFlashCard(id, requestBody) as unknown as Promise<TData>, ...options });
export type QuestionFlashCardServiceQuestionFlashCardControllerUpdateQuestionMutationResult = Awaited<ReturnType<typeof QuestionFlashCardService.questionFlashCardControllerUpdateQuestion>>;
/**
 * update question by id
 */
export const useQuestionFlashCardServiceQuestionFlashCardControllerUpdateQuestion = <TData = QuestionFlashCardServiceQuestionFlashCardControllerUpdateQuestionMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateQuestionFlashCardDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateQuestionFlashCardDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => QuestionFlashCardService.questionFlashCardControllerUpdateQuestion(id, requestBody) as unknown as Promise<TData>, ...options });
export type QuestionFlashCardServiceQuestionFlashCardControllerDeleteQuestionMutationResult = Awaited<ReturnType<typeof QuestionFlashCardService.questionFlashCardControllerDeleteQuestion>>;
/**
 * delete question by id
 */
export const useQuestionFlashCardServiceQuestionFlashCardControllerDeleteQuestion = <TData = QuestionFlashCardServiceQuestionFlashCardControllerDeleteQuestionMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => QuestionFlashCardService.questionFlashCardControllerDeleteQuestion(id) as unknown as Promise<TData>, ...options });
export type QuestionFlashCardServiceQuestionFlashCardControllerImportQuestionFlashCardsMutationResult = Awaited<ReturnType<typeof QuestionFlashCardService.questionFlashCardControllerImportQuestionFlashCards>>;
/**
 * Import question flash cards from Excel file
 */
export const useQuestionFlashCardServiceQuestionFlashCardControllerImportQuestionFlashCards = <TData = QuestionFlashCardServiceQuestionFlashCardControllerImportQuestionFlashCardsMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    quizId?: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    quizId?: string;
}, TContext>({ mutationFn: ({ quizId }) => QuestionFlashCardService.questionFlashCardControllerImportQuestionFlashCards(quizId) as unknown as Promise<TData>, ...options });
export type QuestionGroupServiceQuestionGroupControllerGetAllQuestionGroupDefaultResponse = Awaited<ReturnType<typeof QuestionGroupService.questionGroupControllerGetAllQuestionGroup>>;
export type QuestionGroupServiceQuestionGroupControllerGetAllQuestionGroupQueryResult<TData = QuestionGroupServiceQuestionGroupControllerGetAllQuestionGroupDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useQuestionGroupServiceQuestionGroupControllerGetAllQuestionGroupKey = "QuestionGroupServiceQuestionGroupControllerGetAllQuestionGroup";
/**
 * Get all question group
 */
export const useQuestionGroupServiceQuestionGroupControllerGetAllQuestionGroup = <TData = QuestionGroupServiceQuestionGroupControllerGetAllQuestionGroupDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ limit, offset, content, tag, order }: {
    limit?: number;
    offset: number;
    content?: string | null;
    tag?: string | null;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useQuestionGroupServiceQuestionGroupControllerGetAllQuestionGroupKey, ...(queryKey ?? [{ limit, offset, content, tag, order }])], queryFn: () => QuestionGroupService.questionGroupControllerGetAllQuestionGroup(limit, offset, content, tag, order) as TData, ...options });
export type QuestionGroupServiceQuestionGroupControllerCreateQuestionGroupMutationResult = Awaited<ReturnType<typeof QuestionGroupService.questionGroupControllerCreateQuestionGroup>>;
export const useQuestionGroupServiceQuestionGroupControllerCreateQuestionGroup = <TData = QuestionGroupServiceQuestionGroupControllerCreateQuestionGroupMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateQuestionGroupDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateQuestionGroupDto;
}, TContext>({ mutationFn: ({ requestBody }) => QuestionGroupService.questionGroupControllerCreateQuestionGroup(requestBody) as unknown as Promise<TData>, ...options });
export type QuestionGroupServiceQuestionGroupControllerGetQuestionGroupByIdDefaultResponse = Awaited<ReturnType<typeof QuestionGroupService.questionGroupControllerGetQuestionGroupById>>;
export type QuestionGroupServiceQuestionGroupControllerGetQuestionGroupByIdQueryResult<TData = QuestionGroupServiceQuestionGroupControllerGetQuestionGroupByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useQuestionGroupServiceQuestionGroupControllerGetQuestionGroupByIdKey = "QuestionGroupServiceQuestionGroupControllerGetQuestionGroupById";
export const useQuestionGroupServiceQuestionGroupControllerGetQuestionGroupById = <TData = QuestionGroupServiceQuestionGroupControllerGetQuestionGroupByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useQuestionGroupServiceQuestionGroupControllerGetQuestionGroupByIdKey, ...(queryKey ?? [{ id }])], queryFn: () => QuestionGroupService.questionGroupControllerGetQuestionGroupById(id) as TData, ...options });
export type QuestionGroupServiceQuestionGroupControllerUpdateQuestionGroupMutationResult = Awaited<ReturnType<typeof QuestionGroupService.questionGroupControllerUpdateQuestionGroup>>;
export const useQuestionGroupServiceQuestionGroupControllerUpdateQuestionGroup = <TData = QuestionGroupServiceQuestionGroupControllerUpdateQuestionGroupMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateQuestionGroupDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateQuestionGroupDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => QuestionGroupService.questionGroupControllerUpdateQuestionGroup(id, requestBody) as unknown as Promise<TData>, ...options });
export type QuestionGroupServiceQuestionGroupControllerDeleteQuestionGroupMutationResult = Awaited<ReturnType<typeof QuestionGroupService.questionGroupControllerDeleteQuestionGroup>>;
export const useQuestionGroupServiceQuestionGroupControllerDeleteQuestionGroup = <TData = QuestionGroupServiceQuestionGroupControllerDeleteQuestionGroupMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => QuestionGroupService.questionGroupControllerDeleteQuestionGroup(id) as unknown as Promise<TData>, ...options });
export type QuestionGroupServiceQuestionGroupUserControllerGetAllQuestionGroupDefaultResponse = Awaited<ReturnType<typeof QuestionGroupService.questionGroupUserControllerGetAllQuestionGroup>>;
export type QuestionGroupServiceQuestionGroupUserControllerGetAllQuestionGroupQueryResult<TData = QuestionGroupServiceQuestionGroupUserControllerGetAllQuestionGroupDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useQuestionGroupServiceQuestionGroupUserControllerGetAllQuestionGroupKey = "QuestionGroupServiceQuestionGroupUserControllerGetAllQuestionGroup";
/**
 * Get all question group
 */
export const useQuestionGroupServiceQuestionGroupUserControllerGetAllQuestionGroup = <TData = QuestionGroupServiceQuestionGroupUserControllerGetAllQuestionGroupDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ limit, offset, content, tag, order }: {
    limit?: number;
    offset: number;
    content?: string | null;
    tag?: string | null;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useQuestionGroupServiceQuestionGroupUserControllerGetAllQuestionGroupKey, ...(queryKey ?? [{ limit, offset, content, tag, order }])], queryFn: () => QuestionGroupService.questionGroupUserControllerGetAllQuestionGroup(limit, offset, content, tag, order) as TData, ...options });
export type QuestionGroupServiceQuestionGroupUserControllerGetQuestionGroupByIdDefaultResponse = Awaited<ReturnType<typeof QuestionGroupService.questionGroupUserControllerGetQuestionGroupById>>;
export type QuestionGroupServiceQuestionGroupUserControllerGetQuestionGroupByIdQueryResult<TData = QuestionGroupServiceQuestionGroupUserControllerGetQuestionGroupByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useQuestionGroupServiceQuestionGroupUserControllerGetQuestionGroupByIdKey = "QuestionGroupServiceQuestionGroupUserControllerGetQuestionGroupById";
export const useQuestionGroupServiceQuestionGroupUserControllerGetQuestionGroupById = <TData = QuestionGroupServiceQuestionGroupUserControllerGetQuestionGroupByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useQuestionGroupServiceQuestionGroupUserControllerGetQuestionGroupByIdKey, ...(queryKey ?? [{ id }])], queryFn: () => QuestionGroupService.questionGroupUserControllerGetQuestionGroupById(id) as TData, ...options });
export type QuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetAllQuestionGroupReferenceDefaultResponse = Awaited<ReturnType<typeof QuestionGroupsReferencesService.questionGroupReferenceControllerGetAllQuestionGroupReference>>;
export type QuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetAllQuestionGroupReferenceQueryResult<TData = QuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetAllQuestionGroupReferenceDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useQuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetAllQuestionGroupReferenceKey = "QuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetAllQuestionGroupReference";
/**
 * Get all question group references
 */
export const useQuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetAllQuestionGroupReference = <TData = QuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetAllQuestionGroupReferenceDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ limit, offset, order }: {
    limit?: number;
    offset: number;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useQuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetAllQuestionGroupReferenceKey, ...(queryKey ?? [{ limit, offset, order }])], queryFn: () => QuestionGroupsReferencesService.questionGroupReferenceControllerGetAllQuestionGroupReference(limit, offset, order) as TData, ...options });
export type QuestionGroupsReferencesServiceQuestionGroupReferenceControllerCreateQuestionGroupReferenceMutationResult = Awaited<ReturnType<typeof QuestionGroupsReferencesService.questionGroupReferenceControllerCreateQuestionGroupReference>>;
/**
 * Create reference from (testDetail or exam) to question group
 */
export const useQuestionGroupsReferencesServiceQuestionGroupReferenceControllerCreateQuestionGroupReference = <TData = QuestionGroupsReferencesServiceQuestionGroupReferenceControllerCreateQuestionGroupReferenceMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateQuestionGroupReferenceDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateQuestionGroupReferenceDto;
}, TContext>({ mutationFn: ({ requestBody }) => QuestionGroupsReferencesService.questionGroupReferenceControllerCreateQuestionGroupReference(requestBody) as unknown as Promise<TData>, ...options });
export type QuestionGroupsReferencesServiceQuestionGroupReferenceControllerDeleteQuestionGroupReferenceMutationResult = Awaited<ReturnType<typeof QuestionGroupsReferencesService.questionGroupReferenceControllerDeleteQuestionGroupReference>>;
/**
 * Delete question group reference by id
 */
export const useQuestionGroupsReferencesServiceQuestionGroupReferenceControllerDeleteQuestionGroupReference = <TData = QuestionGroupsReferencesServiceQuestionGroupReferenceControllerDeleteQuestionGroupReferenceMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    parentId: string;
    questionGroupId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    parentId: string;
    questionGroupId: string;
}, TContext>({ mutationFn: ({ parentId, questionGroupId }) => QuestionGroupsReferencesService.questionGroupReferenceControllerDeleteQuestionGroupReference(parentId, questionGroupId) as unknown as Promise<TData>, ...options });
export type QuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetQuestionGroupsByExamIdDefaultResponse = Awaited<ReturnType<typeof QuestionGroupsReferencesService.questionGroupReferenceControllerGetQuestionGroupsByExamId>>;
export type QuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetQuestionGroupsByExamIdQueryResult<TData = QuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetQuestionGroupsByExamIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useQuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetQuestionGroupsByExamIdKey = "QuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetQuestionGroupsByExamId";
/**
 * Get all question groups by exam ID
 */
export const useQuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetQuestionGroupsByExamId = <TData = QuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetQuestionGroupsByExamIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ examId, limit, offset, content, tag, order }: {
    examId: string;
    limit?: number;
    offset: number;
    content?: string | null;
    tag?: string | null;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useQuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetQuestionGroupsByExamIdKey, ...(queryKey ?? [{ examId, limit, offset, content, tag, order }])], queryFn: () => QuestionGroupsReferencesService.questionGroupReferenceControllerGetQuestionGroupsByExamId(examId, limit, offset, content, tag, order) as TData, ...options });
export type QuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetQuestionGroupsByTestDetailIdDefaultResponse = Awaited<ReturnType<typeof QuestionGroupsReferencesService.questionGroupReferenceControllerGetQuestionGroupsByTestDetailId>>;
export type QuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetQuestionGroupsByTestDetailIdQueryResult<TData = QuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetQuestionGroupsByTestDetailIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useQuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetQuestionGroupsByTestDetailIdKey = "QuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetQuestionGroupsByTestDetailId";
/**
 * Get all question groups by test detail ID
 */
export const useQuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetQuestionGroupsByTestDetailId = <TData = QuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetQuestionGroupsByTestDetailIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ testDetailId, limit, offset, content, tag, order }: {
    testDetailId: string;
    limit?: number;
    offset: number;
    content?: string | null;
    tag?: string | null;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useQuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetQuestionGroupsByTestDetailIdKey, ...(queryKey ?? [{ testDetailId, limit, offset, content, tag, order }])], queryFn: () => QuestionGroupsReferencesService.questionGroupReferenceControllerGetQuestionGroupsByTestDetailId(testDetailId, limit, offset, content, tag, order) as TData, ...options });
export type QuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetQuestionGroupUsageDefaultResponse = Awaited<ReturnType<typeof QuestionGroupsReferencesService.questionGroupReferenceControllerGetQuestionGroupUsage>>;
export type QuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetQuestionGroupUsageQueryResult<TData = QuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetQuestionGroupUsageDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useQuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetQuestionGroupUsageKey = "QuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetQuestionGroupUsage";
/**
 * Get all exams and test details using a question group
 */
export const useQuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetQuestionGroupUsage = <TData = QuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetQuestionGroupUsageDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ questionGroupId, limit, offset, content, tag, order }: {
    questionGroupId: string;
    limit?: number;
    offset: number;
    content?: string | null;
    tag?: string | null;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useQuestionGroupsReferencesServiceQuestionGroupReferenceControllerGetQuestionGroupUsageKey, ...(queryKey ?? [{ questionGroupId, limit, offset, content, tag, order }])], queryFn: () => QuestionGroupsReferencesService.questionGroupReferenceControllerGetQuestionGroupUsage(questionGroupId, limit, offset, content, tag, order) as TData, ...options });
export type QuestionGroupsReferencesServiceQuestionGroupReferenceControllerCreateQuestionGroupAndReferenceMutationResult = Awaited<ReturnType<typeof QuestionGroupsReferencesService.questionGroupReferenceControllerCreateQuestionGroupAndReference>>;
/**
 * Create question group and reference from (testDetail or exam) to question group
 */
export const useQuestionGroupsReferencesServiceQuestionGroupReferenceControllerCreateQuestionGroupAndReference = <TData = QuestionGroupsReferencesServiceQuestionGroupReferenceControllerCreateQuestionGroupAndReferenceMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateQuestionGroupAndReferenceDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateQuestionGroupAndReferenceDto;
}, TContext>({ mutationFn: ({ requestBody }) => QuestionGroupsReferencesService.questionGroupReferenceControllerCreateQuestionGroupAndReference(requestBody) as unknown as Promise<TData>, ...options });
export type QuestionServiceQuestionControllerGetAllQuestionDefaultResponse = Awaited<ReturnType<typeof QuestionService.questionControllerGetAllQuestion>>;
export type QuestionServiceQuestionControllerGetAllQuestionQueryResult<TData = QuestionServiceQuestionControllerGetAllQuestionDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useQuestionServiceQuestionControllerGetAllQuestionKey = "QuestionServiceQuestionControllerGetAllQuestion";
/**
 * Get all question
 */
export const useQuestionServiceQuestionControllerGetAllQuestion = <TData = QuestionServiceQuestionControllerGetAllQuestionDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ limit, offset, type, questionGroupId, search, tag, order }: {
    limit?: number;
    offset: number;
    type?: "MULTIPLE_CHOICE" | "SORTING" | "MATCHING" | "MULTIPLE_CHOICE_HORIZONTAL" | "FILL_IN_BLANK" | "CHOOSE_ANSWER_IN_BLANK" | "ESSAY" | null;
    questionGroupId?: string | null;
    search?: string | null;
    tag?: string | null;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useQuestionServiceQuestionControllerGetAllQuestionKey, ...(queryKey ?? [{ limit, offset, type, questionGroupId, search, tag, order }])], queryFn: () => QuestionService.questionControllerGetAllQuestion(limit, offset, type, questionGroupId, search, tag, order) as TData, ...options });
export type QuestionServiceQuestionControllerCreateQuestionMutationResult = Awaited<ReturnType<typeof QuestionService.questionControllerCreateQuestion>>;
/**
 * Create question
 */
export const useQuestionServiceQuestionControllerCreateQuestion = <TData = QuestionServiceQuestionControllerCreateQuestionMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateQuestionDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateQuestionDto;
}, TContext>({ mutationFn: ({ requestBody }) => QuestionService.questionControllerCreateQuestion(requestBody) as unknown as Promise<TData>, ...options });
export type QuestionServiceQuestionControllerGetQuestionByIdDefaultResponse = Awaited<ReturnType<typeof QuestionService.questionControllerGetQuestionById>>;
export type QuestionServiceQuestionControllerGetQuestionByIdQueryResult<TData = QuestionServiceQuestionControllerGetQuestionByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useQuestionServiceQuestionControllerGetQuestionByIdKey = "QuestionServiceQuestionControllerGetQuestionById";
/**
 * Get question by id
 */
export const useQuestionServiceQuestionControllerGetQuestionById = <TData = QuestionServiceQuestionControllerGetQuestionByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useQuestionServiceQuestionControllerGetQuestionByIdKey, ...(queryKey ?? [{ id }])], queryFn: () => QuestionService.questionControllerGetQuestionById(id) as TData, ...options });
export type QuestionServiceQuestionControllerUpdateQuestionMutationResult = Awaited<ReturnType<typeof QuestionService.questionControllerUpdateQuestion>>;
/**
 * Update question
 */
export const useQuestionServiceQuestionControllerUpdateQuestion = <TData = QuestionServiceQuestionControllerUpdateQuestionMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateQuestionDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateQuestionDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => QuestionService.questionControllerUpdateQuestion(id, requestBody) as unknown as Promise<TData>, ...options });
export type QuestionServiceQuestionControllerDeleteQuestionMutationResult = Awaited<ReturnType<typeof QuestionService.questionControllerDeleteQuestion>>;
/**
 * Delete question
 */
export const useQuestionServiceQuestionControllerDeleteQuestion = <TData = QuestionServiceQuestionControllerDeleteQuestionMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => QuestionService.questionControllerDeleteQuestion(id) as unknown as Promise<TData>, ...options });
export type QuestionServiceQuestionControllerCreateQuestionInQuestionGroupMutationResult = Awaited<ReturnType<typeof QuestionService.questionControllerCreateQuestionInQuestionGroup>>;
/**
 * Create question and add to question group
 */
export const useQuestionServiceQuestionControllerCreateQuestionInQuestionGroup = <TData = QuestionServiceQuestionControllerCreateQuestionInQuestionGroupMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    questionGroupId: string;
    requestBody: CreateQuestionDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    questionGroupId: string;
    requestBody: CreateQuestionDto;
}, TContext>({ mutationFn: ({ questionGroupId, requestBody }) => QuestionService.questionControllerCreateQuestionInQuestionGroup(questionGroupId, requestBody) as unknown as Promise<TData>, ...options });
export type QuestionServiceQuestionControllerAddDocumentMutationResult = Awaited<ReturnType<typeof QuestionService.questionControllerAddDocument>>;
/**
 * add document by question id
 */
export const useQuestionServiceQuestionControllerAddDocument = <TData = QuestionServiceQuestionControllerAddDocumentMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: CreateDocumentType;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: CreateDocumentType;
}, TContext>({ mutationFn: ({ id, requestBody }) => QuestionService.questionControllerAddDocument(id, requestBody) as unknown as Promise<TData>, ...options });
export type QuestionServiceQuestionControllerUpdateDocumentMutationResult = Awaited<ReturnType<typeof QuestionService.questionControllerUpdateDocument>>;
/**
 * update document by question id
 */
export const useQuestionServiceQuestionControllerUpdateDocument = <TData = QuestionServiceQuestionControllerUpdateDocumentMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateDocumentType;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateDocumentType;
}, TContext>({ mutationFn: ({ id, requestBody }) => QuestionService.questionControllerUpdateDocument(id, requestBody) as unknown as Promise<TData>, ...options });
export type QuestionServiceQuestionControllerDeleteDocumentMutationResult = Awaited<ReturnType<typeof QuestionService.questionControllerDeleteDocument>>;
/**
 * delete document by question id
 */
export const useQuestionServiceQuestionControllerDeleteDocument = <TData = QuestionServiceQuestionControllerDeleteDocumentMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: DeleteDocumentType;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: DeleteDocumentType;
}, TContext>({ mutationFn: ({ id, requestBody }) => QuestionService.questionControllerDeleteDocument(id, requestBody) as unknown as Promise<TData>, ...options });
export type QuestionServiceQuestionControllerUpdateTagMultipleQuestionMutationResult = Awaited<ReturnType<typeof QuestionService.questionControllerUpdateTagMultipleQuestion>>;
/**
 * Update tag multiple question
 */
export const useQuestionServiceQuestionControllerUpdateTagMultipleQuestion = <TData = QuestionServiceQuestionControllerUpdateTagMultipleQuestionMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    ids: string;
    requestBody: UpdateTagMultipleQuestionDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    ids: string;
    requestBody: UpdateTagMultipleQuestionDto;
}, TContext>({ mutationFn: ({ ids, requestBody }) => QuestionService.questionControllerUpdateTagMultipleQuestion(ids, requestBody) as unknown as Promise<TData>, ...options });
export type QuestionServiceQuestionControllerDeleteMultipleQuestionMutationResult = Awaited<ReturnType<typeof QuestionService.questionControllerDeleteMultipleQuestion>>;
/**
 * Delete multiple questions
 */
export const useQuestionServiceQuestionControllerDeleteMultipleQuestion = <TData = QuestionServiceQuestionControllerDeleteMultipleQuestionMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    ids: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    ids: string;
}, TContext>({ mutationFn: ({ ids }) => QuestionService.questionControllerDeleteMultipleQuestion(ids) as unknown as Promise<TData>, ...options });
export type QuestionServiceQuestionControllerImportQuestionMutationResult = Awaited<ReturnType<typeof QuestionService.questionControllerImportQuestion>>;
/**
 * Import question from Excel file
 */
export const useQuestionServiceQuestionControllerImportQuestion = <TData = QuestionServiceQuestionControllerImportQuestionMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, void, TContext>, "mutationFn">) => useMutation<TData, TError, void, TContext>({ mutationFn: () => QuestionService.questionControllerImportQuestion() as unknown as Promise<TData>, ...options });
export type QuizFlashCardServiceQuizFlashCardControllerAddQuizFlashCardMutationResult = Awaited<ReturnType<typeof QuizFlashCardService.quizFlashCardControllerAddQuizFlashCard>>;
/**
 * add quiz of flash card
 */
export const useQuizFlashCardServiceQuizFlashCardControllerAddQuizFlashCard = <TData = QuizFlashCardServiceQuizFlashCardControllerAddQuizFlashCardMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateQuizFlashCardDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateQuizFlashCardDto;
}, TContext>({ mutationFn: ({ requestBody }) => QuizFlashCardService.quizFlashCardControllerAddQuizFlashCard(requestBody) as unknown as Promise<TData>, ...options });
export type QuizFlashCardServiceQuizFlashCardControllerGetQuizFlashCardDefaultResponse = Awaited<ReturnType<typeof QuizFlashCardService.quizFlashCardControllerGetQuizFlashCard>>;
export type QuizFlashCardServiceQuizFlashCardControllerGetQuizFlashCardQueryResult<TData = QuizFlashCardServiceQuizFlashCardControllerGetQuizFlashCardDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useQuizFlashCardServiceQuizFlashCardControllerGetQuizFlashCardKey = "QuizFlashCardServiceQuizFlashCardControllerGetQuizFlashCard";
/**
 * get quiz by lesson id
 */
export const useQuizFlashCardServiceQuizFlashCardControllerGetQuizFlashCard = <TData = QuizFlashCardServiceQuizFlashCardControllerGetQuizFlashCardDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useQuizFlashCardServiceQuizFlashCardControllerGetQuizFlashCardKey, ...(queryKey ?? [{ id }])], queryFn: () => QuizFlashCardService.quizFlashCardControllerGetQuizFlashCard(id) as TData, ...options });
export type QuizFlashCardServiceQuizFlashCardControllerUpdateQuizFlashCardMutationResult = Awaited<ReturnType<typeof QuizFlashCardService.quizFlashCardControllerUpdateQuizFlashCard>>;
/**
 * update quiz by id
 */
export const useQuizFlashCardServiceQuizFlashCardControllerUpdateQuizFlashCard = <TData = QuizFlashCardServiceQuizFlashCardControllerUpdateQuizFlashCardMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateQuizFlashCardDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateQuizFlashCardDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => QuizFlashCardService.quizFlashCardControllerUpdateQuizFlashCard(id, requestBody) as unknown as Promise<TData>, ...options });
export type QuizFlashCardServiceQuizFlashCardControllerDeleteQuizFlashCardMutationResult = Awaited<ReturnType<typeof QuizFlashCardService.quizFlashCardControllerDeleteQuizFlashCard>>;
/**
 * delete quiz by id
 */
export const useQuizFlashCardServiceQuizFlashCardControllerDeleteQuizFlashCard = <TData = QuizFlashCardServiceQuizFlashCardControllerDeleteQuizFlashCardMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => QuizFlashCardService.quizFlashCardControllerDeleteQuizFlashCard(id) as unknown as Promise<TData>, ...options });
export type QuizFlashCardServiceQuizFlashCardControllerGetQuizFlashCardUserDefaultResponse = Awaited<ReturnType<typeof QuizFlashCardService.quizFlashCardControllerGetQuizFlashCardUser>>;
export type QuizFlashCardServiceQuizFlashCardControllerGetQuizFlashCardUserQueryResult<TData = QuizFlashCardServiceQuizFlashCardControllerGetQuizFlashCardUserDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useQuizFlashCardServiceQuizFlashCardControllerGetQuizFlashCardUserKey = "QuizFlashCardServiceQuizFlashCardControllerGetQuizFlashCardUser";
/**
 * get quiz for user by lesson id
 */
export const useQuizFlashCardServiceQuizFlashCardControllerGetQuizFlashCardUser = <TData = QuizFlashCardServiceQuizFlashCardControllerGetQuizFlashCardUserDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id, limit, offset, order }: {
    id: string;
    limit?: number;
    offset: number;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useQuizFlashCardServiceQuizFlashCardControllerGetQuizFlashCardUserKey, ...(queryKey ?? [{ id, limit, offset, order }])], queryFn: () => QuizFlashCardService.quizFlashCardControllerGetQuizFlashCardUser(id, limit, offset, order) as TData, ...options });
export type SessonScheduleServiceSessonScheduleControllerFindAllDefaultResponse = Awaited<ReturnType<typeof SessonScheduleService.sessonScheduleControllerFindAll>>;
export type SessonScheduleServiceSessonScheduleControllerFindAllQueryResult<TData = SessonScheduleServiceSessonScheduleControllerFindAllDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useSessonScheduleServiceSessonScheduleControllerFindAllKey = "SessonScheduleServiceSessonScheduleControllerFindAll";
/**
 * Get all sesson schedules
 */
export const useSessonScheduleServiceSessonScheduleControllerFindAll = <TData = SessonScheduleServiceSessonScheduleControllerFindAllDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ classId, courseId }: {
    classId: string;
    courseId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useSessonScheduleServiceSessonScheduleControllerFindAllKey, ...(queryKey ?? [{ classId, courseId }])], queryFn: () => SessonScheduleService.sessonScheduleControllerFindAll(classId, courseId) as TData, ...options });
export type SessonScheduleServiceSessonScheduleControllerCreateMutationResult = Awaited<ReturnType<typeof SessonScheduleService.sessonScheduleControllerCreate>>;
/**
 * Create session schedule
 */
export const useSessonScheduleServiceSessonScheduleControllerCreate = <TData = SessonScheduleServiceSessonScheduleControllerCreateMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateClassSessonScheduleDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateClassSessonScheduleDto;
}, TContext>({ mutationFn: ({ requestBody }) => SessonScheduleService.sessonScheduleControllerCreate(requestBody) as unknown as Promise<TData>, ...options });
export type SessonScheduleServiceSessonScheduleControllerCloneCourseScheduleMutationResult = Awaited<ReturnType<typeof SessonScheduleService.sessonScheduleControllerCloneCourseSchedule>>;
/**
 * Clone course schedule from another class
 */
export const useSessonScheduleServiceSessonScheduleControllerCloneCourseSchedule = <TData = SessonScheduleServiceSessonScheduleControllerCloneCourseScheduleMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CloneScheduleDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CloneScheduleDto;
}, TContext>({ mutationFn: ({ requestBody }) => SessonScheduleService.sessonScheduleControllerCloneCourseSchedule(requestBody) as unknown as Promise<TData>, ...options });
export type SessonScheduleServiceSessonScheduleControllerAddLessonIntoSessonScheduleMutationResult = Awaited<ReturnType<typeof SessonScheduleService.sessonScheduleControllerAddLessonIntoSessonSchedule>>;
/**
 * Add lesson into sesson schedule
 */
export const useSessonScheduleServiceSessonScheduleControllerAddLessonIntoSessonSchedule = <TData = SessonScheduleServiceSessonScheduleControllerAddLessonIntoSessonScheduleMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    lessonId: string;
    requestBody: UpdateLessonsSessonSchedulesDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    lessonId: string;
    requestBody: UpdateLessonsSessonSchedulesDto;
}, TContext>({ mutationFn: ({ lessonId, requestBody }) => SessonScheduleService.sessonScheduleControllerAddLessonIntoSessonSchedule(lessonId, requestBody) as unknown as Promise<TData>, ...options });
export type SessonScheduleServiceSessonScheduleControllerRemoveLessonFromSessonScheduleMutationResult = Awaited<ReturnType<typeof SessonScheduleService.sessonScheduleControllerRemoveLessonFromSessonSchedule>>;
/**
 * Remove lesson from sesson schedule
 */
export const useSessonScheduleServiceSessonScheduleControllerRemoveLessonFromSessonSchedule = <TData = SessonScheduleServiceSessonScheduleControllerRemoveLessonFromSessonScheduleMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    lessonId: string;
    requestBody: UpdateLessonsSessonSchedulesDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    lessonId: string;
    requestBody: UpdateLessonsSessonSchedulesDto;
}, TContext>({ mutationFn: ({ lessonId, requestBody }) => SessonScheduleService.sessonScheduleControllerRemoveLessonFromSessonSchedule(lessonId, requestBody) as unknown as Promise<TData>, ...options });
export type SessonScheduleServiceSessonScheduleControllerDeleteMutationResult = Awaited<ReturnType<typeof SessonScheduleService.sessonScheduleControllerDelete>>;
/**
 * Delete session schedule by id
 */
export const useSessonScheduleServiceSessonScheduleControllerDelete = <TData = SessonScheduleServiceSessonScheduleControllerDeleteMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    ids: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    ids: string;
}, TContext>({ mutationFn: ({ ids }) => SessonScheduleService.sessonScheduleControllerDelete(ids) as unknown as Promise<TData>, ...options });
export type SessonScheduleServiceStudentSessonScheduleControllerGetAllScheduleWithCourseDefaultResponse = Awaited<ReturnType<typeof SessonScheduleService.studentSessonScheduleControllerGetAllScheduleWithCourse>>;
export type SessonScheduleServiceStudentSessonScheduleControllerGetAllScheduleWithCourseQueryResult<TData = SessonScheduleServiceStudentSessonScheduleControllerGetAllScheduleWithCourseDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useSessonScheduleServiceStudentSessonScheduleControllerGetAllScheduleWithCourseKey = "SessonScheduleServiceStudentSessonScheduleControllerGetAllScheduleWithCourse";
/**
 * Get all sesson schedule with course and class
 */
export const useSessonScheduleServiceStudentSessonScheduleControllerGetAllScheduleWithCourse = <TData = SessonScheduleServiceStudentSessonScheduleControllerGetAllScheduleWithCourseDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ classId, courseId, limit, offset }: {
    classId: string;
    courseId: string;
    limit?: number;
    offset: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useSessonScheduleServiceStudentSessonScheduleControllerGetAllScheduleWithCourseKey, ...(queryKey ?? [{ classId, courseId, limit, offset }])], queryFn: () => SessonScheduleService.studentSessonScheduleControllerGetAllScheduleWithCourse(classId, courseId, limit, offset) as TData, ...options });
export type SessonServiceSessonControllerGetAllSessonDefaultResponse = Awaited<ReturnType<typeof SessonService.sessonControllerGetAllSesson>>;
export type SessonServiceSessonControllerGetAllSessonQueryResult<TData = SessonServiceSessonControllerGetAllSessonDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useSessonServiceSessonControllerGetAllSessonKey = "SessonServiceSessonControllerGetAllSesson";
/**
 * Get all sessons
 */
export const useSessonServiceSessonControllerGetAllSesson = <TData = SessonServiceSessonControllerGetAllSessonDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ courseId }: {
    courseId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useSessonServiceSessonControllerGetAllSessonKey, ...(queryKey ?? [{ courseId }])], queryFn: () => SessonService.sessonControllerGetAllSesson(courseId) as TData, ...options });
export type SessonServiceSessonControllerCreateSessonMutationResult = Awaited<ReturnType<typeof SessonService.sessonControllerCreateSesson>>;
/**
 * Create sesson
 */
export const useSessonServiceSessonControllerCreateSesson = <TData = SessonServiceSessonControllerCreateSessonMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateSessonDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateSessonDto;
}, TContext>({ mutationFn: ({ requestBody }) => SessonService.sessonControllerCreateSesson(requestBody) as unknown as Promise<TData>, ...options });
export type SessonServiceSessonControllerGetSessonByIdDefaultResponse = Awaited<ReturnType<typeof SessonService.sessonControllerGetSessonById>>;
export type SessonServiceSessonControllerGetSessonByIdQueryResult<TData = SessonServiceSessonControllerGetSessonByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useSessonServiceSessonControllerGetSessonByIdKey = "SessonServiceSessonControllerGetSessonById";
/**
 * Get sesson by id
 */
export const useSessonServiceSessonControllerGetSessonById = <TData = SessonServiceSessonControllerGetSessonByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useSessonServiceSessonControllerGetSessonByIdKey, ...(queryKey ?? [{ id }])], queryFn: () => SessonService.sessonControllerGetSessonById(id) as TData, ...options });
export type SessonServiceSessonControllerUpdateSessonMutationResult = Awaited<ReturnType<typeof SessonService.sessonControllerUpdateSesson>>;
/**
 * Update sesson by id
 */
export const useSessonServiceSessonControllerUpdateSesson = <TData = SessonServiceSessonControllerUpdateSessonMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateSessonDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateSessonDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => SessonService.sessonControllerUpdateSesson(id, requestBody) as unknown as Promise<TData>, ...options });
export type SessonServiceSessonControllerDeleteSessonMutationResult = Awaited<ReturnType<typeof SessonService.sessonControllerDeleteSesson>>;
/**
 * Delete sesson by id
 */
export const useSessonServiceSessonControllerDeleteSesson = <TData = SessonServiceSessonControllerDeleteSessonMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => SessonService.sessonControllerDeleteSesson(id) as unknown as Promise<TData>, ...options });
export type SessonServiceSessonUserControllerGetAllSessonDefaultResponse = Awaited<ReturnType<typeof SessonService.sessonUserControllerGetAllSesson>>;
export type SessonServiceSessonUserControllerGetAllSessonQueryResult<TData = SessonServiceSessonUserControllerGetAllSessonDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useSessonServiceSessonUserControllerGetAllSessonKey = "SessonServiceSessonUserControllerGetAllSesson";
/**
 * Get all sessons by course
 */
export const useSessonServiceSessonUserControllerGetAllSesson = <TData = SessonServiceSessonUserControllerGetAllSessonDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ courseId, limit, offset, type, order }: {
    courseId: string;
    limit?: number;
    offset: number;
    type?: "LISTENING" | "READING" | "PRACTICE_THROUGH" | "VOCAB" | "GRAMMAR" | "KANJI" | "VIDEO" | "AUDIO" | "FLASH_CARD" | "QUIZ" | "SLIDE" | "TEXT" | "FILE" | "HINAGAN" | "KATAKANA" | "COUNTVOCAB" | "TESTVOCAB" | "HIRAGANA" | null;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useSessonServiceSessonUserControllerGetAllSessonKey, ...(queryKey ?? [{ courseId, limit, offset, type, order }])], queryFn: () => SessonService.sessonUserControllerGetAllSesson(courseId, limit, offset, type, order) as TData, ...options });
export type SessonServiceSessonUserControllerGetSessonByIdDefaultResponse = Awaited<ReturnType<typeof SessonService.sessonUserControllerGetSessonById>>;
export type SessonServiceSessonUserControllerGetSessonByIdQueryResult<TData = SessonServiceSessonUserControllerGetSessonByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useSessonServiceSessonUserControllerGetSessonByIdKey = "SessonServiceSessonUserControllerGetSessonById";
/**
 * Get sesson by id
 */
export const useSessonServiceSessonUserControllerGetSessonById = <TData = SessonServiceSessonUserControllerGetSessonByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useSessonServiceSessonUserControllerGetSessonByIdKey, ...(queryKey ?? [{ id }])], queryFn: () => SessonService.sessonUserControllerGetSessonById(id) as TData, ...options });
export type SlideServiceSlideControllerAddSlideMutationResult = Awaited<ReturnType<typeof SlideService.slideControllerAddSlide>>;
/**
 * add slide
 */
export const useSlideServiceSlideControllerAddSlide = <TData = SlideServiceSlideControllerAddSlideMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateSlideDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateSlideDto;
}, TContext>({ mutationFn: ({ requestBody }) => SlideService.slideControllerAddSlide(requestBody) as unknown as Promise<TData>, ...options });
export type SlideServiceSlideControllerGetSlideDefaultResponse = Awaited<ReturnType<typeof SlideService.slideControllerGetSlide>>;
export type SlideServiceSlideControllerGetSlideQueryResult<TData = SlideServiceSlideControllerGetSlideDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useSlideServiceSlideControllerGetSlideKey = "SlideServiceSlideControllerGetSlide";
/**
 * get slide by lesson id
 */
export const useSlideServiceSlideControllerGetSlide = <TData = SlideServiceSlideControllerGetSlideDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useSlideServiceSlideControllerGetSlideKey, ...(queryKey ?? [{ id }])], queryFn: () => SlideService.slideControllerGetSlide(id) as TData, ...options });
export type SlideServiceSlideControllerUpdateSlideMutationResult = Awaited<ReturnType<typeof SlideService.slideControllerUpdateSlide>>;
/**
 * update slide by id
 */
export const useSlideServiceSlideControllerUpdateSlide = <TData = SlideServiceSlideControllerUpdateSlideMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateSlideDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateSlideDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => SlideService.slideControllerUpdateSlide(id, requestBody) as unknown as Promise<TData>, ...options });
export type SlideServiceSlideControllerDeleteSlideMutationResult = Awaited<ReturnType<typeof SlideService.slideControllerDeleteSlide>>;
/**
 * delete slide by id
 */
export const useSlideServiceSlideControllerDeleteSlide = <TData = SlideServiceSlideControllerDeleteSlideMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => SlideService.slideControllerDeleteSlide(id) as unknown as Promise<TData>, ...options });
export type SlideServiceSlideControllerAddDocumentMutationResult = Awaited<ReturnType<typeof SlideService.slideControllerAddDocument>>;
/**
 * add document by slide id
 */
export const useSlideServiceSlideControllerAddDocument = <TData = SlideServiceSlideControllerAddDocumentMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: CreateDocumentType;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: CreateDocumentType;
}, TContext>({ mutationFn: ({ id, requestBody }) => SlideService.slideControllerAddDocument(id, requestBody) as unknown as Promise<TData>, ...options });
export type SlideServiceSlideControllerUpdateDocumentMutationResult = Awaited<ReturnType<typeof SlideService.slideControllerUpdateDocument>>;
/**
 * update document by slide id
 */
export const useSlideServiceSlideControllerUpdateDocument = <TData = SlideServiceSlideControllerUpdateDocumentMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateDocumentType;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateDocumentType;
}, TContext>({ mutationFn: ({ id, requestBody }) => SlideService.slideControllerUpdateDocument(id, requestBody) as unknown as Promise<TData>, ...options });
export type SlideServiceSlideControllerDeleteDocumentMutationResult = Awaited<ReturnType<typeof SlideService.slideControllerDeleteDocument>>;
/**
 * delete document by slide id
 */
export const useSlideServiceSlideControllerDeleteDocument = <TData = SlideServiceSlideControllerDeleteDocumentMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: DeleteDocumentType;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: DeleteDocumentType;
}, TContext>({ mutationFn: ({ id, requestBody }) => SlideService.slideControllerDeleteDocument(id, requestBody) as unknown as Promise<TData>, ...options });
export type SlideServiceSlideControllerGetSlideUserDefaultResponse = Awaited<ReturnType<typeof SlideService.slideControllerGetSlideUser>>;
export type SlideServiceSlideControllerGetSlideUserQueryResult<TData = SlideServiceSlideControllerGetSlideUserDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useSlideServiceSlideControllerGetSlideUserKey = "SlideServiceSlideControllerGetSlideUser";
/**
 * get slide for user by lesson id
 */
export const useSlideServiceSlideControllerGetSlideUser = <TData = SlideServiceSlideControllerGetSlideUserDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id, limit, offset, order }: {
    id: string;
    limit?: number;
    offset: number;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useSlideServiceSlideControllerGetSlideUserKey, ...(queryKey ?? [{ id, limit, offset, order }])], queryFn: () => SlideService.slideControllerGetSlideUser(id, limit, offset, order) as TData, ...options });
export type TestCategoryServiceTestCategoryControllerCreateTestCategoryMutationResult = Awaited<ReturnType<typeof TestCategoryService.testCategoryControllerCreateTestCategory>>;
/**
 * Create new test category
 */
export const useTestCategoryServiceTestCategoryControllerCreateTestCategory = <TData = TestCategoryServiceTestCategoryControllerCreateTestCategoryMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateTestCategoryDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateTestCategoryDto;
}, TContext>({ mutationFn: ({ requestBody }) => TestCategoryService.testCategoryControllerCreateTestCategory(requestBody) as unknown as Promise<TData>, ...options });
export type TestCategoryServiceTestCategoryControllerGetAllTestCategoriesDefaultResponse = Awaited<ReturnType<typeof TestCategoryService.testCategoryControllerGetAllTestCategories>>;
export type TestCategoryServiceTestCategoryControllerGetAllTestCategoriesQueryResult<TData = TestCategoryServiceTestCategoryControllerGetAllTestCategoriesDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTestCategoryServiceTestCategoryControllerGetAllTestCategoriesKey = "TestCategoryServiceTestCategoryControllerGetAllTestCategories";
/**
 * Get all test categories
 */
export const useTestCategoryServiceTestCategoryControllerGetAllTestCategories = <TData = TestCategoryServiceTestCategoryControllerGetAllTestCategoriesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ limit, offset, testType, order }: {
    limit?: number;
    offset: number;
    testType?: string | null;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTestCategoryServiceTestCategoryControllerGetAllTestCategoriesKey, ...(queryKey ?? [{ limit, offset, testType, order }])], queryFn: () => TestCategoryService.testCategoryControllerGetAllTestCategories(limit, offset, testType, order) as TData, ...options });
export type TestCategoryServiceTestCategoryControllerGetAllTestCategoriesByUserIdDefaultResponse = Awaited<ReturnType<typeof TestCategoryService.testCategoryControllerGetAllTestCategoriesByUserId>>;
export type TestCategoryServiceTestCategoryControllerGetAllTestCategoriesByUserIdQueryResult<TData = TestCategoryServiceTestCategoryControllerGetAllTestCategoriesByUserIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTestCategoryServiceTestCategoryControllerGetAllTestCategoriesByUserIdKey = "TestCategoryServiceTestCategoryControllerGetAllTestCategoriesByUserId";
/**
 * Get all test categories by user id of user
 */
export const useTestCategoryServiceTestCategoryControllerGetAllTestCategoriesByUserId = <TData = TestCategoryServiceTestCategoryControllerGetAllTestCategoriesByUserIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ userId, limit, offset, testType, order }: {
    userId: string;
    limit?: number;
    offset: number;
    testType?: string | null;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTestCategoryServiceTestCategoryControllerGetAllTestCategoriesByUserIdKey, ...(queryKey ?? [{ userId, limit, offset, testType, order }])], queryFn: () => TestCategoryService.testCategoryControllerGetAllTestCategoriesByUserId(userId, limit, offset, testType, order) as TData, ...options });
export type TestCategoryServiceTestCategoryControllerGetTestCategoryByIdDefaultResponse = Awaited<ReturnType<typeof TestCategoryService.testCategoryControllerGetTestCategoryById>>;
export type TestCategoryServiceTestCategoryControllerGetTestCategoryByIdQueryResult<TData = TestCategoryServiceTestCategoryControllerGetTestCategoryByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTestCategoryServiceTestCategoryControllerGetTestCategoryByIdKey = "TestCategoryServiceTestCategoryControllerGetTestCategoryById";
/**
 * Get test category by id
 */
export const useTestCategoryServiceTestCategoryControllerGetTestCategoryById = <TData = TestCategoryServiceTestCategoryControllerGetTestCategoryByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTestCategoryServiceTestCategoryControllerGetTestCategoryByIdKey, ...(queryKey ?? [{ id }])], queryFn: () => TestCategoryService.testCategoryControllerGetTestCategoryById(id) as TData, ...options });
export type TestCategoryServiceTestCategoryControllerUpdateTestCategoryMutationResult = Awaited<ReturnType<typeof TestCategoryService.testCategoryControllerUpdateTestCategory>>;
/**
 * Update test category by id
 */
export const useTestCategoryServiceTestCategoryControllerUpdateTestCategory = <TData = TestCategoryServiceTestCategoryControllerUpdateTestCategoryMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateTestCategoryDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateTestCategoryDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => TestCategoryService.testCategoryControllerUpdateTestCategory(id, requestBody) as unknown as Promise<TData>, ...options });
export type TestCategoryServiceTestCategoryControllerDeleteTestCategoryMutationResult = Awaited<ReturnType<typeof TestCategoryService.testCategoryControllerDeleteTestCategory>>;
/**
 * Delete test category by id
 */
export const useTestCategoryServiceTestCategoryControllerDeleteTestCategory = <TData = TestCategoryServiceTestCategoryControllerDeleteTestCategoryMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => TestCategoryService.testCategoryControllerDeleteTestCategory(id) as unknown as Promise<TData>, ...options });
export type TestDetailServiceTestDetailControllerCreateTestDetailMutationResult = Awaited<ReturnType<typeof TestDetailService.testDetailControllerCreateTestDetail>>;
/**
 * Create new test detail
 */
export const useTestDetailServiceTestDetailControllerCreateTestDetail = <TData = TestDetailServiceTestDetailControllerCreateTestDetailMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateTestDetailDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateTestDetailDto;
}, TContext>({ mutationFn: ({ requestBody }) => TestDetailService.testDetailControllerCreateTestDetail(requestBody) as unknown as Promise<TData>, ...options });
export type TestDetailServiceTestDetailControllerGetAllTestDetailsDefaultResponse = Awaited<ReturnType<typeof TestDetailService.testDetailControllerGetAllTestDetails>>;
export type TestDetailServiceTestDetailControllerGetAllTestDetailsQueryResult<TData = TestDetailServiceTestDetailControllerGetAllTestDetailsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTestDetailServiceTestDetailControllerGetAllTestDetailsKey = "TestDetailServiceTestDetailControllerGetAllTestDetails";
/**
 * Get all test details
 */
export const useTestDetailServiceTestDetailControllerGetAllTestDetails = <TData = TestDetailServiceTestDetailControllerGetAllTestDetailsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ limit, offset, order }: {
    limit?: number;
    offset: number;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTestDetailServiceTestDetailControllerGetAllTestDetailsKey, ...(queryKey ?? [{ limit, offset, order }])], queryFn: () => TestDetailService.testDetailControllerGetAllTestDetails(limit, offset, order) as TData, ...options });
export type TestDetailServiceTestDetailControllerGetTestDetailsByTestDefaultResponse = Awaited<ReturnType<typeof TestDetailService.testDetailControllerGetTestDetailsByTest>>;
export type TestDetailServiceTestDetailControllerGetTestDetailsByTestQueryResult<TData = TestDetailServiceTestDetailControllerGetTestDetailsByTestDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTestDetailServiceTestDetailControllerGetTestDetailsByTestKey = "TestDetailServiceTestDetailControllerGetTestDetailsByTest";
/**
 * Get test details by test id
 */
export const useTestDetailServiceTestDetailControllerGetTestDetailsByTest = <TData = TestDetailServiceTestDetailControllerGetTestDetailsByTestDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ testId, limit, offset, order }: {
    testId: string;
    limit?: number;
    offset: number;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTestDetailServiceTestDetailControllerGetTestDetailsByTestKey, ...(queryKey ?? [{ testId, limit, offset, order }])], queryFn: () => TestDetailService.testDetailControllerGetTestDetailsByTest(testId, limit, offset, order) as TData, ...options });
export type TestDetailServiceTestDetailControllerGetTestDetailsByTestEncryptionDefaultResponse = Awaited<ReturnType<typeof TestDetailService.testDetailControllerGetTestDetailsByTestEncryption>>;
export type TestDetailServiceTestDetailControllerGetTestDetailsByTestEncryptionQueryResult<TData = TestDetailServiceTestDetailControllerGetTestDetailsByTestEncryptionDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTestDetailServiceTestDetailControllerGetTestDetailsByTestEncryptionKey = "TestDetailServiceTestDetailControllerGetTestDetailsByTestEncryption";
/**
 * Get test details encryption by test id
 */
export const useTestDetailServiceTestDetailControllerGetTestDetailsByTestEncryption = <TData = TestDetailServiceTestDetailControllerGetTestDetailsByTestEncryptionDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ testId, limit, offset, order }: {
    testId: string;
    limit?: number;
    offset: number;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTestDetailServiceTestDetailControllerGetTestDetailsByTestEncryptionKey, ...(queryKey ?? [{ testId, limit, offset, order }])], queryFn: () => TestDetailService.testDetailControllerGetTestDetailsByTestEncryption(testId, limit, offset, order) as TData, ...options });
export type TestDetailServiceTestDetailControllerGetTestDetailByIdDefaultResponse = Awaited<ReturnType<typeof TestDetailService.testDetailControllerGetTestDetailById>>;
export type TestDetailServiceTestDetailControllerGetTestDetailByIdQueryResult<TData = TestDetailServiceTestDetailControllerGetTestDetailByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTestDetailServiceTestDetailControllerGetTestDetailByIdKey = "TestDetailServiceTestDetailControllerGetTestDetailById";
/**
 * Get test detail by id
 */
export const useTestDetailServiceTestDetailControllerGetTestDetailById = <TData = TestDetailServiceTestDetailControllerGetTestDetailByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTestDetailServiceTestDetailControllerGetTestDetailByIdKey, ...(queryKey ?? [{ id }])], queryFn: () => TestDetailService.testDetailControllerGetTestDetailById(id) as TData, ...options });
export type TestDetailServiceTestDetailControllerUpdateTestDetailMutationResult = Awaited<ReturnType<typeof TestDetailService.testDetailControllerUpdateTestDetail>>;
/**
 * Update test detail by id
 */
export const useTestDetailServiceTestDetailControllerUpdateTestDetail = <TData = TestDetailServiceTestDetailControllerUpdateTestDetailMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateTestDetailDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateTestDetailDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => TestDetailService.testDetailControllerUpdateTestDetail(id, requestBody) as unknown as Promise<TData>, ...options });
export type TestDetailServiceTestDetailControllerDeleteTestDetailMutationResult = Awaited<ReturnType<typeof TestDetailService.testDetailControllerDeleteTestDetail>>;
/**
 * Delete test detail by id
 */
export const useTestDetailServiceTestDetailControllerDeleteTestDetail = <TData = TestDetailServiceTestDetailControllerDeleteTestDetailMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => TestDetailService.testDetailControllerDeleteTestDetail(id) as unknown as Promise<TData>, ...options });
export type TestProgressServiceTestProgressControllerAddTestProgressMutationResult = Awaited<ReturnType<typeof TestProgressService.testProgressControllerAddTestProgress>>;
/**
 * add test progress
 */
export const useTestProgressServiceTestProgressControllerAddTestProgress = <TData = TestProgressServiceTestProgressControllerAddTestProgressMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateTestProgressDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateTestProgressDto;
}, TContext>({ mutationFn: ({ requestBody }) => TestProgressService.testProgressControllerAddTestProgress(requestBody) as unknown as Promise<TData>, ...options });
export type TestProgressServiceTestProgressControllerGetTestProgressDefaultResponse = Awaited<ReturnType<typeof TestProgressService.testProgressControllerGetTestProgress>>;
export type TestProgressServiceTestProgressControllerGetTestProgressQueryResult<TData = TestProgressServiceTestProgressControllerGetTestProgressDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTestProgressServiceTestProgressControllerGetTestProgressKey = "TestProgressServiceTestProgressControllerGetTestProgress";
/**
 * get test Progress by lesson id
 */
export const useTestProgressServiceTestProgressControllerGetTestProgress = <TData = TestProgressServiceTestProgressControllerGetTestProgressDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTestProgressServiceTestProgressControllerGetTestProgressKey, ...(queryKey ?? [{ id }])], queryFn: () => TestProgressService.testProgressControllerGetTestProgress(id) as TData, ...options });
export type TestProgressServiceTestProgressControllerUpdateTestProgressMutationResult = Awaited<ReturnType<typeof TestProgressService.testProgressControllerUpdateTestProgress>>;
/**
 * update test progress by id
 */
export const useTestProgressServiceTestProgressControllerUpdateTestProgress = <TData = TestProgressServiceTestProgressControllerUpdateTestProgressMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateTestProgressDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateTestProgressDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => TestProgressService.testProgressControllerUpdateTestProgress(id, requestBody) as unknown as Promise<TData>, ...options });
export type TestProgressServiceTestProgressControllerDeleteTestProgressMutationResult = Awaited<ReturnType<typeof TestProgressService.testProgressControllerDeleteTestProgress>>;
/**
 * delete test progress by id
 */
export const useTestProgressServiceTestProgressControllerDeleteTestProgress = <TData = TestProgressServiceTestProgressControllerDeleteTestProgressMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => TestProgressService.testProgressControllerDeleteTestProgress(id) as unknown as Promise<TData>, ...options });
export type TestResultServiceTestResultControllerCreateTestResultMutationResult = Awaited<ReturnType<typeof TestResultService.testResultControllerCreateTestResult>>;
/**
 * Create new test result
 */
export const useTestResultServiceTestResultControllerCreateTestResult = <TData = TestResultServiceTestResultControllerCreateTestResultMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateTestResultDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateTestResultDto;
}, TContext>({ mutationFn: ({ requestBody }) => TestResultService.testResultControllerCreateTestResult(requestBody) as unknown as Promise<TData>, ...options });
export type TestResultServiceTestResultControllerGetAllTestResultsDefaultResponse = Awaited<ReturnType<typeof TestResultService.testResultControllerGetAllTestResults>>;
export type TestResultServiceTestResultControllerGetAllTestResultsQueryResult<TData = TestResultServiceTestResultControllerGetAllTestResultsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTestResultServiceTestResultControllerGetAllTestResultsKey = "TestResultServiceTestResultControllerGetAllTestResults";
/**
 * Get all test results
 */
export const useTestResultServiceTestResultControllerGetAllTestResults = <TData = TestResultServiceTestResultControllerGetAllTestResultsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ limit, offset, order }: {
    limit?: number;
    offset: number;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTestResultServiceTestResultControllerGetAllTestResultsKey, ...(queryKey ?? [{ limit, offset, order }])], queryFn: () => TestResultService.testResultControllerGetAllTestResults(limit, offset, order) as TData, ...options });
export type TestResultServiceTestResultControllerGetAllTestResultsOfAdminDefaultResponse = Awaited<ReturnType<typeof TestResultService.testResultControllerGetAllTestResultsOfAdmin>>;
export type TestResultServiceTestResultControllerGetAllTestResultsOfAdminQueryResult<TData = TestResultServiceTestResultControllerGetAllTestResultsOfAdminDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTestResultServiceTestResultControllerGetAllTestResultsOfAdminKey = "TestResultServiceTestResultControllerGetAllTestResultsOfAdmin";
/**
 * Get all test results by test id of admin
 */
export const useTestResultServiceTestResultControllerGetAllTestResultsOfAdmin = <TData = TestResultServiceTestResultControllerGetAllTestResultsOfAdminDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ testId }: {
    testId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTestResultServiceTestResultControllerGetAllTestResultsOfAdminKey, ...(queryKey ?? [{ testId }])], queryFn: () => TestResultService.testResultControllerGetAllTestResultsOfAdmin(testId) as TData, ...options });
export type TestResultServiceTestResultControllerGetAllTestResultsOfAdminAttemptCountDefaultResponse = Awaited<ReturnType<typeof TestResultService.testResultControllerGetAllTestResultsOfAdminAttemptCount>>;
export type TestResultServiceTestResultControllerGetAllTestResultsOfAdminAttemptCountQueryResult<TData = TestResultServiceTestResultControllerGetAllTestResultsOfAdminAttemptCountDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTestResultServiceTestResultControllerGetAllTestResultsOfAdminAttemptCountKey = "TestResultServiceTestResultControllerGetAllTestResultsOfAdminAttemptCount";
/**
 * Get all test results by test id and user id of admin
 */
export const useTestResultServiceTestResultControllerGetAllTestResultsOfAdminAttemptCount = <TData = TestResultServiceTestResultControllerGetAllTestResultsOfAdminAttemptCountDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ testId, userId }: {
    testId: string;
    userId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTestResultServiceTestResultControllerGetAllTestResultsOfAdminAttemptCountKey, ...(queryKey ?? [{ testId, userId }])], queryFn: () => TestResultService.testResultControllerGetAllTestResultsOfAdminAttemptCount(testId, userId) as TData, ...options });
export type TestResultServiceTestResultControllerGetTestResultsOfAdminDefaultResponse = Awaited<ReturnType<typeof TestResultService.testResultControllerGetTestResultsOfAdmin>>;
export type TestResultServiceTestResultControllerGetTestResultsOfAdminQueryResult<TData = TestResultServiceTestResultControllerGetTestResultsOfAdminDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTestResultServiceTestResultControllerGetTestResultsOfAdminKey = "TestResultServiceTestResultControllerGetTestResultsOfAdmin";
/**
 * Get all test results by test result id of admin
 */
export const useTestResultServiceTestResultControllerGetTestResultsOfAdmin = <TData = TestResultServiceTestResultControllerGetTestResultsOfAdminDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ testResultId }: {
    testResultId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTestResultServiceTestResultControllerGetTestResultsOfAdminKey, ...(queryKey ?? [{ testResultId }])], queryFn: () => TestResultService.testResultControllerGetTestResultsOfAdmin(testResultId) as TData, ...options });
export type TestResultServiceTestResultControllerGetAllTestResultsOfUserDefaultResponse = Awaited<ReturnType<typeof TestResultService.testResultControllerGetAllTestResultsOfUser>>;
export type TestResultServiceTestResultControllerGetAllTestResultsOfUserQueryResult<TData = TestResultServiceTestResultControllerGetAllTestResultsOfUserDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTestResultServiceTestResultControllerGetAllTestResultsOfUserKey = "TestResultServiceTestResultControllerGetAllTestResultsOfUser";
/**
 * Get all test results by test id And user id of user
 */
export const useTestResultServiceTestResultControllerGetAllTestResultsOfUser = <TData = TestResultServiceTestResultControllerGetAllTestResultsOfUserDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ userId, limit, offset, order }: {
    userId: string;
    limit?: number;
    offset: number;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTestResultServiceTestResultControllerGetAllTestResultsOfUserKey, ...(queryKey ?? [{ userId, limit, offset, order }])], queryFn: () => TestResultService.testResultControllerGetAllTestResultsOfUser(userId, limit, offset, order) as TData, ...options });
export type TestResultServiceTestResultControllerGetTestResultsByUserDefaultResponse = Awaited<ReturnType<typeof TestResultService.testResultControllerGetTestResultsByUser>>;
export type TestResultServiceTestResultControllerGetTestResultsByUserQueryResult<TData = TestResultServiceTestResultControllerGetTestResultsByUserDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTestResultServiceTestResultControllerGetTestResultsByUserKey = "TestResultServiceTestResultControllerGetTestResultsByUser";
/**
 * Get test results by user id
 */
export const useTestResultServiceTestResultControllerGetTestResultsByUser = <TData = TestResultServiceTestResultControllerGetTestResultsByUserDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ userId, limit, offset, order }: {
    userId: string;
    limit?: number;
    offset: number;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTestResultServiceTestResultControllerGetTestResultsByUserKey, ...(queryKey ?? [{ userId, limit, offset, order }])], queryFn: () => TestResultService.testResultControllerGetTestResultsByUser(userId, limit, offset, order) as TData, ...options });
export type TestResultServiceTestResultControllerGetTestResultsByTestDefaultResponse = Awaited<ReturnType<typeof TestResultService.testResultControllerGetTestResultsByTest>>;
export type TestResultServiceTestResultControllerGetTestResultsByTestQueryResult<TData = TestResultServiceTestResultControllerGetTestResultsByTestDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTestResultServiceTestResultControllerGetTestResultsByTestKey = "TestResultServiceTestResultControllerGetTestResultsByTest";
/**
 * Get test results by test id
 */
export const useTestResultServiceTestResultControllerGetTestResultsByTest = <TData = TestResultServiceTestResultControllerGetTestResultsByTestDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ testId, limit, offset, order }: {
    testId: string;
    limit?: number;
    offset: number;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTestResultServiceTestResultControllerGetTestResultsByTestKey, ...(queryKey ?? [{ testId, limit, offset, order }])], queryFn: () => TestResultService.testResultControllerGetTestResultsByTest(testId, limit, offset, order) as TData, ...options });
export type TestResultServiceTestResultControllerGetTestResultByIdDefaultResponse = Awaited<ReturnType<typeof TestResultService.testResultControllerGetTestResultById>>;
export type TestResultServiceTestResultControllerGetTestResultByIdQueryResult<TData = TestResultServiceTestResultControllerGetTestResultByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTestResultServiceTestResultControllerGetTestResultByIdKey = "TestResultServiceTestResultControllerGetTestResultById";
/**
 * Get test result by id
 */
export const useTestResultServiceTestResultControllerGetTestResultById = <TData = TestResultServiceTestResultControllerGetTestResultByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTestResultServiceTestResultControllerGetTestResultByIdKey, ...(queryKey ?? [{ id }])], queryFn: () => TestResultService.testResultControllerGetTestResultById(id) as TData, ...options });
export type TestResultServiceTestResultControllerUpdateTestResultMutationResult = Awaited<ReturnType<typeof TestResultService.testResultControllerUpdateTestResult>>;
/**
 * Update test result by id
 */
export const useTestResultServiceTestResultControllerUpdateTestResult = <TData = TestResultServiceTestResultControllerUpdateTestResultMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateTestResultDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateTestResultDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => TestResultService.testResultControllerUpdateTestResult(id, requestBody) as unknown as Promise<TData>, ...options });
export type TestResultServiceTestResultControllerDeleteTestResultMutationResult = Awaited<ReturnType<typeof TestResultService.testResultControllerDeleteTestResult>>;
/**
 * Delete test result by id
 */
export const useTestResultServiceTestResultControllerDeleteTestResult = <TData = TestResultServiceTestResultControllerDeleteTestResultMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => TestResultService.testResultControllerDeleteTestResult(id) as unknown as Promise<TData>, ...options });
export type TestResultServiceTestResultControllerExportByTestDefaultResponse = Awaited<ReturnType<typeof TestResultService.testResultControllerExportByTest>>;
export type TestResultServiceTestResultControllerExportByTestQueryResult<TData = TestResultServiceTestResultControllerExportByTestDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTestResultServiceTestResultControllerExportByTestKey = "TestResultServiceTestResultControllerExportByTest";
/**
 * Export excel test result by test with time range
 */
export const useTestResultServiceTestResultControllerExportByTest = <TData = TestResultServiceTestResultControllerExportByTestDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ testId, rangeType, date, startDate, endDate }: {
    testId: string;
    rangeType: string;
    date: string;
    startDate: string;
    endDate: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTestResultServiceTestResultControllerExportByTestKey, ...(queryKey ?? [{ testId, rangeType, date, startDate, endDate }])], queryFn: () => TestResultService.testResultControllerExportByTest(testId, rangeType, date, startDate, endDate) as TData, ...options });
export type TestServiceTestControllerCreateTestMutationResult = Awaited<ReturnType<typeof TestService.testControllerCreateTest>>;
/**
 * Create new test
 */
export const useTestServiceTestControllerCreateTest = <TData = TestServiceTestControllerCreateTestMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateTestDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateTestDto;
}, TContext>({ mutationFn: ({ requestBody }) => TestService.testControllerCreateTest(requestBody) as unknown as Promise<TData>, ...options });
export type TestServiceTestControllerGetAllTestsDefaultResponse = Awaited<ReturnType<typeof TestService.testControllerGetAllTests>>;
export type TestServiceTestControllerGetAllTestsQueryResult<TData = TestServiceTestControllerGetAllTestsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTestServiceTestControllerGetAllTestsKey = "TestServiceTestControllerGetAllTests";
/**
 * Get all tests
 */
export const useTestServiceTestControllerGetAllTests = <TData = TestServiceTestControllerGetAllTestsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ limit, offset, order }: {
    limit?: number;
    offset: number;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTestServiceTestControllerGetAllTestsKey, ...(queryKey ?? [{ limit, offset, order }])], queryFn: () => TestService.testControllerGetAllTests(limit, offset, order) as TData, ...options });
export type TestServiceTestControllerGetTestsByCategoryDefaultResponse = Awaited<ReturnType<typeof TestService.testControllerGetTestsByCategory>>;
export type TestServiceTestControllerGetTestsByCategoryQueryResult<TData = TestServiceTestControllerGetTestsByCategoryDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTestServiceTestControllerGetTestsByCategoryKey = "TestServiceTestControllerGetTestsByCategory";
/**
 * Get tests by category id
 */
export const useTestServiceTestControllerGetTestsByCategory = <TData = TestServiceTestControllerGetTestsByCategoryDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ categoryId, limit, offset, order }: {
    categoryId: string;
    limit?: number;
    offset: number;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTestServiceTestControllerGetTestsByCategoryKey, ...(queryKey ?? [{ categoryId, limit, offset, order }])], queryFn: () => TestService.testControllerGetTestsByCategory(categoryId, limit, offset, order) as TData, ...options });
export type TestServiceTestControllerGetTestsByCategoryAndUserDefaultResponse = Awaited<ReturnType<typeof TestService.testControllerGetTestsByCategoryAndUser>>;
export type TestServiceTestControllerGetTestsByCategoryAndUserQueryResult<TData = TestServiceTestControllerGetTestsByCategoryAndUserDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTestServiceTestControllerGetTestsByCategoryAndUserKey = "TestServiceTestControllerGetTestsByCategoryAndUser";
/**
 * Get tests by category id and user id of user
 */
export const useTestServiceTestControllerGetTestsByCategoryAndUser = <TData = TestServiceTestControllerGetTestsByCategoryAndUserDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ categoryId, userId, limit, offset, order }: {
    categoryId: string;
    userId: string;
    limit?: number;
    offset: number;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTestServiceTestControllerGetTestsByCategoryAndUserKey, ...(queryKey ?? [{ categoryId, userId, limit, offset, order }])], queryFn: () => TestService.testControllerGetTestsByCategoryAndUser(categoryId, userId, limit, offset, order) as TData, ...options });
export type TestServiceTestControllerGetTestByIdDefaultResponse = Awaited<ReturnType<typeof TestService.testControllerGetTestById>>;
export type TestServiceTestControllerGetTestByIdQueryResult<TData = TestServiceTestControllerGetTestByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTestServiceTestControllerGetTestByIdKey = "TestServiceTestControllerGetTestById";
/**
 * Get test by id
 */
export const useTestServiceTestControllerGetTestById = <TData = TestServiceTestControllerGetTestByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTestServiceTestControllerGetTestByIdKey, ...(queryKey ?? [{ id }])], queryFn: () => TestService.testControllerGetTestById(id) as TData, ...options });
export type TestServiceTestControllerUpdateTestMutationResult = Awaited<ReturnType<typeof TestService.testControllerUpdateTest>>;
/**
 * Update test by id
 */
export const useTestServiceTestControllerUpdateTest = <TData = TestServiceTestControllerUpdateTestMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateTestDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateTestDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => TestService.testControllerUpdateTest(id, requestBody) as unknown as Promise<TData>, ...options });
export type TestServiceTestControllerDeleteTestMutationResult = Awaited<ReturnType<typeof TestService.testControllerDeleteTest>>;
/**
 * Delete test by id
 */
export const useTestServiceTestControllerDeleteTest = <TData = TestServiceTestControllerDeleteTestMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => TestService.testControllerDeleteTest(id) as unknown as Promise<TData>, ...options });
export type TextServiceTextControllerAddTextMutationResult = Awaited<ReturnType<typeof TextService.textControllerAddText>>;
/**
 * add video
 */
export const useTextServiceTextControllerAddText = <TData = TextServiceTextControllerAddTextMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateTextDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateTextDto;
}, TContext>({ mutationFn: ({ requestBody }) => TextService.textControllerAddText(requestBody) as unknown as Promise<TData>, ...options });
export type TextServiceTextControllerGetTextDefaultResponse = Awaited<ReturnType<typeof TextService.textControllerGetText>>;
export type TextServiceTextControllerGetTextQueryResult<TData = TextServiceTextControllerGetTextDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTextServiceTextControllerGetTextKey = "TextServiceTextControllerGetText";
/**
 * get text by lesson id
 */
export const useTextServiceTextControllerGetText = <TData = TextServiceTextControllerGetTextDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTextServiceTextControllerGetTextKey, ...(queryKey ?? [{ id }])], queryFn: () => TextService.textControllerGetText(id) as TData, ...options });
export type TextServiceTextControllerUpdateTextMutationResult = Awaited<ReturnType<typeof TextService.textControllerUpdateText>>;
/**
 * update text by id
 */
export const useTextServiceTextControllerUpdateText = <TData = TextServiceTextControllerUpdateTextMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateTextDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateTextDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => TextService.textControllerUpdateText(id, requestBody) as unknown as Promise<TData>, ...options });
export type TextServiceTextControllerDeleteTextMutationResult = Awaited<ReturnType<typeof TextService.textControllerDeleteText>>;
/**
 * delete text by id
 */
export const useTextServiceTextControllerDeleteText = <TData = TextServiceTextControllerDeleteTextMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => TextService.textControllerDeleteText(id) as unknown as Promise<TData>, ...options });
export type TextServiceTextControllerAddDocumentMutationResult = Awaited<ReturnType<typeof TextService.textControllerAddDocument>>;
/**
 * add document by text id
 */
export const useTextServiceTextControllerAddDocument = <TData = TextServiceTextControllerAddDocumentMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: CreateDocumentType;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: CreateDocumentType;
}, TContext>({ mutationFn: ({ id, requestBody }) => TextService.textControllerAddDocument(id, requestBody) as unknown as Promise<TData>, ...options });
export type TextServiceTextControllerUpdateDocumentMutationResult = Awaited<ReturnType<typeof TextService.textControllerUpdateDocument>>;
/**
 * update document by text id
 */
export const useTextServiceTextControllerUpdateDocument = <TData = TextServiceTextControllerUpdateDocumentMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateDocumentType;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateDocumentType;
}, TContext>({ mutationFn: ({ id, requestBody }) => TextService.textControllerUpdateDocument(id, requestBody) as unknown as Promise<TData>, ...options });
export type TextServiceTextControllerDeleteDocumentMutationResult = Awaited<ReturnType<typeof TextService.textControllerDeleteDocument>>;
/**
 * delete document by text id
 */
export const useTextServiceTextControllerDeleteDocument = <TData = TextServiceTextControllerDeleteDocumentMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: DeleteDocumentType;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: DeleteDocumentType;
}, TContext>({ mutationFn: ({ id, requestBody }) => TextService.textControllerDeleteDocument(id, requestBody) as unknown as Promise<TData>, ...options });
export type TextServiceTextControllerGetTextUserDefaultResponse = Awaited<ReturnType<typeof TextService.textControllerGetTextUser>>;
export type TextServiceTextControllerGetTextUserQueryResult<TData = TextServiceTextControllerGetTextUserDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTextServiceTextControllerGetTextUserKey = "TextServiceTextControllerGetTextUser";
/**
 * get text for user by lesson id
 */
export const useTextServiceTextControllerGetTextUser = <TData = TextServiceTextControllerGetTextUserDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id, limit, offset, order }: {
    id: string;
    limit?: number;
    offset: number;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTextServiceTextControllerGetTextUserKey, ...(queryKey ?? [{ id, limit, offset, order }])], queryFn: () => TextService.textControllerGetTextUser(id, limit, offset, order) as TData, ...options });
export type TopicServiceTopicControllerGetAllTopicsDefaultResponse = Awaited<ReturnType<typeof TopicService.topicControllerGetAllTopics>>;
export type TopicServiceTopicControllerGetAllTopicsQueryResult<TData = TopicServiceTopicControllerGetAllTopicsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTopicServiceTopicControllerGetAllTopicsKey = "TopicServiceTopicControllerGetAllTopics";
/**
 * Get all topics
 */
export const useTopicServiceTopicControllerGetAllTopics = <TData = TopicServiceTopicControllerGetAllTopicsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ limit, offset, q, order }: {
    limit?: number;
    offset: number;
    q?: string | null;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTopicServiceTopicControllerGetAllTopicsKey, ...(queryKey ?? [{ limit, offset, q, order }])], queryFn: () => TopicService.topicControllerGetAllTopics(limit, offset, q, order) as TData, ...options });
export type TopicServiceTopicControllerCreateTopicMutationResult = Awaited<ReturnType<typeof TopicService.topicControllerCreateTopic>>;
/**
 * Create topic
 */
export const useTopicServiceTopicControllerCreateTopic = <TData = TopicServiceTopicControllerCreateTopicMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateTopicDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateTopicDto;
}, TContext>({ mutationFn: ({ requestBody }) => TopicService.topicControllerCreateTopic(requestBody) as unknown as Promise<TData>, ...options });
export type TopicServiceTopicControllerGetTopicByIdDefaultResponse = Awaited<ReturnType<typeof TopicService.topicControllerGetTopicById>>;
export type TopicServiceTopicControllerGetTopicByIdQueryResult<TData = TopicServiceTopicControllerGetTopicByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTopicServiceTopicControllerGetTopicByIdKey = "TopicServiceTopicControllerGetTopicById";
/**
 * Get topic by topic id
 */
export const useTopicServiceTopicControllerGetTopicById = <TData = TopicServiceTopicControllerGetTopicByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTopicServiceTopicControllerGetTopicByIdKey, ...(queryKey ?? [{ id }])], queryFn: () => TopicService.topicControllerGetTopicById(id) as TData, ...options });
export type TopicServiceTopicControllerUpdateTopicMutationResult = Awaited<ReturnType<typeof TopicService.topicControllerUpdateTopic>>;
/**
 * Update topic
 */
export const useTopicServiceTopicControllerUpdateTopic = <TData = TopicServiceTopicControllerUpdateTopicMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateTopicDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateTopicDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => TopicService.topicControllerUpdateTopic(id, requestBody) as unknown as Promise<TData>, ...options });
export type TopicServiceTopicControllerDeleteTopicMutationResult = Awaited<ReturnType<typeof TopicService.topicControllerDeleteTopic>>;
/**
 * Delete topic
 */
export const useTopicServiceTopicControllerDeleteTopic = <TData = TopicServiceTopicControllerDeleteTopicMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => TopicService.topicControllerDeleteTopic(id) as unknown as Promise<TData>, ...options });
export type TopicServiceTopicUserControllerGetAllTopicsDefaultResponse = Awaited<ReturnType<typeof TopicService.topicUserControllerGetAllTopics>>;
export type TopicServiceTopicUserControllerGetAllTopicsQueryResult<TData = TopicServiceTopicUserControllerGetAllTopicsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTopicServiceTopicUserControllerGetAllTopicsKey = "TopicServiceTopicUserControllerGetAllTopics";
/**
 * Get all topics
 */
export const useTopicServiceTopicUserControllerGetAllTopics = <TData = TopicServiceTopicUserControllerGetAllTopicsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ limit, offset, q, order }: {
    limit?: number;
    offset: number;
    q?: string | null;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTopicServiceTopicUserControllerGetAllTopicsKey, ...(queryKey ?? [{ limit, offset, q, order }])], queryFn: () => TopicService.topicUserControllerGetAllTopics(limit, offset, q, order) as TData, ...options });
export type TopicServiceTopicUserControllerGetTopicByIdDefaultResponse = Awaited<ReturnType<typeof TopicService.topicUserControllerGetTopicById>>;
export type TopicServiceTopicUserControllerGetTopicByIdQueryResult<TData = TopicServiceTopicUserControllerGetTopicByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTopicServiceTopicUserControllerGetTopicByIdKey = "TopicServiceTopicUserControllerGetTopicById";
/**
 * Get topic by topic id
 */
export const useTopicServiceTopicUserControllerGetTopicById = <TData = TopicServiceTopicUserControllerGetTopicByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTopicServiceTopicUserControllerGetTopicByIdKey, ...(queryKey ?? [{ id }])], queryFn: () => TopicService.topicUserControllerGetTopicById(id) as TData, ...options });
export type TopicVocabServiceTopicVocabControllerGetAllTopicVocabsDefaultResponse = Awaited<ReturnType<typeof TopicVocabService.topicVocabControllerGetAllTopicVocabs>>;
export type TopicVocabServiceTopicVocabControllerGetAllTopicVocabsQueryResult<TData = TopicVocabServiceTopicVocabControllerGetAllTopicVocabsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTopicVocabServiceTopicVocabControllerGetAllTopicVocabsKey = "TopicVocabServiceTopicVocabControllerGetAllTopicVocabs";
/**
 * Get all topic vocabs by topic id
 */
export const useTopicVocabServiceTopicVocabControllerGetAllTopicVocabs = <TData = TopicVocabServiceTopicVocabControllerGetAllTopicVocabsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ topicId, limit, offset, q, order }: {
    topicId: string;
    limit?: number;
    offset: number;
    q?: string | null;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTopicVocabServiceTopicVocabControllerGetAllTopicVocabsKey, ...(queryKey ?? [{ topicId, limit, offset, q, order }])], queryFn: () => TopicVocabService.topicVocabControllerGetAllTopicVocabs(topicId, limit, offset, q, order) as TData, ...options });
export type TopicVocabServiceTopicVocabControllerCreateTopicMutationResult = Awaited<ReturnType<typeof TopicVocabService.topicVocabControllerCreateTopic>>;
/**
 * Create topic vocab
 */
export const useTopicVocabServiceTopicVocabControllerCreateTopic = <TData = TopicVocabServiceTopicVocabControllerCreateTopicMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateTopicVocabDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateTopicVocabDto;
}, TContext>({ mutationFn: ({ requestBody }) => TopicVocabService.topicVocabControllerCreateTopic(requestBody) as unknown as Promise<TData>, ...options });
export type TopicVocabServiceTopicVocabControllerGetTopicVocabByIdDefaultResponse = Awaited<ReturnType<typeof TopicVocabService.topicVocabControllerGetTopicVocabById>>;
export type TopicVocabServiceTopicVocabControllerGetTopicVocabByIdQueryResult<TData = TopicVocabServiceTopicVocabControllerGetTopicVocabByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTopicVocabServiceTopicVocabControllerGetTopicVocabByIdKey = "TopicVocabServiceTopicVocabControllerGetTopicVocabById";
/**
 * Get topic vocab by topic vocab id
 */
export const useTopicVocabServiceTopicVocabControllerGetTopicVocabById = <TData = TopicVocabServiceTopicVocabControllerGetTopicVocabByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTopicVocabServiceTopicVocabControllerGetTopicVocabByIdKey, ...(queryKey ?? [{ id }])], queryFn: () => TopicVocabService.topicVocabControllerGetTopicVocabById(id) as TData, ...options });
export type TopicVocabServiceTopicVocabControllerUpdateTopicVocabMutationResult = Awaited<ReturnType<typeof TopicVocabService.topicVocabControllerUpdateTopicVocab>>;
/**
 * Update topic vocab
 */
export const useTopicVocabServiceTopicVocabControllerUpdateTopicVocab = <TData = TopicVocabServiceTopicVocabControllerUpdateTopicVocabMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateTopicVocabDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateTopicVocabDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => TopicVocabService.topicVocabControllerUpdateTopicVocab(id, requestBody) as unknown as Promise<TData>, ...options });
export type TopicVocabServiceTopicVocabControllerDeleteTopicVocabMutationResult = Awaited<ReturnType<typeof TopicVocabService.topicVocabControllerDeleteTopicVocab>>;
/**
 * Delete topic vocab
 */
export const useTopicVocabServiceTopicVocabControllerDeleteTopicVocab = <TData = TopicVocabServiceTopicVocabControllerDeleteTopicVocabMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => TopicVocabService.topicVocabControllerDeleteTopicVocab(id) as unknown as Promise<TData>, ...options });
export type TopicVocabServiceTopicVocabControllerCreateMultipleTopicVocabMutationResult = Awaited<ReturnType<typeof TopicVocabService.topicVocabControllerCreateMultipleTopicVocab>>;
/**
 * Import topic vocab from file
 */
export const useTopicVocabServiceTopicVocabControllerCreateMultipleTopicVocab = <TData = TopicVocabServiceTopicVocabControllerCreateMultipleTopicVocabMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    topicId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    topicId: string;
}, TContext>({ mutationFn: ({ topicId }) => TopicVocabService.topicVocabControllerCreateMultipleTopicVocab(topicId) as unknown as Promise<TData>, ...options });
export type TopicVocabServiceTopicVocabUserControllerGetAllTopicVocabsDefaultResponse = Awaited<ReturnType<typeof TopicVocabService.topicVocabUserControllerGetAllTopicVocabs>>;
export type TopicVocabServiceTopicVocabUserControllerGetAllTopicVocabsQueryResult<TData = TopicVocabServiceTopicVocabUserControllerGetAllTopicVocabsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTopicVocabServiceTopicVocabUserControllerGetAllTopicVocabsKey = "TopicVocabServiceTopicVocabUserControllerGetAllTopicVocabs";
/**
 * Get all topic vocabs by topic id
 */
export const useTopicVocabServiceTopicVocabUserControllerGetAllTopicVocabs = <TData = TopicVocabServiceTopicVocabUserControllerGetAllTopicVocabsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ topicId, limit, offset, q, order }: {
    topicId: string;
    limit?: number;
    offset: number;
    q?: string | null;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTopicVocabServiceTopicVocabUserControllerGetAllTopicVocabsKey, ...(queryKey ?? [{ topicId, limit, offset, q, order }])], queryFn: () => TopicVocabService.topicVocabUserControllerGetAllTopicVocabs(topicId, limit, offset, q, order) as TData, ...options });
export type TopicVocabServiceTopicVocabUserControllerGetTopicVocabByIdDefaultResponse = Awaited<ReturnType<typeof TopicVocabService.topicVocabUserControllerGetTopicVocabById>>;
export type TopicVocabServiceTopicVocabUserControllerGetTopicVocabByIdQueryResult<TData = TopicVocabServiceTopicVocabUserControllerGetTopicVocabByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTopicVocabServiceTopicVocabUserControllerGetTopicVocabByIdKey = "TopicVocabServiceTopicVocabUserControllerGetTopicVocabById";
/**
 * Get topic vocab by topic vocab id
 */
export const useTopicVocabServiceTopicVocabUserControllerGetTopicVocabById = <TData = TopicVocabServiceTopicVocabUserControllerGetTopicVocabByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useTopicVocabServiceTopicVocabUserControllerGetTopicVocabByIdKey, ...(queryKey ?? [{ id }])], queryFn: () => TopicVocabService.topicVocabUserControllerGetTopicVocabById(id) as TData, ...options });
export type UploadS3ServiceUploadS3ControllerGetUploadUrlDefaultResponse = Awaited<ReturnType<typeof UploadS3Service.uploadS3ControllerGetUploadUrl>>;
export type UploadS3ServiceUploadS3ControllerGetUploadUrlQueryResult<TData = UploadS3ServiceUploadS3ControllerGetUploadUrlDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useUploadS3ServiceUploadS3ControllerGetUploadUrlKey = "UploadS3ServiceUploadS3ControllerGetUploadUrl";
/**
 * Get single file upload URL
 */
export const useUploadS3ServiceUploadS3ControllerGetUploadUrl = <TData = UploadS3ServiceUploadS3ControllerGetUploadUrlDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ filename, contentType }: {
    filename: string;
    contentType: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useUploadS3ServiceUploadS3ControllerGetUploadUrlKey, ...(queryKey ?? [{ filename, contentType }])], queryFn: () => UploadS3Service.uploadS3ControllerGetUploadUrl(filename, contentType) as TData, ...options });
export type UploadS3ServiceUploadS3ControllerGetMultiUploadUrlsDefaultResponse = Awaited<ReturnType<typeof UploadS3Service.uploadS3ControllerGetMultiUploadUrls>>;
export type UploadS3ServiceUploadS3ControllerGetMultiUploadUrlsQueryResult<TData = UploadS3ServiceUploadS3ControllerGetMultiUploadUrlsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useUploadS3ServiceUploadS3ControllerGetMultiUploadUrlsKey = "UploadS3ServiceUploadS3ControllerGetMultiUploadUrls";
/**
 * Get multiple files upload URLs
 */
export const useUploadS3ServiceUploadS3ControllerGetMultiUploadUrls = <TData = UploadS3ServiceUploadS3ControllerGetMultiUploadUrlsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ files }: {
    files: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useUploadS3ServiceUploadS3ControllerGetMultiUploadUrlsKey, ...(queryKey ?? [{ files }])], queryFn: () => UploadS3Service.uploadS3ControllerGetMultiUploadUrls(files) as TData, ...options });
export type UsersServiceUserControllerGetUserDefaultResponse = Awaited<ReturnType<typeof UsersService.userControllerGetUser>>;
export type UsersServiceUserControllerGetUserQueryResult<TData = UsersServiceUserControllerGetUserDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useUsersServiceUserControllerGetUserKey = "UsersServiceUserControllerGetUser";
/**
 * Get current user information
 */
export const useUsersServiceUserControllerGetUser = <TData = UsersServiceUserControllerGetUserDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useUsersServiceUserControllerGetUserKey, ...(queryKey ?? [])], queryFn: () => UsersService.userControllerGetUser() as TData, ...options });
export type UsersServiceUserControllerUpdateMeMutationResult = Awaited<ReturnType<typeof UsersService.userControllerUpdateMe>>;
/**
 * Update me
 */
export const useUsersServiceUserControllerUpdateMe = <TData = UsersServiceUserControllerUpdateMeMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: UpdateUserDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: UpdateUserDto;
}, TContext>({ mutationFn: ({ requestBody }) => UsersService.userControllerUpdateMe(requestBody) as unknown as Promise<TData>, ...options });
export type UsersServiceUserControllerDeleteMeMutationResult = Awaited<ReturnType<typeof UsersService.userControllerDeleteMe>>;
/**
 * Delete me
 */
export const useUsersServiceUserControllerDeleteMe = <TData = UsersServiceUserControllerDeleteMeMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, void, TContext>, "mutationFn">) => useMutation<TData, TError, void, TContext>({ mutationFn: () => UsersService.userControllerDeleteMe() as unknown as Promise<TData>, ...options });
export type UsersServiceUserControllerUpdatePassMutationResult = Awaited<ReturnType<typeof UsersService.userControllerUpdatePass>>;
/**
 * Update a new password
 */
export const useUsersServiceUserControllerUpdatePass = <TData = UsersServiceUserControllerUpdatePassMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: UpdateUserPasswordDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: UpdateUserPasswordDto;
}, TContext>({ mutationFn: ({ requestBody }) => UsersService.userControllerUpdatePass(requestBody) as unknown as Promise<TData>, ...options });
export type UsersServiceUserControllerUpdateLocaleMutationResult = Awaited<ReturnType<typeof UsersService.userControllerUpdateLocale>>;
/**
 * Update a locale of user
 */
export const useUsersServiceUserControllerUpdateLocale = <TData = UsersServiceUserControllerUpdateLocaleMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: UpdateLocaleDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: UpdateLocaleDto;
}, TContext>({ mutationFn: ({ requestBody }) => UsersService.userControllerUpdateLocale(requestBody) as unknown as Promise<TData>, ...options });
export type UsersServiceUserSuperAdminControllerGetUserDefaultResponse = Awaited<ReturnType<typeof UsersService.userSuperAdminControllerGetUser>>;
export type UsersServiceUserSuperAdminControllerGetUserQueryResult<TData = UsersServiceUserSuperAdminControllerGetUserDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useUsersServiceUserSuperAdminControllerGetUserKey = "UsersServiceUserSuperAdminControllerGetUser";
/**
 * Get a user
 */
export const useUsersServiceUserSuperAdminControllerGetUser = <TData = UsersServiceUserSuperAdminControllerGetUserDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useUsersServiceUserSuperAdminControllerGetUserKey, ...(queryKey ?? [{ id }])], queryFn: () => UsersService.userSuperAdminControllerGetUser(id) as TData, ...options });
export type UsersServiceUserSuperAdminControllerUpdateAdminOfBusinessMutationResult = Awaited<ReturnType<typeof UsersService.userSuperAdminControllerUpdateAdminOfBusiness>>;
/**
 * Update an user
 */
export const useUsersServiceUserSuperAdminControllerUpdateAdminOfBusiness = <TData = UsersServiceUserSuperAdminControllerUpdateAdminOfBusinessMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: AdminUpdateUserDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: AdminUpdateUserDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => UsersService.userSuperAdminControllerUpdateAdminOfBusiness(id, requestBody) as unknown as Promise<TData>, ...options });
export type UsersServiceUserSuperAdminControllerDeleteAdminOfBusinessMutationResult = Awaited<ReturnType<typeof UsersService.userSuperAdminControllerDeleteAdminOfBusiness>>;
/**
 * Delete an user
 */
export const useUsersServiceUserSuperAdminControllerDeleteAdminOfBusiness = <TData = UsersServiceUserSuperAdminControllerDeleteAdminOfBusinessMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => UsersService.userSuperAdminControllerDeleteAdminOfBusiness(id) as unknown as Promise<TData>, ...options });
export type UsersServiceUserSuperAdminControllerUpdateUserStatusMutationResult = Awaited<ReturnType<typeof UsersService.userSuperAdminControllerUpdateUserStatus>>;
/**
 * Update status of a user
 */
export const useUsersServiceUserSuperAdminControllerUpdateUserStatus = <TData = UsersServiceUserSuperAdminControllerUpdateUserStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateUserStatusDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateUserStatusDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => UsersService.userSuperAdminControllerUpdateUserStatus(id, requestBody) as unknown as Promise<TData>, ...options });
export type UsersServiceUserSuperAdminControllerGetUsersDefaultResponse = Awaited<ReturnType<typeof UsersService.userSuperAdminControllerGetUsers>>;
export type UsersServiceUserSuperAdminControllerGetUsersQueryResult<TData = UsersServiceUserSuperAdminControllerGetUsersDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useUsersServiceUserSuperAdminControllerGetUsersKey = "UsersServiceUserSuperAdminControllerGetUsers";
/**
 * Get list of users
 */
export const useUsersServiceUserSuperAdminControllerGetUsers = <TData = UsersServiceUserSuperAdminControllerGetUsersDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ limit, offset, q, roleId, userProfile, isActive, order }: {
    limit?: number;
    offset: number;
    q?: string | null;
    roleId?: string | null;
    userProfile?: "STUDENT" | "TEACHER" | "SYSTEM_ADMIN" | null;
    isActive?: boolean | null;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useUsersServiceUserSuperAdminControllerGetUsersKey, ...(queryKey ?? [{ limit, offset, q, roleId, userProfile, isActive, order }])], queryFn: () => UsersService.userSuperAdminControllerGetUsers(limit, offset, q, roleId, userProfile, isActive, order) as TData, ...options });
export type UsersServiceUserSuperAdminControllerCreateUserMutationResult = Awaited<ReturnType<typeof UsersService.userSuperAdminControllerCreateUser>>;
/**
 * Create an user
 */
export const useUsersServiceUserSuperAdminControllerCreateUser = <TData = UsersServiceUserSuperAdminControllerCreateUserMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: UpsertUserDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: UpsertUserDto;
}, TContext>({ mutationFn: ({ requestBody }) => UsersService.userSuperAdminControllerCreateUser(requestBody) as unknown as Promise<TData>, ...options });
export type UsersServiceUserSuperAdminControllerExportUserDefaultResponse = Awaited<ReturnType<typeof UsersService.userSuperAdminControllerExportUser>>;
export type UsersServiceUserSuperAdminControllerExportUserQueryResult<TData = UsersServiceUserSuperAdminControllerExportUserDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useUsersServiceUserSuperAdminControllerExportUserKey = "UsersServiceUserSuperAdminControllerExportUser";
/**
 * Export excel user
 */
export const useUsersServiceUserSuperAdminControllerExportUser = <TData = UsersServiceUserSuperAdminControllerExportUserDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ userId }: {
    userId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useUsersServiceUserSuperAdminControllerExportUserKey, ...(queryKey ?? [{ userId }])], queryFn: () => UsersService.userSuperAdminControllerExportUser(userId) as TData, ...options });
export type UsersServiceUserSuperAdminControllerImportUserMutationResult = Awaited<ReturnType<typeof UsersService.userSuperAdminControllerImportUser>>;
/**
 * Import excel user
 */
export const useUsersServiceUserSuperAdminControllerImportUser = <TData = UsersServiceUserSuperAdminControllerImportUserMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, void, TContext>, "mutationFn">) => useMutation<TData, TError, void, TContext>({ mutationFn: () => UsersService.userSuperAdminControllerImportUser() as unknown as Promise<TData>, ...options });
export type VideoUrlServiceVideoUrlControllerAddVideoUrlMutationResult = Awaited<ReturnType<typeof VideoUrlService.videoUrlControllerAddVideoUrl>>;
/**
 * add video url
 */
export const useVideoUrlServiceVideoUrlControllerAddVideoUrl = <TData = VideoUrlServiceVideoUrlControllerAddVideoUrlMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: CreateVideoUrlDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: CreateVideoUrlDto;
}, TContext>({ mutationFn: ({ requestBody }) => VideoUrlService.videoUrlControllerAddVideoUrl(requestBody) as unknown as Promise<TData>, ...options });
export type VideoUrlServiceVideoUrlControllerGetVideoDefaultResponse = Awaited<ReturnType<typeof VideoUrlService.videoUrlControllerGetVideo>>;
export type VideoUrlServiceVideoUrlControllerGetVideoQueryResult<TData = VideoUrlServiceVideoUrlControllerGetVideoDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useVideoUrlServiceVideoUrlControllerGetVideoKey = "VideoUrlServiceVideoUrlControllerGetVideo";
/**
 * get video by lesson id
 */
export const useVideoUrlServiceVideoUrlControllerGetVideo = <TData = VideoUrlServiceVideoUrlControllerGetVideoDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
    id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useVideoUrlServiceVideoUrlControllerGetVideoKey, ...(queryKey ?? [{ id }])], queryFn: () => VideoUrlService.videoUrlControllerGetVideo(id) as TData, ...options });
export type VideoUrlServiceVideoUrlControllerUpdateVideoMutationResult = Awaited<ReturnType<typeof VideoUrlService.videoUrlControllerUpdateVideo>>;
/**
 * update video by id
 */
export const useVideoUrlServiceVideoUrlControllerUpdateVideo = <TData = VideoUrlServiceVideoUrlControllerUpdateVideoMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateVideoUrlDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateVideoUrlDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => VideoUrlService.videoUrlControllerUpdateVideo(id, requestBody) as unknown as Promise<TData>, ...options });
export type VideoUrlServiceVideoUrlControllerDeleteVideoMutationResult = Awaited<ReturnType<typeof VideoUrlService.videoUrlControllerDeleteVideo>>;
/**
 * delete video by id
 */
export const useVideoUrlServiceVideoUrlControllerDeleteVideo = <TData = VideoUrlServiceVideoUrlControllerDeleteVideoMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
}, TContext>({ mutationFn: ({ id }) => VideoUrlService.videoUrlControllerDeleteVideo(id) as unknown as Promise<TData>, ...options });
export type VideoUrlServiceVideoUrlControllerAddDocumentMutationResult = Awaited<ReturnType<typeof VideoUrlService.videoUrlControllerAddDocument>>;
/**
 * add document by video id
 */
export const useVideoUrlServiceVideoUrlControllerAddDocument = <TData = VideoUrlServiceVideoUrlControllerAddDocumentMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: CreateDocumentType;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: CreateDocumentType;
}, TContext>({ mutationFn: ({ id, requestBody }) => VideoUrlService.videoUrlControllerAddDocument(id, requestBody) as unknown as Promise<TData>, ...options });
export type VideoUrlServiceVideoUrlControllerUpdateDocumentMutationResult = Awaited<ReturnType<typeof VideoUrlService.videoUrlControllerUpdateDocument>>;
/**
 * update document by video id
 */
export const useVideoUrlServiceVideoUrlControllerUpdateDocument = <TData = VideoUrlServiceVideoUrlControllerUpdateDocumentMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: UpdateDocumentType;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: UpdateDocumentType;
}, TContext>({ mutationFn: ({ id, requestBody }) => VideoUrlService.videoUrlControllerUpdateDocument(id, requestBody) as unknown as Promise<TData>, ...options });
export type VideoUrlServiceVideoUrlControllerDeleteDocumentMutationResult = Awaited<ReturnType<typeof VideoUrlService.videoUrlControllerDeleteDocument>>;
/**
 * delete document by video id
 */
export const useVideoUrlServiceVideoUrlControllerDeleteDocument = <TData = VideoUrlServiceVideoUrlControllerDeleteDocumentMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    id: string;
    requestBody: DeleteDocumentType;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    id: string;
    requestBody: DeleteDocumentType;
}, TContext>({ mutationFn: ({ id, requestBody }) => VideoUrlService.videoUrlControllerDeleteDocument(id, requestBody) as unknown as Promise<TData>, ...options });
export type VideoUrlServiceVideoUrlControllerGetVideoUserDefaultResponse = Awaited<ReturnType<typeof VideoUrlService.videoUrlControllerGetVideoUser>>;
export type VideoUrlServiceVideoUrlControllerGetVideoUserQueryResult<TData = VideoUrlServiceVideoUrlControllerGetVideoUserDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useVideoUrlServiceVideoUrlControllerGetVideoUserKey = "VideoUrlServiceVideoUrlControllerGetVideoUser";
/**
 * get video for user by lesson id
 */
export const useVideoUrlServiceVideoUrlControllerGetVideoUser = <TData = VideoUrlServiceVideoUrlControllerGetVideoUserDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id, limit, offset, order }: {
    id: string;
    limit?: number;
    offset: number;
    order?: string | null;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useVideoUrlServiceVideoUrlControllerGetVideoUserKey, ...(queryKey ?? [{ id, limit, offset, order }])], queryFn: () => VideoUrlService.videoUrlControllerGetVideoUser(id, limit, offset, order) as TData, ...options });
