export type CharDataType = {
  user_id: string;
  image: string;
  level: number;
  status_phy: number;
  status_int: number;
  status_spl: number;
  userLevel: number;
  userExp: number;
  userTitle?: string[];
};

export type UserDataType = {
  id: number;
  nickname: string;
  email: string;
  created_at: string;
  updated_at: string;
};
