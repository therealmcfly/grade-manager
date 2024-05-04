import { useState } from "react";

interface GradeItemProps {
	component: IComponent;
	parentPercentage?: number;
	grade?: string;
	setGrade?: (grade: string) => void;
}
export default function GradeItem({component, parentPercentage, grade, setGrade}:GradeItemProps): JSX.Element {
	const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		// setGrade(e.target.value);
	}

	const calculatePercentage = (percentage:number, parentPercentage:number = 100) => {
		if(parentPercentage) {
			return ((Number(percentage)/100) * Number(parentPercentage)).toFixed(2);
		}
		else {
			return percentage;
		}
	
	}
	return (
		<div className="mb-2 ml-10">
			{component.name && <span>{component.name + " : "}</span>}
			<input 
				className="w-10" 
				type="number"
				// onChange={handleInputChange}
				value={grade}
				>
			</input>
			<span>{"%"}</span>
			<span>{`[${calculatePercentage(component.percentage, parentPercentage)}%]`}</span>
		</div>
	);
}