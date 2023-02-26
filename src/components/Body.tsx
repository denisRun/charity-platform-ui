import { FC } from "react";

interface BodyProps{
    children: React.ReactNode
}

const Body: FC<BodyProps> = (props) => {
    return (
        <div>
            {props.children}
        </div>
  )};

export default Body;