import { useState } from "react";
import { ICourseStructure } from "../types";

interface GradeHeaderProps {
	courseStructure:ICourseStructure;
	gradeToPass:number|null;
	basePassingGrade:number;
	setBasePassingGrade:React.Dispatch<React.SetStateAction<number>>;
	averageGrade:number|null;
}

export default function GradeHeader ({courseStructure, gradeToPass, basePassingGrade, setBasePassingGrade, averageGrade}:GradeHeaderProps) {

	const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		let newValue = e.target.value;
		if(Number(newValue) > 100) return;
		setBasePassingGrade(Number(newValue));
	}

	const handleBtnClick = () => {
		alert("For this feature, tell Eugene that you think he is handsome. ^_________^");
	}

	return (
		<nav className="bg-black
		py-4 text-white fixed  
		w-full top-0 left-0 px-5 h-56">
				<div className="flex w-full justify-center">
					<a className="underline" href="https://www.linkedin.com/in/eugenehjlee/">{`Created by - therealmcfly`}</a>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-2xl underline my-5">
						<p>{`${courseStructure.courseName}`}</p>
						<p>{`Grade Manager`}</p>
					</span>
					<span className="flex items-center">
						<button className="border-white border-2 px-1 mr-2" type="button" onClick={handleBtnClick}>
							<p>load</p>
							<p>course</p>
						</button>
						<button className="border-white border-2 px-1" type="button" onClick={handleBtnClick}>
							<p>load</p>
							<p>grade</p>
						</button>
					</span>
				</div>
				<div className="flex justify-between items-center">
					<span>
						<a>{"Target Grade : "}</a>
						<input className="w-10 text-black" type="number" onChange={handleInputChange} value={basePassingGrade !== 0 ? basePassingGrade.toString() : ""} />
						<a>%</a>
					</span>
					{averageGrade !== null && <span>
						<a>{"Current Ave Grade: "}</a>
						<a className="text-yellow-500">{`${averageGrade.toFixed(2)}%`}</a>
					</span>}
				</div>
				<div className="flex w-full justify-center mt-4">
				{
					Number(gradeToPass) > 100 ?
					<span className="text-xl text-red-500">{`Impossible to reach target(need ave ${gradeToPass?.toFixed(2)}%)`}</span>
					:
					(Number(gradeToPass) > 0 ? <span className="text-xl text-blue-500">{`Need at least ${gradeToPass?.toFixed(2)}% to pass`}</span>:<span className="text-xl text-green-400">{`Successful reaching target!`} </span>)
				}
				</div>
			</nav>
	);
}