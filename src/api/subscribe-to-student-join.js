import { db } from '..';

export function subscribeToRoomJoin(roomID, callback) {
  return db.collection('rooms_students')
    .where('roomID', '==', roomID)
    .onSnapshot({
      includeMetadataChanges: false,
    }, (students) => {
      if (!students.empty) {
        return callback(students.docs.length);
      }
    });
}