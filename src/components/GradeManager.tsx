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
					name: "Discussions 1",
					percentage: 20,
					gradeType: GradeType.Number
				},
				{
					name: "Discussions 2",
					percentage: 20,
					gradeType: GradeType.Number
				},
				{
					name: "Discussions 3",
					percentage: 20,
					gradeType: GradeType.Number
				},
				{
					name: "Discussions 4",
					percentage: 20,
					gradeType: GradeType.Number
				},
				{
					name: "Discussions 5",
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
	const [ targetGrade, setTargetGrade ] = useState<number>(courseStructure.passingGrade);
	const [ courseGrades, setCourseGrades ] = useState<IGrade[]>([]);
	const [ gradeToPass, setGradeToPass ] = useState<number|null>(null);
	const [ averageGrade, setAverageGrade ] = useState<number|null>(null);
	const [ expectedGrade, setExpectedGrade ] = useState<number|null>(null);
	const [ overallGrade, setOverallGrade ] = useState<number|null>(null);

	const createGrades = (structure:ICourseStructure, localStorage:Storage, prevGrades?:{name:string, grade:number}[]):IGrade[] => {
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

		let s:string[] = [];
	
		Object.keys(localStorage).forEach((gradeName) => {
			let gradeToChange = grades.find((g) => g.name === gradeName);

			// if gradeName includes "Disscussions" then find the grade with the last character of the string
			if(gradeToChange) {
				gradeToChange.grade = Number(localStorage.getItem(gradeName));
			}
			else {
				console.log(`"${gradeName}" does not exist in the ${structure.courseName} course structure.`);
			}
			if(gradeName.includes("Disscussions")) {
				const lastCharOfStr = gradeName.charAt(gradeName.length - 1);
				if(Object.keys(localStorage).find((g) => g === `Discussions ${lastCharOfStr}`)) {
					s.push(gradeName);
				} else {
					gradeToChange = grades.find((g) => g.name === `Discussions ${lastCharOfStr}`);
				console.log(gradeToChange);
				}
			}
			
			if(gradeToChange) {
				gradeToChange.grade = Number(localStorage.getItem(gradeName));
			}
			else {
				console.log(`"${gradeName}" does not exist in the ${structure.courseName} course structure.`);
			}
			
		});

		s.forEach((gradeName) => {
			localStorage.removeItem(gradeName);
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
		const passingPercentGrade = targetGrade;
		let noGradesArr:IGrade[] = [];
		let noGradePercentageSum:number = 0;
		let yesGradePercentageSum:number = 0;
		let yesGradeSum:number = 0;
		let noGradeSum:number = 0;
		let yesGradesArr:number[] = [];

		courseGrades.map((g) => {
			if(g.grade === null || g.grade === undefined) {
				noGradePercentageSum = noGradePercentageSum + g.percentage;
				noGradesArr.push(g);
					
			} else {
				yesGradePercentageSum = yesGradePercentageSum + g.percentage;
				yesGradeSum = yesGradeSum + (g.grade * (g.percentage/100));

				yesGradesArr.push(g.grade);
			}
		})

		
		console.log(noGradePercentageSum + yesGradePercentageSum);

		if(noGradePercentageSum + yesGradePercentageSum < 99.9 && noGradePercentageSum + yesGradePercentageSum > 100.1) {
			alert("The sum of the percentages do not equal 100%. Please check the course structure. : " + (noGradePercentageSum + yesGradePercentageSum));
			console.log(noGradePercentageSum + yesGradePercentageSum);
		}

		if(yesGradesArr.length < 1) {
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

			console.log(yesGradesArr.reduce((a, b) => a + b, 0) / yesGradesArr.length);
			const yesGradeAverage = yesGradesArr.reduce((a, b) => a + b, 0) / yesGradesArr.length;
			
			setAverageGrade(yesGradeAverage);

			noGradesArr.map((g) => {
				console.log(yesGradeAverage);
				noGradeSum = noGradeSum + (yesGradeAverage * (g.percentage/100));
			});

			setExpectedGrade(yesGradeSum + noGradeSum);

			if(yesGradesArr.length === courseGrades.length) {
				setOverallGrade(yesGradePercentageSum);
			}
			
		}
		
		
	}, [courseGrades, targetGrade]);
	
	return (
		<div className="flex flex-col w-100 h-100 px-5">
			<GradeHeader 
				courseStructure={courseStructure} 
				gradeToPass={gradeToPass} 
				targetGrade={targetGrade} 
				setTargetGrade={setTargetGrade}
				averageGrade={averageGrade}
				expectedGrade={expectedGrade}
				overallGrade={overallGrade}
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
