import { z } from "zod";

export namespace UserAuthModels {
/** 
 * UserAuthPasswordChangeRequestSchema 
 * @type { object }
 * @property { string } password Set new password. Min Length: `12` 
 */
export const UserAuthPasswordChangeRequestSchema = z.object({ password: z.string().min(12) });
export type UserAuthPasswordChangeRequest = z.infer<typeof UserAuthPasswordChangeRequestSchema>;


/** 
 * UserAuthPasswordLoginRequestSchema 
 * @type { object }
 * @property { string } email Email 
 * @property { string } password Password 
 */
export const UserAuthPasswordLoginRequestSchema = z.object({ email: z.email(), password: z.string() });
export type UserAuthPasswordLoginRequest = z.infer<typeof UserAuthPasswordLoginRequestSchema>;


/** 
 * UserAuthPasswordRegisterRequestSchema 
 * @type { object }
 * @property { string } password Set password. Min Length: `12` 
 * @property { string } invitationCode Invitation code 
 * @property { string } name Name 
 * @property { string } email Email 
 */
export const UserAuthPasswordRegisterRequestSchema = z.object({ password: z.string().min(12), invitationCode: z.string(), name: z.string(), email: z.email() });
export type UserAuthPasswordRegisterRequest = z.infer<typeof UserAuthPasswordRegisterRequestSchema>;


/** 
 * UserAuthForgotPasswordConsumeRequestSchema 
 * @type { object }
 * @property { string } code Code received by the user for password reset 
 * @property { string } password Set new password. Min Length: `12` 
 */
export const UserAuthForgotPasswordConsumeRequestSchema = z.object({ code: z.string(), password: z.string().min(12) });
export type UserAuthForgotPasswordConsumeRequest = z.infer<typeof UserAuthForgotPasswordConsumeRequestSchema>;


/** 
 * UserAuthEmailGenerateRequestSchema 
 * @type { object }
 * @property { string } email Email address of the user requesting the nonce 
 */
export const UserAuthEmailGenerateRequestSchema = z.object({ email: z.email() });
export type UserAuthEmailGenerateRequest = z.infer<typeof UserAuthEmailGenerateRequestSchema>;


/** 
 * AuthnTokenRequestSchema 
 * @type { object }
 * @property { string } refreshToken Refresh Token
 * - use to get a new access token when the current one expires 
 */
export const AuthnTokenRequestSchema = z.object({ refreshToken: z.string() });
export type AuthnTokenRequest = z.infer<typeof AuthnTokenRequestSchema>;


/** 
 * AuthnTokenResponseSchema 
 * @type { object }
 * @property { string } accessToken Access Token
 * - use to authenticate requests with `Authorization: Bearer ${token}`
 * - read { exp: number } from the token to determine when it expires 
 * @property { string } refreshToken Refresh Token
 * - use to get a new access token when the current one expires 
 */
export const AuthnTokenResponseSchema = z.object({ accessToken: z.string(), refreshToken: z.string().nullish() });
export type AuthnTokenResponse = z.infer<typeof AuthnTokenResponseSchema>;


}
