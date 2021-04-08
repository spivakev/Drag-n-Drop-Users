/* Функция для сравнения пользователей при сортировке */
export const compareUsers = (a, b) => {
  if (a.registered.age < b.registered.age) return -1;
  if (a.registered.age > b.registered.age) return 1;
  return 0;
};

/* Сортировка массива пользователей по возрастанию registered.age */
export const sortUsers = (users) => users?.sort(compareUsers);

/* Создание объекта группы для массива групп */
export const createGroup = (max, users) => ({ min: max - 9, max, users });

/* Создание массива групп пользователей. Группировка осуществляется по registered.age */
export const groupUsers = (users) => {
  const res = [];
  let i = 0,
    max = 10,
    group = [];

  while (i < users.length) {
    if (users[i].registered.age <= max) {
      group.push(users[i]);
      i++;
    } else {
      res.push(createGroup(max, group.slice()));
      max += 10;
      group = [];
    }
  }
  if (group.length > 0) res.push(createGroup(max, group.slice()));

  return res;
};
