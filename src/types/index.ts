export interface Alert {
  id: string;
  type: 'security' | 'event' | 'traffic' | 'weather' | 'community';
  location: string;
  coordinates: { lat: number; lng: number };
  severity: 'low' | 'medium' | 'high';
  description: string;
  user_id?: string;
  created_at: string;
  status?: 'active' | 'resolved';
}

export interface User {
  id: string;
  name: string;
  email: string;
  reputation: number;
  alerts_reported: number;
}

export interface AuthLoginResponse {
  token: string;
  user?: User;
}