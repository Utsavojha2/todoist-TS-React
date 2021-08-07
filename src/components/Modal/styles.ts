import styled from "styled-components";

export const ModalContainer = styled.div`
    position: absolute;
    inset: 0px;
    background: rgba(0,0,0,0.8);
    display: grid;
    place-items: center;
    z-index: 10;
`;

export const ModalContent = styled.div`
    background: red;
    color: black;
    height: 200px;
    width: 400px;
    display: grid;
    place-items: center;
    position: relative;

    & > *:nth-child(1){
        position: absolute;
        right: 10px;
        top: 10px;
        color: white;
        cursor: pointer;
    }

    & > section{
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

        & > h2 {
            color: white;
        }

        & > div{
            margin-top: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            column-gap: 15px;

            & > button{
                background: white;
                color: black;
                font-size: 17px;
                padding: 4px 15px;
                border: none;
                cursor: pointer;

                &:hover{
                    filter: brightness(80%);
                }
            }
        }
    }
`;