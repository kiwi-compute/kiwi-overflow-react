import { db } from 'kiwi';

export function subscribeToRoomByID(id, callback) {
  return db.collection('rooms').doc(id).onSnapshot((room) => {
    callback({ id: room.id, ...room.data() });
  });
}
