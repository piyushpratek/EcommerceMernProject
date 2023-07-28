import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface ErrorMessageProps {
  error: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  const options = {
    anchorOrigin: { vertical: "bottom", horizontal: "center" } as const,
    autoHideDuration: 5000,
  };
  return (
    <Snackbar open={error !== null} autoHideDuration={options.autoHideDuration} anchorOrigin={options.anchorOrigin} >
      <Alert variant="filled" severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
};

export default ErrorMessage;
