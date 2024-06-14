import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Row from './Row';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';

interface ConfirmationDialogProps {
  title: string;
  children: ReactNode;
  onConfirm: () => void;
  confirmText: string;
  confirmDisabled?: boolean;
  closeModal: () => void;
  isLoading?: boolean;
  cancelText: string;
}

const StyledConfirmDialog = styled(Row)`
  min-width: 20rem;
  max-width: 90dvw;
  max-height: 80dvh;
  align-items: center;
  padding: 0rem 0rem;
  font-weight: bold;
  overflow-y: auto;
  text-align: center;

  & p {
    margin-bottom: 1.2rem;
  }
`;

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  // title,
  children,
  onConfirm,
  confirmText,
  cancelText,
  confirmDisabled = false,
  closeModal,
  isLoading = false,
}) => {
  return (
    <StyledConfirmDialog type="vertical">
      {/* <span>{title}</span> */}
      <Row size="xLarge" type="vertical">
        {children}

        <Row $contentposition="center" size="xLarge">
          <Stack spacing={3} direction="row">
            <Button
              onClick={onConfirm}
              variant="outlined"
              sx={{
                color: 'black',
                backgroundColor: '#D9D9D9',
                fontWeight: 'bold',
                borderRadius: '11px',
              }}
              size="large"
              disabled={isLoading || confirmDisabled}
            >
              {isLoading ? '' : confirmText}
            </Button>

            <Button
              onClick={closeModal}
              variant="outlined"
              sx={{
                color: 'white',
                backgroundColor: '#5A9EEE',
                fontWeight: 'bold',
                borderRadius: '11px',

                ':hover': { backgroundColor: '#5A9EEE', color: 'white' },
              }}
            >
              {isLoading ? '' : cancelText}
            </Button>
          </Stack>
        </Row>
      </Row>
    </StyledConfirmDialog>
  );
};

export default ConfirmationDialog;
