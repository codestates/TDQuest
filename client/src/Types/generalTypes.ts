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
};

// createdAt: "2022-05-18T16:27:49.000Z"
// exp: 0
// id: 1
// image: null
// level: 1
// medal: null
// status_int: 0
// status_phy: 0
// status_spi: 0
// totalExp: 100
// updatedAt: "2022-05-18T16:27:49.000Z"
// user_id: 1


export type UserDataType = {
  id: number;
  nickname: string;
  email: string;
  created_at: string;
  updated_at: string;
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

export interface TodoContentType {
  id: number;
  content: string;
  kind?: string;
  is_complete?: boolean;
  createdAt?: string;
  updatedAt?: string;
  handleDeleteList? : any;
};