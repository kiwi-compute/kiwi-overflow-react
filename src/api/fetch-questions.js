import { db } from 'kiwi';

export function fetchQuestions() {
  return db.collection('questions').get().then((questions) => {
    if (!questions.empty) {
      return questions.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        }
      })
    }
  })
}