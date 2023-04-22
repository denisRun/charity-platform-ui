import { Pagination } from "@mui/material";
import { observer } from "mobx-react";
import { FC, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useStore } from "../../contexts/StoreContext";
import { ProposalEventSortByEnum } from "../../types/enums/ProposalEventSortByEnum";
import { EventStatusEnum } from "../../types/enums/EventStatusEnum";
import { SortOrderEnum } from "../../types/enums/SortOrderEnum";
import { useNavigate } from "react-router-dom";
import ProposalEventCard from "../Cards/ProposalEventCard";
import { IProposalSearchRequest } from "../../types/ProposalEvent/ProposaSearchRequest";
import { useSnackbar } from "notistack";

interface BodyProps{
    children: React.ReactNode
}

const TookPartInProposalEvents: FC = observer(() => {

    const store = useStore();
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>(ProposalEventSortByEnum.createDate);
    const [sortDirection, setSortDirection] = useState<string>(SortOrderEnum.descending);
    const [currentPage, setCurrentPage] = useState(1);
    const { enqueueSnackbar } = useSnackbar()

    const handleSearchClick = async (pageNum?: number) => {

        let request: IProposalSearchRequest = new IProposalSearchRequest();
        request.pageNumber = pageNum ?? 1;
        request.name = title;
        request.sortField = sortBy;
        request.order = sortDirection;
        request.tags = [];
        request.takingPart = true;

        await store.proposalEventStore.searchEvents(request);
        if(store.proposalEventStore.isError == true){
            enqueueSnackbar("Failed to execute search.", { variant: 'error'})
        } else if (pageNum == null){
            setCurrentPage(1);
        } else if (pageNum != null){
            setCurrentPage(pageNum);
        }
      };
    
    return (
        <>
        <Container fluid style={{borderBottom: "9px solid #FBF8F0"}}>
            <div className="row" >
                <div className="col-9">
                    <input className="form-control" placeholder="Search by name" onChange={x => setTitle(x.target.value)}/>
                </div>
                <div className="col-3">
                    <Button variant="outline-success" disabled={store.userStore.user == null} className="w-100" onClick={() => handleSearchClick()}>
                        Search 
                    </Button>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Sort by</span>
                        </div>
                        <select className="form-select"  
                            onChange={selectedOption => {
                                if (Array.isArray(selectedOption)) {
                                    throw new Error("Unexpected type passed to ReactSelect onChange handler");
                                }
                                setSortBy(selectedOption.target.value);
                                }}
                            aria-label="Default select example">
                            <option selected value={ProposalEventSortByEnum.createDate}>Created date</option>
                            <option value={ProposalEventSortByEnum.title}>Title</option>
                        </select>
                        <select className="form-select"
                            onChange={selectedOption => {
                                if (Array.isArray(selectedOption)) {
                                    throw new Error("Unexpected type passed to ReactSelect onChange handler");
                                }
                                setSortDirection(selectedOption.target.value);
                                }}
                            aria-label="Default select example">
                            <option selected value={SortOrderEnum.descending}>Descending</option>
                            <option value={SortOrderEnum.ascending}>Ascending</option>
                        </select>
                    </div>
                </div>
            </div>
        </Container>
        <Container className="mt-3" fluid>
            <h5 hidden={store.proposalEventStore.tookPartEvents.length != 0}>
                No results found
            </h5>
            <div>
                {store.proposalEventStore.tookPartEvents
                    .map((event) => (
                        <ProposalEventCard onClick={() => navigate(event.id!.toString())} item={event} isOwn={false} key={event.id!}/>            
                ))}
            </div>
        </Container>
        <div className="d-flex justify-content-center" style={{}}>
            <Pagination count={store.proposalEventStore.tookPartEventsTotalPageCount < 1 ? 1 : store.proposalEventStore.tookPartEventsTotalPageCount} page={currentPage} onChange={(e, value) => handleSearchClick(value)} style={{justifyContent:"center"}}/>
        </div>
        </>
  )});

export default TookPartInProposalEvents;