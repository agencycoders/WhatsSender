export type Page = 'dashboard' | 'campaigns' | 'contacts' | 'templates' | 'settings' | 'history';

export interface Contact {
  id: string;
  name: string;
  phone: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'draft' | 'scheduled' | 'sent';
  recipients: number;
  date: string;
}

export interface Template {
  id: string;
  name: string;
  content: string;
  category: string;
}

export interface Theme {
  mode: 'light' | 'dark';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
} 