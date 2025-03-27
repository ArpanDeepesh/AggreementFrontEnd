import "./MessageDisplay.css";
import FormButton from "../FormParts/FormButton";


const DeleteItemConfirmation = ({ msg, setMsg,action,data}) => {

    const closeModule = (e) => {
        e.preventDefault();
        setMsg();
    }

    return (
        <div className={msg && msg.length>0 ? "modalOverlay" : "modalOverlay hidden"}>
            <div className="modalContent">
                <button className="closeButton" onClick={(e) => { closeModule(e) }}>X</button>
                <div className="row">
                    <div className="col-md-8">
                        {msg}
                    </div>
                    <div className="col-md-4">
                        <FormButton name="Yes" onClick={
                            (e) => {
                                e.preventDefault();
                                action(data);
                                closeModule(e);
                            }
                        } />
                        <FormButton name="No" onClick={
                            (e) => {
                                closeModule(e);
                            }
                        } />
                    </div>
                </div>
            </div>
        </div>);
};

export default DeleteItemConfirmation;