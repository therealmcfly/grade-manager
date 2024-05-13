import { useEffect, useRef, useState } from "react";
import { GradeType, IComponent, IGrade } from "../types";
import GradeInput from "./GradeInput";

interface GradeItemProps {
	component: IComponent;
	parentPercentage: number;
	courseGrades: IGrade[];
	setCourseGrades: React.Dispatch<React.SetStateAction<IGrade[]>>;
	gradeToPass:number|null|undefined;
}
export default function GradeItem({component, parentPercentage, courseGrades, setCourseGrades, gradeToPass}:GradeItemProps): JSX.Element {
	const [ grade, setGrade ] = useState<number|null|undefined>(null);
	const [ inputEnabled, setInputEnabled ] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);

	
	const calculatePercentage = (percentage:number, parentPercentage:number = 100) => {
		if(parentPercentage) {
			return (((Number(percentage)/100) * Number(parentPercentage)).toFixed(2)) as unknown as number;
		}
		else {
			return percentage;
		}
	
	}
	const handleRemoveGrade = () => {
		setGrade(null);
		setInputEnabled(false);
		setCourseGrades((prev) => {
			const updatedGrades:IGrade[] = [];
			prev.map((prevGrade) => {
				const newGrade = {
					...prevGrade
				};
				if(newGrade.name === component.name) newGrade.grade = null;
				updatedGrades.push(newGrade);
			});
			return updatedGrades;
		});
		// remove from browser local storage
		localStorage.removeItem(component.name)
	}
	

	const handleSetClick = () => {
		setInputEnabled(!inputEnabled);
	}

	useEffect(() => {
		if(component.components) return;
		const gradeValue = courseGrades.find((g) => g.name === component.name)?.grade;
		if(gradeValue) {
			setGrade(gradeValue);
			//add to local storage);
			localStorage.setItem(component.name, gradeValue.toString());
		}
		// if(localStorage.getItem(component.name)) {
		// 	setGrade(Number(localStorage.getItem(component.name)));
		// }
		
	}, [courseGrades]);

	useEffect(() => {
		if(inputEnabled) {
			inputRef.current?.focus();
		}
	}, [inputEnabled])

	return (
		<div className="my-2 flex flex-col">
			<div className="flex justify-between content-center">
				<span>
					{`${component.name} - ${component.percentage}% (${calculatePercentage(component.percentage,parentPercentage)}%)`}
				</span>
				{!component.components && (grade === null || grade === undefined ?
					<span>
						{inputEnabled ? 
						<GradeInput 
							component={component} 
							setCourseGrades={setCourseGrades} 
							onClose={handleSetClick} 
							inputRef={inputRef}
						/>
						:
						<>
							<button 
								type="button" onClick={handleSetClick}
								className="border-white border-2 px-1"
							>Set</button>
							{/* <div className="text-blue-300">{`${gradeToPass?.toFixed(2)}% to pass the course`}</div> */}
						</>
						}
						
					</span>
					:
						<>
						<span className="flex justify-between content-center">
							<span className="text-lg text-yellow-500 mr-2">{`${grade}% `}</span>
							<button className="text-xs py-0.5 border-white border-2 px-1" type="button" onClick={handleRemoveGrade}>
								Remove
							</button>
						</span>

						</>
				)}
			</div>
			
			<div className="pl-5">
			{component.components && 
				<>
					{
						component.components.map((subComponent, i) => {
							return (
								<GradeItem 
									key={i} 
									component={subComponent} 
									parentPercentage={calculatePercentage(component.percentage,parentPercentage)}
									courseGrades={courseGrades}
									setCourseGrades={setCourseGrades}
									gradeToPass={gradeToPass}
									/>
							)
						})
					}
				</>
			}
			</div>
			
		</div>
	);
}