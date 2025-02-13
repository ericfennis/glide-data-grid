import styled from "@emotion/styled";
import * as React from "react";

interface WrapperProps {
    width: number;
    height: number;
}

const Wrapper = styled.div<WrapperProps>`
    overflow: hidden;
    position: relative;

    width: ${p => p.width}px;
    height: ${p => p.height}px;

    > :first-child {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
`;

interface Props extends WrapperProps, React.HTMLAttributes<HTMLDivElement> {}

const DataEditorContainer: React.FunctionComponent<React.PropsWithChildren<Props>> = p => {
    const { width, height, children, ...rest } = p;
    return (
        <Wrapper width={width} height={height} {...rest}>
            {children}
        </Wrapper>
    );
};

export default DataEditorContainer;
