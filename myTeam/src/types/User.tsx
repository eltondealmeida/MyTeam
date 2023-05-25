import { UniqueId } from "../features/@core/UniqueId";

export interface User {
  name: string;
  apiKey: UniqueId;
  isLoggedIn: boolean;
}
