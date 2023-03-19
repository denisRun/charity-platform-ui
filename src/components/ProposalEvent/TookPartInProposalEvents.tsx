import { Pagination } from "@mui/material";
import { observer } from "mobx-react";
import { FC, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useStore } from "../../contexts/StoreContext";
import { ProposalEventSortByEnum } from "../../types/enums/ProposalEventSortByEnum";
import { ProposalEventStatusEnum } from "../../types/enums/ProposalEventStatusEnum";
import { SortOrderEnum } from "../../types/enums/SortOrderEnum";

interface BodyProps{
    children: React.ReactNode
}

const TookPartInProposalEvents: FC = observer(() => {

    const store = useStore();
    const [sortBy, setSortBy] = useState<string>(ProposalEventSortByEnum.createDate);
    const [sortDirection, setSortDirection] = useState<string>(SortOrderEnum.descending);
    const [filterStatus, setFilterStatus] = useState<string>(ProposalEventStatusEnum.active);

    const handleSearchClick = async () => {

        alert("search by "+sortBy+" "+sortDirection+" "+filterStatus)
        // await store.userStore.login(credentials)
        // if(store.userStore.user != null && store.userStore.isError == false){
        //     props.onHide();
        //     enqueueSnackbar("Login succeed.", { variant: 'success'})
        // } else {
        //     enqueueSnackbar("Failed to Login.", { variant: 'error'})
        // }
      };
    
    return (
        <>
        <Container fluid style={{borderBottom: "9px solid #FBF8F0"}}>
            <div className="row" >
                <div className="col-9">
                    <input className="form-control" placeholder="Search by name"/>
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
                <div className="col-2">
                    <select className="form-select"
                        onChange={selectedOption => {
                            if (Array.isArray(selectedOption)) {
                                throw new Error("Unexpected type passed to ReactSelect onChange handler");
                            }
                            setFilterStatus(selectedOption.target.value);
                            }}
                        aria-label="Default select example">
                        <option selected value={ProposalEventStatusEnum.active}>Active</option>
                        <option value={ProposalEventStatusEnum.inactive}>Inactive</option>
                        <option value={ProposalEventStatusEnum.done}>Done</option>
                    </select>
                </div>
                <div className="col-3">
                </div>
                <div className="col-3">
                        <Button variant="success" disabled={store.userStore.user == null} className="w-100" onClick={() => console.log()}>
                            + Add suggestion 
                        </Button>
                </div>
            </div>
        </Container>
        <Container className="mt-3" fluid>
            <div className="row" >
                фівафі
            </div>
        </Container>
        <div className="d-flex justify-content-center" style={{}}>
                <Pagination hidden={store.proposalEventStore.tookPartEvents.length > 1 ? false : true} count={10} style={{justifyContent:"center"}}/>
        </div>
        </>
  )});

export default TookPartInProposalEvents;