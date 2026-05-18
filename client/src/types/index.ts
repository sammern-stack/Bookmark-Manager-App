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
