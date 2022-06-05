import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TDQuestAPI } from '../../API/tdquestAPI'

export interface MonstersInfo {
  monsterInfo : Array<Object>;
}

type MonsterType = {
  name? : string;
  hp? : number;
  kind? : string;
  reward? : number;
  monster_image? : string;
  id? : number;
  raids? : object;
}

const initialState : MonstersInfo = {
  monsterInfo: [{} as MonsterType, {} as MonsterType, {} as MonsterType]
}

export const getMonsterInfo = createAsyncThunk('get/monsterInfo', async () => {
  try{
    const monster1 = await TDQuestAPI.get('/monster/?monster_id=7');
    const monster2 = await TDQuestAPI.get('/monster/?monster_id=8');
    const monster3 = await TDQuestAPI.get('/monster/?monster_id=9');
    return {monsterInfo : [monster1.data, monster2.data, monster3.data]}
  } catch(err : any){
    console.log(err)
  }
});

export const raidjoinSlice = createSlice({
  name : 'monsterInfo',
  initialState,
  reducers : {},
  extraReducers: (builder) => {
    builder
      .addCase(getMonsterInfo.fulfilled, (state, action) => {
        return {...state, ...action.payload}
      })
  },
})

export default raidjoinSlice.reducer;