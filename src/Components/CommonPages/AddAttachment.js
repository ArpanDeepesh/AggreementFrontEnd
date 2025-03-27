import "./AddAttachment.css";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import Form from "react-bootstrap/Form";
import { useRef } from "react";
import UserProfile from "../Context/UserProfile";
import { uploadFile } from "../Services/ContrectBackendAPI";
import InputField from "../FormParts/InputField";

const AddAttachment = ({ fileLinkList, setFileLinkList }) => {
    const attachmentForm = useRef(null);
    const addFile = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", attachmentForm.current['uploadFile'].files[0]);
        formData.append("tempName", attachmentForm.current['title'].value);

        uploadFile(formData, UserProfile.getToken()).then(r => r.json()).then(res => {
            if (res) {
                var newLinkList = [...fileLinkList, {
                    name: attachmentForm.current['title'].value,
                    link: res.url
                }];
                setFileLinkList(newLinkList);
                attachmentForm.current['title'].value = "";
                attachmentForm.current['uploadFile'].value = "";
            }
        }).catch(err => {
            console.log(err);

        });
    }
    return (
        <div>
            <div class="row">
                <div className="col-md-10">
                    <Form ref={attachmentForm} onSubmit={(e) => { e.preventDefault() }}>
                        <div class="input-group">
                            <div className="col-md-2">
                                <InputField name="title" type="text" label="Title" />
                            </div>
                            <div className="col-md-7">
                                <label style={{ fontsize: '20px', color: 'black', fontWeight: '700' }}>Upload File</label>
                                <br />
                                <input type="file" name="uploadFile" id="inputGroupFile02" />
                            </div>
                            <div className="col-md-3">
                                <label></label>
                                
                                <FormSubmitButton name="Add File" onClick={(e) => { addFile(e) }} myStyle={{ marginLeft: "5px" }} />
                            </div>
                        </div>
                    </Form>
                </div>
                <div className="col-md-2">
                    <br />
                    {fileLinkList && fileLinkList.length > 0 ? fileLinkList.map((f) => <div><a href={f.link} target={"new"}> {f.name}</a></div>) :
                        <span>No attachments</span>}
                </div>
            </div>


        </div>);
};
export default AddAttachment;