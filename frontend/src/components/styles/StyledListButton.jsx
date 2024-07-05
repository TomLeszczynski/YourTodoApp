import styled from "styled-components";

export const StyledListButton = styled.button`
    margin-top: 1rem;
    margin-left: 15px;
    padding: 5px 5px;
    border: 2px solid #2e2f9b;
    border-radius: 25%;
    color: #2e2f9b;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.2s linear;
    &:hover {
        color: #000;
        border-color: ${({$borderColor}) => $borderColor};
        background-color: ${({$backgroundColor}) => $backgroundColor};
    }
`;
