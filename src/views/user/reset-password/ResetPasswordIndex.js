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
import Loading from "../../common/Loading"
import ApiPath from "../../common/ApiPath";
import { ApiRequest } from "../../common/ApiRequest";
const ResetPasswordIndex = () => {
	const [error, setError] = useState([]); // for error message
	const [success, setSuccess] = useState([]); // for success message
	const [loading, setLoading] = useState(false);  // for loading
	const [code, setCode] = useState("");
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
	let updateClick = () => {
		let str = [];
		if (code == "") {
			str.push("Please fill code!")
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
			setSuccess([]);
			window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		} else {
			setError([]); setSuccess([]);
			setShow(true);setContent("Are you sure want to change password?");
		}
	}

	let saveOK =async ()=>{
		setShow(false);
		setError([]);setSuccess([]);setShow(false);setLoading(true);
		let obj = {
			method: "post",
			url: ApiPath.ResetPassword,
			params: {
				"login_id": loginID,
				"code": code,
				"password": password
			},
		  };
		  let response = await ApiRequest(obj);
			  
		  if (response.flag === false) {
			setSuccess([]);setLoading(false);
			setError(response.message);
		  } else {
			if (response.data.status == "OK") {
			  setSuccess([response.data.message]);setError([]);setCode("");setPassword("");setConfirmPassword("");setLoading(false);
			  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}else{
				setError([response.data.message]);setSuccess([]);setLoading(false);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			} 
		  }
	}

  return (
	<CRow>
		<CCol>
			<CForm>
				<Loading start={loading} />
				<h3>Reset Password</h3>
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
					<CCol lg="3"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Code</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text"   aria-label="sm input example" value={code}  onChange={(e) => setCode(e.target.value)}  />
					</CCol>
					<CCol lg="3"></CCol>
				</CRow>


				<CRow className="mt-4">
					<CCol lg="3"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">New Password</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text"   aria-label="sm input example" value={password}  onChange={(e) => setPassword(e.target.value)}  />
					</CCol>
					<CCol lg="3"></CCol>
				</CRow>


				<CRow className="mt-4">
					<CCol lg="3"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Confirm password</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text"   aria-label="sm input example" value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value)}  />
					</CCol>
					<CCol lg="3"></CCol>
				</CRow>
				

				<CRow className="mt-4 mb-5">
					<CCol lg="5"></CCol>
					<CCol lg="4 text-align-center">
						<CButton className="login-button"   onClick={() => updateClick()}  style={{width: "100px"}}>Update</CButton>
					</CCol>
					<CCol lg="3"></CCol>
				</CRow>
			  </CForm>
		</CCol>
	</CRow>
  )
}

export default ResetPasswordIndex
