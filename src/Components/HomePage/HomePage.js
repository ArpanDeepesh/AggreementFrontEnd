import "./HomePage.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserProfile from "../Context/UserProfile";
import FormSubmitButton from "../FormParts/FormSubmitButton";
import { getRequest } from "../Services/POContractBackendAPI";


const HomePage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (UserProfile.getLoginStatus() !== "1") {
            navigate("/");
        }
        getRequest("api/POManagement/GetPOAssociatedWithUser?isRaisedBy=true", UserProfile.getToken()).then(rr => rr.json()).then(res => {
            if (res.status === 1 && res.data.count > 0)
            {
                console.log(res);
            }
        }).catch(err => console.log(err));
        getRequest("api/POManagement/GetPOAssociatedWithUser?isRaisedBy=false", UserProfile.getToken()).then(rr => rr.json()).then(res => {
            if (res.status === 1 && res.data.count>0) {
                console.log(res);
            }
        }).catch(err => console.log(err));
    }, []);

	return (
		<div>
            <div className="mt-4">
                <div className="row">
                    <div className="col-md-6 col-xs-12">
                        <h4>PO Raised By</h4>
                        <table className="table table-striped table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Title</th>
                                    <th>Raised For</th>
                                    <th>Raised By</th>
                                    <th>Status</th>
                                    <th>Delay Statements</th>
                                    <th>Work Done</th>
                                    <th>Amount Spent</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>PO #001</td>
                                    <td>Supplier A</td>
                                    <td>John Doe</td>
                                    <td>Completed</td>
                                    <td>No Delay</td>
                                    <td>
                                        <div className="progress">
                                            <div className="progress-bar bg-success" style={{ width: "75%"}} >75%</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="progress">
                                            <div className="progress-bar bg-info" style={{ width: "50%"}} >$5000</div>
                                        </div>
                                    </td>
                                    <td>
                                        <FormSubmitButton name="Copy" />
                                        <br />
                                        <FormSubmitButton name="Details" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-6 col-xs-12">
                        <h4>PO Raised For</h4>
                        <table className="table table-striped table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Title</th>
                                    <th>Raised For</th>
                                    <th>Raised By</th>
                                    <th>Status</th>
                                    <th>Delay Statements</th>
                                    <th>Work Done</th>
                                    <th>Amount Spent</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>PO #002</td>
                                    <td>Supplier B</td>
                                    <td>Jane Smith</td>
                                    <td>In Progress</td>
                                    <td>Delayed by 2 Days</td>
                                    <td>
                                        <div className="progress">
                                            <div className="progress-bar bg-success" style={{ width: "40%" }} >40%</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="progress">
                                            <div className="progress-bar bg-info" style={{ width: "30%" }} >$3000</div>
                                        </div>
                                    </td>
                                    <td>
                                        <FormSubmitButton name="Copy"/>
                                        <br />
                                        <FormSubmitButton name="Details" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
		</div>
	);
};

export default HomePage;
