import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { crypt, validateOTPRequest } from "../Services/POContractBackendAPI";
import UserProfile from "../Context/UserProfile";
import PurchaseOrder from "../Context/PurchaseOrder";


const CheckPODetails = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	useEffect(() => {
		var phoneNo = searchParams.get('ph');
		var secret = searchParams.get('s');
		var pOId = searchParams.get('pi');
		phoneNo = phoneNo.replace(/ /g, '+');
		secret = secret.replace(/ /g, '+');
		pOId = pOId.replace(/ /g, '+');
		crypt({ Str: phoneNo, IsCrypted: true })
			.then(rph => rph.text())
			.then(rph => {
				crypt({ Str: secret, IsCrypted: true })
					.then(rsec => rsec.text())
					.then(rsec => {
						crypt({ Str: pOId, IsCrypted: true })
							.then(rpi => rpi.text())
							.then(rpi => {
								var formBody = {
									PhoneNumber: rph,
									OTP: rsec,
								};
								validateOTPRequest(formBody).then(r => r.json()).then(res => {
									if (res.token === null && res.message === 'Invalid Info') {
										return;
									}
									UserProfile.setLoginStatus("1");
									UserProfile.setToken(res.token);
									UserProfile.setContactNumber(rph);
									PurchaseOrder.setPoId(rpi);
									navigate("/UpdateUser");
								}).catch(err => {
									console.log(err);
								});
								console.log(rpi);
							}).catch(errPi => console.log(errPi));
					}).catch(errSec => console.log(errSec));
		}).catch(err => console.log(err));
		
	}, []);
	

	return (
		<><div>
			Please wait we are checking your details.
			If you are not able to reach to the page.
			Please click on home button and login into the system to see contracts rasied for you.
		</div>
		</>
	);
};
export default CheckPODetails;
