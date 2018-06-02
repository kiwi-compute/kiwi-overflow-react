import { db } from '..';

export function getRoomByID(id) {
  return db.collection('rooms').doc(id).get().then((room) => {
    if (room.exists) {
      return {
        ...room.data(),
        id: room.id,
      };
    }

    return null;
  });
}

export function getRoomByName(name) {
  return db.collection('rooms').where('name', '==', name).get().then((rooms) => {
    if (!rooms.empty) {
      return {
        ...rooms.docs[0].data(),
        id: rooms.docs[0].id,
      };
    }

    return null;
  });
}
