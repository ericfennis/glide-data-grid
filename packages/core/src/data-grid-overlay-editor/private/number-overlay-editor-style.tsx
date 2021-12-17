import styled from '@emotion/styled'
import { TP } from '../../common/styles';

export const NumberOverlayEditorStyle = styled.div<TP>`
    display: flex;
    margin-top: 6px;
    color: ${p => p.theme.textDark};

    > input {
        font-size: 13px;
        padding: 0;
        font-family: ${p => p.theme.fontFamily};
        color: ${p => p.theme.textDark};
    }
`;
