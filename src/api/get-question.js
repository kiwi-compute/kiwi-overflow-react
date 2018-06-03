import { db } from 'kiwi';

export function getQuestionByID(id) {
  return db.collection('questions').doc(id).get().then((question) => {
    if (question.exists) {
      return {
        ...question.data(),
        id: question.id,
      };
    }

    return null;
  });
}
