import { React, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FixedSizeList } from "react-window";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import List from "@material-ui/core/List";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { UserCard } from "./UserCard";
import { getUsersStart, getUsersReset } from "../redux/actions/usersActions";
import { v4 as uuidv4 } from "uuid";
import {
  setDragging,
  setDraggingUser,
  setDraggingCardSelected,
} from "../redux/actions/dragDropActions";

const useStyles = makeStyles((theme) => ({
  listContainer: {
    backgroundColor: theme.palette.background.paper,
  },
  substr: {
    backgroundColor: "yellow",
  },
}));

export const UsersList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data, success } = useSelector((state) => state.users);
  const { filter } = useSelector((state) => state.filter);
  const [filteredGroups, setFilteredGroups] = useState(null);
  const [groupProps, setGroupProps] = useState([]);

  useEffect(() => {
    dispatch(getUsersStart());
  }, []);

  useEffect(() => {
    if (success) {
      dispatch(getUsersReset());

      setFilteredGroups(data); // Устанавливаем начальное значение массива групп пользователей
      // Устанавливаем начальные свойства групп (show - развернуть группу, containsUsers - если false, то отображать группу со свойством disabled)
      const groupProps = data.map((group) => ({
        show: true,
        containsUsers: group.users?.length > 0,
      }));
      setGroupProps(groupProps.slice());
    }
  }, [success]);

  useEffect(() => {
    if (data) {
      // При получении новых данных или изменении значения в поле поиска, выполняем фильтрацию по списку
      const filtered = data.reduce(
        (acc, group) => [
          ...acc,
          {
            ...group,
            users: filterUsers(group.users, filter),
          },
        ],
        []
      );

      filtered.forEach((group, index) => {
        changeGroupProps(index, "containsUsers", group.users?.length > 0);
      });

      setFilteredGroups(filtered);
    }
  }, [filter, data]);

  //Фильтрация списка пользователей. Если поле фильтрации пустое, то выводим весь список
  function filterUsers(users, filter) {
    return filter === ""
      ? users
      : users.filter((user) =>
          `${user.name.first} ${user.name.last}`.includes(filter)
        );
  }

  //Присваиваем свойству key группы с индексом index значение value
  function changeGroupProps(index, key, val) {
    setGroupProps((prev) => {
      const newArr = prev.slice();
      newArr[index] = {
        ...prev[index],
        [key]: val,
      };
      return newArr;
    });
  }

  // Сворачиваем/разворачиваем группу по клику, запоминаем состояние
  const handleAccordion = (index) => {
    changeGroupProps(index, "show", !groupProps[index].show);
  };

  // Начало перетягивания карточки из списка всех пользователей - запоминаем пользователя и то, что он еще не находится в списке избранных
  const dragStartHandler = (e, user) => {
    dispatch(setDraggingUser(user));
    dispatch(setDraggingCardSelected(false));
    dispatch(setDragging(true));
  };

  return (
    <div className={classes.listContainer}>
      {filteredGroups?.map((group, index) => (
        <Accordion
          key={uuidv4()}
          defaultExpanded={groupProps[index].containsUsers}
          expanded={groupProps[index].show && groupProps[index].containsUsers}
          onChange={() => handleAccordion(index)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            disabled={group?.users?.length === 0}
            aria-controls={`panel${index}a-content`}
            id={`panel${index}a-header`}
          >
            {group?.min} - {group?.max}
          </AccordionSummary>
          <AccordionDetails key={uuidv4()}>
            <FixedSizeList
              height={480}
              width="100%"
              itemCount={group.users?.length ?? 0}
              itemSize={80}
              component={List}
            >
              {({ index, style }) => (
                <UserCard
                  draggable={true}
                  onDragStart={(e) => dragStartHandler(e, group.users[index])}
                  key={uuidv4()}
                  user={group.users[index]}
                  filter={filter}
                  style={style}
                />
              )}
            </FixedSizeList>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
