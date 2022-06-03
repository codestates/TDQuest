export interface CharDataType {
  id?: number;
  user_id: string;
  image: string;
  level: number;
  status_phy: number;
  status_int: number;
  status_spi: number;
  exp?: number;
  totalExp?: number;
  userExp?: number;
  userLevel?: number;
  userTitle?: string[];
}

export type UserDataType = {
  id?: number;
  nickname: string;
  email: string;
  logintype?: string;
  created_at?: string;
  updated_at?: string;
  loading?: boolean;
  error?: boolean | string;
};

export type LogUserDataType = {
  id: number;
  nickname: string;
  logintype: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export const DefaultUserDataType = {
  id: 0,
  nickname: "",
  logintype: "",
  email: "",
  createdAt: "",
  updatedAt: "",
};

export type TodoListType = {
  id: number;
  user_id: number;
  content: string;
  kind: string;
  is_complete: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TodoContentType = {
  id: number;
  content: string;
  kind?: string;
  is_complete?: boolean;
  createdAt?: string;
  updatedAt?: string;
  handleDeleteList?: any;
};

export type DamageLogType = {
  id: number;
  log: number;
  createdAt: string;
  updatedAt: string;
  user_id: number;
  raid_id: number;
  user: LogUserDataType;
};

export type Objtype = {
  [key: string]: number;
}
