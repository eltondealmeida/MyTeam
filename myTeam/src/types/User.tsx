import { UniqueId } from "../features/@core/UniqueId";

export interface User {
  name: string;
  apiKey: UniqueId;
  requests: number;
  limitRequests: number;
  subscriptionPlan: string;
  isLoggedIn: boolean;
}
