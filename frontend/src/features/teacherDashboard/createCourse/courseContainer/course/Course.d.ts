export type CourseProps = {
    handlecourseChange: (data: { title: string; description: string }) => void;
    oncancelsave: () => void;
    style?: React.CSSProperties;
    width?:string;
}