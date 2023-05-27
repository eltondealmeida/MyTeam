import { UniqueId } from "../features/@core/UniqueId";

export interface User {
  userName: string;
  apiKey: UniqueId;
  limitRequests: number;
  requests: number;
  subscriptionPlan: string;
  isLoggedIn: boolean;
}
