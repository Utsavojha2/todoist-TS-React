import styled, { css } from 'styled-components';

type SidebarProps = {
    isHidden: boolean;
}

export const SideContainer = styled.section`
  flex: 0.25;
`;

export const SideHeader = styled.ul`
  list-style: none;
  margin-top: 40px;

  & > li {
      display: flex;
      align-items:center;
      column-gap: 8px;
      padding: 10px;
      cursor: pointer;
      margin-right: 5px;

      &:hover{
          background: #ffff;
      }
  }
`;

export const SideBody = styled.section<SidebarProps>`
    margin-top: 12px;
    margin-right: 5px;

  & > div:nth-child(1){
    display: flex;
    align-items: center;
    column-gap: 8px;
    padding: 10px;
    border-bottom: 2px solid lightgray;

    & > *:nth-child(1){
        ${({ isHidden }) => isHidden && css`
            transform: rotate(180deg);
        `};
    }

    &:hover{
        cursor: pointer;
        background: #fff;
    }
  }
`;

export const FetchList = styled.div`
    margin: 15px 0;
`;

export const InputSection = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    padding: 10px 5px;

    & > input {
        height: 30px;
        outline-width: 0px;
        text-indent: 2%;
        border-radius: 4px;
        border: none;
        font-size:17px;
    }

     & > div{
         display: flex;
         align-items: center;
         column-gap: 10px;
         margin: 5px;

        & > button {
            border: none;
            outline-width: 0px;
            padding: 6px 8px;
            cursor: pointer;
            font-size: 16px;

            &:hover{
                filter: brightness(85%);
            }
        }   

        & > button:nth-child(1){
            background: red;
            color: white;
        }

        & > *:nth-child(3){
            cursor: pointer;

            &:hover{
                opacity: 0.5;
            }
        }
     }
`;

export const AddSection = styled.div`
    display:flex;
    align-items: center;
    column-gap: 5px;
    padding: 10px;
    margin: 10px 5px;

    &:hover{
        cursor: pointer;
        background: #fff;
    }
`;