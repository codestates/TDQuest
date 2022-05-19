import React, { useState, useEffect } from 'react';
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


function TodoListPage() {
  const [loading, setLoading] = useState<boolean>(false);
  //--- modal 관련---//
  const [selectedTastContent, setSelectedTastContent] = useState({
    taskContent: '',
    taskId: '',
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
    console.log('task 삭제');
  };
  const saveTask = () => {
    // 태스크 내용 업데이트 관련 로직 ***
    console.log('task 수정');
  };
  const openModalHandler = (taskContent: string, taskId: string) => {
    // 특정 태스크 선택시 해당 태스크의 컨텐츠 내용과 태스크 아이디값을 가져온다
    setSelectedTastContent({ taskContent: taskContent, taskId: taskId });
    openModal();
  };
  // TaskContent_modal 로 보낼 함수
  const selectedTastContentHandler = (taskContent: string) => {
    setSelectedTastContent((prevState) => ({
      ...prevState,
      taskContent: taskContent,
    }));
  };
  //--- modal 관련 ---//
  //--- creating task 관련---//
  const createTaskHander = (taskContent: string, category: string) => {
    // 태스크 생성 관련 로직 ***
    console.log(taskContent);
    console.log(category);
  };

  //--- creating task 관련---//

  const taskCompletedHandler = () => {
    // 태스크 완료 관련 로직 ***
    console.log('task 완료');
  };

  const taskCompletedCancelHander = () => {
    // 태스크 완료 취소 관련 로직 ***
    console.log('task complete 취소');
  };

  return (
    <div>
      {loading ? (
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
              selectedTastContentHandler={selectedTastContentHandler}
              selectedTastContent={selectedTastContent.taskContent}
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
                charData={dummyRes_getCharacterInfo.data.characterInfo}
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
                  <h3>PHY + 1.5 Points</h3>
                  <h3>INT + 1.5 Points</h3>
                  <h3>SPI + 1.5 Points</h3>
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
            />
            <TaskContainer
              title="Today's Done List"
              icon='flag.png'
              itemIcon={CheckedIcon}
              itemBtnActionFunction={taskCompletedCancelHander}
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
      status_spl: 30,
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
