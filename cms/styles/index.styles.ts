import styled from 'styled-components';
import { IconButton } from '@material-ui/core';

export const Wrapper = styled.div`
  margin: 40px;
`;

export const StyledButton = styled(IconButton)`
  position: absolute;
  z-index: 100;
  right: 1.4rem;
  top: 0.5rem;
`;
