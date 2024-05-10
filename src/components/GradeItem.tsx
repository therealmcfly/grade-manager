import { useEffect, useState } from "react";
import { GradeType, IComponent, IGrade } from "../types";

interface GradeItemProps {
	component: IComponent;
	parentPercentage: number;
	courseGrades: IGrade[];
	setCourseGrades: React.Dispatch<React.SetStateAction<IGrade[]>>;
	gradeToPass:number|null|undefined;
}
export default function GradeItem({component, parentPercentage, courseGrades, setCourseGrades, gradeToPass}:GradeItemProps): JSX.Element {
	const [ inputValue, setInputValue ] = useState<string>("");
	const [ grade, setGrade ] = useState<number|null|undefined>(null);
	const [ inputEnabled, setInputEnabled ] = useState<boolean>(false);

	const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		
		if(Number(e.target.value) > 100) return;
		setInputValue(e.target.value);
	}
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
	}
	const handleSubmitInput = () => {
		if(inputValue === "") return;
		setCourseGrades((prev) => {
			const updatedGrades:IGrade[] = [];
			prev.map((prevGrade) => {
				const newGrade = {
					...prevGrade
				};
				updatedGrades.push(newGrade);
			});

			const gradeToChange = updatedGrades.find((Grade) => Grade.name === component.name)
			if(gradeToChange) {
				gradeToChange.grade = Number(inputValue);
			} else {
				updatedGrades.push(
					{
						name : component.name,
						percentage: component.percentage,
						grade : Number(inputValue),
						gradeType: component.gradeType
					}
				);
			}
			
			return updatedGrades;
		});
		setInputValue("");
	} 

	const handleSetClick = () => {
		setInputEnabled(!inputEnabled);
	}

	useEffect(() => {
		if(component.components) return;
		setGrade(courseGrades.find((g)=> g.name === component.name)?.grade);
	}, [courseGrades]);

	return (
		<div className="mx-10 my-2">
			
			<span >{`${component.name} - ${component.percentage}%(${calculatePercentage(component.percentage,parentPercentage)}%)`}</span>
			{component.components ? 
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
				:
				<>
					<span> : </span>
					{grade === null || grade === undefined ?
					<>
						{inputEnabled ? 
						(component.gradeType === GradeType.Percent && <><input 
							className="w-10 text-black" 
							type="number"
							onChange={handleInputChange}
							value={inputValue}
							>
						</input>
						<span>{"% "}</span>
						<button className="border-white border-2 px-1" type="button" onClick={handleSubmitInput}>Save
						</button>
						<button className="border-white border-2 px-1" type="button" onClick={handleSetClick}>Cancel
						</button></>)
						
							
						
						:
						<>
							<button 
								type="button" onClick={handleSetClick}
								className="border-white border-2 px-1"
							>Set</button>
							{/* <div className="text-blue-300">{`${gradeToPass?.toFixed(2)}% to pass the course`}</div> */}
						</>
						}
						
					</>
					:
						<>
							<span>{`${grade}% `}</span><button className="border-white border-2 px-1" type="button" onClick={handleRemoveGrade}>Remove</button>
						</>
					}
					
				</>
			}
		</div>
	);
}