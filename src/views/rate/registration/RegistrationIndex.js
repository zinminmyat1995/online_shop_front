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
  CFormSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import Message from "../../common/SuccessError";
import Confirmation from "../../common/Confirmation";
import Loading from "../../common/Loading"
import ApiPath from "../../common/ApiPath";
import { ApiRequest } from "../../common/ApiRequest";
import { validateIntegerOnly } from "../../common/CommonValidation";
import { Card } from "@mui/material";

const RegistrationIndex = () => {
	const [error, setError] = useState([]); // for error message
	const [success, setSuccess] = useState([]); // for success message
	const [loading, setLoading] = useState(false);  // for loading
	const [currency, setCurrency] = useState("");
	const [amount, setAmount ] = useState("");
	const [currencyData, setCurrencyData ] = useState([]);

	const [show, setShow] = useState(false); // 
	const [content, setContent] = useState(""); // 
	const [type, setType] = useState("save"); //
	const [loginID , setLoginID ] = useState(localStorage.getItem('LOGIN_ID'));
	useEffect(() => {
		(async () => {
			if(localStorage.getItem("LOGIN_ID") == undefined){
				window.location.href="/login";
			}
			setLoading(true);
			await getRate();
		})();
	}, []);

	let getRate =async ()=>{
		setLoading(true);
		let object = {
			url: ApiPath.RateSearch,
			method: 'get',
			params: {
				"login_id": loginID
			}
		}
	
		let response = await ApiRequest(object);

		if (response.flag === false) {
			setError([]); setSuccess([]); setLoading(false);
		} else {
			if (response.data.status === 'OK') {
				setCurrencyData(response.data.data);setLoading(false);
			} else {
				setError([]); setSuccess([]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
	}

	let currencyChange = (val)=>{
		setCurrency(val);
	}


	let saveClick = () => {
		let str = [];
		if (currency == "") {
			str.push("Please select Currency!")
		}

		if (amount == "") {
			str.push("Please fill Amount!")
		}else if(validateIntegerOnly(amount) == false){
			str.push("Amount is number only!")
		}

		if (str.length > 0) {
			setError(str);
			setSuccess([]);
			window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		} else {
			setError([]); setSuccess([]);
			setShow(true);setContent("Are you sure want to save?");
		}
	}

	let saveOK =async ()=>{
		setShow(false);
		setError([]);setSuccess([]);setShow(false);setLoading(true);
		let obj = {
			method: "post",
			url: ApiPath.RateSave,
			params: {
				"type": currency,
				"amount": amount,
				"login_id": loginID,
			},
		  };
		  let response = await ApiRequest(obj);
			  
		  if (response.flag === false) {
			setSuccess([]);setLoading(false);
			setError(response.message);
		  } else {
			if (response.data.status == "OK") {
			  setSuccess([response.data.message]);setError([]);setCurrency("");setAmount("");getRate();
			  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}else{
				setError([response.data.message]);setSuccess([]);setLoading(false);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			} 
		  }
	}

	let amountChange = (val)=>{
		if(val == ""){
			setAmount(val)
		}else{
			if(validateIntegerOnly(val) == true && val != "0"){
				setAmount(val)
			}
					
		}
	}
  return (
	<CRow>
		<CCol>
			<CForm>
				<Loading start={loading} />
				<h3>Rate Registration</h3>
				<hr/>
				<Message success={success} error={error} />
				<Confirmation
					show={show}
					content={content}
					type={type}
					saveOK={saveOK}
					okButton={"OK"}
					cancel={() => setShow(false)}
					cancelButton={"Cancel"}
				/>
			<CRow className="mt-5">	
					{currencyData.length > 0 &&
							currencyData.map((data, ind) => {
							return (
								<CCol lg="2" key={ind}>
									<Card className="rate-card">
										<CRow className="rate-card-row1">
											<CCol style={{marginTop: "14px"}}> 
												{data.rate_type == 1? "USD -> MMK" : ( data.rate_type == 2? "MMK -> USD" : ( data.rate_type == 3? "USD -> THB" : ( data.rate_type == 4? "THB -> USD" : ( data.rate_type == 5? "MMK -> THB" : "THB -> MMK" ) ) ) )}
											</CCol>
										</CRow>
										<CRow className="rate-card-row2">
											<CCol className="rate-card-row2-col"> 
												{data.rate}
											</CCol>
										</CRow>
									</Card>
								</CCol>
							)
						})
					}	
			</CRow>


				<CRow className="mt-5">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Currency</p>
					</CCol>
					<CCol lg="4">
						<CFormSelect className="mb-3" value={currency}  onChange={(e)=>currencyChange(e.target.value)}>
							<option  value=""></option>
							<option  value="1">USD -> MMK</option>
							<option  value="2">MMK -> USD</option>
							<option  value="3">USD -> THB</option>
							<option  value="4">THB -> USD</option>
							<option  value="5">MMK -> THB</option>
							<option  value="6">THB -> MMK</option>
						</CFormSelect>
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>


				<CRow className="mt-4">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Amount</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text"   aria-label="sm input example" value={amount}  onChange={(e) => amountChange(e.target.value)}  />
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>

				
				<CRow className="mt-4 mb-5">
					<CCol lg="4"></CCol>
					<CCol lg="4 text-align-center">
						<CButton className="btn-color"  onClick={() => saveClick()}  style={{width: "100px"}}>Save</CButton>
					</CCol>
					<CCol lg="3"></CCol>
				</CRow>
			  </CForm>
		</CCol>
	</CRow>
  )
}

export default RegistrationIndex 
