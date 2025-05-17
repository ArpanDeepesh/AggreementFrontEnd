import { useEffect } from "react";
import UserProfile from "../Context/UserProfile";
import RFQList from "./RFQList";


const RFQListPage = ({ setUserName, setUserType }) => {
    useEffect(() => {
        setUserName(UserProfile.getName());
        setUserType(UserProfile.getUserType());

    }, []);

    return (<>
        <div className="main-content">
            <RFQList/>
        </div>
    </>);
}
export default RFQListPage;