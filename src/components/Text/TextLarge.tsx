import { FC } from "react";

interface TextLargeProps{
    children: React.ReactNode
}

const TextLarge: FC<TextLargeProps> = (props) => {
    return (
        <p style={{ fontSize:"20px", fontWeight:"bold",  display:"contents"}}>
            {props.children}
        </p>
  )};

export default TextLarge;