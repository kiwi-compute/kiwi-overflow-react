import { db } from '..';

export function addStudentToRoom(roomID, studentID) {
  return db.collection('rooms_students').add({ roomID, studentID });
}
