import { db } from 'kiwi';

export function voteOnAnswer(answerID, increment) {
  const answerRef = db.collection('answers').doc(answerID);
  return db.runTransaction(((transaction) => {
    return transaction.get(answerRef).then((answer) => {
      let score = increment ? answer.data().score + 1 : answer.data().score - 1;
      if (score < 0) {
        score = 0;
      }

      transaction.update(answerRef, { score });
    });
  }))
}
