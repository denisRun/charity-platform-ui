import { FC } from "react";

interface BodyProps{
    children: React.ReactNode
}

const SidebarContainer: FC<BodyProps> = (props) => {
    return (
        <div style={{width:100, margin:"auto", marginLeft:0}}>
            {props.children}
        </div>
  )};

export default SidebarContainer;