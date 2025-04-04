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
  CFormSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import Message from "../../common/SuccessError";
import Confirmation from "../../common/Confirmation";
import Loading from "../../common/Loading"
import { cilMinus, cilPlus } from '@coreui/icons'
import PlusPaymentModal from "./PlusPaymentModal"
import MinusPaymentModal from "./MinusPaymentModal";
import {validateIntegerOnly} from "../../common/CommonValidation"
import ApiPath from "../../common/ApiPath";
import { ApiRequest } from "../../common/ApiRequest";

const SettingIndex = () => {
	const [error, setError] = useState([]); // for error message
	const [success, setSuccess] = useState([]); // for success message
	const [errorPlus, setErrorPlus] = useState([]); // for error message
	const [successPlus, setSuccessPlus] = useState([]); // for success message
	const [errorMinus, setErrorMinus] = useState([]); // for error message
	const [successMinus, setSuccessMinus] = useState([]); // for success message
	const [loading, setLoading] = useState(false);  // for loading
	const [discount, setDiscount] = useState(false);
	const [discountPercent, setDiscountPercent ] = useState("");
	const [show, setShow] = useState(false); // 
	const [content, setContent] = useState(""); // 
	const [type, setType] = useState("save"); //
	const [status, setStatus ] = useState("");
	const [plusModalShow, setPlusModalShow ] = useState(false);
	const [addPayment, setAddPayment ] = useState("");
	const [minusModalShow, setMinusModalShow ] = useState(false);
	const [ paymentData, setPaymentData ] = useState([]);
	const [deletedPaymentID, setDeletedPaymentID ] = useState("");
	const [deilveryService, setDeilveryService] = useState(false);
	const [printService, setPrintService] = useState(false);
	const [loginID , setLoginID ] = useState(localStorage.getItem('LOGIN_ID'));

	useEffect(() => {
		(async () => {
			if(localStorage.getItem("LOGIN_ID") == undefined){
				window.location.href="/login";
			}
			setLoading(true);
			await getDiscount();
			await getPayment();
			await getDelivery();
			await getPrint();
		})();
	}, []);

	let getDiscount =async () => {
		setLoading(true);
		let object = {
			url: ApiPath.SettingDiscountSearch,
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
				setLoading(false);
				let dis = response['data']['data'][0]['discount_percent'];
				setDiscountPercent(dis > 0? dis : "");setDiscount(dis > 0? true : false);
			} else {
				setError([response.data.message]); setSuccess([]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
		
	}

	let getPayment =async () => {
		setLoading(true);
		let object = {
			url: ApiPath.SettingPaymentSearch,
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
				setLoading(false);
				setPaymentData(response.data.data);
			} else {
				setError([response.data.message]); setSuccess([]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
		
	}
	
	let getDelivery =async () => {
		setLoading(true);
		let object = {
			url: ApiPath.SettingDeliverySearch,
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
				setLoading(false);
				let deli = response['data']['data'][0]['delivery_service_flag'];
				setDeilveryService(deli > 0 ? true : false);
			} else {
				setError([response.data.message]); setSuccess([]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
		
	}

	let getPrint =async () => {
		setLoading(true);
		let object = {
			url: ApiPath.SettingPrintSearch,
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
				setLoading(false);
				let print = response['data']['data'][0]['print_service_flag'];
				setPrintService(print > 0 ? true : false);
			} else {
				setError([response.data.message]); setSuccess([]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
		
	}


	let discountSaveClick = () => {
		setError([]); setSuccess([]);
		if(discount == true && discountPercent == "" ){
			setError(["Please fill discount percent!"]);
			window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		}else{
			let str = [];
			setError([]); setSuccess([]);setStatus("discount");
			setShow(true);setContent("Are you sure want to update for Discount Setting?");
		}
		
	}

	let deliveryServiceSaveClick = () => {
		let str = [];
			setError([]); setSuccess([]);setType("save");setStatus("delivery");
			setShow(true);setContent("Are you sure want to update for Delivery Service Setting?");
	}

	let printServiceSaveClick = () => {
		let str = [];
			setError([]); setSuccess([]);setType("save");setStatus("print");
			setShow(true);setContent("Are you sure want to update for Print Service Setting?");
	}
	

	let saveOK =async ()=>{
		setError([]);setSuccess([]);setShow(false);setLoading(true);
		let obj = ""; let response = "";
		if(status == "discount"){
			obj = {
				method: "post",
				url: ApiPath.SettingDiscountSave,
				params: {
					"login_id": loginID,
					"discount": discount,
					"discount_percent": discount == true? discountPercent : 0 ,
				},
			  };
			response = await ApiRequest(obj);
		}else if(status == "payment-add"){
			obj = {
				method: "post",
				url: ApiPath.SettingPaymentSave,
				params: {
					"login_id": loginID,
					"payment_name": addPayment
				},
			  };
			response = await ApiRequest(obj);
		}else if(status == "delivery"){
			obj = {
				method: "post",
				url: ApiPath.SettingDeliverySave,
				params: {
					"login_id": loginID,
					"delivery_service": deilveryService
				},
			  };
			response = await ApiRequest(obj);
		}else{
			obj = {
				method: "post",
				url: ApiPath.SettingPrintSave,
				params: {
					"login_id": loginID,
					"print_service": printService
				},
			  };
			response = await ApiRequest(obj);
		}

		  if (response.flag === false) {
			setSuccess([]);setLoading(false);
			if(status == "payment-add"){
				setErrorPlus([response.data.data.message]);
			}else{
				setError([response.data.data.message]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });setLoading(false);
			}
		  } else {
			if (response.data.status == "OK") {
				if(status == "payment-add"){
					setSuccessPlus([response.data.message]);getPayment();
				}else{
					setSuccess([response.data.message]);getDelivery();getPrint();
					window.scrollTo({ top: 0, left: 0, behavior: "smooth" });setLoading(false);
				}
			  setError([]);clear();setStatus("");
			}else{
				if(status == "payment-add"){
					setErrorPlus([response.data.message]);
				}else{
					setError([response.data.message]);
					window.scrollTo({ top: 0, left: 0, behavior: "smooth" });setLoading(false);setStatus("");
				}
				setSuccess([]);setLoading(false);
			} 
		  }
		
	}

	let deleteOK =async ()=>{
		setError([]);setSuccess([]);setShow(false);setLoading(true);
		let obj = ""; let response = "";
		if(status == "payment-delete"){
			obj = {
				method: "delete",
				url: ApiPath.SettingPaymentDelete,
				params: {
					"login_id": loginID,
					"payment_name": deletedPaymentID
				},
			  };
			response = await ApiRequest(obj);
		}else{

		}

		  if (response.flag === false) {
			setSuccess([]);setLoading(false);
			if(status == "payment-delete"){
				setErrorMinus([response.data.data.message]);
			}else{
				setError([response.data.data.message]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });setLoading(false);setStatus("");
			}
		  } else {
			if (response.data.status == "OK") {
				if(status == "payment-delete"){
					setSuccessMinus([response.data.message]);getPayment();
				}else{
					setSuccess([response.data.message]);
					window.scrollTo({ top: 0, left: 0, behavior: "smooth" });setLoading(false);setStatus("");
				}
			  setError([]);clear();
			}else{
				 if(status == "payment-delete"){
					setErrorMinus([response.data.message]);
				}else{
					setError([response.data.message]);
					window.scrollTo({ top: 0, left: 0, behavior: "smooth" });setLoading(false);setStatus("");
				}
				setSuccess([]);setLoading(false);
			} 
		  }
	}

	let clear = ()=>{
		setAddPayment("");setDeletedPaymentID("");
	}

	let discountChange = (e)=>{
		let val =e.target.checked;
		if( val == false ){
			setDiscountPercent("");
		}
		setDiscount(val);
	}

	let deliveryServiceChange = (e)=>{
		let val =e.target.checked;
		if( val == false ){
			setDeilveryService(false);
		}else{
			setDeilveryService(true);
		}
		
	}

	let printServiceChange = (e)=>{
		let val =e.target.checked;
		if( val == false ){
			setPrintService(false);
		}else{
			setPrintService(true);
		}
		
	}
	
	let cancelClick = ()=>{
		setShow(false);
		setError([]);setSuccess([]);	
		if(status == "payment-add"){
			setPlusModalShow(true);
		}else if(status == "payment-delete"){
			setMinusModalShow(true);
		}
	}

	let cancelClick1 = ()=>{
		setPlusModalShow(false);
		setErrorPlus([]);setSuccessPlus([]);
	}

	let cancelClick2 = ()=>{
		setMinusModalShow(false);setErrorMinus([]);setSuccessMinus([]);
	}

	let addPaymentChange = (e)=>{
		setAddPayment(e.target.value);
	}

	let saveOKPlusModel = ()=>{
		if(addPayment == ""){
			setErrorPlus(["Please fill payment name!"]); setSuccessPlus([]);
		}else{
			setErrorPlus([]); setSuccessPlus([]);
			setStatus("payment-add");setType("save");
			setShow(true);setPlusModalShow(false);setContent("Are you sure want to save for payment setting?");
		}
	}
	
	let removePaymentChange =(e)=>{
		setDeletedPaymentID(e.target.value)
	}

	let saveOKMinusModel = ()=>{
		if(deletedPaymentID == ""){
			setErrorMinus(["Please select payment name!"]); setSuccessMinus([]);
		}else{
			setErrorMinus([]); setSuccessMinus([]);
			setMinusModalShow(false);setType("delete");
			setStatus("payment-delete");
			setShow(true);setContent("Are you sure want to delete for payment setting?");
		}
	}

	let discountPercentChange =(e)=>{
		let val = e.target.value;
		if(val == ""){
			setDiscountPercent(val);
		}else{
			if(validateIntegerOnly(val) == true && val.charAt(0) != 0 && val < 101   ){
				setDiscountPercent(val);
			}
		}
	}
  return (
	<CRow>
		<CCol>
			<CForm>
				<Loading start={loading} />
				<h3>Setting</h3>
				<hr/>
				<Message success={success} error={error} />
				<Confirmation
					show={show}
					content={content}
					type={type}
					saveOK={saveOK}
					deleteOK={deleteOK}
					okButton={"Ok"}
					cancel={cancelClick}
					cancelButton={"Cancel"}
				/>
				<PlusPaymentModal
					success={successPlus}
					error={errorPlus}
					show={plusModalShow}
					saveOK={saveOKPlusModel}
					okButton={"Ok"}
					cancel={cancelClick1}
					cancelButton={"Cancel"}
					addPayment ={addPayment}
					addPaymentChange={addPaymentChange}
				/>
				<MinusPaymentModal
					success={successMinus}
					error={errorMinus}
					show={minusModalShow}
					saveOK={saveOKMinusModel}
					okButton={"Ok"}
					cancel={cancelClick2}
					cancelButton={"Cancel"}
					paymentData={paymentData}
					deletedPaymentID={deletedPaymentID}
					removePaymentChange={removePaymentChange}
				/>
				<CRow className="mt-5 setting-fieldset">
					<CCol lg="2" className="text-align-center">
						<CButton className="setting-fieldset-hearder">Discount Setting</CButton>
					</CCol>
					<CRow className="mt-5 mb-5">
						<CCol lg="1"></CCol>
						<CCol lg="3">
							<CFormSwitch size="xl" label="Give a discount?" checked={discount == true} id="formSwitchCheckDefault" onChange={discountChange}/>
						</CCol>
						{discount == true &&
							<CCol lg = "3">
								<div className="display-flex">
									<label style={{marginTop: "5px", marginRight: "10px"}}>Discount Percent</label><CFormInput type="text"   aria-label="sm input example" style={{width: "60px"}} value={discountPercent} onChange={discountPercentChange}    /> <label style={{marginTop: "5px", marginLeft: "2px"}}>%</label>
								</div>
							</CCol>
						}
					
						<CCol lg="2" className="display-flex">
							<CButton className="login-button center-web-phone-btn" style={{ width: "100px" }} onClick={() => discountSaveClick()}>Save</CButton>
						</CCol>
					</CRow>
				</CRow>


				<CRow className="mt-5 setting-fieldset">
					<CCol lg="2" className="text-align-center">
						<CButton className="setting-fieldset-hearder">Payment Setting</CButton>
					</CCol>
					<CRow className="mt-5 mb-5">
						<CCol lg="1"></CCol>
							<CCol lg="2" className="text-align-center">
									<p className="label">Payment Name</p>
							</CCol>
							<CCol lg="3">
								<div style={{display: "flex"}}>
								<CFormSelect className="mb-3"  style={{width: "75%"}}>
										{paymentData.length> 0 &&
												paymentData.map((data,ind)=>{
												return(
													<option value={data.id} key={ind}>{data.name}</option>
												)
											})
										}
								</CFormSelect>
								<CIcon icon={cilPlus} className="plus-button" style={{marginLeft: "10px", marginRight: "10px"}} onClick={()=>setPlusModalShow(true)}  /> 
								<CIcon icon={cilMinus} className="plus-button" onClick={()=>setMinusModalShow(true)}   />
								</div>
						</CCol>
					</CRow>
				</CRow>

				<CRow className="mt-5 setting-fieldset">
					<CCol lg="2" className="text-align-center">
						<CButton className="setting-fieldset-hearder">Delivery Service Setting</CButton>
					</CCol>
					<CRow className="mt-5 mb-5">
						<CCol lg="1"></CCol>
						<CCol lg="4">
							<CFormSwitch size="xl" label="Will you provide delivery service?" id="deliveryService" checked={deilveryService == true} onChange={deliveryServiceChange}/>
						</CCol>
						<CCol lg="2" className="display-flex">
							<CButton className="login-button center-web-phone-btn" style={{ width: "100px" }} onClick={() => deliveryServiceSaveClick()}>Save</CButton>
						</CCol>
					</CRow>
				</CRow>


				<CRow className="mt-5 mb-3 setting-fieldset">
					<CCol lg="2" className="text-align-center">
						<CButton className="setting-fieldset-hearder">Print Service Setting</CButton>
					</CCol>
					<CRow className="mt-5 mb-5">
						<CCol lg="1"></CCol>
						<CCol lg="4">
							<CFormSwitch size="xl" label="Will you use a print service?" id="printService" checked={printService == true} onChange={printServiceChange}/>
						</CCol>
						<CCol lg="2" className="display-flex">
							<CButton className="login-button center-web-phone-btn" style={{ width: "100px" }} onClick={() => printServiceSaveClick()}>Save</CButton>
						</CCol>
					</CRow>
				</CRow>








		
			  </CForm>
		</CCol>
	</CRow>
	
  )
}

export default SettingIndex
