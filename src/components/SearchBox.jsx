import { React } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import { setFilter } from "../redux/actions/filterActions";

const useStyles = makeStyles((theme) => ({
  search: {
    fontSize: "1.25rem",
    fontWeight: "500",
    lineHeight: "1.6",
    letterSpacing: "0.0075em",
    margin: theme.spacing(4, 0, 2),
  },
}));

export const SearchBox = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.filter);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    dispatch(setFilter(value));
  };

  return (
    <Input
      placeholder="Поиск"
      onChange={handleFilterChange}
      name="filter"
      value={filter}
      className={classes.search}
      inputProps={{ "aria-label": "description" }}
    />
  );
};
