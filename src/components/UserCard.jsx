import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "80px",
  },
  grabbable: {
    cursor: "move",
    cursor: "grab",
    cursor: "-moz-grab",
    cursor: "-webkit-grab",
    "&:active": {
      cursor: "grabbing",
      cursor: "-moz-grabbing",
      cursor: "-webkit-grabbing",
    },
  },
  bg: {
    backgroundColor: "inherit",
  },
}));

export const UserCard = ({
  user,
  selected = false,
  onRemove = null,
  ...props
}) => {
  const classes = useStyles();
  const { filter } = useSelector((state) => state.filter); //Значение из поля ввода "Поиск"

  const formatedDate = (string) => {
    const date = new Date(string);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    return `${day}.${month}.${year}`;
  };

  const createMarkup = (html) => {
    return { __html: html };
  };

  // Подсвечиваем найденные вхождения подстроки в имя и/или фамилию
  const highlightSubstr = (str, substr) =>
    str.replace(
      new RegExp(substr, "gi"),
      (match) => `<span style="background-color: #ffb77d">${match}</span>`
    );

  // Подготавливаем имя, фамилию и дату для отображения в карточке
  const createText = (user, filter, selected) => {
    let name = `${user?.name?.first} ${user?.name?.last}`;
    name = selected ? name : highlightSubstr(name, filter);
    return `${name}, дата регистрации: ${formatedDate(user?.registered?.date)}`;
  };

  return (
    <>
      <ListItem {...props} className={`${classes.grabbable} ${classes.card} `}>
        <ListItemAvatar>
          <Avatar src={user?.picture?.large} alt="User avatar">
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <Box className={classes.bg}>
          <Typography
            variant="body2"
            className={classes.bg}
            dangerouslySetInnerHTML={createMarkup(
              createText(user, filter, selected)
            )}
          />
          <Typography
            variant="body2"
            className={classes.bg}
            color="textSecondary"
          >
            {user?.email}
          </Typography>
        </Box>
        {selected && (
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={onRemove}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    </>
  );
};
