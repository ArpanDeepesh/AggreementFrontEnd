
import "./AddAttachment.css";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import Form from "react-bootstrap/Form";
import { useRef } from "react";
import UserProfile from "../Context/UserProfile";
import { uploadFile } from "../Services/ContrectBackendAPI";
import InputField from "../FormParts/InputField";

const UploadSingleFile = ({ fileLink, setFileLink, methodToRun }) => {
    const attachmentForm = useRef(null);
    const addFile = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", attachmentForm.current['uploadSingleFile'].files[0]);
        formData.append("tempName", "TF" + Date().toLocaleLowerCase());

        uploadFile(formData, UserProfile.getToken()).then(r => r.json()).then(res => {
            if (res) {
                setFileLink(res.url);
                methodToRun(res.url);
            }
        }).catch(err => {
            console.log(err);

        });
    }
    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <Form ref={attachmentForm} onSubmit={(e) => { e.preventDefault() }}>
                        <div className="input-group">
                            <div className="col-md-6">
                                <label style={{ fontsize: '20px', color: 'black', fontWeight: '700' }}>Upload File</label>
                                <br/>
                                <input type="file" name="uploadSingleFile" id="inputGroupFile01" />
                            </div>
                            <div className="col-md-6">
                                <label></label>
                                <FormSubmitButton name="Upload file" onClick={(e) => { addFile(e) }} myStyle={{ marginLeft: "5px" }} />
                            </div>
                        </div>
                    </Form>
                </div>
                <div className="col-md-12">
                    <br />
                    {fileLink && fileLink.length > 0 ? <a href={fileLink} target={"new"}>Uploaded File</a> :
                        <span>No attachments</span>}
                </div>
            </div>


        </div>);
};

export default UploadSingleFile;