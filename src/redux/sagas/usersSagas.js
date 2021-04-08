import axios from "axios";
import { takeEvery, put, call } from "redux-saga/effects";
import { GET_USERS_START } from "../actions/types";
import { getUsersSuccess, getUsersError } from "../actions/usersActions";
import { sortUsers, groupUsers } from "../../functions/sorting";

export function* getUsersWatcher() {
  yield takeEvery(GET_USERS_START, getUsersWorker);
}

export function* getUsersWorker() {
  try {
    const data = yield call(getUsers);
    if (data.error) throw data.error;
    const sortedUsers = sortUsers(data?.results);
    const groupedUsers = groupUsers(sortedUsers);

    yield put(getUsersSuccess(groupedUsers));
  } catch (e) {
    yield put(getUsersError(e));
  }
}

async function getUsers() {
  const response = await axios.get(
    "https://randomuser.me/api/?results=3000&nat=us,de,fr,gb"
  );
  return await response.data;
}
