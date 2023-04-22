import { Pagination } from "@mui/material";
import { observer } from "mobx-react";
import { useSnackbar } from "notistack";
import { FC, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../contexts/StoreContext";
import { SortOrderEnum } from "../../types/enums/SortOrderEnum";
import HelpEventBasicForm from "../Forms/HelpEvent/HelpEventBasicForm";
import { IHelpEventSearchResource } from "../../types/HelpEvent/HelpEventSearchResource";
import HelpEventCard from "../Cards/HelpEventCard";
import { HelpEventStatusEnum } from "../../types/enums/HelpEventStatusEnum";
import { HelpEventSortByEnum } from "../../types/enums/HelpEventSortByEnum";

interface BodyProps{
    children: React.ReactNode
}

const MyHelpEvents: FC = observer(() => {

    const store = useStore();
    const [filterTitle, setFilterTitle] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>(HelpEventSortByEnum.createDate);
    const [sortDirection, setSortDirection] = useState<string>(SortOrderEnum.descending);
    const [filterStatus, setFilterStatus] = useState<string>(HelpEventStatusEnum.active);
    const [createHelpFormShow, setCreateHelpFormShow] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar()

    const handleSearchClick = () => {

        store.helpEventStore.getOwnEvents()
        setCurrentPage(1);
        if(store.helpEventStore.isError == true){
            enqueueSnackbar("Failed to execute search.", { variant: 'error'})
        }
    }

    function sortCompare( a:IHelpEventSearchResource, b:IHelpEventSearchResource): number {

        if (sortBy == HelpEventSortByEnum.createDate){
            if (sortDirection == SortOrderEnum.ascending){
                return a.creationDate! < b.creationDate! ? -1 : 1
            } else if (sortDirection == SortOrderEnum.descending){
                return a.creationDate! > b.creationDate! ? -1 : 1
            }
        } else if (sortBy == HelpEventSortByEnum.title){
            if (sortDirection == SortOrderEnum.ascending){
                return a.title! < b.title! ? -1 : 1
            } else if (sortDirection == SortOrderEnum.descending){
                return a.title! > b.title! ? -1 : 1
            }
        }
        return 0;
      }

    const pageSize: number = 5;
    const totalPageCount = Math.ceil((store.helpEventStore.ownEvents
        .filter(event => event.title!.includes(filterTitle) && event.status == filterStatus).length) / pageSize) ?? 0;
    const ownEvents = store.helpEventStore.ownEvents
        .filter(event => event.title?.toLowerCase()!.includes(filterTitle.toLowerCase()) && event.status == filterStatus)
        .sort((a,b) => sortCompare(a,b))
        .slice(currentPage * pageSize - pageSize, currentPage * pageSize);
    
    return (
        <>
        <Container fluid style={{borderBottom: "9px solid #FBF8F0"}}>
            <div className="row" >
                <div className="col-9">
                    <input className="form-control" value={filterTitle} onChange={event => { setFilterTitle(event.target.value); setCurrentPage(1)}} placeholder="Search by name"/>
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
                        <select defaultValue={sortBy} className="form-select"  
                            onChange={selectedOption => {
                                if (Array.isArray(selectedOption)) {
                                    throw new Error("Unexpected type passed to ReactSelect onChange handler");
                                }
                                setSortBy(selectedOption.target.value);
                                setCurrentPage(1);
                                }}
                            aria-label="Default select example">
                            <option value={HelpEventSortByEnum.createDate}>Created date</option>
                            <option value={HelpEventSortByEnum.title}>Title</option>
                        </select>
                        <select defaultValue={sortDirection} className="form-select"
                            onChange={selectedOption => {
                                if (Array.isArray(selectedOption)) {
                                    throw new Error("Unexpected type passed to ReactSelect onChange handler");
                                }
                                setSortDirection(selectedOption.target.value);
                                setCurrentPage(1);
                                }}
                            aria-label="Default select example">
                            <option value={SortOrderEnum.descending}>Descending</option>
                            <option value={SortOrderEnum.ascending}>Ascending</option>
                        </select>
                    </div>
                </div>
                <div className="col-2">
                    <select defaultValue={filterStatus} className="form-select"
                        onChange={selectedOption => {
                            if (Array.isArray(selectedOption)) {
                                throw new Error("Unexpected type passed to ReactSelect onChange handler");
                            }
                            setFilterStatus(selectedOption.target.value);
                            setCurrentPage(1);
                            }}
                        aria-label="Default select example">
                        <option value={HelpEventStatusEnum.active}>Active</option>
                        <option value={HelpEventStatusEnum.inactive}>Inactive</option>
                        <option value={HelpEventStatusEnum.done}>Done</option>
                    </select>
                </div>
                <div className="col-3">
                </div>
                <div className="col-3">
                        <Button variant="success" disabled={store.userStore.user == null} className="w-100" onClick={() => setCreateHelpFormShow(true)}>
                            + Add request
                        </Button>
                </div>
            </div>
        </Container>
        <Container className="mt-3" fluid>
            <h5 hidden={ownEvents.length != 0}>
                No results found
            </h5>
            <div>
                {ownEvents
                    .map((event) => (
                        <HelpEventCard onClick={() => navigate(event.id!.toString())} item={event} isOwn={true} key={event.id!}/>            
                ))}
            </div>
        </Container>
        <div className="d-flex justify-content-center" style={{}}>
                <Pagination   count={totalPageCount < 1 ? 1 : totalPageCount} page={currentPage < 1 ? 1 : currentPage} onChange={(e, value) => setCurrentPage(value)} style={{justifyContent:"center"}}/>
        </div>
        <HelpEventBasicForm
            isCreate={true}
            show={createHelpFormShow}
            onHide={() => setCreateHelpFormShow(false)} />
        </>
  )});

export default MyHelpEvents;