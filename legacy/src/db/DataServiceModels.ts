export type UserData = {
    name: string;
    point: number;
}
  
export type UserPayload = {
    Items: UserData | undefined;
    error: string | undefined;
}