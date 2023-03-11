import { FC } from "react";

interface TextLargeProps{
    children: React.ReactNode,
    className: string
}

const TextLarge: FC<TextLargeProps> = (props) => {
    return (
        <p className={ props.className } style={{ fontSize:"20px", fontWeight:"bold",  display:"contents"}}>
            {props.children}
        </p>
  )};

export default TextLarge;