import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormCheck,
  CInputGroupText,
  CRow,
  CFormTextarea,
  CFormSelect
} from '@coreui/react'

import Message from "../../common/SuccessError";
import Confirmation from "../../common/Confirmation";
import Loading from "../../common/Loading"
import ApiPath from "../../common/ApiPath";
import { ApiRequest } from "../../common/ApiRequest";
import { validateIntegerOnly,is2Decimal } from "../../common/CommonValidation";

const RegistrationIndex = () => {
	const [error, setError] = useState([]); // for error message
	const [success, setSuccess] = useState([]); // for success message
	const [loading, setLoading] = useState(false);  // for loading
	const [code, setCode ] = useState("");
	const [codeData, setCodeData ] = useState([]);
	const [role, setRole ] = useState(localStorage.getItem("ROLE"));
	const [agentName, setAgentName ] = useState("");
	const [userName, setUserName ] = useState("");
	const [bonus, setBonus ] = useState("");

	const [amount, setAmount ] = useState("");
	const [note, setNote ] = useState("");

	const [show, setShow] = useState(false); // 
	const [content, setContent] = useState(""); // 
	const [type, setType] = useState(""); //
	const [loginID , setLoginID ] = useState(localStorage.getItem('LOGIN_ID'));
	const [loginType , setLoginType ] = useState(localStorage.getItem('LOGIN_TYPE'));


	useEffect(() => {
		(async () => {
			if(localStorage.getItem("LOGIN_ID") == undefined || loginType != 1){
				window.location.href="/login";
			}
			setLoading(true);
			await getAccount();
		})();
	}, []);

	let getAccount =async ()=>{
		setError([]); setSuccess([]);
		setLoading(true);
		let object = {
			url: ApiPath.AccountSearch,
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
				setCodeData(response.data.data);setLoading(false);
			} else {
				setError([response.data.message]); setSuccess([]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
	}

	let saveClick = () => {
		let str = [];
	
		if (code == "") {
			str.push("Please select Account No!")
		}
		if (amount == "") {
			str.push("Please fill Amount!")
		}
		if (note == "") {
			str.push("Please fill Remark!")
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
			url: ApiPath.DepositSave,
			params: {
				"amount": amount,
				"bonus": (bonus == ""? 0 : bonus),
				"note": note,
				"user_name": userName,
				"login_id": loginID
			},
		  };
		  let response = await ApiRequest(obj);
			  
		  if (response.flag === false) {
			setError(response.message);setLoading(false);
		  } else {
			if (response.data.status == "OK") {
			  setSuccess([response.data.message]);setCode("");setAgentName("");setAmount("");setNote("");setBonus("");
			  setLoading(false);
			  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}else{
				setError([response.data.message]);setSuccess([]);setLoading(false);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			} 
		  }
	}

	
	let codeChange = (val)=>{
		setCode(val);
		if( val !="" ){
			let name = codeData.filter(data=> data.user_name == val)
			setAgentName(name[0]['agent_name'])
			setUserName(name[0]['user_name'])
		}else{
			setAgentName("");setUserName("");
		}
	}


	let cancelClick = ()=>{
		setError([]); setSuccess([]);
		setShow(false);
	}

	let amountChange = (val)=>{
		if(val == ""){
			setAmount(val)
		}else{

			if (is2Decimal(val) && val !== "00") {
				setAmount(val);
			}

		}
	}

	let bonusChange = (val)=>{
		if(val == ""){
			setBonus(val)
		}else{
			if (is2Decimal(val) && val !== "00") {
				setBonus(val);
			}
		}
	}
	

  return (
	<CRow>
		<CCol>
			<CForm>
				<Loading start={loading} />
				<h3>Deposit Registration</h3>
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
						<CFormSelect className="mb-3" value={code}  onChange={(e)=>codeChange(e.target.value)}>
							<option  value=""></option>
							{codeData.length > 0 &&
									codeData.map((data, ind) => {
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

				<CRow className="mt-3 mb-4">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Amount</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text"   aria-label="sm input example" value={amount}  onChange={(e)=>amountChange(e.target.value)} />
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>

				<CRow className="mt-3 mb-4">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Bonus</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text"   aria-label="sm input example" value={bonus}  onChange={(e)=>bonusChange(e.target.value)} />
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>

				<CRow className="mt-3 ">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Remark</p>
					</CCol>
					<CCol lg="4">
						<CFormTextarea
							feedbackInvalid="Please enter a message in the textarea."
							id="note"
							required
							value={note}
							onChange={(e)=>setNote(e.target.value)}
							></CFormTextarea>
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>

				
				<CRow className="mt-5 mb-5">
					<CCol lg="3"></CCol>
					<CCol lg="6" className="text-align-center">
						{role == 1 &&
							<CButton className="btn-color"  onClick={() => saveClick()} style={{width: "100px"}}>Save</CButton>
						}
						{role > 1 &&
							<CButton className="btn-color  not-allow" style={{width: "100px"}}>Save</CButton>
						}
						
					</CCol>
					<CCol lg="2"></CCol>
				</CRow>
			  </CForm>
		</CCol>
	</CRow>
  )
}

export default RegistrationIndex
