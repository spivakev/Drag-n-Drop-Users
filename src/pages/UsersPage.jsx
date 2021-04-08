import { React } from 'react'
import { useSelector } from 'react-redux'
import { LoadingHOC } from '../hoc/LoadingHOC'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { UsersList } from '../components/UsersList';
import { SelectedUsersList } from '../components/SelectedUsersList';
import { SearchBox } from '../components/SearchBox';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 1024,
  },
  title: {
    lineHeight: "1.9",
    margin: theme.spacing(4, 0, 2),
  },
}));


export const UsersPage = () => {
  const classes = useStyles();
  const { loading, error } = useSelector(state => state.users)
  const state = { loading, error }

  return (
    <LoadingHOC state={state}>
      <Grid container justify="center">
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <SearchBox />
              <UsersList />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" className={classes.title}>
                Избранные
              </Typography>
              <SelectedUsersList />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </LoadingHOC>
  )
}
