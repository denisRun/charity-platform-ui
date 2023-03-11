import styled from '@emotion/styled';
import { MaterialDesignContent } from 'notistack'

const StyledSnackbar = styled(MaterialDesignContent)(() => ({
    '&.notistack-MuiContent-success': {
      backgroundColor: '#b4c461',
    },
    '&.notistack-MuiContent-error': {
      backgroundColor: '#f4463a',
    },
  }));

export default StyledSnackbar;