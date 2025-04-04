import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormTextarea
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import Message from "../../common/SuccessError";
import Confirmation from "../../common/Confirmation";
import {validateEmail,validateIntegerOnly} from "../../common/CommonValidation";
import Loading from "../../common/Loading"
import ApiPath from "../../common/ApiPath";
import { ApiRequest } from "../../common/ApiRequest";
const RegistrationIndex = () => {
	const [error, setError] = useState([]); // for error message
	const [success, setSuccess] = useState([]); // for success message
	const [loading, setLoading] = useState(false);  // for loading
	const [name, setName] = useState("");
	const [email, setEmail ] = useState("");
	const [address, setAddress ] = useState("");
	const [phoneNo, setPhoneNo ] = useState("");
	const [password, setPassword ] = useState("");
	const [confirmPassword, setConfirmPassword ] = useState("");
	const [show, setShow] = useState(false); // 
	const [content, setContent] = useState(""); // 
	const [type, setType] = useState("save"); //
	const [loginID , setLoginID ] = useState(localStorage.getItem('LOGIN_ID'));

	useEffect(() => {
		(async () => {
			if(localStorage.getItem("LOGIN_ID") == undefined){
				window.location.href="/login";
			}
		})();
	}, []);

	let saveClick = () => {
		let str = [];
		setLoading(true);
		if (name == "") {
			str.push("Please fill name!")
		}
		if (email == "") {
			str.push("Please fill email!")
		}else if(validateEmail(email) == false){
			str.push("Invalid email!")
		}

		if (phoneNo == "") {
			str.push("Please fill phone no!")
		}else if(validateIntegerOnly(phoneNo) == false){
			str.push("Invalid phone no!")
		}

		if (address == "") {
			str.push("Please fill address!")
		}
		if (password == "") {
			str.push("Please fill password!")
		}else if (confirmPassword == "") {
			str.push("Please select confirm password!")
		}else if(password != confirmPassword){
			str.push("Password and confirm password need to be same!")
		}

		if (str.length > 0) {
			setError(str);
			setSuccess([]);setLoading(false);
			window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		} else {
			setError([]); setSuccess([]);setLoading(false);
			setShow(true);setContent("Are you sure want to save?");
		}
	}

	let saveOK =async ()=>{
		setError([]);setSuccess([]);setShow(false);setLoading(true);
		let obj = {
			method: "post",
			url: ApiPath.UserRegistration,
			params: {
				"name": name,
				"email": email,
				"phone_no": phoneNo,
				"address": address,
				"password": password,
				"login_id": loginID
			},
		  };
		  let response = await ApiRequest(obj);
			  
		  if (response.flag === false) {
			setSuccess([]);setLoading(false);
			setError(response.message);
		  } else {
			if (response.data.status == "OK") {
			  setSuccess([response.data.message]);setError([]);clear();setLoading(false);
			  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}else{
				setError([response.data.message]);setSuccess([]); setLoading(false);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			} 
		  }
	}

	let clear = ()=>{
		setName("");setEmail("");setPhoneNo("");setAddress("");setPassword("");setConfirmPassword("");
	}

  return (
	<CRow>
		<CCol>
			<CForm>
				<Loading start={loading} />
				<h3>User Registration</h3>
				<hr/>
				<Message success={success} error={error} />
				<Confirmation
					show={show}
					content={content}
					type={type}
					saveOK={saveOK}
					okButton={"Ok"}
					cancel={() => setShow(false)}
					cancelButton={"Cancel"}
				/>
				<CRow className="mt-5">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Name</p>
					</CCol>
					<CCol lg="6">
						<CFormInput type="text"   aria-label="sm input example" value={name}  onChange={(e) => setName(e.target.value)}  />
					</CCol>
					<CCol lg="2"></CCol>
				</CRow>


				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Email</p>
					</CCol>
					<CCol lg="6">
						<CFormInput type="text"   aria-label="sm input example" value={email}  onChange={(e) => setEmail(e.target.value)}   />
					</CCol>
					<CCol lg="2"></CCol>
				</CRow>


				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Phone No</p>
					</CCol>
					<CCol lg="6">
						<CFormInput type="text"   aria-label="sm input example" value={phoneNo}  onChange={(e) => setPhoneNo(e.target.value)}  />
					</CCol>
					<CCol lg="2"></CCol>
				</CRow>


				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Address</p>
					</CCol>
					<CCol lg="6">
						<CFormTextarea
						  feedbackInvalid="Please enter a message in the textarea."
						  id="address"
						  required
						  value={address}  onChange={(e) => setAddress(e.target.value)} 
						></CFormTextarea>
					</CCol>
					<CCol lg="2"></CCol>
				</CRow>


				<CRow className="mt-4">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Password</p>
					</CCol>
					<CCol lg="6">
						<CFormInput type="text"   aria-label="sm input example" value={password}  onChange={(e) => setPassword(e.target.value)} />
					</CCol>
					<CCol lg="2"></CCol>
				</CRow>


				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Confirm password</p>
					</CCol>
					<CCol lg="6">
						<CFormInput type="text"   aria-label="sm input example" value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value)} />
					</CCol>
					<CCol lg="2"></CCol>
				</CRow>
				

				<CRow className="mt-3 mb-5">
					<CCol lg="4"></CCol>
					<CCol lg="6" className="text-align-center">
							<CButton className="login-button"   onClick={() => saveClick()} style={{width: "100px"}}>Save</CButton>
					</CCol>
					<CCol lg="2"></CCol>
				</CRow>
			  </CForm>
		</CCol>
	</CRow>
  )
}

export default RegistrationIndex
