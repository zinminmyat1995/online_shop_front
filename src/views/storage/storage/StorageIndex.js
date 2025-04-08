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
  CFormTextarea,
  CFormSelect,
  CProgress
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import Message from "../../common/SuccessError";
import Confirmation from "../../common/Confirmation";
import Loading from "../../common/Loading"
import { cilMinus, cilPlus } from '@coreui/icons'
import {validateIntegerOnly} from "../../common/CommonValidation"
import ApiPath from "../../common/ApiPath";
import { ApiRequest } from "../../common/ApiRequest";

const StorageIndex = () => {
	const [error, setError] = useState([]); // for error message
	const [success, setSuccess] = useState([]); // for success message
	const [loading, setLoading] = useState(false);  // for loading
	const [loginID , setLoginID ] = useState(localStorage.getItem('LOGIN_ID'));
	const [storage, setStorage ] = useState("0");
	const [realStorage, setRealStorage ] = useState("0");

	useEffect(() => {
		(async () => {
			if(localStorage.getItem("LOGIN_ID") == undefined){
				window.location.href="/login";
			}
			setLoading(true);
			await getStorage();
		
		})();
	}, []);

	let getStorage =async ()=>{
		setError([]); setSuccess([]);
		setLoading(true);
		let object = {
			url: ApiPath.StorageSearch,
			method: 'get',
			params: {
				"login_id": loginID
			}
		}
		
		let response = await ApiRequest(object);
	
		if (response.flag === false) {
			setError([response.message[0]]); setSuccess([]); setLoading(false);
		} else {
			if (response.data.status === 'OK') {
				let res = response.data.data;
				let cal = ((res / 5120) * 100).toFixed(2);
				setRealStorage(res.toFixed(3));
				setStorage(cal);setLoading(false);
			} else {
				setError([response.data.message]); setSuccess([]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
	}

  return (
	<CRow>
		<CCol>
			<CForm>
				<Loading start={loading} />
				<h3>Storage Setting</h3>
				<hr/>
				<Message success={success} error={error} />
	
					<CRow className="mt-5">
						<CCol lg="12" className="">
							<h5>Database Storage</h5>
						</CCol>
					</CRow>
					<CRow className="mt-1">
						<CCol lg="12" className="">
							<h6 style={{color: "#363636", fontFamily: "math"}}>The database has <span style={{color: "red", fontWeight: "bold"}}>5</span>GB of free space, and we have already used <span style={{color: "blue", fontWeight: "bold"}}>{realStorage}</span>MB</h6>
						</CCol>
					</CRow>
					<CRow className="mt-3">
						<CCol lg="12" className="text-align-center">
							<CProgress value={Number(storage)}>{storage}%</CProgress>
						</CCol>
					</CRow>
					<CRow className="">
							<CCol lg="12" className="text-align-right">
								<h6 style={{color: "red", fontStyle: "italic"}}>5GB</h6>
							</CCol>
					</CRow>
	
			  </CForm>
		</CCol>
	</CRow>
	
  )
}

export default StorageIndex
