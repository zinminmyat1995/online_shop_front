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
import { is2Decimal } from "../../common/CommonValidation";

const TransactionIndex = () => {
	const [error, setError] = useState([]); // for error message
	const [success, setSuccess] = useState([]); // for success message
	const [loading, setLoading] = useState(false);  // for loading
	const [name, setName ] = useState(localStorage.getItem('NAME'));
	const [currencyData, setCurrencyData ] = useState([]);
	const [currency, setCurrency ] = useState("");
	const [rateType, setRateType ] = useState("");
	const [rate, setRate ] = useState("");
	const [customerName, setCustomerName ] = useState("");
	const [customerAcc, setCustomerAcc ] = useState("");
	const [amount, setAmount ] = useState("");
	const [transAmount, setTransAmount ] = useState("");
	const [transNo, setTransNo ] = useState("");
	const [fee, setFee ] = useState("");
	const [payRate, setPayRate ] = useState("");

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

	let saveClick = () => {
		let str = [];
	
		if (currency == "") {
			str.push("Please select Currency!")
		}
		if (fee == "") {
			str.push("Please fill Fee!")
		}
		if (customerName == "") {
			str.push("Please fill Customer Name!")
		}
		if (customerAcc == "") {
			str.push("Please fill Customer Account!")
		}
		if (amount == "") {
			str.push("Please fill Amount!")
		}
		if (transNo == "") {
			str.push("Please fill Transaction No!")
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
			url: ApiPath.TransactionSave,
			params: {
				"code": loginID,
				"rate_type": rateType,
				"pay_rate": payRate,
				"customer_name": customerName,
				"customer_acc": customerAcc,
				"amount": amount,
				"transaction_amount": transAmount,
				"transaction_no": transNo,
				"login_id": loginID
			},
		  };
		  let response = await ApiRequest(obj);
			  
		  if (response.flag === false) {
			setError(response.message);setLoading(false);window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		  } else {
			if (response.data.status == "OK") {
			  setSuccess([response.data.message]);setCurrency("");setRate("");setFee("");setPayRate("");setCustomerName("");setCustomerAcc("");setAmount("");setTransAmount("");setTransNo("");setRateType("");
			  setLoading(false);
			  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}else{
				setError([response.data.message]);setSuccess([]);setLoading(false);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			} 
		  }
	}

	let currencyChange = (e)=>{
		const selectedRate = e.target.value; 
		const selectedRateType = e.target.options[e.target.selectedIndex].getAttribute('name');
		setRateType(selectedRateType)
		setCurrency(selectedRate);
		setRate(selectedRate);setFee("");setPayRate("");	setAmount("");setTransAmount("");
	}

	let amountChange = (val)=>{
		if(val == ""){
			setTransAmount("");setAmount(val)
		}else{

			if(is2Decimal(val) == true && val != "0"){
				if(rateType == 1 || rateType == 3 || rateType == 6){
					let num = parseFloat(val) * ( parseFloat(rate) - parseFloat(fee) );
					setTransAmount(num.toFixed(2));
				}else{
		
					let num = parseFloat(val) / (  parseFloat(rate) + parseFloat(fee) )
					setTransAmount(num.toFixed(2));
				}
				
				setAmount(val)
			}
			
		}
	}
	let feeChange = (val)=>{
		if(val == ""){
			setPayRate("");setFee(val)
		}else{
			if(is2Decimal(val) == true && val != "0" && parseFloat(val) < rate){
				if(rateType == 1 || rateType == 3 || rateType == 6){
					setPayRate(parseFloat(rate) - parseFloat(val));
				}else{
					setPayRate(parseFloat(rate) + parseFloat(val));
				}
				setFee(val)
			}
			
		}
		setAmount("");setTransAmount("");
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
				<h3>Transaction</h3>
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
							<p className="label">Admin</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text"   aria-label="sm input example" value={name}  readOnly/>
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>

				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Currency</p>
					</CCol>
					<CCol lg="4">
						<CFormSelect className="mb-3" value={currency}  onChange={(e)=>currencyChange(e)}>
							<option  value=""></option>
							{currencyData.length > 0 &&
									currencyData.map((data, ind) => {
									return (
										<option  value={data.rate} name={data.rate_type} key={ind}>{data.rate_type == 1? "USD -> MMK" : ( data.rate_type == 2? "MMK -> USD" : ( data.rate_type == 3? "USD -> THB" : ( data.rate_type == 4? "THB -> USD" : ( data.rate_type == 5? "MMK -> THB" : "THB -> MMK" ) ) ) )}</option>
									)
								})
							}	
						</CFormSelect>
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>


				<CRow className="mt-1">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Rate</p>
					</CCol>
					<CCol lg="2">
						<CFormInput type="text"   aria-label="sm input example" value={rate}  readOnly/>
					</CCol>
					<CCol lg="1" style={{textAlign: "end"}}>Fee</CCol>
					<CCol lg="1">
						{rate == "" &&
							<CFormInput type="text"   aria-label="sm input example" readOnly/>
						}
						{rate != "" &&
							<CFormInput type="text"   aria-label="sm input example" value={fee} maxLength={3}  onChange={(e)=>feeChange(e.target.value)}/>
						}
						
					</CCol>
				</CRow>


				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Pay Rate</p>
					</CCol>
					<CCol lg="4" style={{display: "flex"}}>
						<CFormInput type="text"   aria-label="sm input example" value={payRate}  readOnly/>
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>


				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Customer Name</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text"   aria-label="sm input example" value={customerName}  onChange={(e)=>setCustomerName(e.target.value)} />
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>


				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Customer Account</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text"   aria-label="sm input example" value={customerAcc}  onChange={(e)=>setCustomerAcc(e.target.value)} />
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>


				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Amount</p>
					</CCol>
					<CCol lg="3">
					{payRate == "" &&
						<CFormInput type="text"   aria-label="sm input example" readOnly/>
					}
					{payRate != "" &&
						<CFormInput type="text"   aria-label="sm input example" value={amount}  onChange={(e)=>amountChange(e.target.value)} />
					}
					</CCol>
					<CCol lg="1">
						{rateType == 1? "USD" : ( rateType == 2? "MMK" : ( rateType == 3? "USD" : ( rateType == 4? "THB" : ( rateType == 5? "MMK" : ( rateType == 6 ? "THB" : "" ) ) ) ) )}
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>


				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Transaction Amount</p>
					</CCol>
					<CCol lg="3">
						<CFormInput type="text"   aria-label="sm input example" value={transAmount} readOnly/>
					</CCol>
					<CCol lg="1">
						{rateType == 1? "MMK" : ( rateType == 2? "USD" : ( rateType == 3? "THB" : ( rateType == 4? "USD" : ( rateType == 5? "THB" : ( rateType == 6 ? "MMK" : "" ) ) ) ) )}
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>

				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Transaction No</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text"   aria-label="sm input example" value={transNo}  onChange={(e)=>setTransNo(e.target.value)} />
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

export default TransactionIndex
