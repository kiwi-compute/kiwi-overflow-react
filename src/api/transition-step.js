import { db } from '..';

export function transitionStep(step, roomID) {
  db.collection('rooms').doc(roomID).update({ step }).then((room) => {
    return ({
      ...room,
      id: roomID,
    })
  })
}