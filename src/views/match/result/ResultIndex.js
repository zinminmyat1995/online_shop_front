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

const ResultIndex = () => {
	const [error, setError] = useState([]); // for error message
	const [success, setSuccess] = useState([]); // for success message
	const [loading, setLoading] = useState(false);  // for loading
	const [accountData, setAccountData ] = useState([]);
	const [account, setAccount] = useState("");
	const [accountID, setAccountID] = useState("");
	const [matchName, setMatchName ] = useState("");
	const [matchType, setMatchType ] = useState("");
	const [rate, setRate ] = useState("");
	const [result, setResult ] = useState("1");
	const [out, setOut ] = useState("");
	const [In, setIn ] = useState("");
	const [userName, setUserName ] = useState("");
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
			url: ApiPath.AccountSearchWithMatch,
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
				setAccountData(response.data.data);
				setLoading(false);
			} else {
				setError([response.data.message]); setSuccess([]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
	}
	let accountChange = (val,event)=>{
		let selectedOption = event.target.options[event.target.selectedIndex];
		let selectedId = selectedOption.getAttribute("id"); 
		setAccount(val);setAccountID(selectedId);
		if( val !="" ){
			let name = accountData.filter(data=> data.id == selectedId)
			setMatchName(name[0]['match_name'])
			setMatchType(name[0]['match_type'])
			setRate(name[0]['rate'])
			setOut(name[0]['out'])
			setUserName(name[0]['user_name']);setIn("");
		}else{
			setMatchName("");setMatchType("");setRate("");setOut("");setUserName("");setIn("");
		}
	}

	
	let saveClick = () => {
		let str = [];
	
		if (account == "") {
			str.push("Please select Account No!")
		}

		if(result < 3){
			if (In == "") {
				str.push("Please select In!")
			}
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
			url: ApiPath.MatchResult,
			params: {
				"user_name": userName,
				"id": accountID,
				"status": result,
				"in": In,
				"out": out,
				"login_id": loginID
			},
		  };
		  let response = await ApiRequest(obj);
			  
		  if (response.flag === false) {
			setError(response.message);setLoading(false);window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		  } else {
			if (response.data.status == "OK") {
			  setSuccess([response.data.message]);setAccount("");setMatchName("");setMatchType("");setRate("");setResult("1");setOut("");setUserName("");getAccount();setIn("");setAccountID("")
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


	let InChange = (val) =>{
		if(val == ""){
			setIn(val)
		}else{

			if(validateIntegerOnly(val) == true && val != "0"){
				setIn(val)
			}
			
		}
	}

  return (
	<CRow>
		<CCol>
			<CForm>
				<Loading start={loading} />
				<h3>Match Result</h3>
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
						<CFormSelect className="mb-3" value={account}  onChange={(e)=>accountChange(e.target.value,e)}>
							<option  value=""></option>
							{accountData.length > 0 &&
									accountData.map((data, ind) => {
									return (
										<option value={data.user_name} id={data.id} key={ind}>{data.account_name}({data.match_name})</option>
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
							<p className="label">Match Name</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text"   aria-label="sm input example" value={matchName}  readOnly/>
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>

				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Match Type</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text"   aria-label="sm input example" value={matchType == 1? "Body" : ( matchType == 2? "Over" : ( matchType == 3? "Under" : "" ) )}  readOnly/>
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>

				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Rate</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text"   aria-label="sm input example" value={rate}  readOnly/>
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>

				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Out</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text"   aria-label="sm input example" value={out}  readOnly/>
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>


				<CRow className="mt-4">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Result</p>
					</CCol>
					<CCol lg="1">
						<CFormCheck type="radio" name="flexRadioDefault"  id="flexRadioDefault1" value='1' label="Win" checked  checked={result == 1? "checked" : ""} onChange={(e)=>setResult(e.target.value)}/>
					</CCol>
					<CCol lg="1">
						<CFormCheck type="radio" name="flexRadioDefault"  id="flexRadioDefault2" value='2' label="Lose" checked={result == 2? "checked" : ""}  onChange={(e)=>setResult(e.target.value)}/>
					</CCol>
					<CCol lg="1">
						<CFormCheck type="radio" name="flexRadioDefault"  id="flexRadioDefault3" value='3' label="Draw" checked={result == 3? "checked" : ""}  onChange={(e)=>setResult(e.target.value)}/>
					</CCol>
					<CCol lg="5"></CCol>
				</CRow>

				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">In</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text"   aria-label="sm input example" value={In}  onChange={(e)=>InChange(e.target.value)}/>
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

export default ResultIndex
