import { useState } from "react";
import GradeItem from "./GradeItem";


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

// const courseInstance = new Course(customCourseStructure);

interface GradeContainerProps {
}
export default function GradeContainer(): JSX.Element {
	
	return (
		<div className="mx-10">
			<h1 className="text-2xl underline my-5">{`${customCourseStructure.courseName} Grade Manager`}</h1>
			{
				customCourseStructure.subjects.map((subject, i) => {
					return (
						<GradeItem key={i} component={subject} parentPercentage={100}/>
						// <div key={i}>
						// 	<p className="text-xl underline mb-2 mt-5">{subject.name + " - [" + subject.percentage + "%]"}</p>
						// 	{
						// 		subject.components ?
						// 			subject.components.map(
						// 				(component, i) => {
						// 					// if(component.components) {
						// 					// 	return (
						// 					// 		<div key={i}>
						// 					// 			<p className="text-l mb-2">{component.name + " - [" + ((Number(component.percentage)/100) * Number(subject.percentage)) + "%]"}</p>
						// 					// 			{component.components.map((subComponent) => {
						// 					// 				return <GradeItem key={i} component={subComponent} parentPercentage={((Number(component.percentage)/100) * Number(subject.percentage))} />
						// 					// 			})}
						// 					// 		</div>
						// 					// 	);
						// 					// }
						// 					// else {
						// 					// }
						// 					return <GradeItem key={i} component={component} parentPercentage={subject.percentage} />
						// 				}
						// 			)									
						// 		: <GradeItem component={subject}/>
								
						// 	}
						// </div>
					)
					
				})
			}
		</div>
	);
}