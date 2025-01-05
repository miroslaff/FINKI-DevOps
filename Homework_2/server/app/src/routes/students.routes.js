import express from "express";
import {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../services/students.service.js";

const router = express.Router();

// CRUD = Create; Read; Update; Delete

// The main route - localhost:3000/api/students
//
// localhost:3000/api/students?gender=F - everything after the ? is called a query string and is always in format: key-value pair
// localhost:3000/api/students?country=France

// if more than one key-value pair, it is separated by "&" symbol
// localhost:3000/api/students?gender=F&country=France

//1. Get all students
router.get("/students", (req, res) => {
  const queryData = req.query;
  console.log(queryData);

  // if no query passed, the query data will be an empty object, and it will return all the students
  // filter works ONLY by gender and country
  try {
    const students = getStudents(queryData);
    console.log(students);
    res.send(students);
  } catch (error) {
    res.sendStatus(500);
  }
});

//2. Get student by id
router.get("/students/:id", (req, res) => {
  const studentId = req.params.id;
  console.log(req.params);
  try {
    const student = getStudentById(studentId);
    res.status(200).send(student);
  } catch (error) {
    //you can have something like
    //errorLogger.emit("error", error)
    res.status(404).send(error.message);
  }
});

//3. Add new student
router.post("/students", (req, res) => {
  const newStudentData = req.body;
  console.log(newStudentData);

  try {
    const createdStudent = addStudent(newStudentData);
    console.log("CREATED", createdStudent);
    res.status(201).send(createdStudent);
  } catch (error) {
    res.sendStatus(500);
  }
});

//4. Update student info
router.patch("/students/:id", (req, res) => {
  const studentUpdates = req.body;
  const studentId = req.params.id;
  try {
    const updatedStudent = updateStudent(studentId, studentUpdates);
    res.status(200).send(updatedStudent);
  } catch (error) {
    if (error.message === "Student not found") {
      res.status(404).send(error.message);
    } else if (error.message === "Id can't be changed") {
      res.status(400).send(error.message);
    } else {
      res.sendStatus(500);
    }
  }
});

//5. Delete a student
router.delete("/students/:id", (req, res) => {
  const studentId = req.params.id;
  try {
    deleteStudent(studentId);
    res.sendStatus(200);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

export { router };
