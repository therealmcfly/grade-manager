import { useEffect, useState } from "react";
import GradeItem from "./GradeItem";

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

const customCourseStructure:ICourseStructure = {
	courseName: "EAP2",
	passingGrade: 75,
	subjects: [
		{
			name: "Writing",
			percentage: 55,
			components: [
				{
					name: "Short Live Writing",
					percentage: 45,
					components: [
						{
							name: "Live Writing 1",
							percentage: 25
						},
						{
							name: "Live Writing 2",
							percentage: 25
						},
						{
							name: "Live Writing 3",
							percentage: 25
						},
						{
							name: "Live Writing 4",
							percentage: 25
						}
					]
				},
				{
					name: "Long Live Writing",
					percentage: 55,
					components: [
						{
							name: "Live Writing 5",
							percentage: 50
						},
						{
							name: "Live Writing 6",
							percentage: 50
						}
					]
				}
			]
		},
		{
			name: "Exam Strategies",
			percentage: 15,
			components: [
				{
					name: "Practice Test 1",
					percentage: 20
				},
				{
					name: "Practice Test 2",
					percentage: 20
				},
				{
					name: "Practice Test 3",
					percentage: 20
				},
				{
					name: "Practice Test 4",
					percentage: 20
				},
				{
					name: "Practice Test 5",
					percentage: 20
				}
			]
		},
		{ 
			name: "Presentations",
			percentage: 20,
			components: [
				{
					name: "Individual Presentation 1",
					percentage: 5
				},
				{
					name: "Individual Presentation 2",
					percentage: 10
				},
				{
					name: "Group Presentation 3",
					percentage: 30
				},
				{
					name: "Individual Presentation 4",
					percentage: 20
				},
				{
					name: "Individual Presentation 5",
					percentage: 35
				}
			],
		},
		{
			name: "Disscussions",
			percentage: 5,
			components: [
				{
					name: "Disscussions 1",
					percentage: 25
				},
				{
					name: "Disscussions 2",
					percentage: 25
				},
				{
					name: "Disscussions 3",
					percentage: 25
				},
				{
					name: "Disscussions 4",
					percentage: 25
				}
			]
		},
		{
			name: "Others",
			percentage: 5,
			components: [
				{
					name: "Attendance",
					percentage: 20
				},
				{
					name: "Completion",
					percentage: 20
				},
				{
					name: "Overall Participation",
					percentage: 20
				},
				{
					name: "Tutorial",
					percentage: 20
				},
				{
					name: "Presentation Participation",
					percentage: 20
				}
			]
		}
	],
}

const myInitialGrades:IGrade[] = [
	// {
	// 	name: "Live Writing 1",
	// 	grade: 90
	// }
]


interface GradeContainerProps {
}
export default function GradeContainer(): JSX.Element {
	const [courseGrades, setCourseGrades] = useState<IGrade[]>(myInitialGrades);
	const [ gradeToPass, setGradeToPass ] = useState<number>();

	useEffect(() => {
		
	}, [gradeToPass]);
	
	return (
		<div className="mx-10">
			<h1 className="text-2xl underline my-5">{`${customCourseStructure.courseName} Grade Manager`}</h1>
			{
				customCourseStructure.subjects.map((subject, i) => {
					return (
						<GradeItem 
							key={i} 
							component={subject} 
							parentPercentage={100} 
							courseGrades={courseGrades}
							setCourseGrades={setCourseGrades}
						/>
					)
				})
			}
		</div>
	);
}