import { Pagination } from "@mui/material";
import { observer } from "mobx-react";
import { FC, useEffect, useState, useTransition } from "react";
import { Button, Container } from "react-bootstrap";
import { useStore } from "../../contexts/StoreContext";
import { ProposalEventSortByEnum } from "../../types/enums/ProposalEventSortByEnum";
import { EventStatusEnum } from "../../types/enums/EventStatusEnum";
import { SortOrderEnum } from "../../types/enums/SortOrderEnum";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ProposalEventTagsForm from "../Forms/ProposalEvent/ProposalEventTagsForm";
import { toJS } from "mobx";
import { IProposalSearchRequest } from "../../types/ProposalEvent/ProposaSearchRequest";
import { useSnackbar } from "notistack";
import ProposalEventCard from "../Cards/ProposalEventCard";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface BodyProps{
    children: React.ReactNode
}

const SearchProposalEvents: FC = observer(() => {

    const store = useStore();
    const [title, setTitle] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>(ProposalEventSortByEnum.createDate);
    const [sortDirection, setSortDirection] = useState<string>(SortOrderEnum.descending);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [updateProposalSearchTagsFormShow, setUpdateProposalSearchTagsFormShow] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation();

    const handleSearchClick = async (pageNum?: number) => {

        let request: IProposalSearchRequest = new IProposalSearchRequest();
        request.pageNumber = pageNum ?? 1;
        request.name = title;
        request.sortField = sortBy;
        request.order = sortDirection;
        request.tags = store.userStore.user?.proposalEventSearchValues ?? [];

        await store.proposalEventStore.searchEvents(request);
        if(store.proposalEventStore.isError == true){
            enqueueSnackbar(t("Failed to execute search"), { variant: 'error'})
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
                    <input className="form-control" placeholder={t("Search by name")!} onChange={x => setTitle(x.target.value)}/>
                </div>
                <div className="col-3">
                    <Button variant="outline-success" className="w-100" onClick={() => handleSearchClick()}>
                        {t('Search')} 
                    </Button>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">{t('Sort by')}</span>
                        </div>
                        <select className="form-select"  
                            onChange={selectedOption => {
                                if (Array.isArray(selectedOption)) {
                                    throw new Error("Unexpected type passed to ReactSelect onChange handler");
                                }
                                setSortBy(selectedOption.target.value);
                                }}
                            aria-label="Default select example">
                            <option selected value={ProposalEventSortByEnum.createDate}>{t('Created date')}</option>
                            <option value={ProposalEventSortByEnum.title}>{t('Title')}</option>
                        </select>
                        <select className="form-select"
                            onChange={selectedOption => {
                                if (Array.isArray(selectedOption)) {
                                    throw new Error("Unexpected type passed to ReactSelect onChange handler");
                                }
                                setSortDirection(selectedOption.target.value);
                                }}
                            aria-label="Default select example">
                            <option selected value={SortOrderEnum.descending}>{t('Descending')}</option>
                            <option value={SortOrderEnum.ascending}>{t('Ascending')}</option>
                        </select>
                    </div>
                </div>
                <div className="col-2 ps-0 ms-0">
                    <button type="button"className="btn fs-5 pt-0" hidden={store.userStore.user == null} onClick={() => setUpdateProposalSearchTagsFormShow(true)}><FilterAltIcon fontSize='large' /></button>
                </div>
                <div className="col-3">
                </div>
            </div>
        </Container>
        <Container className="mt-3" fluid>
            <h5 hidden={store.proposalEventStore.events.length != 0}>
                {t('No results found')}
            </h5>
            <div>
                {store.proposalEventStore.events
                    .map((event) => (
                        <ProposalEventCard onClick={() => navigate(event.id!.toString())} item={event} isOwn={false} key={event.id!}/>            
                ))}
            </div>
        </Container>
        <div className="d-flex justify-content-center" style={{}}>
            <Pagination count={store.proposalEventStore.eventsTotalPageCount < 1 ? 1 : store.proposalEventStore.eventsTotalPageCount} page={currentPage} onChange={(e, value) => handleSearchClick(value)} style={{justifyContent:"center"}}/>
        </div>
        <ProposalEventTagsForm
                items={store.userStore.user?.proposalEventSearchValues}
                isSearch={true}
                show={updateProposalSearchTagsFormShow}
                onHide={() => setUpdateProposalSearchTagsFormShow(false)} />
        </>
  )});

export default SearchProposalEvents;