import styled from 'styled-components';

type ItemProps = {
    color: string;
}

export const Item = styled.div<ItemProps>`
padding: 8px;
padding-left: 16px;
display: flex;
align-items: center;
column-gap: 5px;
margin-right: 5px;
position: relative;

& > div{
    display: flex;
    align-items: center;
    column-gap: 10px;
    flex: 1;

    & > h3 {
        font-weight: normal;
    }

    & > p {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: ${({ color }) => color};
    }
}

& >*:nth-child(2){
    display: none;
    transform: scale(0.8);
}

& >*:nth-child(3){
    display: none;
    transform: scale(0.8);
}

&:hover {
    cursor: pointer;
    background: #fff;

    & >*:nth-child(2), >*:nth-child(3){
        display: inline-block;
    }
}
`;

export const DeleteContainer = styled.div`
    position: absolute;
    left: 0px;
    bottom: -120px;
    width: 260px;
    height: 120px;
    background: gray;
    color: white;
    z-index: 100;
    display:flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 15px;
    padding: 12px;
    border-radius: 12px;
    text-align: center;

   & > div{
    display: flex;
    align-items: center;
    column-gap: 8px;

    & > button{
        font-size:16px;
        border: none;
        outline-width: 0px;
        border-radius: 4px;
        padding: 4px 10px;
        cursor: pointer;

        &:hover{
            filter: brightness(85%);
        }
    }
   }
`;