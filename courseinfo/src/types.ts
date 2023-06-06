interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface  CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartSpecial extends CoursePartBaseWithDescription {
  name: string;
  exerciseCount: number;
  requirements: string[];
  kind: "special";
}

interface CoursePartBasic extends CoursePartBaseWithDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBaseWithDescription {
  backgroundMaterial: string;
  kind: "background"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

