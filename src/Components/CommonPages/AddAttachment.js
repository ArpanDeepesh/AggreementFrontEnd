import "./MessageDisplay.css";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import Form from "react-bootstrap/Form";
import { useRef } from "react";
import UserProfile from "../Context/UserProfile";
import { uploadFile } from "../Services/POContractBackendAPI";

const AddAttachment = ({fileLinkList, setFileLinkList }) => {
    const attachmentForm = useRef(null);
    const addFile = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", attachmentForm.current['uploadFile'].files[0]);
        formData.append("tempName", "testFile");

        uploadFile(formData, UserProfile.getToken()).then(r => r.json()).then(res => {
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
            <div class="row">
                <div className="col-md-8">
                    <Form ref={attachmentForm} onSubmit={(e) => { e.preventDefault() }}>
                        <div class="input-group">
                            <div class="custom-file" style={{ textAlign: "left" }}>
                                <input className="custom-file-input" type="file" name="uploadFile" id="inputGroupFile02" />
                                <label class="custom-file-label" for="inputGroupFile02">Choose file</label>
                            </div>
                            <div class="input-group-append" style={{ marginBottom: '10px' }}>
                                <FormSubmitButton name="Add File" onClick={(e) => { addFile(e) }} myStyle={{ marginLeft: "5px" }} />
                            </div>
                        </div>

                    </Form>
                </div>
                <div className="col-md-4">
                    {fileLinkList && fileLinkList.length > 0 ? fileLinkList.map((f, i) => <div><a href={f} target={"new"}> Attachment {i + 1}</a></div>) :
                        <span>No attachments</span>}
                </div>
            </div>
            
            
        </div>);
};

export default AddAttachment;