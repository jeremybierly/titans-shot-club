import { database } from './firebase';

export const doCreateUser = (id, username, grade, email) =>
  database.ref(`users/${id}/profile/`).set({
    username,
    grade,
    email,
  });