import { FC } from "react";

interface TextXsProps{
    children: React.ReactNode
}

const TextXs: FC<TextXsProps> = (props) => {
    return (
        <p style={{fontFamily:"Inter", fontSize:"18px", height:"30px"}}>
            {props.children}
        </p>
  )};

export default TextXs;