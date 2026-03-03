import { useNavigate, useParams } from 'react-router-dom';

const BrowserDetails = () => {
    const navigate = useNavigate();
    const { contentId } = useParams()

    function handleClose() {
    navigate(-1);
    }
    
    return (
        <div className='modal--wrapper'>
            <div className="modal__details--container">

            BrowserDetails , {`${contentId}`}
            </div>
        </div>
    );
}

export default BrowserDetails;
