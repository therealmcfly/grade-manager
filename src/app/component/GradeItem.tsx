import { useEffect, useState } from "react";

interface GradeItemProps {
	component: IComponent;
	parentPercentage: number;
	courseGrades: IGrade[];
	setCourseGrades: React.Dispatch<React.SetStateAction<IGrade[]>>;
}
export default function GradeItem({component, parentPercentage, courseGrades, setCourseGrades}:GradeItemProps): JSX.Element {
	const [ inputValue, setInputValue ] = useState<string>("");
	const [ grade, setGrade ] = useState<number|null|undefined>(null);
	const [ inputEnabled, setInputEnabled ] = useState<boolean>(false);

	const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
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
						grade : Number(inputValue)
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
	}, [grade, courseGrades]);

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
						<>
							<input 
								className="w-10 text-black" 
								type="number"
								onChange={handleInputChange}
								value={inputValue}
								>
							</input>
							<span>{"% "}</span>
							<button className="border-white border-2 px-1" type="button" onClick={handleSubmitInput}>OK
							</button>
							<button className="border-white border-2 px-1" type="button" onClick={handleSetClick}>X
							</button>
						</>
						:
						<>
							<span>## </span>
							<button 
								type="button" onClick={handleSetClick}
								className="border-white border-2 px-1"
							>SET</button>
						</>
						}
						
					</>
					:
						<>
							<span>{`${grade}% `}</span><button className="border-white border-2 px-1" type="button" onClick={handleRemoveGrade}>X</button>
						</>
					}
					
				</>
			}
		</div>
	);
}