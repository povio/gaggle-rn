import { z } from "zod";

export namespace UserModels {
/** 
 * StateEnumSchema 
 * @type { enum }
 */
export const StateEnumSchema = z.enum(["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC"]);
export type StateEnum = z.infer<typeof StateEnumSchema>;
export const StateEnum = StateEnumSchema.enum;

/** 
 * GenderEnumSchema 
 * @type { enum }
 */
export const GenderEnumSchema = z.enum(["male", "female", "other", "prefer_not_to_say"]);
export type GenderEnum = z.infer<typeof GenderEnumSchema>;
export const GenderEnum = GenderEnumSchema.enum;

/** 
 * GradeEnumSchema 
 * @type { enum }
 */
export const GradeEnumSchema = z.enum(["pre_k", "k", "grade_1", "grade_2", "grade_3", "grade_4", "grade_5", "grade_6", "grade_7", "grade_8", "grade_9", "grade_10", "grade_11", "grade_12", "other"]);
export type GradeEnum = z.infer<typeof GradeEnumSchema>;
export const GradeEnum = GradeEnumSchema.enum;

/** 
 * ChildDTOSchema 
 * @type { object }
 * @property { GenderEnum } gender  
 * @property { GradeEnum } grade  
 * @property { string } id  
 * @property { string } nickname Min Length: `1`. Max Length: `100` 
 * @property { string } birthdate  
 * @property { string } schoolName  
 */
export const ChildDTOSchema = z.object({ gender: GenderEnumSchema.nullish(), grade: GradeEnumSchema.nullish(), id: z.string().nullish(), nickname: z.string().min(1).max(100), birthdate: z.string().nullish(), schoolName: z.string().nullish() });
export type ChildDTO = z.infer<typeof ChildDTOSchema>;


/** 
 * UpdateUserSettingsRequestDTOSchema 
 * @type { object }
 * @property { StateEnum } state  
 * @property { string } nickname Min Length: `1`. Max Length: `100` 
 * @property { boolean } notificationEnabled  
 * @property { string } address1 Min Length: `1`. Max Length: `255` 
 * @property { string } address2 Max Length: `255` 
 * @property { string } city Min Length: `1`. Max Length: `100` 
 * @property { string } zip  
 * @property { ChildDTO[] } children  
 */
export const UpdateUserSettingsRequestDTOSchema = z.object({ state: StateEnumSchema.nullable(), nickname: z.string().min(1).max(100).nullable(), notificationEnabled: z.boolean().nullable(), address1: z.string().min(1).max(255).nullable(), address2: z.string().min(0).max(255).nullable(), city: z.string().min(1).max(100).nullable(), zip: z.string().regex(/^\d{5}(-\d{4})?$/).nullable(), children: z.array(ChildDTOSchema).nullable() }).partial();
export type UpdateUserSettingsRequestDTO = z.infer<typeof UpdateUserSettingsRequestDTOSchema>;


/** 
 * GetUserSettingsResponseDTOSchema 
 * @type { object }
 * @property { string } nickname  
 * @property { boolean } notificationEnabled  
 * @property { string } address1  
 * @property { string } address2  
 * @property { string } city  
 * @property { string } state  
 * @property { string } zip  
 * @property { ChildDTO[] } children  
 */
export const GetUserSettingsResponseDTOSchema = z.object({ nickname: z.string(), notificationEnabled: z.boolean().nullish(), address1: z.string().nullish(), address2: z.string().nullish(), city: z.string().nullish(), state: z.string().nullish(), zip: z.string().nullish(), children: z.array(ChildDTOSchema) });
export type GetUserSettingsResponseDTO = z.infer<typeof GetUserSettingsResponseDTOSchema>;


/** 
 * FollowedProviderDTOSchema 
 * @type { object }
 * @property { string } id  
 * @property { string } name  
 * @property { string } logoUrl  
 * @property { boolean } isTopRated  
 */
export const FollowedProviderDTOSchema = z.object({ id: z.string(), name: z.string(), logoUrl: z.string(), isTopRated: z.boolean() });
export type FollowedProviderDTO = z.infer<typeof FollowedProviderDTOSchema>;


/** 
 * GetMyProfileResponseDTOSchema 
 * @type { object }
 * @property { string } id  
 * @property { string } nickname  
 * @property { string } profileImageUrl  
 * @property { number } favoritesCount  
 * @property { FollowedProviderDTO[] } followedProviders  
 */
export const GetMyProfileResponseDTOSchema = z.object({ id: z.string(), nickname: z.string(), profileImageUrl: z.string(), favoritesCount: z.number(), followedProviders: z.array(FollowedProviderDTOSchema) });
export type GetMyProfileResponseDTO = z.infer<typeof GetMyProfileResponseDTOSchema>;


/** 
 * UserRoleSchema 
 * @type { enum }
 * @description User Roles
 */
export const UserRoleSchema = z.enum(["manager", "client", "employee", "USER", "ADMIN"]);
export type UserRole = z.infer<typeof UserRoleSchema>;
export const UserRole = UserRoleSchema.enum;

/** 
 * UserMeResponseSchema 
 * @type { object }
 * @property { UserRole[] } roles User Roles 
 * @property { array[] } aclRules User ACL. Default: `` 
 * @property { string } id User ID 
 * @property { string } name Name 
 * @property { string } email Email 
 */
export const UserMeResponseSchema = z.object({ roles: z.array(UserRoleSchema), aclRules: z.array(z.array(z.union([z.string(), z.object({}), z.array(z.any()), z.boolean()]))).nullish().default([]), id: z.uuid(), name: z.string().nullish(), email: z.email().nullish() });
export type UserMeResponse = z.infer<typeof UserMeResponseSchema>;


/** 
 * UserMeUpdateRequestSchema 
 * @type { object }
 * @property { string } name Name 
 * @property { string } email Email 
 */
export const UserMeUpdateRequestSchema = z.object({ name: z.string().nullable(), email: z.email().nullable() }).partial();
export type UserMeUpdateRequest = z.infer<typeof UserMeUpdateRequestSchema>;


}
