export type CharDataType = {
  id?: number;
  user_id: number;
  image: string;
  level: number;
  status_phy: number;
  status_int: number;
  status_spi: number;
  exp?: number;
  totalExp?: number;
  userTitle?: string[];
};

export const initialCharData = {
  id: 0,
  image: "",
  totalExp: 0,
  status_phy: 0,
  status_int: 0,
  status_spi: 0,
  medal: null,
  createdAt: "",
  updatedAt: "",
  user_id: 0,
  level: 0,
  exp: 0,
};

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

export const initialDamageLog = [
  {
    id: 0,
    log: 0,
    createdAt: "",
    updatedAt: "",
    user_id: 0,
    raid_id: 0,
    user: DefaultUserDataType,
  },
];

export type Objtype = {
  [key: string]: number;
};

export type RaidsType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  monster_id: number;
};

export type MonsterInfoType = {
  id: number;
  monster_image: string;
  kind: string;
  name: string;
  hp: number;
  reward: number;
  createdAt: string;
  updatedAt: string;
  raids: RaidsType;
};

export const initialMonsterInfo = {
  id: 7,
  monster_image: "monster_int",
  kind: "int",
  name: "FireBird LV1",
  hp: 5000,
  reward: 50,
  createdAt: "2022-06-03T20:27:43.000Z",
  updatedAt: "2022-06-03T20:27:43.000Z",
  raids: {
    id: 7,
    createdAt: "2022-06-03T20:27:43.000Z",
    updatedAt: "2022-06-03T20:27:43.000Z",
    monster_id: 7,
  },
};
