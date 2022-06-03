import React, { useEffect } from 'react';
import {
  MainpageContainer,
  Wrapper,
  LogoWrapper,
  DesCard,
  StatCard,
  BearWrapper,
} from './MainPageStyle';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  color_context_beige_light,
  color_primary_green_light,
} from '../../components/CommonStyle';
import Button from '../../components/Button'

function MainPage() {
  useEffect(() => {
    AOS.init();
  });

  return (
    <MainpageContainer bgColor={color_context_beige_light}>
      <LogoWrapper>
        <div>
          <img src={require('../../static/images/Logo.png')}></img>
          <h1> TDQuest</h1>
        </div>
        <p>Real-time to-do list app ever!</p>
      </LogoWrapper>

      <Wrapper bgColor={color_context_beige_light} direction={'row'}>
        <div>
          <img src={require('../../static/images/TodoSample.png')}></img>
        </div>

        <DesCard data-aos='fade-right'>
          <h1>Proceed To-Do List and get stat points!</h1>
          <br />
          <p>
            Complete your own To-Do list and get related stat points!
            <br />
            Feel your real stat grows.
          </p>
        </DesCard>
      </Wrapper>

      <Wrapper bgColor={color_primary_green_light} direction={'column'}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
          }}
          data-aos='fade-up'
        >
          <StatCard>
            <span>
              <img
                src={require('../../static/images/Physical.png')}
                style={{ width: '50px' }}
              ></img>
              <h1> Physical</h1>
            </span>

            <span>
              <p>
                Stats that rise when you do physical activities
                <br /> (ex : exercise, dance sports...)
              </p>
            </span>
          </StatCard>

          <StatCard>
            <span>
              <img
                src={require('../../static/images/Intelligence.png')}
                style={{ width: '50px' }}
              ></img>
              <h1>Intelligence</h1>
              <br />
            </span>

            <span>
              <p>
                Stats that go up when you're doing intellectual activities{' '}
                <br /> (ex : study, reading...)
              </p>
            </span>
          </StatCard>

          <StatCard>
            <span>
              <img
                src={require('../../static/images/Spirit.png')}
                style={{ width: '50px' }}
              ></img>
              <h1>Spirit</h1>
              <br />
            </span>

            <span>
              <p>
                Stats that rise when you do need patience activities <br /> (ex
                : art, Knitting...)
              </p>
            </span>
          </StatCard>
        </div>

        <BearWrapper>
          <img src={require('../../static/images/HelperBear.png')} />
          <span>
            <p>Complete tasks and upgrade your stats!</p>
          </span>
        </BearWrapper>
      </Wrapper>

      <Wrapper bgColor={color_context_beige_light} direction={'row'}>
        <DesCard data-aos='fade-left'>
          <h1>Get the rewards from Raid Boss!</h1>
          <br />
          <p>
            Remember! Raid boss open every weekend.
            <br /> You will meet three type of dangerous monsters.
            <br />
            Make your choice.
          </p>
        </DesCard>

        <div>
          <img src={require('../../static/images/RaidSample.png')}></img>
        </div>
      </Wrapper>

      <Wrapper bgColor={color_primary_green_light} direction={'row'}>
        <div>
          <img src={require('../../static/images/RankingSample.png')}></img>
        </div>

        <DesCard data-aos='fade-right'>
          <h1>Become a Weekly Top User!</h1>
          <br />
          <p>
            Do you want to be a top ranker? complete your task as much as you
            can.
          </p>
        </DesCard>
      </Wrapper>

      <Wrapper bgColor={color_context_beige_light} direction={'column'} type={'signup'}>
        <h1 style={{marginBottom : "1rem"}}>Don't you have account yet?</h1>
        <Button text='Sign Up' onClick={()=>{window.location.href = "/sign"}}/>
      </Wrapper>
    </MainpageContainer>
  );
}

export default MainPage;
