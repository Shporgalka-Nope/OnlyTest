export default interface UserInfoDTO {
  username: string;
  email: string;
  isEmailVerified: boolean;
  token: string;
  userClaims: Claim[];
}

interface Claim {
  issuer: string;
  originalIssuer: string;
  properties: object;
  subject: object;
  type: string;
  value: string;
  valueType: string;
}
