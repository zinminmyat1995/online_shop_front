import React, { useState, useEffect ,useRef } from "react";
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
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import ReactToPrint from "react-to-print";
import {
	cilTrash,
	cilPencil,
	cilCheckAlt,
	cilClipboard,
	cilTags
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import Message from "../../common/SuccessError";
import Confirmation from "../../common/Confirmation";
import Loading from "../../common/Loading"
import {validateIntegerOnly} from "../../common/CommonValidation"
import CustomerModal from "./CustomerModal";
import ApiPath from "../../common/ApiPath";
import { ApiRequest } from "../../common/ApiRequest";
import { Autocomplete } from '@mui/material'
import TextField from '@mui/material/TextField';

const RegistrationIndex = () => {
	const componentRef = useRef();
	const reactToPrintRef = useRef();
	const [error, setError] = useState([]); // for error message
	const [success, setSuccess] = useState([]); // for success message
	const [loading, setLoading] = useState(false);  // for loading
	const [code, setCode] = useState("");
	const [name, setName] = useState("");
	const [category, setCategory] = useState("");
	const [gender, setGender] = useState("");
	const [madeIn, setMadeIn] = useState("");
	const [price, setPrice ] = useState("");
	const [count, setCount ] = useState("");
	const [totalPrice, setTotalPrice ] = useState("");
	const [remain,setRemain ] = useState("");

	const [cusName, setCusName ] = useState("");
	const [cusPhone, setCusPhone ] = useState("");
	const [cusPayment, setCusPayment ] = useState("");
	const [cusAddress, setCusAddress ] = useState("");
	const [cusNote,setCusNote ] = useState("");
	const [discount, setDiscount ] = useState("");
	const [finalTotal, setFinalTotal ] = useState("");
	const [deliveryService, setDeliveryService ] = useState("");
	const [copyDeliveryService, setCopyDeliveryService ] = useState("");
	const [deliveryServiceSetting, setDeliveryServiceSetting ] = useState(true);
	const [printServiceSetting, setPrintServiceSetting ] = useState(true);
	const [discountSetting, setDiscountSetting ] = useState(false);
	const [loginID , setLoginID ] = useState(localStorage.getItem('LOGIN_ID'));
	const [show, setShow] = useState(false); // 
	const [content, setContent] = useState(""); // 
	const [type, setType] = useState("save"); //
	const [selectedValue, setSelectedValue] = useState(null);
	const [autocompleteData, setAutocompleteData ] = useState([])
	const [mainData, setMainData ] = useState([]);
	const [copyData, setCopyData ] = useState([]);
	const [customerModalShow, setCustomerModalShow ] = useState(false);
	const [paymentData, setPaymentData ] = useState([])
	const [ totalProductCount, setTotalProductCount ] = useState("");
	const [ totalAllPrice, setTotalAllPrice ] = useState("");
	let num =0; 

	useEffect(() => {
		(async () => {
			if(localStorage.getItem("LOGIN_ID") == undefined){
				window.location.href="/login";
			}
			setLoading(true);
			await searchClick();
			await SettingAllService();
		})();
	}, []);


	let searchClick =async () => {
		setError([]); setSuccess([]);
		setLoading(true);
		let object = {
			url: ApiPath.SaleRegistrationSearchAllData,
			method: 'get',
			params: {
				"product_name": name,
				"login_id": loginID
			}
		}

		let response = await ApiRequest(object);
		if (response.flag === false) {
			setError([response.message[0]]); setMainData([]);setCopyData([]); setLoading(false);
		} else {
			if (response.data.status === 'OK') {
				setAutocompleteData(response.data.data);setLoading(false);
			} else {
				setError([response.data.message]); setSuccess([]);setLoading(false);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
	}

	let tempSearchClick =async () => {
		setLoading(true);
		let object = {
			url: ApiPath.SaleRegistrationSearchAllData,
			method: 'get',
			params: {
				"product_name": name,
				"login_id": loginID
			}
		}

		let response = await ApiRequest(object);
		if (response.flag === false) {
		 setMainData([]);setCopyData([]); setLoading(false);
		} else {
			if (response.data.status === 'OK') {
				setAutocompleteData(response.data.data);setLoading(false);
			} else {
				setSuccess([]);setLoading(false);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
	}
	let SettingAllService =async () => {
		setLoading(true);
		let object = {
			url: ApiPath.SettingAllService,
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
				let res = response['data']['data'];
				setDiscount(res['discount_percent'] > 0? res['discount_percent'] : 0);setDiscountSetting(res['discount_percent'] > 0? true : false);
				setPaymentData(res['payment']);setCusPayment(res['payment'][0]['id']);
				setDeliveryServiceSetting(res['delivery_service'] > 0 ? true : false);
				setPrintServiceSetting(res['print_service'] > 0 ? true : false);
			} else {
				setError([response.data.message]); setSuccess([]);setLoading(false);
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
				setPaymentData(response.data.data);setCusPayment(response.data.data[0]['id']);
			} else {
				setError([response.data.message]); setSuccess([]);setLoading(false);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
		
	}
	
	let nextClick = () => {
		setError([]); setSuccess([]);let total_count=0 ; let total_price=0;let dis = parseInt(discount);let finalTotal = "";let flag = false;
		mainData.forEach(data=>{
			total_count = total_count + parseInt(data.count);
			total_price = total_price + parseInt(data.total_price);
			if( data.edit_flag == true  ){
				flag = true;
			}
		})
		if(flag == true){
			setError(["Please update Qty!"]); setSuccess([]);
			window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		}else{
			if(dis  > 0){
				finalTotal =total_price - ((dis / 100) * total_price );
			}else{
				finalTotal = total_price;
			}
			setTotalProductCount(total_count);setTotalAllPrice(total_price);setFinalTotal(finalTotal);
			setCustomerModalShow(true);
		}
		
	}

	let saveOK =async ()=>{
		setShow(false);
		setError([]);setSuccess([]);setCustomerModalShow(false);setShow(false);setLoading(true);
		let obj = {
			method: "post",
			url: ApiPath.SaleRegistrationSave,
			params: {
				"login_id": loginID,
				"data": mainData,
				"actual_price": totalAllPrice,
				"delivery_service_amount": deliveryService == "" ? 0 : deliveryService,
				"discount_percent": discount == ""? 0 : discount,
				"total_price": finalTotal,
				"name": cusName,
				"address": cusAddress,
				"phone_no": cusPhone,
				"payment": cusPayment,
			},
		  };
		  let response = await ApiRequest(obj);
			  
		  if (response.flag === false) {
			setSuccess([]);setLoading(false);
			setError(response.message);
		  } else {
			if (response.data.status == "OK") {
			  setSuccess([response.data.message]);setError([]);setMainData([]);setCopyData([]);setCustomerModalShow(false);getPayment();tempSearchClick();
			  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });setLoading(false);
			  if(printServiceSetting == true){
				reactToPrintRef.current.handlePrint();
			  }
			  
			}else{
				setError([response.data.message]);setSuccess([]);setLoading(false);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			} 
		  }
	}

	let importCountChange =(e)=>{
		let val = e.target.value;
		if(val == ""){
			setCount(val);setTotalPrice("");
		}else{
			if(validateIntegerOnly(val) == true && val.charAt(0) != 0 ){
				setCount(val);
				if(price != ""){
					setTotalPrice(val*price)
				}
			}
		}
	}

	let priceChange =(e)=>{
		let val = e.target.value;
		if(val == ""){
			setPrice(val);setTotalPrice("");
		}else{
			if(validateIntegerOnly(val) == true && val.charAt(0) != 0 ){
				setPrice(val);
				if(count != ""){
					setTotalPrice(val*count)
				}
			}
		}
	}

	let addClick =()=>{
		let flag = false;
		if(code == "" || price == "" || count == "" || totalPrice == ""  ){
			setError(["Please fill all data!"]); setSuccess([]);
			window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		}else if( count > remain ){
			setError(["There is not enough of this item in stock!"]); setSuccess([]);
			window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		}else{
			mainData.forEach(data=>{
				if(data.name == name){
					flag = true;
				}
			})

			if(flag){
				setError(["Your code is already exists!"]); setSuccess([]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}else{
				setError([]);setSuccess([]);
				let temp = [];
				temp.push({
					id: mainData.length + 1,
					code: code,
					name: name ,
					category: category ,
					gender: gender ,
					made_in: madeIn ,
					price: price ,
					count: count ,
					total_price: totalPrice ,
					remain: remain,
					flag: false
				})
				setMainData([...copyData,temp[0]]);setCopyData([...copyData,temp[0]]);
				setName("");
				setCode("");
				setCategory("");
				setGender("");setSelectedValue(null);setRemain("");
				setMadeIn("");setPrice("");setTotalPrice("");setCount("");
			}
		}
	
	}

	let editClick = (id) => {
		let temp = [];
		copyData.forEach(data => {
			temp.push({
				id: data.id  ,
				code: data.code  ,
				name: data.name  ,
				category: data.category  ,
				gender: data.gender  ,
				made_in: data.made_in  ,
				price: data.price,
				count: data.count,
				total_price: data.price,
				remain: data.remain,
				edit_flag: data.id == id ? true : false
			})
		})
		setMainData(temp);
	}

	let editPriceChange = (id, val) => {
		let res = mainData.filter(data => {
			if (data.id == id) {
				if(val == ""){
					data.price = "";
					data.total_price = "";
				}else{
					if(validateIntegerOnly(val) == true && val.charAt(0) != 0 ){
						data.price = val;
						if(data.count != ""){
							data.total_price = val*data.count;
						}
					}
				}
				return data;
			}
			return data;
		})
		setMainData(res);
	}

	let editCountChange = (id, val) => {
		let res = mainData.filter(data => {
			if (data.id == id) {
				if(val == ""){
					data.count = "";
					data.total_price = "";
				}else{
					if(validateIntegerOnly(val) == true && val.charAt(0) != 0 ){
						data.count = val;
						if(data.price != ""){
							data.total_price = val*data.price;
						}
					}
				}
				return data;
			}
			return data;
		})
		setMainData(res);
	}


	let deleteClick = (id) => {
		setError([]);setSuccess([]);
		let res = mainData.filter(data=> data.id != id)
		setMainData(res); setCopyData(res);
	}

	let updateClick = (code,count) => {
		let temp = mainData.filter(data=> data.code == code); let str = [];
		if(temp[0]['count'] == ""){
			str.push("Please fill Quantity!");
		}
		if(str.length > 0){
			setError(str);
			setSuccess([]);
			window.scrollTo({ top: 1, left: 0 });
			  setTimeout(() => {
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			  }, 10);
		}else{
			let temp1 = copyData.filter(data=> data.code == code); let str = [];
			if(count > temp1[0]['remain'] ){
				setError(['There is not enough of this item in stock!']);
				setSuccess([]);
				window.scrollTo({ top: 1, left: 0 });
				  setTimeout(() => {
					window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
				  }, 10);
			}else{
				setError([]);setSuccess([]);
				let res = mainData.filter(data => {
					if (data.code == code) {
						data.edit_flag = false;
						return data;
					}
					return data;
				})
				setMainData(res);
				setCopyData(res);
			}
		}
	}

	let cusPaymentChange = (e)=>{
		setCusPayment(e.target.value)
	}
	
	let cusSaveClick = () =>{
		setError([]); setSuccess([]);setCustomerModalShow(false);
		setShow(true);setContent("Are you sure want to save?");
	}

	let cancelClick = ()=>{
		setShow(false);setCustomerModalShow(true);
	}

	let deliveryServiceChange =(e)=>{
		let val = e.target.value;
		if(val == ""){
			setDeliveryService(val);
		}else{
			if(validateIntegerOnly(val) == true && val.charAt(0) != 0 ){
				setDeliveryService(val);
			}
		}
	}

	let calculateClick = ()=>{
		let tempDeli = deliveryService; let tempFinal = finalTotal;
		if(deliveryService == ""){
			if(copyDeliveryService != "" ){
				setFinalTotal(parseInt(tempFinal) - parseInt(copyDeliveryService));setCopyDeliveryService("");
			}
		}else{
			if(tempDeli != copyDeliveryService){
				if(copyDeliveryService == ""){
					setFinalTotal( parseInt(tempFinal) + parseInt(tempDeli) );
					setCopyDeliveryService(parseInt(tempDeli));
				}else{
					setFinalTotal( parseInt(tempDeli) > parseInt(copyDeliveryService) ? (parseInt(tempFinal) + (parseInt(tempDeli) - parseInt(copyDeliveryService)))  : (parseInt(tempFinal) - (parseInt(copyDeliveryService) - parseInt(tempDeli))) );
					setCopyDeliveryService(parseInt(tempDeli));
				}

			}
		}
	}


	let selectedChange = (val) =>{
		setSelectedValue(val);setName(val['p_name']);setCategory(val['p_category_name']);setGender(val['p_gender']);setMadeIn(val['p_made_in']);setCode(val['p_code']);setPrice(val['price']);setRemain(val['remain']);setCount("");
	}
			
	let handleInputChange = (event, newInputValue) => {
		setCode("");setCategory("");setGender("");setMadeIn("");setName(newInputValue);setPrice("");setRemain("");setTotalPrice("");setCount("");
	};

	
  return (
	<CRow>
		<CCol>
			<CForm>
				<Loading start={loading} />
				<h3>Sale Registration</h3>
				<hr/>
				<Message success={success} error={error} />
				<Confirmation
					show={show}
					content={content}
					type={type}
					saveOK={saveOK}
					okButton={"Ok"}
					cancel={cancelClick}
					cancelButton={"Cancel"}
				/>
				<CustomerModal
					show={customerModalShow}
					cancel={() => setCustomerModalShow(false)}
					listData = {mainData}
					paymentData={paymentData}
					totalCount={totalProductCount}
					totalPrice={totalAllPrice}
					name={cusName}
					phone={cusPhone}
					payment={cusPayment}
					address={cusAddress}
					note={cusNote}
					nameChange={(e)=>setCusName(e.target.value)}
					phoneChange={(e)=>setCusPhone(e.target.value)}
					addressChange={(e)=>setCusAddress(e.target.value)}
					noteChange={(e)=>setCusNote(e.target.value)}
					paymentChange={cusPaymentChange}
					discount={parseInt(discount)}
					finalTotal={finalTotal}
					saveClick={cusSaveClick}
					deliveryServiceSetting={deliveryServiceSetting}
					discountSetting={discountSetting}
					deliveryService={deliveryService}
					copyDeliveryService={copyDeliveryService}
					deliveryServiceChange={deliveryServiceChange}
					calculateClick={calculateClick}
				/>
				 <ReactToPrint
					content={() => componentRef.current}
					ref={reactToPrintRef}
				  />
				  <PaySlip ref={componentRef} 
				     	data={mainData} 
						discount={discount}
						totalPrice={totalAllPrice}
						finalTotal={finalTotal}
						name={cusName}
						phone={cusPhone}
						payment={cusPayment}
						address={cusAddress}
						paymentData={paymentData}
						totalQuantity={totalProductCount}
						deliveryService={deliveryService}
						deliveryServiceSetting={deliveryServiceSetting}
						copyDeliveryService={copyDeliveryService}
						discountSetting={discountSetting}
					/>
				<CRow className="mt-5">
					<CCol lg="2" className="">
						<p className="label">Product Name</p>
					</CCol>
					<CCol lg="4">
						<Autocomplete
							options={autocompleteData}
							getOptionLabel={(option) => option.p_name}
							value={selectedValue}
							onInputChange={handleInputChange}
							onChange={(event, newValue) => selectedChange(newValue)}
							isOptionEqualToValue={(option, value) => option.value === value.value}
							renderInput={(params) => (
								<TextField {...params}  variant="outlined" />
							)}
							/>
					</CCol>
					<CCol lg="2" className="">
						<p className="label" >Product Code</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text" aria-label="sm input example"  value={code} readOnly/>
					</CCol>
				</CRow>

				<CRow className="mt-4">
					<CCol lg="2" className="">
						<p className="label">Product Category</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text" aria-label="sm input example" value={category} readOnly/>
					</CCol>
					<CCol lg="2" className="">
						<p className="label" >Gender Status</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text" aria-label="sm input example" value={gender === 0? "Both" : gender === 1? "Male" : gender === 2? "Female" : ""} readOnly/>
					</CCol>
				</CRow>
				<CRow className="mt-4">
					<CCol lg="2" className="">
						<p className="label">Country of manufacture</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text" aria-label="sm input example"  value={madeIn} readOnly/>
					</CCol>
					<CCol lg="2" className="">
						<p className="label" >Price</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text" aria-label="sm input example" value={price} readOnly  />
					</CCol>
				</CRow>

				<CRow className="mt-4">
					<CCol lg="2" className="">
						<p className="label">Qty</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text" aria-label="sm input example"  value={count} onChange={importCountChange} />
					</CCol>
					<CCol lg="2" className="">
						<p className="label" >Total Price</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text" aria-label="sm input example" value={totalPrice} readOnly />
					</CCol>
				</CRow>

				{/* <CRow className="mt-4">
					<CCol lg="2" className="">
						<p className="label">Note</p>
					</CCol>
					<CCol lg="10">
						<CFormTextarea
							feedbackInvalid="Please enter a message in the textarea."
							id="note"
							required
							value={note}
							onChange={(e)=>setNote(e.target.value)}
							></CFormTextarea>
					</CCol>
				</CRow> */}


				<CRow className="mt-5 mb-5 text-align-center">
					<CCol>
						<CButton className="login-button" style={{ width: "100px" }} onClick={() => addClick()}>Add</CButton>
					</CCol>
				</CRow>

				

				{mainData.length > 0 &&
					<>
						<CRow>
							<CCol>
								<label className="total-row">Total - {mainData.length}  row(s)</label>
							</CCol>
						</CRow>
						<CRow className="mb-4">
							<CCol>
								<div className='table-responsive tableFixHead'>
									<table className='table sale-registration-table'>
										<thead className="text-center">
											<tr>
												<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="60px" >No</th>
												<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="160px">Code</th>
												<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="180px">Name</th>
												<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="180px">Category</th>
												<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="160px">Gender Status</th>
												<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="180px">Country of manufacture</th>
												<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="150px">Price</th>
												<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="150px">Qty</th>
												<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="150px">Total Price</th>
												<th className="bg-body-tertiary text-center" colSpan={2} style={{verticalAlign: "middle"}} width="120px">Action</th>

											</tr>
										</thead>
										<tbody className="text-center">
										{mainData.map((item, index) => {
											num = num + 1;
											return(
												<tr key={index}>

												<td>{num}</td>
												<td>{item.code}</td>
												<td>{item.name}</td>
												<td>{item.category}</td>
												<td>{item.gender == 0? "Both" : item.gender == 1? "Male" : "Female"}</td>
												<td>{item.made_in}</td>
												<td>
													<label>{item.price}</label>
												</td>
												<td>
													{item.edit_flag == true ?
														<CFormInput type="text" aria-label="sm input example" value={item.count} onChange={(e) => editCountChange(item.id, e.target.value)}  /> :
														<label>{item.count}</label>
													}
												</td>
												<td>{item.total_price}</td>
												<td>
													{item.edit_flag == true ?
														<CIcon icon={cilClipboard} onClick={() => updateClick(item.code,item.count)} /> :
														<CIcon icon={cilPencil} onClick={() => editClick(item.id)} />
													}
												</td>
												<td>
													<CIcon icon={cilTrash} onClick={() => deleteClick(item.id)} />
												</td>
										
											</tr>
											)
										})}
										</tbody>
									</table>

								</div>
							</CCol>
						</CRow>
						</>
				}

				{
					mainData.length > 0 &&
					<CRow className="mt-5 mb-5 text-align-center">
						<CCol>
							<CButton className="login-button" style={{ width: "100px" }} onClick={() => nextClick()}>Next</CButton>
						</CCol>
					</CRow>
				}
			  </CForm>
		</CCol>
	</CRow>
  )
}

const PaySlip = React.forwardRef((props, ref) => {
	const currentDate = new Date();
	const day = currentDate.getDate();
	const month = currentDate.getMonth() + 1; // Add 1 as months are zero-based
	const year = currentDate.getFullYear();


	return (
		<div  ref={ref} className='yourClassName'>
			<div>
				<div
					style={{
					textAlign: "center",
					fontSize: 26,
					fontWeight: "bold",
					marginBottom: "0px"
					}}
				>
					Zin Online Shop
				</div>
	
			<div>
				<span><label style={{marginLeft: "10px", fontSize: 14,fontWeight: "bold"}}>Name:</label><label  style={{marginLeft: "10px"}}>{props.name}</label></span>
				<br />
				<span><label style={{marginLeft: "10px", fontSize: 14,fontWeight: "bold"}}>Payment:</label>
					<label  style={{marginLeft: "10px"}}>
							{props.paymentData.length > 0 &&
								props.paymentData.filter(data=>data.id == props.payment)[0]['name']
							}
					</label>
				</span>
				<br />
				<span><label  style={{ marginLeft: "10px", fontSize: 14,fontWeight: "bold" }}>Ph.No:</label> <label  style={{marginLeft: "10px"}}>{props.phone}</label></span>
				<br />
				<span><label style={{marginLeft: "10px", fontSize: 14,fontWeight: "bold"}}>Address:</label> <label  style={{marginLeft: "10px"}}>{props.address}</label></span>
				<br />
				<span><label style={{marginLeft: "10px", fontSize: 14,fontWeight: "bold"}}>Date:</label> <label  style={{marginLeft: "10px"}}>{day}-{month}-{year}</label></span>
				<br />
			</div>
	
			<table  style={{marginLeft: "10px"}} className="mt-3">
				<thead>
					<tr>
						<th style={{ textAlign: "start", width: "60px" }}>No</th>
						<th style={{ textAlign: "start", width: "200px" }}>Product Name</th>
						<th style={{ textAlign: "start", width: "120px" }}>Price</th>
						<th style={{ textAlign: "start", width: "120px" }}>Quantity</th>
						<th style={{ textAlign: "start", width: "120px" }}>Price</th>
					</tr>
				</thead>
				<tbody style={{ fontSize: 14, textAlign: "start" }}>

				{props.data.map((data,ind)=>{
					return(
						<tr key={ind}>
							<td>{ind + 1}</td>
							<td>{data.name}</td>
							<td>{data.price}</td>
							<td>{data.count}</td>
							<td>{data.total_price}</td>
						</tr>
					)
				})}
				

				 <tr>
				   <td>
					 <hr />
					 &nbsp;
				   </td>
				   <td>
					 <hr />
					 &nbsp;
				   </td>
				   <td>
					 <hr />
					 SubTotal
				   </td>
				   <td>
					 <hr />
					{props.totalQuantity}
				   </td>
				   <td>
					 <hr />
					 {props.totalPrice}
				   </td>
				 </tr>

				 <tr>
					<td>
					</td>
					<td>
					</td>
					<td>
					Discount
					</td>
					<td>
					</td>
					<td>
						{props.discount > 0? props.discount+"%" : "-"}&nbsp; 
					</td>
				</tr>
				
				<tr>
					<td>
						&nbsp;
						<hr />
					</td>
					<td>
						&nbsp;
						<hr />
					</td>
					<td>
						Delivery Fee
					<hr />
					</td>
					<td>
						&nbsp;
						<hr />
					</td>
					<td>
						{props.copyDeliveryService > 0? props.copyDeliveryService : "-"}
					<hr />
					</td>
				</tr>
				
				 




				<tr>
					<td>
					&nbsp;
					<hr />
					</td>
					<td>
					&nbsp;
					<hr />
					</td>
					<td>
					Total Amount
					<hr />
					</td>
					<td>
					&nbsp;
					<hr />
					</td>
					<td>
						{props.finalTotal}
					<hr />
					</td>
				</tr>
				</tbody>
			</table>
			<div style={{ textAlign: "center", fontSize: 16, marginTop: "10px" }}>
				<div>**********************</div>
				THANK YOU
				<div>**********************</div>
			</div>
			</div>
			<br />
			<br />
			<br />
			<br />
			<br />
			{/* new Order Part */}
	  </div>
	);
  });
export default RegistrationIndex
