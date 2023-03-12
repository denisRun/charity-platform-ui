import { FC } from "react";

interface BodyProps{
    children: React.ReactNode
}

const SearchProposalEvents: FC<BodyProps> = (props) => {
    return (
        <div className='container-fluid' style={{display:"flex", flexDirection: "row",height:"88vh"}}>
            {props.children}
        </div>
  )};

export default SearchProposalEvents;