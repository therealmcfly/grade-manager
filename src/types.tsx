export interface ICourseStructure {
	courseName: string;
	passingGrade: number;
	subjects: IComponent[];
}

export interface IGrade {
	name: string;
	percentage: number;
	grade: number|null|undefined;
	gradeType: GradeType|undefined;
}

export interface IComponent {
	name: string;
	percentage: number;
	components?: IComponent[];
	gradeType?: GradeType;
}

export enum GradeType {
	Percent,
	Number
}