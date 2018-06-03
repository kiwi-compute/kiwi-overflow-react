import { db } from '..';

export function getAnswersForStep(roomID, questionID, step) {
  return db.collection('answers')
    .where('roomID', '==', roomID)
    .where('questionID', '==', questionID)
    .where('step', '==', step)
    .get()
    .then((answers) => {
      if (!answers.empty) {
        return answers.docs.map((answer) => ({
          ...answer.data(),
          id: answer.id,
        }));
      }

      return [];
    });
}

export function getTopAnswersForStep(roomID, questionID, step) {
  return db.collection('answers')
    .where('roomID', '==', roomID)
    .where('questionID', '==', questionID)
    .where('step', '==', step)
    .orderBy('score', 'desc')
    .limit(3)
    .get()
    .then((answers) => {
      if (!answers.empty) {
        return answers.docs.map((answer) => ({
          ...answer.data(),
          id: answer.id,
        }));
      }

      return [];
    });
}
