// import { styled } from "../common/styles";
import styled from '@emotion/styled'
import { TP } from '../common/styles';

// const inputProps = css`
//     font-size: 13px;
//     line-height: 16px;
//     font-family: ${p => p.theme.fontFamily};
//     color: ${p => p.theme.textDark};
//     padding: 0;
//     margin: 0;
// `;

export const InputBox = styled.textarea<TP>`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;

    border-radius: 0px;

    resize: none;
    white-space: pre-wrap;
    min-width: 100%;
    overflow: hidden;
    border: 0;
    background-color: transparent;

    ::placeholder {
        color: ${p => p.theme.textLight};
    }

    font-size: 13px;
    line-height: 16px;
    font-family: ${p => p.theme.fontFamily};
    color: ${p => p.theme.textDark};
    padding: 0;
    margin: 0;
`;

export const ShadowBox = styled.div<TP>`
    visibility: hidden;
    white-space: pre-wrap;
    word-wrap: break-word;

    width: max-content;
    max-width: 100%;

    min-width: 100%;

    font-size: 13px;
    line-height: 16px;
    font-family: ${p => p.theme.fontFamily};
    color: ${p => p.theme.textDark};
    padding: 0;
    margin: 0;

    padding-bottom: 2px;
`;

export const GrowingEntryStyle = styled.div`
    position: relative;
    margin-top: 6px;
`;
