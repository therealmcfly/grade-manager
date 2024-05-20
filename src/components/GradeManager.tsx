import { useEffect, useState } from "react";
import GradeItem from "./GradeItem";
import { stringify } from "querystring";
import GradeHeader from "./GradeHeader";
import { ICourseStructure, IComponent, IGrade, GradeType } from "../types";

const customCourseStructure:ICourseStructure = {
	courseName: "EAP 2",
	passingGrade: 75,
	subjects: [
		{
			name: "Writing",
			percentage: 55,
			components: [
						{
							name: "Live Writing 1",
							percentage: 5,
							gradeType: GradeType.Percent
						},
						{
							name: "Live Writing 2",
							percentage: 10,
							gradeType: GradeType.Percent

						},
						{
							name: "Live Writing 3",
							percentage: 15,
							gradeType: GradeType.Percent
						},
						{
							name: "Live Writing 4",
							percentage: 15,
							gradeType: GradeType.Percent
						},
						{
							name: "Live Writing 5",
							percentage: 20,
							gradeType: GradeType.Percent
						},
						{
							name: "Live Writing 6",
							percentage: 35,
							gradeType: GradeType.Percent
						}
			]
		},
		{
			name: "Exam Strategies",
			percentage: 15,
			components: [
				{
					name: "Practice Test 1",
					percentage: 20,
					components: [
						// make 3 components reading, listining, writing
						{
							name: "Reading 1",
							percentage: 33.33,
							gradeType: GradeType.Number
						},
						{
							name: "Listening 1",
							percentage: 33.33,
							gradeType: GradeType.Number
						},
						{
							name: "Writing 1",
							percentage: 33.34,
							gradeType: GradeType.Percent
						}
					]
				},
				{
					name: "Practice Test 2",
					percentage: 20,
					components: [
						// make 3 components reading, listining, writing
						{
							name: "Reading 2",
							percentage: 33.33,
							gradeType: GradeType.Number
						},
						{
							name: "Listening 2",
							percentage: 33.33,
							gradeType: GradeType.Number
						},
						{
							name: "Writing 2",
							percentage: 33.34,
							gradeType: GradeType.Percent
						}
					]
				},
				{
					name: "Practice Test 3",
					percentage: 20,
					components: [
						// make 3 components reading, listining, writing
						{
							name: "Reading 3",
							percentage: 33.33,
							gradeType: GradeType.Number
						},
						{
							name: "Listening 3",
							percentage: 33.33,
							gradeType: GradeType.Number
						},
						{
							name: "Writing 3",
							percentage: 33.34,
							gradeType: GradeType.Percent
						}
					]
				},
				{
					name: "Practice Test 4",
					percentage: 20,
					components: [
						// make 3 components reading, listining, writing
						{
							name: "Reading 4",
							percentage: 33.33,
							gradeType: GradeType.Number
						},
						{
							name: "Listening 4",
							percentage: 33.33,
							gradeType: GradeType.Number
						},
						{
							name: "Writing 4",
							percentage: 33.34,
							gradeType: GradeType.Percent
						}
					]
				},
				{
					name: "Practice Test 5",
					percentage: 20,
					components: [
						// make 3 components reading, listining, writing
						{
							name: "Reading 5",
							percentage: 33.33,
							gradeType: GradeType.Number
						},
						{
							name: "Listening 5",
							percentage: 33.33,
							gradeType: GradeType.Number
						},
						{
							name: "Writing 5",
							percentage: 33.34,
							gradeType: GradeType.Percent
						}
					]
				}
			]
		},
		{ 
			name: "Presentations",
			percentage: 20,
			components: [
				{
					name: "Individual Presentation 1",
					percentage: 5,
					gradeType: GradeType.Percent
				},
				{
					name: "Individual Presentation 2",
					percentage: 10,
					gradeType: GradeType.Percent
				},
				{
					name: "Group Presentation 3",
					percentage: 30,
					gradeType: GradeType.Percent
				},
				{
					name: "Individual Presentation 4",
					percentage: 20,
					gradeType: GradeType.Percent
				},
				{
					name: "Individual Presentation 5",
					percentage: 35,
					gradeType: GradeType.Percent
				}
			],
		},
		{
			name: "Disscussions",
			percentage: 5,
			components: [
				{
					name: "Disscussions 1",
					percentage: 20,
					gradeType: GradeType.Number
				},
				{
					name: "Disscussions 2",
					percentage: 20,
					gradeType: GradeType.Number
				},
				{
					name: "Disscussions 3",
					percentage: 20,
					gradeType: GradeType.Number
				},
				{
					name: "Disscussions 4",
					percentage: 20,
					gradeType: GradeType.Number
				},
				{
					name: "Disscussions 5",
					percentage: 20,
					gradeType: GradeType.Number
				}
			]
		},
		{
			name: "Others",
			percentage: 5,
			components: [
				{
					name: "Attendance",
					percentage: 20,
					gradeType: GradeType.Percent
				},
				{
					name: "Completion",
					percentage: 20,
					gradeType: GradeType.Percent
				},
				{
					name: "Overall Participation",
					percentage: 20,
					gradeType: GradeType.Percent
				},
				{
					name: "Tutorial",
					percentage: 20,
					gradeType: GradeType.Percent
				},
				{
					name: "Presentation Participation",
					percentage: 20,
					gradeType: GradeType.Percent
				}
			]
		}
	],
}

const myInitialGrades = [
	{
		name: "Live Writing 1",
		grade: 90
	}
]

