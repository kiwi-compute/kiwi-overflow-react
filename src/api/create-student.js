import { db } from '..';

export function createStudent(student) {
  return db.collection('students').add(student).then((student) => ({
    ...student,
    id: student.id,
  }));
}
