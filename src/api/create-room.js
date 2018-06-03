import { db } from 'kiwi';

export function createRoom(room) {
  return db.collection('rooms').add(room).then((data) => {
    return ({
      ...room,
      id: data.id,
    })
  })
}
