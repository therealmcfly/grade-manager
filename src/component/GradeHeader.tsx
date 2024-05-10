interface GradeHeaderProps {
	courseStructure:ICourseStructure;
	gradeToPass:number|null|undefined;
}

export default function GradeHeader ({courseStructure, gradeToPass}:GradeHeaderProps) {

	const handleBtnClick = () => {
		alert("For this feature, tell Eugene that you think he is handsome. ^_________^");
	}

	return (
		<div  className="h-1/5">
				<div className="flex justify-center">
					<a className="underline" href="https://www.linkedin.com/in/eugenehjlee/">{`Created by - therealmcfly`}</a>
					
				</div>
				<div className="flex justify-between items-center">
					<span className="text-2xl underline my-5">
						{`${courseStructure.courseName} Grade Manager`}
					</span>
					<span className="flex items-center">
						<button className="border-white border-2 px-1 mr-5" type="button" onClick={handleBtnClick}>load course</button>
						<button className="border-white border-2 px-1 mr-5" type="button" onClick={handleBtnClick}>load grade</button>
					</span>
				</div>
				<div className="flex justify-between items-center">
					<span>{`Passing Overall Grade : ${courseStructure.passingGrade}%`}</span>
					{gradeToPass && <span className="text-blue-500">{`Need to score : ${gradeToPass?.toFixed(2)}%`}</span>}
				</div>
			</div>
	);
}