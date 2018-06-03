import { db } from 'kiwi';

export function createRoom(room) {
  return db.collection('rooms').add(room).then((rum) => {
    return ({
      ...room,
      id: rum.id,
    })
  })
}
