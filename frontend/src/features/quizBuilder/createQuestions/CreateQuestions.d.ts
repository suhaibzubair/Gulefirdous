export type  Option = {
    label: string;
    value: string;
  }
  export type CreateQuestionsProps = {
    setQuestions: React.Dispatch<React.SetStateAction<any[]>>; // Update this type accordingly
    question: any;
    index: any;
  }
  