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
import { validateIntegerOnly } from "../../common/CommonValidation";

const SaleIndex = () => {
	const [error, setError] = useState([]); // for error message
	const [success, setSuccess] = useState([]); // for success message
	const [loading, setLoading] = useState(false);  // for loading
	const [amount1, setAmount1 ] = useState("");
	const [amount2, setAmount2 ] = useState("");
	const [amount3, setAmount3 ] = useState("");
	const [amount4, setAmount4 ] = useState("");
	const [amount5, setAmount5 ] = useState("");
	const [amount6, setAmount6 ] = useState("");
	const [currency, setCurrency ] = useState("1");
	const [currencyData, setCurrencyData ] = useState([]);
	const [currencyAmountData, setCurrencyAmountData ] = useState([]);

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
			await getRemain();
		})();
	}, []);

	let getRemain =async ()=>{
		setLoading(true);
		let object = {
			url: ApiPath.RemainSearch,
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
				let data = processData(res)
				let data1 = processData1(res)
				setCurrencyAmountData(data1);
				setCurrencyData(data);setLoading(false);
			} else {
				setError([]); setSuccess([]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
	}

	const processData = (responseData) => {
		// Define the expected codes in order
		const expectedCodes = ["10001", "10002", "10003", "10004", "10005", "10006"];
    
		// Create a map of existing response data
		const dataMap = {};
		responseData.forEach(item => {
			dataMap[item.code] = item;
		});
    
		// Generate the final array
		const resultArray = expectedCodes.map(code => dataMap[code] || "");
    
		return resultArray;
	};
	const processData1 = (responseData) => {
		// Define the expected codes in order
		const expectedCodes = ["10001", "10002", "10003", "10004", "10005", "10006"];
    
		// Create a map of existing response data
		const dataMap = {};
		responseData.forEach(item => {
			dataMap[item.code] = item.usd;
		});
    
		// Generate the final array
		const resultArray = expectedCodes.map(code => dataMap[code] || "");
    
		return resultArray;
	};
	let amount1Change = (val)=>{
		if(val == ""){
			setAmount1(val)
		}else{
			if(validateIntegerOnly(val) == true && val != "0" &&  parseInt(val) <= currencyAmountData[0]){
				setAmount1(val)
			}
			
		}
	}
	let amount2Change = (val)=>{
		if(val == ""){
			setAmount2(val)
		}else{
			if(validateIntegerOnly(val) == true && val != "0" &&  parseInt(val) <= currencyAmountData[1]){
				setAmount2(val)
			}
			
		}
	}
	let amount3Change = (val)=>{
		if(val == ""){
			setAmount3(val)
		}else{
			if(validateIntegerOnly(val) == true && val != "0" &&  parseInt(val) <= currencyAmountData[2]){
				setAmount3(val)
			}
			
		}
	}
	let amount4Change = (val)=>{
		if(val == ""){
			setAmount4(val)
		}else{
			if(validateIntegerOnly(val) == true && val != "0" &&  parseInt(val) <= currencyAmountData[3]){
				setAmount4(val)
			}
			
		}
	}
	let amount5Change = (val)=>{
		if(val == ""){
			setAmount5(val)
		}else{
			if(validateIntegerOnly(val) == true && val != "0" &&  parseInt(val) <= currencyAmountData[4]){
				setAmount5(val)
			}
			
		}
	}
	let amount6Change = (val)=>{
		if(val == ""){
			setAmount6(val)
		}else{
			if(validateIntegerOnly(val) == true && val != "0" &&  parseInt(val) <= currencyAmountData[5]){
				setAmount6(val)
			}
			
		}
	}

	let currencyChange = (val)=>{
		if(val == 1){
			let data = currencyData.map(item => item.usd);
			setCurrencyAmountData(data);
		}else if(val == 2){
			let data = currencyData.map(item => item.mmk);
			setCurrencyAmountData(data);
		}else{
			let data = currencyData.map(item => item.b);
			setCurrencyAmountData(data);
		}
		setCurrency(val);
	}
	

	let saveClick = () => {
		let str = [];
	
		if (amount1 == "" && amount2 == "" && amount3 == "" && amount4 == "" && amount5 == "" && amount6 == "") {
			str.push("Please fill amount to sale!")
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
			url: ApiPath.TransactionSale,
			params: {
				"type":currency,
				"admin1": "10001",
				"amount1": amount1,
				"admin2": "10002",
				"amount2": amount2,
				"admin3": "10003",
				"amount3": amount3,
				"admin4": "10004",
				"amount4": amount4,
				"admin5": "10005",
				"amount5": amount5,
				"admin6": "10006",
				"amount6": amount6,
				"login_id": loginID
			},
		  };
		  let response = await ApiRequest(obj);
			  
		  if (response.flag === false) {
			setError(response.message);setLoading(false);window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		  } else {
			if (response.data.status == "OK") {
			  setSuccess([response.data.message]);getRemain();
			  setAmount1("");setAmount2("");setAmount3("");setAmount4("");setAmount5("");setAmount6("");setCurrency("1");
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
				<h3>Sale Currency</h3>
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
							<p className="label">Currency</p>
					</CCol>
					<CCol lg="4">
						<CFormSelect className="mb-3" value={currency}  onChange={(e)=>currencyChange(e.target.value)}>
							<option  value="1">USD</option>
							<option  value="2">MMK</option>
							<option  value="3">THB</option>
						</CFormSelect>
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>

				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Ko Min</p>
					</CCol>
					<CCol lg="4">
						<CRow>
							<CCol lg="5">
								<CFormInput type="text"   aria-label="sm input example" value={currencyAmountData.length >0? currencyAmountData[0] : ""}  readOnly />
							</CCol>
							<CCol lg="2" style={{textAlign: "center", marginTop: "6px"}}>
								<CIcon icon={cilArrowThickRight} size="xl"/>
							</CCol>
							<CCol lg="5">
								<CFormInput type="text"   aria-label="sm input example" value={amount1}  onChange={(e)=>amount1Change(e.target.value)} />
							</CCol>
						</CRow>
					
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>

				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Ko Pe</p>
					</CCol>
					<CCol lg="4">
						<CRow>
							<CCol lg="5">
								<CFormInput type="text"   aria-label="sm input example" value={currencyAmountData.length >0? currencyAmountData[1] : ""}  readOnly />
							</CCol>
							<CCol lg="2" style={{textAlign: "center", marginTop: "6px"}}>
								<CIcon icon={cilArrowThickRight} size="xl"/>
							</CCol>
							<CCol lg="5">
								<CFormInput type="text"   aria-label="sm input example" value={amount2}  onChange={(e)=>amount2Change(e.target.value)} />
							</CCol>
						</CRow>
					
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>

				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Ko Zin</p>
					</CCol>
					<CCol lg="4">
						<CRow>
							<CCol lg="5">
								<CFormInput type="text"   aria-label="sm input example" value={currencyAmountData.length >0? currencyAmountData[2] : ""}  readOnly/>
							</CCol>
							<CCol lg="2" style={{textAlign: "center", marginTop: "6px"}}>
								<CIcon icon={cilArrowThickRight} size="xl"/>
							</CCol>
							<CCol lg="5">
								<CFormInput type="text"   aria-label="sm input example" value={amount3}  onChange={(e)=>amount3Change(e.target.value)} />
							</CCol>
						</CRow>
					
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>

				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Ko Nyi</p>
					</CCol>
					<CCol lg="4">
						<CRow>
							<CCol lg="5">
								<CFormInput type="text"   aria-label="sm input example" value={currencyAmountData.length >0? currencyAmountData[3] : ""}  readOnly />
							</CCol>
							<CCol lg="2" style={{textAlign: "center", marginTop: "6px"}}>
								<CIcon icon={cilArrowThickRight} size="xl"/>
							</CCol>
							<CCol lg="5">
								<CFormInput type="text"   aria-label="sm input example" value={amount4}  onChange={(e)=>amount4Change(e.target.value)} />
							</CCol>
						</CRow>
					
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>

				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Ko Lynn</p>
					</CCol>
					<CCol lg="4">
						<CRow>
							<CCol lg="5">
								<CFormInput type="text"   aria-label="sm input example" value={currencyAmountData.length >0? currencyAmountData[4] : ""}  readOnly />
							</CCol>
							<CCol lg="2" style={{textAlign: "center", marginTop: "6px"}}>
								<CIcon icon={cilArrowThickRight} size="xl"/>
							</CCol>
							<CCol lg="5">
								<CFormInput type="text"   aria-label="sm input example" value={amount5}  onChange={(e)=>amount5Change(e.target.value)} />
							</CCol>
						</CRow>
					
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>

				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Ko Tahar</p>
					</CCol>
					<CCol lg="4">
						<CRow>
							<CCol lg="5">
								<CFormInput type="text"   aria-label="sm input example" value={currencyAmountData.length >0? currencyAmountData[5] : ""}  readOnly />
							</CCol>
							<CCol lg="2" style={{textAlign: "center", marginTop: "6px"}}>
								<CIcon icon={cilArrowThickRight} size="xl"/>
							</CCol>
							<CCol lg="5">
								<CFormInput type="text"   aria-label="sm input example" value={amount6}  onChange={(e)=>amount6Change(e.target.value)} />
							</CCol>
						</CRow>
					
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>
				
				<CRow  className="mt-5 mb-5">
					<CCol lg="5"></CCol>
					<CCol>
						{role < 2 &&
							<CButton className="btn-color" style={{ width: "100px" }} onClick={() => saveClick()}>Save</CButton>
						}
						{role > 1 &&
							<CButton className="btn-color not-allow" style={{ width: "100px" }} >Save</CButton>
						}
					</CCol>

				</CRow>
				
			  </CForm>
		</CCol>
	</CRow>
  )
}

export default SaleIndex;
