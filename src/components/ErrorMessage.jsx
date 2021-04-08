import { Alert, AlertTitle } from '@material-ui/lab';

export const ErrorMessage = ({ error }) => (
  <Alert severity="error">
    <AlertTitle>Ошибка</AlertTitle>
    {error}
  </Alert>
)