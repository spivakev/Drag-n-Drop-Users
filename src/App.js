import { UsersPage } from "./pages/UsersPage"
import { Box } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <Box className="App">
      <CssBaseline />
      <UsersPage />
    </Box>
  );
}

export default App;
