import { db } from 'kiwi';

export function subscribeToAnswers(roomID, questionID, step, callback) {
  return db.collection('answers')
    .where('roomID', '==', roomID)
    .where('questionID', '==', questionID)
    .where('step', '==', step)
    .onSnapshot({
      includeMetadataChanges: true,
    }, (answers) => {
      if (!answers.empty) {
        return callback(answers.docs.map((answer) => ({
          ...answer.data(),
          id: answer.id,
        })));
      }

      return callback([]);
    });
}
