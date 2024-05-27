import { useState } from "react";
import { ICourseStructure } from "../types";

interface GradeHeaderProps {
	onExportClick:()=>void;
	courseStructure:ICourseStructure;
	gradeToPass:number|null;
	targetGrade:number;
	setTargetGrade:React.Dispatch<React.SetStateAction<number>>;
	averageGrade:number|null;
	expectedGrade:number|null;
	overallGrade:number|null;
	setShowLoadGrade:React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GradeHeader ({ onExportClick, courseStructure, gradeToPass, targetGrade, setTargetGrade, averageGrade, expectedGrade, overallGrade, setShowLoadGrade}:GradeHeaderProps) {

	const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		let newValue = e.target.value;
		if(Number(newValue) > 100) return;
		setTargetGrade(Number(newValue));
	}

	const handleBtnClick = () => {
		setShowLoadGrade(true);
	}

	return (
		<nav className="bg-black
		py-4 text-white fixed  
		w-full top-0 left-0 px-5 h-48">
				<div className="flex w-full justify-between underline">
						<a>{`Grade Manager`}</a>
					<a className="underline" href="https://www.linkedin.com/in/eugenehjlee/">{`Created by - therealmcfly`}</a>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-2xl underline my-5">
						<p>{`${courseStructure.courseName}`}</p>
					</span>
					<span className="flex items-center text-xs">
						<button className="border-white border-2 px-1 mr-2" type="button" onClick={handleBtnClick}>
							<p>load</p>
							<p>grade</p>
						</button>
						<button className="border-white border-2 px-1" type="button" onClick={onExportClick}>
							<p>export</p>
							<p>grade</p>
						</button>
					</span>
				</div>
				<div className="flex justify-between items-center">
					<span>
						<a>{"Target Grade : "}</a>
						<input className="w-10 text-black" type="number" onChange={handleInputChange} value={targetGrade !== 0 ? targetGrade.toString() : ""} />
						<a>%</a>
					</span>
					{
						Number(gradeToPass) > 100 ?
						<span className="text-xl text-red-500">{`Impossible to reach target(need ave ${gradeToPass?.toFixed(2)}%)`}</span>
						:
						(Number(gradeToPass) > 0 ? 
						<span className="text-xl text-blue-500">
							{`Need at least ${gradeToPass?.toFixed(2)}% to pass`}
						</span>:
						<span className="text-xl text-green-400">
							{`Successful reaching target!`} 
						</span>)
					}
				</div>
				<div className="flex w-full justify-between mt-4">
					{
						averageGrade !== null && 
						<span>
							<a>{"Ave Grade: "}</a>
							<a className="text-yellow-500">{`${averageGrade.toFixed(2)}%`}</a>
						</span>
					}
					{
						(averageGrade !== null && overallGrade === null) ? 
						<span>
							<a>{"Expected Grade : "}</a>
							<a className="text-yellow-500">{`${expectedGrade?.toFixed(2)}%`}</a>
						</span>:
						<span>
							<a>{"Overall Grade : "}</a>
							<a className="text-yellow-500">{`${overallGrade?.toFixed(2)}%`}</a>
						</span>
					}
				</div>
			</nav>
	);
}