import { React } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import { UserCard } from "../components/UserCard";
import {
  addSelectedUser,
  removeSelectedUser,
  setSelectedUsers,
} from "../redux/actions/selectedUsersActions";
import {
  setDragging,
  setDraggingUser,
  setDraggingCardSelected,
} from "../redux/actions/dragDropActions";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  listContainer: {
    backgroundColor: theme.palette.background.paper,
  },
  selected: {
    height: "calc(100% - 86px)",
  },
  highlight: {
    boxShadow: "0px 0px 7px 1px orange",
  },
}));

export const SelectedUsersList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedUsers } = useSelector((state) => state.selectedUsers);
  const { dragging, draggingUser, draggingCardSelected } = useSelector(
    (state) => state.dragDrop
  );
  let isDropOnCard = false;

  // Начало перемещения карточки, находящейся в избранных. Запоминаем пользователя и то, что карточка из избранных
  const dragStartHandler = (e, user) => {
    isDropOnCard = false;
    dispatch(setDraggingUser(user));
    dispatch(setDraggingCardSelected(true));
    dispatch(setDragging(true));
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  // Бросок карточки на другую карточку
  const dropHandler = (e, user) => {
    e.preventDefault();
    isDropOnCard = true;

    //Если карточка уже находится в избранных
    if (draggingCardSelected) {
      dragInsideList(draggingUser, user, selectedUsers, (list) => {
        dispatch(setSelectedUsers(list));
      });
    } else {
      //Если карточка перетянута из другого списка
      dragFromAnotherList(draggingUser, user, selectedUsers, (list) => {
        dispatch(setSelectedUsers(list));
      });
    }
    dispatch(setDragging(false));
  };

  function dragInsideList(draggingUser, user, list, saveList) {
    //Предыдущее положение карточки в списке избранных
    const prevIndex = list.findIndex(
      (u) => u.login.uuid === draggingUser.login.uuid
    );
    //Новое положение карточк и в списке избранных
    const newIndex = list.findIndex((u) => u.login.uuid === user.login.uuid);

    let newList = list.slice();
    //Удаляем карточку со старой позиции в списке избранных
    newList.splice(prevIndex, 1);
    // Вставляем карточку на новую позицию в списке избранных
    newList.splice(newIndex, 0, draggingUser);
    saveList(newList);
  }

  //Проверяем, находится ли уже перемещаемый пользователь в списке избранных
  const findSelectedIndex = (draggingUser) =>
    selectedUsers.findIndex(
      (user) => user.login.uuid === draggingUser.login.uuid
    );

  //Перемещение карточки из списка всех пользователей в список избранных
  function dragFromAnotherList(draggingUser, user, list, saveList) {
    const index = findSelectedIndex(draggingUser);
    if (index != -1) return; // Если пользователь уже в списке избранных, выходим из функции

    // Определяем индекс карточки, на которую мы бросили
    const newIndex = list.findIndex((u) => u.login.uuid === user.login.uuid);
    let newList = list.slice();
    //Вставляем новую карточку на место карточки, на которую мы бросили.
    newList.splice(newIndex, 0, draggingUser);
    saveList(newList);
  }

  const dragOverListHandler = (e) => {
    e.preventDefault();
  };

  const dropOnListHandler = (e) => {
    e.preventDefault();
    //Если бросили на конкретную карточку, то не выполняем эту функцию
    if (isDropOnCard) return;
    const index = findSelectedIndex(draggingUser);

    //Если пользователя нет в избранных, то добавляем в конец. Если уже есть, то перемещаем в конец.
    if (index === -1) dispatch(addSelectedUser(draggingUser));
    else if (draggingCardSelected) {
      const newSelected = selectedUsers.slice();
      newSelected.splice(index, 1);
      newSelected.push(draggingUser);
      dispatch(setSelectedUsers(newSelected));
    }
    dispatch(setDragging(false));
  };

  //Удаление пользователя из избранных по клику на кнопку корзины
  const removeFromSelected = (user) => {
    dispatch(removeSelectedUser(user));
  };

  return (
    <Box
      className={`${classes.selected} ${dragging ? classes.highlight : ""}`}
      onDrop={dropOnListHandler}
      onDragOver={dragOverListHandler}
    >
      <div className={selectedUsers.length > 0 ? classes.listContainer : ""}>
        <List>
          {selectedUsers?.map((user) => (
            <Fade in={true} timeout={1000} key={`fade${user.login.uuid}`}>
              <div>
                <UserCard
                  draggable={true}
                  onDragStart={(e) => dragStartHandler(e, user)}
                  onDragOver={dragOverHandler}
                  onDrop={(e) => dropHandler(e, user)}
                  user={user}
                  key={user.login.uuid}
                  selected={true}
                  onRemove={() => removeFromSelected(user)}
                />
              </div>
            </Fade>
          ))}
        </List>
      </div>
    </Box>
  );
};
