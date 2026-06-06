export type CardProps = {
  title: string;
  imageSrc?: string;
  enrolledCount?: number;
  classCount?: number;
  lectureCount?: number;
  style?: React.CSSProperties;
  customClassName?: string;
  simpleCourses?:boolean;
  review?:number;
};
