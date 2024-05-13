import { GradeType, IComponent, IGrade } from "@/types";
import { GSP_NO_RETURNED_VALUE } from "next/dist/lib/constants";
import { use, useEffect, useRef, useState } from "react";

interface GradeInputProps {
	component: IComponent;
	setCourseGrades: React.Dispatch<React.SetStateAction<IGrade[]>>;
	onClose: () => void;
	inputRef: React.RefObject<HTMLInputElement>;
}


export default function GradeInput({ component, setCourseGrades, onClose, inputRef }:GradeInputProps): JSX.Element {
	const [ percentageValue, setPercentageValue ] = useState<string>("");
	const [ numberGrade, setNumberGrade ] = useState<{ grade:string, total:string}>({grade: "", total: ""});

	const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const valueToSet = Number(value);
		switch (component.gradeType) {
			case GradeType.Percent:
				if(Number(e.target.value) > 100) return;
				setPercentageValue(e.target.value);
				break;
				case GradeType.Number:
					if(Number(e.target.value) > 100) return;
				setNumberGrade((prev) => {
					return {
					...prev,
					[name]: valueToSet === 0 ? "" : valueToSet.toString()
				
				}});
				break;
			default:
				break;
		}	
	}

	const handleSubmitInput = () => {
		

		let updatedGradeValue:string = "";

		switch (component.gradeType) {
			case GradeType.Percent:
				if(percentageValue === "") return;
				updatedGradeValue = percentageValue;
				break;
			case GradeType.Number:
				if (numberGrade.grade && numberGrade.total) {
					if (Number(numberGrade.grade) > Number(numberGrade.total)) {
						alert("Grade cannot be higher than total");
						return; // Stop further execution to ensure no incorrect data is saved
					} else {
						updatedGradeValue = ((Number(numberGrade.grade) / Number(numberGrade.total))*100).toFixed(2);
					}
				} else {
					alert("Please enter both grade and total values");
					return; // Stop further execution because necessary data is missing
				}
				break;
			default:
				break;
		}

		if(updatedGradeValue) {
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
					gradeToChange.grade = Number(updatedGradeValue);
				} else {
					updatedGrades.push(
						{
							name : component.name,
							percentage: component.percentage,
							grade : Number(updatedGradeValue),
							gradeType: component.gradeType
						}
					);
				}
				
				return updatedGrades;
			});
			setPercentageValue("");
		}
		
	} 

	const renderGradeInput = (gradeType:GradeType|undefined):JSX.Element => {
	if(gradeType === undefined) gradeType = GradeType.Percent;
		switch (gradeType) {
			case GradeType.Percent:
				return (
					<div className="flex">
						<input 
							className="w-10 text-black" 
							type="number"
							onChange={handleInputChange}
							value={percentageValue}
							name="percentage"
							ref={inputRef}
							>
						</input>
						<span>{"% "}</span>
						<button className="border-white border-2 px-1 py-0.5 text-xs mx-1" type="button" onClick={handleSubmitInput}>Save
						</button>
						<button className="border-white border-2 px-1 py-0.5 text-xs" type="button" onClick={onClose}>Cancel
						</button>
					</div>
				);
				break;
				case GradeType.Number:
					return (
						<div className="flex items-center flex-wrap justify-end">
							{
								numberGrade.grade === "" || numberGrade.total === "" ||
								(Number(percentageValue) > 0 &&
								Number(percentageValue) > 100 ?
								<a className="text-red-500 italic text-xs text-center mr-1">{` not possible `}</a>
								:
								<a className="text-gray-400 italic">{` ${percentageValue}% `}</a>)
							}
							<div>
								<input 
									className="w-10 text-black" 
									type="number"
									onChange={handleInputChange}
									value={numberGrade.grade}
									name="grade"
									ref={inputRef}
									>
								</input>
								<span>{" / "}</span>
								<input 
									className="w-10 text-black" 
									type="number"
									onChange={handleInputChange}
									value={numberGrade.total}
									name="total"
									>
								</input>
							</div>
							
							
							<div>
								<button className="border-white border-2 px-1 py-0.5 mx-1 text-xs" type="button" onClick={handleSubmitInput}>Save
								</button>
								<button className="border-white border-2 px-1 py-0.5 text-xs" type="button" onClick={onClose}>Cancel
								</button>
							</div>
							
						</div>
					);
					break;
			default:
				return <>{"invalid grade type"}</>;
				break;
		}
		
	}

	useEffect(() => {
		if(component.gradeType === GradeType.Percent) return;
		if(component.gradeType === GradeType.Number) {
			if(numberGrade.grade === "" || numberGrade.total === "") return;
			const percentage:number = Number(numberGrade.grade) / Number(numberGrade.total) * 100;
			
			setPercentageValue(percentage.toFixed(2).toString());
		}
	}, [numberGrade]);

	return (
		<>
			{renderGradeInput(component.gradeType)}
		</>
	)
}
