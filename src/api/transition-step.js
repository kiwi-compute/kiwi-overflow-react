import { db } from '..';

export function transitionStep(step, roomID, callback) {
  db.collection('rooms').doc(roomID).update({ step }).then((room) => {
    if (callback) {
      callback();
    }
    return ({
      ...room,
      id: roomID,
    })
  })
}

window.transitionStep = transitionStep;
