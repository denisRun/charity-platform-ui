import { FC } from "react";

interface TextFormProps{
    children: React.ReactNode
}

const TextForm: FC<TextFormProps> = (props) => {
    return (
        <p style={{ fontSize:"20px", fontWeight:"bold",  display:"contents"}}>
            {props.children}
        </p>
  )};

export default TextForm;