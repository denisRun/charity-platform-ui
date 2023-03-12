import { FC } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface TextFormProps{
}

const ProposalEventCard: FC<TextFormProps> = (props) => {
    return (
        // <div className="card w-100 mb-3" style={{height:150, backgroundColor: "purple"}}>
        //     <div className="row h-100 m-2 mt-1" style={{backgroundColor: "blue",}}>
        //         <div className="col-2" style={{backgroundColor: "white",height:140,overflow:"hidden"}}>
        //             <img src="https://img.freepik.com/free-photo/beautiful-aerial-shot-fronalpstock-mountains-switzerland-beautiful-pink-blue-sky_181624-9315.jpg?w=996&t=st=1678644966~exp=1678645566~hmac=ba4b8eb4e9e07f835b572413756f273bd4063e70b616e22e6e22a643cfccbbba" className="img-fluid rounded-1 border border-2"  alt="Avatar" />
        //         </div>
        //         <div className="col-7" style={{backgroundColor: "cyan"}}>
        //             <div className="row h-30" style={{backgroundColor: "yellow"}}>
        //                 <div className="col-12" style={{backgroundColor: "gray"}}>
        //                     <h3>I can pick up stray dogs</h3>
        //                 </div>
        //             </div>
        //             <div className="row h-70" style={{backgroundColor: "red"}}>
        //                 <div className="col-12">
        //                     <h6>Placing assured be if removed it besides on. Far shed each high read are men over day. Afraid we praise lively he suffer family estate is. Ample order up in of in ready. Timed blind had now those ought set often which. Or snug dull he show more true wish. No at many deny away miss evil. On in so indeed spirit an mother.</h6>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="col-2-5" style={{backgroundColor: "yellow"}}>
        //             <div className="mt-1 mt-4" style={{backgroundColor: "white"}}>
        //                 <h6>
        //                     Denis Polozov
        //                     <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" className="rounded-circle ms-2" style={{width:40, height:40}} alt="Avatar" />
        //                 </h6>
        //             </div>
        //             <div className="mt-3" style={{backgroundColor: "white"}}>
        //                 <h6>
        //                     In progress
        //                     <span className="dot ms-2"> </span>
        //                 </h6>
        //             </div>
        //             <div className="mt-3" style={{backgroundColor: "white"}}>
        //                 22-02-2023
        //             </div>
        //         </div>
        //         <div className="col-0-5" style={{backgroundColor: "orange"}}>
        //             <div className="btn-group">
        //                 <button type="button" id="userProfileActions" className="btn dropdown-toggle fs-5" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false"><MoreVertIcon fontSize='large' /></button>
        //                 <ul className="dropdown-menu dropdown-menu-end dropdown-menu-end" aria-labelledby="userProfileActions">
        //                 <li><button className="dropdown-item" type="button" onClick={() => console.log()}>Copy link</button></li>
        //                 <li><button className="dropdown-item" type="button" onClick={() => console.log()}>Complain</button></li>
        //                 </ul>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="card w-100 mb-3" style={{height:160}}>
            <div className="row h-100 ms-2 me-2" style={{marginTop: "auto", marginBottom: "auto", overflow:"hidden"}}>
                <div className="col-2" style={{height:135,overflow:"hidden",marginTop: "auto", marginBottom: "auto"}}>
                    <img src="https://img.freepik.com/free-photo/beautiful-aerial-shot-fronalpstock-mountains-switzerland-beautiful-pink-blue-sky_181624-9315.jpg?w=996&t=st=1678644966~exp=1678645566~hmac=ba4b8eb4e9e07f835b572413756f273bd4063e70b616e22e6e22a643cfccbbba" className="img-fluid rounded-1 border border-2"  alt="Avatar" />
                </div>
                <div className="col-7 mt-3">
                    <div className="row h-30" >
                        <div className="col-12" >
                            <h3>{"I can pick up stray dogs.I can pick up stray dogs".slice(0,100)+" ..."}</h3>
                        </div>
                    </div>
                    <div className="row h-70 mt-1" >
                        <div className="col-12">
                            <h6>{"Placing assured be if removed it besides on. Far shed each high read are men over day. Afraid we praise lively he suffer family estate is. Ample order up in of in ready. Timed blind had now those ought set often which. Or snug dull he show more true wish. No at many deny away miss evil. On in so indeed spirit an mother. Or snug dull he show more true wish. No at many deny away miss evil. On in so indeed spirit an mother. Or snug dull he show more true wish. No at many deny away miss evil. On in so indeed spirit an mother. Or snug dull he show more true wish. No at many deny away miss evil. On in so indeed spirit an mother.".slice(0,350)+" ..."}</h6>
                        </div>
                    </div>
                </div>
                <div className="col-2-5 mt-3" >
                    <div className="mt-1 mt-2 ms-2" >
                        <h6>
                            Denis Polozov
                            <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" className="rounded-circle ms-2" style={{width:40, height:40}} alt="Avatar" />
                        </h6>
                    </div>
                    <div className="mt-3 ms-2" >
                        <h6>
                            In progress
                            <span className="dot ms-2"> </span>
                        </h6>
                    </div>
                    <div className="mt-4 ms-2" >
                        22-02-2023 15:51
                    </div>
                </div>
                <div className="col-0-5" >
                    <div className="btn-group">
                        <button type="button" id="userProfileActions" className="btn fs-5" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false"><MoreVertIcon fontSize='large' /></button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userProfileActions">
                        <li><button className="dropdown-item" type="button" onClick={() => console.log()}>Copy link</button></li>
                        <li><button className="dropdown-item" type="button" onClick={() => console.log()}>Complain</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
  )};

export default ProposalEventCard;