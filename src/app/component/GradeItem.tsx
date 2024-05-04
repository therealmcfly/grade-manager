import { useState } from "react";

interface GradeItemProps {
	component: IComponent;
	parentPercentage: number;
	grade?: string;
	setGrade?: (grade: string) => void;
}
export default function GradeItem({component, parentPercentage, grade, setGrade}:GradeItemProps): JSX.Element {
	const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		// setGrade(e.target.value);
	}
	const calculatePercentage = (percentage:number, parentPercentage:number = 100) => {
		if(parentPercentage) {
			return (((Number(percentage)/100) * Number(parentPercentage)).toFixed(2)) as unknown as number;
		}
		else {
			return percentage;
		}
	
	}

	return (
		<div className="mx-10 my-2">
			
			<span >{`${component.name} - [${calculatePercentage(component.percentage,parentPercentage)}%]`}</span>
			{component.components ? 
				<>
					{
						component.components.map((subComponent, i) => {
							return <GradeItem key={i} component={subComponent} parentPercentage={calculatePercentage(component.percentage,parentPercentage)}/>
						})
					}
				</>
				:
				<>
					<input 
						className="w-10 text-black" 
						type="number"
						// onChange={handleInputChange}
						value={grade}
						>
					</input>
					<span>{"%"}</span>
				</>
			}
		</div>
	);
}