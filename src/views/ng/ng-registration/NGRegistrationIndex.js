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
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import {
	cilTrash,
	cilPencil,
	cilCheckAlt,
	cilClipboard
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import Message from "../../common/SuccessError";
import Confirmation from "../../common/Confirmation";
import Loading from "../../common/Loading"
import {validateIntegerOnly} from "../../common/CommonValidation"
import ApiPath from "../../common/ApiPath";
import { ApiRequest } from "../../common/ApiRequest";

import { Autocomplete } from '@mui/material'
import TextField from '@mui/material/TextField';

const NGRegistrationIndex = () => {
	const [error, setError] = useState([]); // for error message
	const [success, setSuccess] = useState([]); // for success message
	const [loading, setLoading] = useState(false);  // for loading
	const [code, setCode] = useState("");
	const [name, setName] = useState("");
	const [category, setCategory] = useState("");
	const [gender, setGender] = useState("");
	const [madeIn, setMadeIn] = useState("");
	const [ngCount, setNGCount ] = useState("");
	const [note, setNote ] = useState("");
	const [importDate , setImportDate ] = useState("");
	const [show, setShow] = useState(false); // 
	const [content, setContent] = useState(""); // 
	const [type, setType] = useState("save"); //
	const [mainData, setMainData ] = useState([]);
	const [copyData, setCopyData ] = useState([]);
	const [loginID , setLoginID ] = useState(localStorage.getItem('LOGIN_ID'));
	const [categoryData, setCategoryData] = useState([]);
	const [selectedValue, setSelectedValue] = useState(null);
	const [autocompleteData, setAutocompleteData ] = useState([])

	useEffect(() => {
		(async () => {
			if(localStorage.getItem("LOGIN_ID") == undefined){
				window.location.href="/login";
			}
			setLoading(true);
			await getProductCategory();
			await searchClick();
		})();
	}, []);

	let getProductCategory =async ()=>{
		setError([]); setSuccess([]);
		setLoading(true);
		let object = {
			url: ApiPath.ProductCategorySearch,
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
				setCategoryData(response.data.data);setLoading(false);
			} else {
				setError([response.data.message]); setSuccess([]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
	}

	let searchClick =async () => {
		setError([]); setSuccess([]);
		setLoading(true);
		let object = {
			url: ApiPath.ProductListSearch,
			method: 'get',
			params: {
				"product_code": code,
				"product_name": name,
				"product_category": category,
				"gender": gender,
				"made_in": madeIn,
				"login_id": loginID
			}
		}

		let response = await ApiRequest(object);
		if (response.flag === false) {
			setError([response.message[0]]); setUserData([]); setLoading(false);
		} else {
			if (response.data.status === 'OK') {
				setAutocompleteData(response.data.data);setLoading(false);
			} else {
				setError([response.data.message]); setSuccess([]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
	}



	let saveClick = () => {
		let str = [];
		if (note == "") {
			str.push("Please fill note!")
		}
		if (str.length > 0) {
			setError(str);
			setSuccess([]);
			window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		} else {
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
					total_price: data.total_price,
					ng_count: data.ng_count,
					import_date: data.import_date,
					edit_flag: false
				})
			})
			setError([]); setSuccess([]);setMainData(temp);setCopyData(temp);
			setShow(true);setContent("Are you sure want to save?");
		}
	}

	let saveOK =async ()=>{
		setError([]);setSuccess([]);setShow(false);setLoading(true);
		let obj = {
			method: "post",
			url: ApiPath.NGRegistrationSave,
			params: {
				"login_id": loginID,
				"data": mainData,
				"note": note,
			},
		  };
		  let response = await ApiRequest(obj);
			  
		  if (response.flag === false) {
			setSuccess([]);setLoading(false);
			setError(response.message);
		  } else {
			if (response.data.status == "OK") {
			  setSuccess([response.data.message]);setError([]);setMainData([]);setCopyData([]);setNote(""); setLoading(false);
			  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}else{
				setError([response.data.message]);setSuccess([]);setLoading(false);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			} 
		  }
	}

	let ngCountChange =async (e)=>{
		let val = e.target.value;
		if(val == ""){
			setNGCount(val);
		}else{
			if(validateIntegerOnly(val) == true && val.charAt(0) != 0 ){
				setNGCount(val);
			}
		}
	}

	
	let addClick = async ()=>{
		let flag = false;
		if(code == "" || ngCount == ""  ){
			setError(["Please fill all data!"]); setSuccess([]);
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
				setError([]);setSuccess([]);setLoading(true);
				let object = {
					url: ApiPath.NGRegistrationSearch,
					method: 'get',
					params: {
						"product_code": code,
						"login_id": loginID
					}
				}

				let response = await ApiRequest(object);
				if (response.flag === false) {
					setError(["This item has not been imported!"]); setSuccess([]);
					window.scrollTo({ top: 0, left: 0, behavior: "smooth" });setLoading(false);
				} else {
					if (response.data.status === 'OK') {
						let remain = response.data.data[0]['remain'];
						if( ngCount > remain ){
							setError(["NG Qty is greater than import Qty"]); setSuccess([]); setLoading(false);
							window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
						}else{
							let temp = [];
							temp.push({
								id: mainData.length + 1,
								code: code,
								name: name ,
								category: category ,
								gender: gender ,
								made_in: madeIn ,
								price: response.data.data[0]['price'] ,
								ng_count: ngCount ,
								total_price: response.data.data[0]['price'] * ngCount  ,
								import_date: importDate,
								flag: false
							})
							setMainData([...copyData,temp[0]]);setCopyData([...copyData,temp[0]]);
							setName("");setCode("");setCategory("");setGender("");setImportDate("");setSelectedValue(null);
							setMadeIn("");setNGCount("");setLoading(false);
						}

						
					} else {
						setError(["This item has not been imported!"]); setSuccess([]);
						window.scrollTo({ top: 0, left: 0, behavior: "smooth" });setLoading(false);
					}
				}
			}
		}
	
	}

	let editClick = (id) => {
		let temp = [];
		copyData.forEach(data => {
			if (data.id == id) {
				temp.push({
					id: data.id  ,
					code: data.code  ,
					name: data.name  ,
					category: data.category  ,
					gender: data.gender  ,
					made_in: data.made_in  ,
					price: data.price,
					total_price: data.total_price,
					ng_count: data.ng_count,
					import_date: data.import_date,
					edit_flag: true
				})
			} else {
				temp.push({
					id: data.id  ,
					code: data.code  ,
					name: data.name  ,
					category: data.category  ,
					gender: data.gender  ,
					made_in: data.made_in  ,
					price: data.price,
					total_price: data.total_price,
					ng_count: data.ng_count,
					import_date: data.import_date,
					edit_flag: false
				})
			}
		})
		setMainData(temp);
	}

	let editNGCountChange = (id, val) => {
		let res = mainData.filter(data => {
			if (data.id == id) {
				if(val == ""){
					data.ng_count = "";
					data.total_price = "";
				}else{
					if(validateIntegerOnly(val) == true && val.charAt(0) != 0 ){
						data.ng_count = val;
						data.total_price = (val * data.price);
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

	let updateClick =async (id) => {
		let temp = mainData.filter(data=> data.id == id); let str = [];
		if(temp[0]['ng_count'] == ""){
			str.push("Please fill NG Count!");
		}
		if(str.length > 0){
			setError(str);
			setSuccess([]);
			window.scrollTo({ top: 1, left: 0 });
			  setTimeout(() => {
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			  }, 10);
		}else{

			let res = mainData.filter(data => {
				if (data.id == id) {
					data.edit_flag = false;
					return data;
				}
				return data;
			})
			setError([]);setSuccess([]);setLoading(true);
			let object = {
				url: ApiPath.NGRegistrationSearch,
				method: 'get',
				params: {
					"product_code": res[0]['code'],
					"login_id": loginID
				}
			}
			let response = await ApiRequest(object);
			if (response.flag === false) {
				setError(["This item has not been imported!"]); setSuccess([]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });setLoading(false);
			} else {
				if (response.data.status === 'OK') {
					let remain = response.data.data[0]['import_qty'];
					if( res[0]['ng_count'] > remain ){
						setError(["NG Qty is greater than import Qty"]); setSuccess([]); setLoading(false);setMainData(copyData);
						window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
					}else{
						setError([]); setSuccess([]);setLoading(false);
						setMainData(res);
						setCopyData(res);
					}
						
				} else {
					setError(["This item has not been imported!"]); setSuccess([]);
					window.scrollTo({ top: 0, left: 0, behavior: "smooth" });setLoading(false);
				}
			}
		}
	}
	
	let selectedChange = (val) =>{
		setSelectedValue(val);setName(val['name']);setGender(val['gender_stauts'] == "0"? "Both" : ( (val['gender_stauts'] == "1" ? "Male" : "Female" )));setMadeIn(val['made_in']);setCode(val['code']);
		{categoryData.map((data,index)=>{
			if(data.id == val['category']){
				setCategory(data.name);
			}
		})}
	}
		
	let handleInputChange = (event, newInputValue) => {
		setCode("");setCategory("");setGender("");setMadeIn("");setName(newInputValue);
	};


  return (
	<CRow>
		<CCol>
			<CForm>
				<Loading start={loading} />
				<h3>NG Registration</h3>
				<hr/>
				<Message success={success} error={error} />
				<Confirmation
					show={show}
					content={content}
					type={type}
					saveOK={saveOK}
					okButton={"Ok"}
					cancel={() => setShow(false)}
					cancelButton={"Cancel"}
				/>
				<CRow className="mt-5">
					<CCol lg="2" className="">
						<p className="label">Product Name</p>
					</CCol>
					<CCol lg="4">
						<Autocomplete
							options={autocompleteData}
							getOptionLabel={(option) => option.name}
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
						<CFormInput type="text" aria-label="sm input example" value={gender} readOnly/>
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
						<p className="label" >NG Qty</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text" aria-label="sm input example" value={ngCount} onChange={ngCountChange}  />
					</CCol>
				</CRow>


				<CRow className="mt-4">
					<CCol lg="2" className="">
						<p className="label" >Note</p>
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
				</CRow>

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
									<table className='table ng-registration-table'>
										<thead className="text-center">
											<tr>
												<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="60px" >No</th>
												<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="160px">Code</th>
												<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="180px">Name</th>
												<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="180px">Category</th>
												<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="160px">Gender Status</th>
												<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="180px">Country of manufacture</th>
												<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="150px">Price</th>
												<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="150px">NG Qty</th>
												<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="150px">Total Price</th>
												<th className="bg-body-tertiary text-center" colSpan={2} style={{verticalAlign: "middle"}} width="150px">Action</th>

											</tr>
										</thead>
										<tbody className="text-center">
										{mainData.map((item, index) => (
										
													<tr key={index}>

														<td>{index + 1}</td>
														<td>{item.code}</td>
														<td>{item.name}</td>
														<td>{item.category}</td>
														<td>{item.gender}</td>
														<td>{item.made_in}</td>
														<td>{item.price}</td>
														<td>
															{item.edit_flag == true ?
																<CFormInput type="text" aria-label="sm input example" value={item.ng_count} onChange={(e) => editNGCountChange(item.id, e.target.value)} /> :
																<label>{item.ng_count}</label>
															}
														</td>
														<td>{item.total_price}</td>
														<td>
															{item.edit_flag == true ?
																<CIcon icon={cilClipboard} onClick={() => updateClick(item.id)} /> :
																<CIcon icon={cilPencil} onClick={() => editClick(item.id)} />
															}
														</td>
														<td>
															<CIcon icon={cilTrash} onClick={() => deleteClick(item.id)} />
														</td>
										
													</tr>
											
											))}
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
							<CButton className="login-button" style={{ width: "100px" }} onClick={() => saveClick()}>Save</CButton>
						</CCol>
					</CRow>
				}
			  </CForm>
		</CCol>
	</CRow>
  )
}

export default NGRegistrationIndex
