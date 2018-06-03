import { db } from 'kiwi';

export function subscribeToRoomByID(id, callback) {
  return db.collection('rooms').doc(id).onSnapshot({
    includeMetadataChanges: false,
  }, (room) => {
    callback({ id: room.id, ...room.data() });
  });
}
