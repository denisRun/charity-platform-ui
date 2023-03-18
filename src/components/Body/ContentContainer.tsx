import { FC } from "react";

interface BodyProps{
    children: React.ReactNode;
    backgroundColor?: string;
    classNames?: string;
}

const ContentContainer: FC<BodyProps> = (props) => {
    return (
        <div className='overflow-auto' style={{width:"100%", backgroundColor: props.backgroundColor ?? "#FFFFFF", borderRadius: 8, boxShadow: "0px 4px 19px 2px rgba(0, 166, 189, 0.1)", WebkitBoxShadow: "0px 4px 19px 2px rgba(0, 166, 189, 0.1)"}}>
            {props.children}
        </div>
  )};

export default ContentContainer;