interface GradeContainerProps {
}
export default function GradeManager(): JSX.Element {
	const [ courseStructure, setCourseStructure ] = useState<ICourseStructure>(customCourseStructure);
	const [ basePassingGrade, setBasePassingGrade ] = useState<number>(courseStructure.passingGrade);
	const [ courseGrades, setCourseGrades ] = useState<IGrade[]>([]);
	const [ gradeToPass, setGradeToPass ] = useState<number|null>(null);
	const [ averageGrade, setAverageGrade ] = useState<number|null>(null);

	const createGrades = (structure:ICourseStructure, localStorage:Storage, prevGrades?:{name:string, grade:number}[]):IGrade[] => {
		const createGradeObject = (grades:IGrade[], name:string, percentage:number, gradeType:GradeType, grade?:number) => {
			grades.push({
				name: name,
				percentage: percentage,
				gradeType: gradeType,
				grade: grade? grade : null
			})
		}
		const loopThroughComponents = (components:IComponent[], grades:IGrade[], ) => {
	
		}
		const grades:IGrade[] = [];
		structure.subjects.map((subject) => {
			if (subject.components) {
	
				subject.components.map((component) => {
					if(component.components) {
						component.components.map((subComponent) => {
							grades.push({
								name: subComponent.name,
								percentage: ((subComponent.percentage/100 * component.percentage)/100) * subject.percentage,
								gradeType: subComponent.gradeType,
								grade: null
							})
						})
					}
					else {
						grades.push({
							name: component.name,
							percentage: (component.percentage/100) * subject.percentage,
							gradeType: component.gradeType,
							grade: null
						})
					}
				})
			}
			else {
				grades.push({
					name: subject.name,
					percentage: subject.percentage,
					gradeType: subject.gradeType,
					grade: null
				})
			}
		})
	
		if (prevGrades) {
			console.log("grade data submitted");
			prevGrades.map((g) => {
				localStorage.setItem(g.name, g.grade.toString());
			})
		}
	
		Object.keys(localStorage).forEach((gradeName) => {
			const gradeToChange = grades.find((g) => g.name === gradeName);
			if(gradeToChange) {
				gradeToChange.grade = Number(localStorage.getItem(gradeName));
			}
			else {
				console.log(`"${gradeName}" does not exist in the ${structure.courseName} course structure.`);
			}
		});
	
		return grades;
	}

	const gradeDataLocalStorageSaver = (action:string, gradeName:string, grade:string) => {
		//need to work on this
		// const currentCourse = courseStructure.courseName;
		// const prevGrade = {...localStorage.getItem(currentCourse)};

		// if(action === "save") localStorage.setItem(currentCourse, );
		// if(action === "remove") localStorage.removeItem(gradeName);
		// if(action === "clear") localStorage.clear();
	};

	useEffect(() => {
		setCourseGrades(createGrades(courseStructure, localStorage));
	}, []);

	useEffect(() => {

		if(courseGrades.length < 1) return;
		const passingPercentGrade = basePassingGrade;
		let noGradePercentageSum:number = 0;
		let yesGradePercentageSum:number = 0;
		let yesGradeSum:number = 0;
		let gradesArr:number[] = [];

		courseGrades.map((g) => {
			if(g.grade === null || g.grade === undefined) {
				noGradePercentageSum = noGradePercentageSum + g.percentage;
			} else {
				yesGradePercentageSum = yesGradePercentageSum + g.percentage;
				yesGradeSum = yesGradeSum + (g.grade * (g.percentage/100));

				gradesArr.push(g.grade);
			}
		})

		
		console.log(noGradePercentageSum + yesGradePercentageSum);
		if(noGradePercentageSum + yesGradePercentageSum < 99.9 && noGradePercentageSum + yesGradePercentageSum > 100.1) {
			alert("The sum of the percentages do not equal 100%. Please check the course structure. : " + (noGradePercentageSum + yesGradePercentageSum));
			console.log(noGradePercentageSum + yesGradePercentageSum);
		}

		if(gradesArr.length < 1) {
			setGradeToPass(passingPercentGrade);
			setAverageGrade(null);
			return;
		} else {
			const gradeToAcquire = passingPercentGrade - yesGradeSum;
			if(yesGradeSum + gradeToAcquire !== passingPercentGrade) {
				alert("The sum of the grades do not equal the passing grade. Please check the course structure.");
			}
			const currGradePercentToPass = (gradeToAcquire / noGradePercentageSum) * 100;

			console.log(yesGradePercentageSum);
			console.log(gradeToAcquire);

			setGradeToPass(currGradePercentToPass);
			
			setAverageGrade(gradesArr.reduce((a, b) => a + b, 0) / gradesArr.length);
		}

		
	}, [courseGrades, basePassingGrade]);
	
	return (
		<div className="flex flex-col w-100 h-100 px-5">
			<GradeHeader 
				courseStructure={courseStructure} 
				gradeToPass={gradeToPass} 
				basePassingGrade={basePassingGrade} 
				setBasePassingGrade={setBasePassingGrade}
				averageGrade={averageGrade}
			/>
			<div className="pt-56">
				{
					courseStructure.subjects.map((subject, i) => {
						return (
							<GradeItem 
								key={i} 
								component={subject} 
								parentPercentage={100} 
								courseGrades={courseGrades}
								setCourseGrades={setCourseGrades}
								gradeToPass={gradeToPass}
							/>
						)
					})
				}
			</div>
			
		</div>
	);
}
