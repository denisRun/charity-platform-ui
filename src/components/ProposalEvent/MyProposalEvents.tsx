import { Pagination } from "@mui/material";
import { observer } from "mobx-react";
import { FC, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useStore } from "../../contexts/StoreContext";
import { ProposalEventSortBy } from "../../types/enums/ProposalEventSortBy";
import { ProposalEventStatus } from "../../types/enums/ProposalEventStatus";
import { SortOrder } from "../../types/enums/SortOrder";
import ProposalEventCard from "../Cards/ProposalEventCard";
import ProposalEventBasicForm from "../Forms/ProposalEvent/ProposalEventBasicForm";

interface BodyProps{
    children: React.ReactNode
}

const MyProposalEvents: FC = observer(() => {

    const store = useStore();
    const [sortBy, setSortBy] = useState<string>(ProposalEventSortBy.createDate);
    const [sortDirection, setSortDirection] = useState<string>(SortOrder.descending);
    const [filterStatus, setFilterStatus] = useState<string>(ProposalEventStatus.active);
    const [createProposalFormShow, setCreateProposalFormShow] = useState(false);

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
                            <option selected value={ProposalEventSortBy.createDate}>Created date</option>
                            <option value={ProposalEventSortBy.title}>Title</option>
                        </select>
                        <select className="form-select"
                            onChange={selectedOption => {
                                if (Array.isArray(selectedOption)) {
                                    throw new Error("Unexpected type passed to ReactSelect onChange handler");
                                }
                                setSortDirection(selectedOption.target.value);
                                }}
                            aria-label="Default select example">
                            <option selected value={SortOrder.descending}>Descending</option>
                            <option value={SortOrder.ascending}>Ascending</option>
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
                        <option selected value={ProposalEventStatus.active}>Active</option>
                        <option value={ProposalEventStatus.inactive}>Inactive</option>
                        <option value={ProposalEventStatus.done}>Done</option>
                    </select>
                </div>
                <div className="col-3">
                </div>
                <div className="col-3">
                        <Button variant="success" disabled={store.userStore.user == null} className="w-100" onClick={() => setCreateProposalFormShow(true)}>
                            + Add suggestion 
                        </Button>
                </div>
            </div>
        </Container>
        <Container className="mt-3" fluid>
            <div>
                <ProposalEventCard />
                <ProposalEventCard />
                

            </div>
        </Container>
        <div className="d-flex justify-content-center" style={{}}>
                    <Pagination count={10} style={{justifyContent:"center"}}/>
            </div>
        <ProposalEventBasicForm
            isCreate={true}
            show={createProposalFormShow}
            onHide={() => setCreateProposalFormShow(false)} />
        </>
  )});

export default MyProposalEvents;