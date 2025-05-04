//import UserProfile from "../Context/UserProfile";
import { useEffect } from "react";
const ContactUs = () => {
	useEffect(() => {
		//setUserName(UserProfile.getName());
		//setUserType(UserProfile.getUserType());
	}, [])
	return (
		<>
			<div style={{ marginTop: "5px", textAlign: "left", padding: "40px", maxHeight: "100%", overflowX: "scroll" }}>
				<h4 style={{ color: "#007bff" }}>Contact us Page</h4>
			</div>
		</>
	);
};
export default ContactUs;