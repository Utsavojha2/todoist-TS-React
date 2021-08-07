import styled, { css } from "styled-components";
type CTProps = {
  darkMode: boolean;
}

export const Container = styled.section<CTProps>`
border-top: 1px solid gray;
  flex: 0.75;
  ${({ darkMode }) => darkMode ? css`
    background: var(--bg-color);
    color: var(--text-color);

    & > div > *:nth-child(2) > div{
        column-gap: 12px;

      & > *:nth-child(1){
        background: red !important;
      }
    }
  ` : css`
    background: white;
    color: black;
  `}
`;

export const ContainerBody = styled.div`
    margin: 15px 5px;
    padding: 10px 25px;
`;

export const ContainerHead = styled.h1`
  text-align: center;
  font-size: 32px;
  margin-bottom: 24px;
`;

export const ContainerSection = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 22px;
  margin-left: 10px;
`;

type AddSecProps = {
  color: string;
  center?: boolean;
}
export const AddSection = styled.button<AddSecProps>`
   border: none;
   outline-width: 0px;
   padding: 7px 14px;
   background: ${({ color }) => color === 'primary' ? 'red': 'purple'};
   color: white;
   font-size: 16px;
   margin-top: 22px;
   margin-left: 15px;
   transition: opacity 0.3s ease-out;
   border-radius: 5px;
   margin-bottom: 15px;
   ${({ center }) => center && css`
      margin-left: 310px;
   `}

   &:hover{
     cursor: pointer;
     opacity: 0.6;
   }
`;

type InputProps = {
  error: boolean;
}

export const InputTaskSection = styled.div<InputProps>`
  margin: 4px 15px;
  & > input{
    width: 100%;
    max-width: 100% !important;
    height: 40px;
    padding: 5px;
    outline-width: 0px;
    text-indent: 1%;
    box-shadow: 0 2px 6px 3px rgba(0,0,0,0.55);
    border: none;
    ${({ error }) => error && css`
      box-shadow: none;
      border: 2px solid red;
    `};
  }

  & > div{
    margin-top: 10px;
    margin-left: -12px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > div:nth-child(1){
        display: flex;
        align-items: center;
        column-gap: 15px;

        & > p {
          cursor: pointer;
          &:hover{
            text-decoration: underline;
            text-decoration-color: lightgray;
          }
        }
    }

    & > div:nth-child(2){
      display: flex;
      align-items: center;
      column-gap: 6px;
    }
  }
`;

export const ContentIcons = styled.div`
  display: flex;
  flex-direction: column;

  & > div{
    /* margin-top: 20px; */
    display: flex;
    align-items: center;
    margin-right: 20px;

    & > *{
      padding: 5px;
      height: 30px;
      width: 35px;
      cursor: pointer;
      border-radius: 30px;

      &:hover{
        background: lightgray;
        opacity: 0.8; 
      }
    }
  }
`;

export const CalendarOptions = styled.section`
   display: flex;
`;

export const CalendarOptionsList = styled.ul`
  margin-left: auto;
  margin-right: 10px;
  list-style-type: none;
  min-height: 100px;
  width: 180px;
  padding: 8px 0;
  border-radius: 6px;
  box-shadow: 0px 3px 5px 2px rgba(0,0,0,0.66);
  display: grid;
  place-items: stretch;
  align-content: stretch;

  & > li {
    text-align: center;
    border-bottom: 1px solid lightgray;
    padding-top: 5px;
    cursor: pointer;
    height: 31px;

    &:hover{
      background: lightgray;
    }
  }
`;
