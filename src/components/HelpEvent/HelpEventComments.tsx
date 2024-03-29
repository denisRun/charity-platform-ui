import { observer } from "mobx-react";
import { useSnackbar } from "notistack";
import { FC, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useStore } from "../../contexts/StoreContext";
import { ICommentResource } from "../../types/CommentResource";
import CommentCard from "../Cards/CommentCard";
import { useTranslation } from "react-i18next";

interface HelpEventCommentsProps{
    comments: ICommentResource[];
    className?: string;
}

const HelpEventComments: FC<HelpEventCommentsProps> = observer((props) => {

    const store = useStore();
    const [commentValue, setCommentValue]  = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation();
    
    const handleAddCommentClick = () => {

        if(commentValue.length == 0){
            return;
        }

        store.helpEventStore.addComment(commentValue);
        if(store.helpEventStore.isError){
            enqueueSnackbar("Failed to post comment.", { variant: 'error'})
        } else {
            setCommentValue('')
        }
    }

    return (
        <div className={props.className} style={{fontSize:17}}>
            <h4>
                {t('Comments')}:
            </h4>
            <div className='row mt-3' hidden={store.userStore.user == null} >
                <div className='col-0-5 ms-3'>
                    <img src={store.userStore.user?.profileImageURL ?? "https://charity-platform.s3.amazonaws.com/images/png-transparent-default-avatar-thumbnail.png"} className="rounded-circle me-2" style={{width:35, height:35}} alt="Avatar" />
                </div>
                <div className='col-9 ms-1'>
                    <input value={commentValue} onChange={event => setCommentValue(event.target.value)} className="form-control"></input>
                </div>
                <div className='col-2 ms-1'>
                    <button className="btn btn-success w-100" onClick={() => handleAddCommentClick()}>{t('Add comment')}</button>
                </div>
            </div>
            <div className="row mt-3">
                {props.comments  
                    .slice()
                    .sort((x,y) => x.creationDate!<y.creationDate! ? 1 : -1)                  
                    .map((comment) => (
                        <CommentCard className="mt-3 ms-3" item={comment} key={comment.id!}/>            
                ))}
            </div>
        </div>
  )});

export default HelpEventComments;