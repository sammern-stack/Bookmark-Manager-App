import type { InternalAxiosRequestConfig } from "axios";

export type User = {
  email: string;
  password: string;
};

export type NewUser = {
  username: string;
  email: string;
  password: string;
};

export type UpdateUser = Partial<NewUser> & {
  confirmPassword?: string;
};

export type FoundUser = {
  found: boolean;
  user: string;
};

export type ResponseUser = {
  user: {
    id: string;
    username: string;
    email: string;
  };
  accessToken: string
};

export type Bookmark = {
  title: string;
  url: string;
  favicon: string;
  description: string;
  tags: Array<string>;
  pinned: boolean;
  isArchived: boolean;
  visitCount: number;
};

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  requireAuth?: boolean;
  _retry?: boolean;
}

export interface ApiSuccessResponse<T = unknown> {
  ok: true;
  data: T;
}

export interface ApiErrorResponse {
  ok: false;
  error: string;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

export type JWTrefresh = {
  accessToken: string;
  user: ResponseUser["user"];
};

export type Theme = "light" | "dark";

export interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

export interface FormFieldProps {
  type: string;
  errMsg: string;
  label: string;
}
