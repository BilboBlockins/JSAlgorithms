//ES6 Class Structure
//JS isn't really object oriented, but defining psuedo-classes helps keep code organized
//This acts like syntactical sugar for JS objects

class Student {
	// constructor function - called when the 'new' keyword is called
	constructor( firstName, lastName, age) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
		this.tardies = 0;
		this.scores = [];
	}
	// instance methods - gets called on instances
	fullName() {
		return `${this.firstName} ${this.lastName}`
	}
	markLate() {
		this.tardies++;
		return `${this.firstName} ${this.lastName} was late on ${new Date().toDateString()}`;
	}
	addScore(score) {
		this.scores.push(score);
		return this.scores;
	}
	calculateAverage() {
		let sum = this.scores.reduce((a,b)=>{return a+b});
		return sum/this.scores.length;
	}
	// class methods - like utility methods for the class
	static enrollStudents(students) {
		students.forEach(student => {return this.sendEmail(student)})
		return "All students enrolled."
	}
	static sendEmail(student) {
		console.log(`${student.fullName()}, you are enrolled in school.`);
	}

}

//Use the new keyword to instantiate a student object:
let Charlie = new Student("Charlie", "Bucket", 10);
let Veruca = new Student("Veruca", "Salt", 11);
// Can call instance methods on Charlie:
Charlie.fullName();
Charlie.markLate();
Charlie.addScore(90);
Charlie.addScore(82);
Charlie.calculateAverage();
// Can call class methods on Student class, but not instances:
Student.enrollStudents([Charlie, Veruca])

