// @flow
import styled from 'styled-components';

export const ClickableElement = styled.i`
  :hover {
    cursor: pointer;
  }
`;

export const PanelButton = styled.button`
  min-width: 200px;
  border: 0 !important;
  border-radius: 0 !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125) !important;

  :focus {
    outline: none !important;
  }
`;
