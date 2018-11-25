insert into student values('s1', 'Student 1', 's1@email.com', 's1');
insert into student values('s2', 'Student 2', 's2@email.com', 's2');
insert into student values('s3', 'Student 3', 's3@email.com', 's3');
insert into student values('s4', 'Student 4', 's4@email.com', 's4');
insert into student values('s5', 'Student 5', 's5@email.com', 's5');
insert into student values('s6', 'Student 6', 's6@email.com', 's6');
insert into student values('s7', 'Student 7', 's7@email.com', 's7');

insert into instructor values('i1', 'Instructor 1', 'i1@email.com', 'i1');
insert into instructor values('i2', 'Instructor 2', 'i2@email.com', 'i2');
insert into instructor values('i3', 'Instructor 3', 'i3@email.com', 'i3');
insert into instructor values('i4', 'Instructor 4', 'i4@email.com', 'i4');
insert into instructor values('i5', 'Instructor 5', 'i5@email.com', 'i5');
insert into instructor values('i6', 'Instructor 6', 'i6@email.com', 'i6');
insert into instructor values('i7', 'Instructor 7', 'i7@email.com', 'i7');

insert into ta values('t1', 'Assistant 1', 't1@email.com', 't1');
insert into ta values('t2', 'Assistant 2', 't2@email.com', 't2');
insert into ta values('t3', 'Assistant 3', 't3@email.com', 't3');
insert into ta values('t4', 'Assistant 4', 't4@email.com', 't4');
insert into ta values('t5', 'Assistant 5', 't5@email.com', 't5');
insert into ta values('t6', 'Assistant 6', 't6@email.com', 't6');
insert into ta values('t7', 'Assistant 7', 't7@email.com', 't7');

insert into course values('CS101', 'Intro to Programming');
insert into course values('CS201', 'Mid level Programming');
insert into course values('CS301', 'Adv level Programming');

insert into topic(courseid, topicname) values('CS101', 'functions');
insert into topic(courseid, topicname) values('CS101', 'data types');
insert into topic(courseid, topicname) values('CS201', 'recursion');
insert into topic(courseid, topicname) values('CS201', 'classes');
insert into topic(courseid, topicname) values('CS301', 'inheritence');

insert into section(courseid, year, semester) values('CS101', 2018, 'Fall');
insert into section(courseid, year, semester) values('CS101', 2018, 'Spring');
insert into section(courseid, year, semester) values('CS201', 2018, 'Fall');
insert into section(courseid, year, semester) values('CS301', 2018, 'Spring');

insert into tasection values('t1', 1);
insert into tasection values('t1', 2);
insert into tasection values('t2', 2);

insert into teaches values('i1', 1);
insert into teaches values('i1', 4);
insert into teaches values('i2', 2);
insert into teaches values('i2', 3);

insert into takes values('s1', 1);
insert into takes values('s1', 3);
insert into takes values('s3', 2);
insert into takes values('s3', 3);

insert into quiz(qzName, secID, start, duration,weightage) values('Quiz 1', 1, '2018-09-22 19:10:25', '3 4:05:06', 0.25);
insert into quiz(qzName, secID, start, duration,weightage) values('Quiz 2', 1, '2018-09-25 09:00:00', '0:30:00', 0.25);
insert into quiz(qzName, secID, start, duration,weightage) values('Quiz 3', 1, '2018-11-22 09:00:00', '1:00:00',0.25);
insert into quiz(qzName, secID, start, duration,weightage) values('Quiz 1', 2, '2018-09-22 19:10:25', '3 4:05:06', 0.25);
insert into quiz(qzName, secID, start, duration,weightage) values('Quiz 2', 2, '2018-09-25 09:00:00', '0:30:00', 0.25);
insert into quiz(qzName, secID, start, duration,weightage) values('Quiz 3', 2, '2018-11-22 09:00:00', '1:00:00', 0.25);

insert into question(iid, problem, isObjective) values('i1', 'How many sides of a square?', TRUE);
insert into question(iid, problem, isObjective) values('i1', '2+2', TRUE);
insert into question(iid, problem, isObjective) values('i1', 'How many sides of a circle?', FALSE);
insert into question(iid, problem, isObjective) values('i2', 'What is capital of India?', TRUE);
insert into question(iid, problem, isObjective) values('i2', 'What is capital of France?', TRUE);

insert into option(qID, isCorrect, optNum, opt) values(1, FALSE, 1, '1');
insert into option(qID, isCorrect, optNum, opt) values(1, FALSE, 2, '2');
insert into option(qID, isCorrect, optNum, opt) values(1, FALSE, 3, '3');
insert into option(qID, isCorrect, optNum, opt) values(1, TRUE, 4, '4');

insert into option(qID, isCorrect, optNum, opt) values(2, FALSE, 1, '1');
insert into option(qID, isCorrect, optNum, opt) values(2, TRUE, 2, '2*2');
insert into option(qID, isCorrect, optNum, opt) values(2, FALSE, 3, '3');
insert into option(qID, isCorrect, optNum, opt) values(2, TRUE, 4, '4');

insert into option(qID, isCorrect, optNum, opt) values(3, TRUE, 1, 'Infinite');

insert into option(qID, isCorrect, optNum, opt) values(4, TRUE, 1, 'Delhi');
insert into option(qID, isCorrect, optNum, opt) values(4, FALSE, 2, 'Milan');
insert into option(qID, isCorrect, optNum, opt) values(4, FALSE, 3, 'Paris');
insert into option(qID, isCorrect, optNum, opt) values(4, FALSE, 4, 'New York');

insert into option(qID, isCorrect, optNum, opt) values(5, FALSE, 1, 'Delhi');
insert into option(qID, isCorrect, optNum, opt) values(5, FALSE, 2, 'Milan');
insert into option(qID, isCorrect, optNum, opt) values(5, TRUE, 3, 'Paris');
insert into option(qID, isCorrect, optNum, opt) values(5, FALSE, 4, 'New York');

insert into questiontopic values(1, 1);
insert into questiontopic values(2, 2);
insert into questiontopic values(3, 3);
insert into questiontopic values(4, 4);
insert into questiontopic values(5, 5);

insert into quizQuestion(qID, qzID, maxMarks) values(1, 1, 1);
insert into quizQuestion(qID, qzID, maxMarks) values(2, 1, 1);
insert into quizQuestion(qID, qzID, maxMarks) values(3, 1, 1);