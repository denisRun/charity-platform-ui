import { FC } from "react";

interface BodyProps{
    children: React.ReactNode
}

const BodyContainer: FC<BodyProps> = (props) => {
    return (
        <div className='container-fluid' style={{display:"flex", flexDirection: "row",height:"88vh"}}>
            {props.children}
        </div>
  )};

export default BodyContainer;