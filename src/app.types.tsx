interface ICourseStructure {
	courseName: string;
	passingGrade: number;
	subjects: IComponent[];
}
class CourseGrades {
	courseName: string;
	passingGrade: number;
	grades:IGrade[];
	constructor(courseStructure: ICourseStructure, grade?:IGrade[]) {
		this.courseName = courseStructure.courseName;
		this.passingGrade = courseStructure.passingGrade;
		grade ? this.grades = grade : this.grades = [];
		courseStructure.subjects.map((subject) => {
			if (subject.components) {
				subject.components.map((component) => {
					if(component.components) {
						component.components.map((subComponent) => {
							this.grades.push({
								name: subComponent.name,
								percentage: ((subComponent.percentage/100 * component.percentage)/100) * subject.percentage,
								grade: null
							})
						})
					}
					else {
						this.grades.push({
							name: component.name,
							percentage: (component.percentage/100) * subject.percentage,
							grade: null
						})
					}
				})
			}
			else {
				this.grades.push({
					name: subject.name,
					percentage: subject.percentage,
					grade: null
				})
			}
		})

		// if(grade)	{
		// 	console.log("grade data submitted");
		// 	grade.map((g) => {
		// 		const thisGrade = this.grades.find((thisGrade) => thisGrade.name === g.name);
		// 		if(thisGrade) {
		// 			thisGrade.grade = g.grade;
		// 		}
		// 		else {
		// 			this.grades.push(g);
		// 		}
		// 	})
		// }
	}
	public updateGrade(name:string, grade:number) {
		this.grades.find((grade) => grade.name === name)!.grade = grade;
	}
}

interface IGrade {
	name: string;
	percentage?: number;
	grade: number|null|undefined;
}

interface IComponent {
	name: string;
	percentage: number;
	components?: IComponent[];
}