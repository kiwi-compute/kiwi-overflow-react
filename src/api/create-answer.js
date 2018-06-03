import { db } from '..';

export function createAnswer(answer) {
  return db.collection('answers').add({
    ...answer,
    score: 0,
  }).then((data) => ({
    ...answer,
    id: data.id,
  }));
}
