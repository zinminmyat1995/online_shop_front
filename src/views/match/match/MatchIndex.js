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
  CFormCheck,
  CRow,
  CFormTextarea,
  CFormSelect
} from '@coreui/react'

import Message from "../../common/SuccessError";
import Confirmation from "../../common/Confirmation";
import Loading from "../../common/Loading"
import ApiPath from "../../common/ApiPath";
import { ApiRequest } from "../../common/ApiRequest";
import { is2Decimal,validateIntegerOnly } from "../../common/CommonValidation";

const MatchIndex = () => {
	const [error, setError] = useState([]); // for error message
	const [success, setSuccess] = useState([]); // for success message
	const [loading, setLoading] = useState(false);  // for loading
	const [accountData, setAccountData ] = useState([]);
	const [account, setAccount] = useState("");
	const [agentName, setAgentName ] = useState("");
	const [userName, setUserName ] = useState("");
	const [remain, setRemain ] = useState("");
	const [matchName, setMatchName ] = useState("");
	const [matchType, setMatchType ] = useState("");
	const [rate, setRate ] = useState("");
	const [out, setOut ] = useState("");

	const [show, setShow] = useState(false); // 
	const [content, setContent] = useState(""); // 
	const [type, setType] = useState(""); //
	const [loginID , setLoginID ] = useState(localStorage.getItem('LOGIN_ID'));



	useEffect(() => {
		(async () => {
			if(localStorage.getItem("LOGIN_ID") == undefined){
				window.location.href="/login";
			}
			setLoading(true);
			await getAccount();
		})();
	}, []);

	let getAccount =async ()=>{
		setLoading(true);
		let object = {
			url: ApiPath.AccountSearchWithRemain,
			method: 'get',
			params: {
				"login_id": loginID
			}
		}
	
		let response = await ApiRequest(object);

		if (response.flag === false) {
			setLoading(false);
		} else {
			if (response.data.status === 'OK') {
				setAccountData(response.data.data);setLoading(false);
			} else {
				setError([response.data.message]); setSuccess([]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
	}

	let accountChange = (val)=>{
		setAccount(val);
		if( val !="" ){
			let name = accountData.filter(data=> data.user_name == val)
			setAgentName(name[0]['agent_name'])
			setUserName(name[0]['user_name'])
			setRemain(name[0]['amount'])
		}else{
			setAgentName("");setUserName("");setRemain("");
		}
	}
	let rateChange = (val)=>{
		if(val == ""){
			setRate(val)
		}else{

			if(is2Decimal(val) == true && val != "00"){
				setRate(val)
			}
			
		}
	}

	let outChange = (val)=>{
		if(val == ""){
			setOut(val)
		}else{

			if(validateIntegerOnly(val) == true && val != "0"){
				setOut(val)
			}
			
		}
	}
	
	let saveClick = () => {
		let str = [];
	
		if (account == "") {
			str.push("Please select Account No!")
		}
		if (matchName == "") {
			str.push("Please fill Match Name!")
		}
		if (matchType == "") {
			str.push("Please select Match Type!")
		}
		if (rate == "") {
			str.push("Please fill Rate!")
		}

		if (out == "") {
			str.push("Please fill Out!")
		}else if(remain == "" || remain == null ){
			str.push("Insufficient balance for withdrawal!")
		}else if(out > parseInt(remain) ){
			str.push("Insufficient balance for withdrawal!")
		}

		if (str.length > 0) {
			setError(str);
			setSuccess([]);
			window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		} else {
			setError([]); setSuccess([]);setType("save");
			setShow(true);setContent("Are you sure want to save?");
		}
	}

	let saveOK =async ()=>{
		setLoading(true);setShow(false);

		let obj = {
			method: "post",
			url: ApiPath.MatchSave,
			params: {
				"user_name": userName,
				"match_name": matchName,
				"match_type": matchType,
				"out": out,
				"rate": rate,
				"login_id": loginID
			},
		  };
		  let response = await ApiRequest(obj);
			  
		  if (response.flag === false) {
			setError(response.message);setLoading(false);window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		  } else {
			if (response.data.status == "OK") {
			  setSuccess([response.data.message]);setAccount("");setAgentName("");setUserName("");setRemain("");setMatchName("");setMatchType("");setRate("");setOut("");getAccount();
			  setLoading(false);
			  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}else{
				setError([response.data.message]);setSuccess([]);setLoading(false);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			} 
		  }
	}



	let cancelClick = ()=>{
		setError([]); setSuccess([]);
		setShow(false);
	}


  return (
	<CRow>
		<CCol>
			<CForm>
				<Loading start={loading} />
				<h3>Match Registration</h3>
				<hr/>
				<Message success={success} error={error} />
				<Confirmation
					show={show}
					content={content}
					type={type}
					saveOK={saveOK}
					okButton={"OK"}
					cancel={cancelClick}
					cancelButton={"Cancel"}
				/>
				

				<CRow className="mt-5">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Account No</p>
					</CCol>
					<CCol lg="4">
						<CFormSelect className="mb-3" value={account}  onChange={(e)=>accountChange(e.target.value)}>
							<option  value=""></option>
							{accountData.length > 0 &&
									accountData.map((data, ind) => {
									return (
										<option value={data.user_name} key={ind}>{data.account_name}</option>
									)
								})
							}
						</CFormSelect>
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>


				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Agent Name</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text"   aria-label="sm input example" value={agentName}  readOnly/>
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>

				
				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Remain</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text"   aria-label="sm input example" value={remain == null ? "" : remain}  readOnly/>
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>

				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Match Name</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text"   aria-label="sm input example" value={matchName}  onChange={(e)=>setMatchName(e.target.value)}/>
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>

				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Match Type</p>
					</CCol>
					<CCol lg="4">
						<CFormSelect className="mb-3" value={matchType}  onChange={(e)=>setMatchType(e.target.value)}>
							<option  value=""></option>
							<option  value="1">Body</option>
							<option  value="2">Over</option>
							<option  value="3">Under</option>
						</CFormSelect>
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>

				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Rate</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text"   aria-label="sm input example" value={rate}  onChange={(e)=>rateChange(e.target.value)} />
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>



				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Out</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text"   aria-label="sm input example" value={out}  onChange={(e)=>outChange(e.target.value)} />
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>


				<CRow className="mt-5 mb-5">
					<CCol lg="3"></CCol>
					<CCol lg="6" className="text-align-center">
						<CButton className="btn-color"  onClick={() => saveClick()} style={{width: "100px"}}>Save</CButton>
						
					</CCol>
					<CCol lg="2"></CCol>
				</CRow>
			  </CForm>
		</CCol>
	</CRow>
  )
}

export default MatchIndex
