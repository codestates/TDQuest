import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  color_primary_green_light,
  color_secondary_beige,
  color_context_beige,
} from '../../components/CommonStyle';
import {
  TodoContainer,
  TodoListPageHeader,
  SectionContainer,
  StatusContainer,
  RewardContainer,
  TitleContainer,
  ContentContainer,
  RewardInfo,
} from './TodoListPageStyle';
import Loading from '../../components/Loading';
import Status from '../../components/Status';
import HelperBear from '../../components/HelperBear';
import TaskContainer from './TaskContainer';
import UncheckedIcon from '../../static/images/icons/unchecked.svg';
import CheckedIcon from '../../static/images/icons/checked.svg';
import MsgModal from '../../components/MsgModal';
import TaskContent_modal from './TaskContent_Modal';
import {
  getTodoListAsync,
  postTodoListAsync,
  patchTodoListAsync,
  deleteTodoListAsync,
  todoStatusChangeAsync,
  getCompletedTodoListAsync,
} from '../../features/todolist/todolistSlice';

function TodoListPage() {
  const loadingStatus = useSelector((state: any) => state.todoList.status);
  const todoList = useSelector((state: any) => state.todoList.todo); // todo list
  const completedTodoList = useSelector(
    (state: any) => state.todoList.completedTodo
  ); // completed todo list
  // todolist 기반 취득가능한 예상스텟 구하는 함수
  const getExpectedStats = (el: any) => {
    try {
      return el.todoInfo.reduce(
        (acc: any, cur: any, i: any) => {
          if (cur.kind === 'phy') {
            acc.phy += 0.5;
          } else if (cur.kind === 'int') {
            acc.int += 0.5;
          } else if (cur.kind === 'spi') {
            acc.spi += 0.5;
          } else if (cur.kind === 'exp') {
            acc.exp += 0.5;
          }
          return acc;
        },
        { phy: 0, int: 0, spi: 0, exp: 0 }
      );
      return { phy: 0, int: 0, spi: 0, exp: 0 };
    } catch (er) {
      // console.log(er);
    }
  };
  const expectedStats = getExpectedStats(todoList);

  const LOCALSTORAGE = window.localStorage.getItem('isLogin') as string;
  const { id: user_id, nickname } = JSON.parse(LOCALSTORAGE).userInfo;
  console.log(user_id);
  // const accessToken = JSON.parse(LOCALSTORAGE).accessToken;
  const charInfo: any = useSelector((state: any) => state.sign.characterInfo);

  const dispatch: any = useDispatch();

  useEffect(() => {
    // 유저가 작성한 todo 목록 가져오기 (incompleted task)
    dispatch(getTodoListAsync({ user_id: user_id, is_complete: 0 }));
    dispatch(
      getCompletedTodoListAsync({
        user_id: user_id,
        time: getToday(),
        is_complete: 1,
      })
    );
  }, []);

  // 오늘 날짜 yyyy-mm-dd 형식으로 가져오는 함수
  const getToday = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (1 + date.getMonth())).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return year + '-' + month + '-' + day;
  };

  //--- modal 관련---//
  const [selectedTaskContent, setSelectedTaskContent] = useState({
    taskContent: '',
    taskId: 0,
    kind: '',
  });
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const deleteTask = () => {
    // 태스크 삭제 관련 로직 ***
    dispatch(
      deleteTodoListAsync({
        id: selectedTaskContent.taskId,
      })
    );
    setShowModal(false);
  };
  const saveTask = () => {
    // 태스크 내용 업데이트 관련 로직 ***
    dispatch(
      patchTodoListAsync({
        id: selectedTaskContent.taskId,
        content: selectedTaskContent.taskContent,
        kind: selectedTaskContent.kind,
      })
    );
    setShowModal(false);
  };
  const openModalHandler = (
    taskContent: string,
    taskId: number,
    kind: string
  ) => {
    // 특정 태스크 선택시 해당 태스크의 컨텐츠 내용과 태스크 아이디값을 가져온다
    setSelectedTaskContent({
      taskContent: taskContent,
      taskId: taskId,
      kind: kind,
    });
    openModal();
  };
  // TaskContent_modal 로 보낼 함수
  const selectedTaskContentHandler = (taskContent: string) => {
    setSelectedTaskContent((prevState) => ({
      ...prevState,
      taskContent: taskContent,
    }));
  };
  const selectedTaskKindHandler = (taskKind: string) => {
    setSelectedTaskContent((prevState) => ({
      ...prevState,
      kind: taskKind,
    }));
  };
  //--- modal 관련 ---//
  //--- creating task 관련---//
  const createTaskHander = (taskContent: string, category: string) => {
    // 태스크 생성 관련 로직 ***
    dispatch(
      postTodoListAsync({
        user_id: user_id,
        content: taskContent,
        kind: category,
      })
    );
  };

  //--- creating task 관련---//

  const taskCompletedHandler = (itemId: number, category: string) => {
    // 태스크 완료 관련 로직 ***
    // is_complete: 1 = completed / 0 = incompleted
    dispatch(
      todoStatusChangeAsync({
        user_id: user_id,
        id: itemId,
        kind: category,
        is_complete: 1,
      })
    );
  };

  const taskCompletedCancelHander = (itemId: number, category: string) => {
    // 태스크 완료 취소 관련 로직 ***
    // is_complete: 1 = completed / 0 = incompleted
    dispatch(
      todoStatusChangeAsync({
        user_id: user_id,
        id: itemId,
        kind: category,
        is_complete: 0,
      })
    );
  };

  return (
    <div>
      {loadingStatus === 'loading' ? (
        <TodoContainer bgColor={color_primary_green_light}>
          <Loading customText='Loading...' />
        </TodoContainer>
      ) : (
        <TodoContainer bgColor={color_primary_green_light}>
          <MsgModal
            header='Task info'
            open={showModal}
            close={closeModal}
            footerClick={deleteTask}
            footerClick2={saveTask}
            footer='Delete'
            footer2='Save'
            secondFooterBtn={true}
          >
            <TaskContent_modal
              selectedTaskContentHandler={selectedTaskContentHandler}
              selectedTaskKindHandler={selectedTaskKindHandler}
              selectedTaskContent={selectedTaskContent.taskContent}
              selectedTaskKind={selectedTaskContent.kind}
            ></TaskContent_modal>
          </MsgModal>
          <TodoListPageHeader>
            <div className='headerContainer'>
              <img
                src={require('../../static/images/icons/Achievements.png')}
                alt='Achievements'
              />
              <h2>To-Do List</h2>
            </div>
          </TodoListPageHeader>
          <SectionContainer>
            <StatusContainer bgColor={color_secondary_beige}>
              <Status
                userName={nickname}
                charData={charInfo}
                direction='row'
              ></Status>
            </StatusContainer>
            <RewardContainer bgColor={color_secondary_beige}>
              <TitleContainer>
                <img
                  src={require('../../static/images/icons/Ring.png')}
                  alt='Ring'
                />
                <h3>Today's Expected Reward</h3>
              </TitleContainer>
              <ContentContainer>
                {/* 추후 todolist 태스크별 포인트 계산하여 표시 */}
                <RewardInfo>
                  <h3>PHY + {expectedStats ? expectedStats.phy : 0} Points</h3>
                  <h3>INT + {expectedStats ? expectedStats.int : 0} Points</h3>
                  <h3>SPI + {expectedStats ? expectedStats.spi : 0} Points</h3>
                  <h3>EXP + {expectedStats ? expectedStats.exp : 0} Points</h3>
                </RewardInfo>
                <HelperBear
                  width='150px'
                  height='80px'
                  text='Your completed tasks will be refreshed every midnight!
                  '
                ></HelperBear>
              </ContentContainer>
            </RewardContainer>
          </SectionContainer>
          <SectionContainer>
            <TaskContainer
              title="Today's To-do List"
              todoCreator={true}
              itemModalBtn={true}
              itemIcon={UncheckedIcon}
              openModalFunction={openModalHandler}
              itemBtnActionFunction={taskCompletedHandler}
              itemCreateFunction={createTaskHander}
              todoList={todoList}
            />
            <TaskContainer
              title="Today's Done List"
              icon='flag.png'
              itemIcon={CheckedIcon}
              itemBtnActionFunction={taskCompletedCancelHander}
              todoList={completedTodoList}
            />
            <TaskContainer
              title='My Routine To-do List'
              itemIcon={CheckedIcon}
              itemBtnActionFunction={taskCompletedCancelHander}
            />
          </SectionContainer>
        </TodoContainer>
      )}
    </div>
  );
}

const dummyRes_getCharacterInfo = {
  data: {
    characterInfo: {
      id: 0,
      user_id: 'TEST_USER_1',
      image: 'char_default',
      level: 1250,
      status_phy: 50,
      status_int: 20,
      status_spi: 30,
      medal: 'medal',
      created_at: '2022-05-08',
      updated_at: '2022-05-08',
      // Server 측에서 추가로 계산하여 보내줄 데이터 (요청예정)
      userLevel: 13,
      userExp: 50,
    },
  },
};

export default TodoListPage;
