import { FC } from "react";

interface TextFormHeaderProps{
    children: React.ReactNode
}

const TextFormHeader: FC<TextFormHeaderProps> = (props) => {
    return (
        <p style={{ fontSize:"30px", display:"contents", fontWeight:"bold", color: "black"}}>
            {props.children}
        </p>
  )};

export default TextFormHeader;