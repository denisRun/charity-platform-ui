import { Pagination } from "@mui/material";
import { observer } from "mobx-react";
import { FC, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useStore } from "../../contexts/StoreContext";
import { EventStatusEnum } from "../../types/enums/EventStatusEnum";
import { SortOrderEnum } from "../../types/enums/SortOrderEnum";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { HelpEventSortByEnum } from "../../types/enums/HelpEventSortByEnum";
import { IHelpSearchRequest } from "../../types/HelpEvent/HelpSearchRequest";
import HelpEventCard from "../Cards/HelpEventCard";

interface BodyProps{
    children: React.ReactNode
}

const TookPartInHelpEvents: FC = observer(() => {

    const store = useStore();
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>(HelpEventSortByEnum.createDate);
    const [sortDirection, setSortDirection] = useState<string>(SortOrderEnum.descending);
    const [currentPage, setCurrentPage] = useState(1);
    const { enqueueSnackbar } = useSnackbar()

    const handleSearchClick = async (pageNum?: number) => {

        let request: IHelpSearchRequest = new IHelpSearchRequest();
        request.pageNumber = pageNum ?? 1;
        request.name = title;
        request.sortField = sortBy;
        request.order = sortDirection;
        request.tags = [];
        request.takingPart = true;

        await store.helpEventStore.searchEvents(request);
        if(store.helpEventStore.isError == true){
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
                            <option selected value={HelpEventSortByEnum.createDate}>Created date</option>
                            <option value={HelpEventSortByEnum.title}>Title</option>
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
            <h5 hidden={store.helpEventStore.tookPartEvents.length != 0}>
                No results found
            </h5>
            <div>
                {store.helpEventStore.tookPartEvents
                    .map((event) => (
                        <HelpEventCard onClick={() => navigate(event.id!.toString())} item={event} isOwn={false} key={event.id!}/>            
                ))}
            </div>
        </Container>
        <div className="d-flex justify-content-center" style={{}}>
            <Pagination count={store.helpEventStore.tookPartEventsTotalPageCount < 1 ? 1 : store.helpEventStore.tookPartEventsTotalPageCount} page={currentPage} onChange={(e, value) => handleSearchClick(value)} style={{justifyContent:"center"}}/>
        </div>
        </>
  )});

export default TookPartInHelpEvents;