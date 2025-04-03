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
import {
	cilArrowThickRight
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import Message from "../../common/SuccessError";
import Confirmation from "../../common/Confirmation";
import Loading from "../../common/Loading"
import ApiPath from "../../common/ApiPath";
import { ApiRequest } from "../../common/ApiRequest";
import { is2Decimal } from "../../common/CommonValidation";

const TransferIndex = () => {
	const [error, setError] = useState([]); // for error message
	const [success, setSuccess] = useState([]); // for success message
	const [loading, setLoading] = useState(false);  // for loading
	const [adminFrom, setAdminFrom ] = useState("");
	const [adminTo, setAdminTo ] = useState("");
	const [amount, setAmount ] = useState("");
	const [adminFromData, setAdminFromData ] = useState([]);
	const [adminToData, setAdminToData ] = useState([]);
	const [currency, setCurrency ] = useState("1");
	const [show, setShow] = useState(false); // 
	const [content, setContent] = useState(""); // 
	const [type, setType] = useState(""); //
	const [loginID , setLoginID ] = useState(localStorage.getItem('LOGIN_ID'));
	const [role , setRole ] = useState(localStorage.getItem('ROLE'));
	const [name , setName ] = useState(localStorage.getItem('NAME'));

	useEffect(() => {
		(async () => {
			if(localStorage.getItem("LOGIN_ID") == undefined){
				window.location.href="/login";
			}
			setLoading(true);
			await getAdmin();
		})();
	}, []);

	let getAdmin =async ()=>{
		setLoading(true);
		let object = {
			url: ApiPath.SearchAdmin,
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
				let res = response.data.data;
				if(role < 2){
					setAdminFromData(res); setAdminToData(res); 
				}else{
					let data = res.filter(data=>data.code != loginID)
					setAdminFrom(loginID); setAdminToData(data); 
				}
				 setLoading(false);
			} else {
				setError([]); setSuccess([]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
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

	let adminFromChange = (val)=>{
		if(val == ""){
			setAdminFrom(val);
			setAdminToData(adminFrom);
			setAdminTo("");
		}else{
			let res = adminFromData.filter(data=> data.code != val)
			setAdminFrom(val);
			setAdminToData(res)
		}
		
	}

	let adminToChange = (val)=>{
		setAdminTo(val);
		
	}
	
	let saveClick = () => {
		let str = [];
	
		if (adminFrom == "") {
			str.push("Please select Admin From!")
		}
		if (adminTo == "") {
			str.push("Please select Admin To!")
		}
		if (amount == "") {
			str.push("Please fill Amount!")
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
			url: ApiPath.TransactionTransfer,
			params: {
				"from": adminFrom,
				"to": adminTo,
				"type": currency,
				"amount": amount,
				"login_id": loginID
			},
		  };
		  let response = await ApiRequest(obj);
			  
		  if (response.flag === false) {
			setError(response.message);setLoading(false);window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		  } else {
			if (response.data.status == "OK") {
			  setSuccess([response.data.message]);getAdmin();
			  setAdminFrom("");setAdminTo("");setCurrency("1");setAmount("");
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
				<h3>Transfer Currency</h3>
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
					<CCol lg="1">
					</CCol>
					<CCol lg="2" className="text-align-right">
						<p className="label">Admin From</p>
					</CCol>
				
					<CCol lg="2" >
					{role < 2 &&
						<CFormSelect className="mb-3" value={adminFrom}  onChange={(e)=>adminFromChange(e.target.value)}>
								<option  value=""></option>
								{adminFromData.length > 0 &&
										adminFromData.map((data, ind) => {
										return (
											<option value={data.code} key={ind}>{data.name}</option>
										)
									})
								}
							</CFormSelect>
					}
					{role > 1 &&
						<CFormInput type="text"   aria-label="sm input example" value={name}  readOnly/>
					}
					
					</CCol>
					<CCol lg="1" style={{textAlign: "center", marginTop: "6px"}}>
						<CIcon icon={cilArrowThickRight} size="xl"/>
					</CCol>
					<CCol lg="1" className="text-align-right">
						<p className="label">Admin To</p>
					</CCol>
					<CCol lg="2">
						{adminFrom != "" &&
							<CFormSelect className="mb-3" value={adminTo}  onChange={(e)=>adminToChange(e.target.value)}>
								<option  value=""></option>
								{adminToData.length > 0 &&
										adminToData.map((data, ind) => {
										return (
											<option value={data.code} key={ind}>{data.name}</option>
										)
									})
								}
							</CFormSelect>
						}
						{adminFrom == "" &&
							<CFormSelect className="mb-3">
								<option  value=""></option>
							</CFormSelect>
						}
						
					</CCol>
				
		
				
				</CRow>


				<CRow className="mt-5">
					<CCol lg="1">
					</CCol>
					<CCol lg="2" className="text-align-right">
						<p className="label">Currency</p>
					</CCol>
				
					<CCol lg="2" >
						<CFormSelect className="mb-3" value={currency}  onChange={(e)=>setCurrency(e.target.value)}>
							<option  value="1">USD</option>
							<option  value="2">MMK</option>
							<option  value="3">THB</option>
						</CFormSelect>
					</CCol>
					<CCol lg="1" >
					</CCol>
					<CCol lg="1" className="text-align-right">
						<p className="label">Amount</p>
					</CCol>
					<CCol lg="2">
						<CFormInput type="text"   aria-label="sm input example" value={amount}  onChange={(e)=>amountChange(e.target.value)} />
					</CCol>
				
				</CRow>
				

				<CRow  className="mt-5 ">
					<CCol lg="5"></CCol>
					<CCol>
						<CButton className="btn-color" style={{ width: "100px" }} onClick={() => saveClick()}>Save</CButton>
					</CCol>

				</CRow>
				
			  </CForm>
		</CCol>
	</CRow>
  )
}

export default TransferIndex
