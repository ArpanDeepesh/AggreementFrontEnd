import "./MessageDisplay.css";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import Form from "react-bootstrap/Form";
import { useRef } from "react";
import UserProfile from "../Context/UserProfile";
import { sendPostRequest, uploadFile } from "../Services/POContractBackendAPI";

const AddAttachment = ({fileLinkList, setFileLinkList }) => {
    const attachmentForm = useRef(null);
    const addFile = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", attachmentForm.current['uploadFile'].files[0]);
        formData.append("tempName", "testFile");
        console.log(formData.get("file"));
        uploadFile(formData, UserProfile.getToken()).then(r => r.json()).then(res => {
            console.log(res);
            console.log(res.url);
            if (res) {
                var newLinkList = [...fileLinkList, res.url];
                setFileLinkList(newLinkList);
            }

        }).catch(err => {
            console.log(err);
            
        });
    }
    return (
        <div>
            <Form ref={attachmentForm} onSubmit={(e) => { e.preventDefault() }}>
                <input type="file" name="uploadFile" />
                <FormSubmitButton name="Add File" onClick={(e) => { addFile(e) }} />
            </Form>
            <div>{fileLinkList && fileLinkList.length > 0 ? fileLinkList.map(( f, i ) => <div><a href={f} target={"new"}> Attachment { i+1}</a></div>) : <span>Nofile is present</span>}
            </div>
        </div>);
};

export default AddAttachment;