interface ICourseStructure {
	courseName: string;
	passingGrade: number;
	subjects: IComponent[];
}
class Course {
	courseSturcture: ICourseStructure;
	courseName: string;
	grade;
	constructor(courseStructure: ICourseStructure, ) {
		this.courseSturcture = courseStructure;
		this.courseName = courseStructure.courseName;
		this.grade = {
		}
	}
	// public createGrade() {
	// 	const subjects:any[] = [];
	// 	if(this.courseSturcture.subjects.length !== 0) {
	// 		this.courseSturcture.subjects.forEach((subject) => {
	// 			if(subject.components) {

	// 			}
	// 			else {

	// 			}

	// 		});
	// 	}
	// }
}

class Grade {
	constructor(grade: number, weight: number) {
		// this.grade = grade;
		// this.weight = weight;
	}
}

interface IComponent {
	name: string;
	percentage: number;
	components?: IComponent[];
}