import styled, { css } from 'styled-components';

type NavProps = { 
  darkMode: boolean 
};

export const HeadContainer = styled.header`
  background: var(--bg-color);
  color: var(--text-color);
  height: 52px;
  padding: 15px 25px;
`;

export const Navigation = styled.nav<NavProps>`
  display:flex;
  align-items:center;
  justify-content:space-evenly;

  & > h2{
    margin-left: -150px;
  }
  
  & > div{
      display: flex;
      align-items: center;
      column-gap: 22px;
      margin-right: -130px;

      & > p {
          font-size: 25px;;
          margin-top: -5px;
          cursor: pointer;

          &:hover{
            transform: scale(1.4);
            font-weight: 400;
          }
      }

      & > h3{
        cursor: pointer;
        ${({ darkMode }) => darkMode && css`
          text-decoration: underline;
          text-decoration-color: lightgray;
          color: lightgray;
        `}

        &:hover{
          color: #444;
        }
      }

      & > *:nth-child(3){
        width: 30px !important;
        height: 30px !important;
        cursor: pointer;

        &:hover{
          opacity: 0.8;
        }
      }

      & > *:nth-child(4){
        cursor: pointer;
        &:hover{
          opacity: 0.8;
        }
      }
  }
`;
