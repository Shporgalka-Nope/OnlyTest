export default interface User {
  Username: string | null;
  Email: string | null;
  AccessToken: string | null;
  Role: string | null;
  IsEmailConfirmed: boolean | null;
}
