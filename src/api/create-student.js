import { db } from 'kiwi';

export function createStudent(student) {
  return db.collection('students').add(student).then((data) => ({
    ...student,
    id: data.id,
  }));
}
