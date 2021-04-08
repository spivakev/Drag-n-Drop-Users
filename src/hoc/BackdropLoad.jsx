import { Backdrop, CircularProgress, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export const BackdropLoad = ({ loading, children }) => {
  const classes = useStyles();
  return (
    <Box>
      {children}
      {loading && (
        <Backdrop className={classes.backdrop} open={loading} >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Box>
  );
}
