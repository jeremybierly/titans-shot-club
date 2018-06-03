import { database } from './firebase';

export const doCreateUser = (id, username, email) =>
  database.ref(`users/${id}/profile/`).set({
    username,
    email,
  });