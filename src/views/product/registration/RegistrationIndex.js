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
  CFormSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilMinus, cilPlus } from '@coreui/icons'
import Message from "../../common/SuccessError";
import Confirmation from "../../common/Confirmation";
import Loading from "../../common/Loading"
import PlusCategoryModal from "./PlusCategoryModal"
import MinusCategoryModal from "./MinusCategoryModal";
import ApiPath from "../../common/ApiPath";
import { ApiRequest } from "../../common/ApiRequest";

const RegistrationIndex = () => {
	const [error, setError] = useState([]); // for error message
	const [success, setSuccess] = useState([]); // for success message
	const [errorPlus, setErrorPlus] = useState([]); // for error message
	const [successPlus, setSuccessPlus] = useState([]); // for success message
	const [errorMinus, setErrorMinus] = useState([]); // for error message
	const [successMinus, setSuccessMinus] = useState([]); // for success message
	const [loading, setLoading] = useState(false);  // for loading
	const [code, setCode ] = useState("");
	const [name, setName ] = useState("");
	const [ category, setCategory ] = useState("");
	const [ gender, setGender ] = useState("");
	const [ madeIn, setMadeIn ] = useState("");

	const [plusModalShow, setPlusModalShow ] = useState(false);
	const [addCategory, setAddCategory ] = useState("");
	const [minusModalShow, setMinusModalShow ] = useState(false);

	const [ categoryData, setCategoryData ] = useState([]);
	const [ removeCategory, setRemoveCategory ] = useState("");


	const [show, setShow] = useState(false); // 
	const [content, setContent] = useState(""); // 
	const [type, setType] = useState(""); //
	const [loginID , setLoginID ] = useState(localStorage.getItem('LOGIN_ID'));
	const [modalStatus, setModalStatus ] = useState("");


	useEffect(() => {
		(async () => {
			if(localStorage.getItem("LOGIN_ID") == undefined){
				window.location.href="/login";
			}
			setLoading(true);
			await getProductCategory();
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

	let tempGetProductCategory =async ()=>{
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

	let saveClick = () => {
		let str = [];
		if (name == "") {
			str.push("Please fill name!")
		}
		if (category == "") {
			str.push("Please select category!")
		}
		if (gender == "") {
			str.push("Please select gender status!")
		}
		if (madeIn == "") {
			str.push("Please fill country of manufacture!")
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
		setPlusModalShow(false);setMinusModalShow(false);setLoading(true);setShow(false);
		if(modalStatus == "add"){
			let obj = {
				method: "post",
				url: ApiPath.ProductCategoryAdd,
				params: {
					"login_id": loginID,
					"product_category": addCategory
				},
			  };
			  let response = await ApiRequest(obj);
			  
			  if (response.flag === false) {
				setSuccessPlus([]);setLoading(false);
				setErrorPlus(response.message);
			  } else {
				if (response.data.status == "OK") {
					setSuccessPlus([response.data.message]);setErrorPlus([]);getProductCategory();setAddCategory("");setModalStatus("");setPlusModalShow(true);setShow(false);
				  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
				}else{
					setErrorPlus([response.data.message]);setSuccessPlus([]);setLoading(false);
					window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
				} 
			  }
		}else{
			let obj = {
				method: "post",
				url: ApiPath.ProductRegistrationSave,
				params: {
					"login_id": loginID,
					"product_code": code,
					"product_name": name,
					"product_category": category,
					"gender": gender,
					"made_in": madeIn,
				},
			  };
			  let response = await ApiRequest(obj);
			  
			  if (response.flag === false) {
				setSuccess([]);setLoading(false);
				setError(response.message);
			  } else {
				if (response.data.status == "OK") {
					setSuccess([response.data.message]);setError([]);tempGetProductCategory();setName("");setCode("");setCategory("");setGender("");setMadeIn("");setModalStatus("");setLoading(false);
				  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
				}else{
					setError([response.data.message]);setSuccess([]);setLoading(false);
					window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
				} 
			  }
		}
	}

	let categoryChange = (e)=>{
		let id = e.target.value;let code ="";
		if(id != ""){
			let res = categoryData.filter(data=> data.id == id);
			code = (parseInt(id) * 100000) + parseInt(res[0]['count']);
		}else{
			code = "";
		}
		setCode(code);setCategory(id);
	}

	let addCategoryChange = (e)=>{
		setAddCategory(e.target.value);
	}

	let saveOKPlusModel = ()=>{
		let str = [];
		setLoading(true);
		if (addCategory == "") {
			str.push("Please fill product category!")
		}
	
		if (str.length > 0) {
			setErrorPlus(str);
			setSuccessPlus([]);setLoading(false);
			window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		} else {
			setErrorPlus([]); setSuccessPlus([]);setLoading(false);setPlusModalShow(false);setModalStatus("add");setType("save");
			setShow(true);setContent("Are you sure want to save?");
		}

	}

	let removeCategoryChange =(e)=>{
		setRemoveCategory(e.target.value);
	}

	let saveOKMinusModel = ()=>{
		let str = [];
		setLoading(true);
		if (removeCategory == "") {
			str.push("Please select product category!")
		}
	
		if (str.length > 0) {
			setErrorMinus(str);
			setSuccessMinus([]);setLoading(false);
			window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		} else {
			setErrorMinus([]); setSuccessMinus([]);setLoading(false);setMinusModalShow(false);setModalStatus("remove");setType("delete");
			setShow(true);setContent("Are you sure want to remove?");
		}
	}
	
	let genderStatusChange = (val)=>{
		setGender(val);
	}

	let cancelClick = ()=>{
		setSuccessPlus([]);setErrorPlus([]);setSuccessMinus([]);setErrorMinus([]);
		if(modalStatus == "add"){
			setPlusModalShow(true);
		}
		if(modalStatus == "remove"){
			setMinusModalShow(true);
		}
		setShow(false);
	}

	let cancelClear = ()=>{
		setSuccessPlus([]);setErrorPlus([]);setSuccessMinus([]);setErrorMinus([]);setPlusModalShow(false);setMinusModalShow(false);
	}

	let deleteOK =async () =>{
		setPlusModalShow(false);setMinusModalShow(false);setLoading(true);setShow(false);
		let obj = {
			method: "delete",
			url: ApiPath.ProductCategoryRemove,
			params: {
				"login_id": loginID,
				"product_category_id": removeCategory
			},
			};
			let response = await ApiRequest(obj);
			
			if (response.flag === false) {
			setSuccessMinus([]);setLoading(false);
			setErrorMinus(response.message);
			} else {
			if (response.data.status == "OK") {
				setSuccessMinus([response.data.message]);setErrorMinus([]);getProductCategory();setRemoveCategory("");setModalStatus("");setMinusModalShow(true);setShow(false);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}else{
				setErrorMinus([response.data.message]);setSuccessMinus([]);setLoading(false);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			} 
			}
		
	}


  return (
	<CRow>
		<CCol>
			<CForm>
				<Loading start={loading} />
				<h3>Product Registration</h3>
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
				<PlusCategoryModal
					success={successPlus}
					error={errorPlus}
					show={plusModalShow}
					type={type}
					saveOK={saveOKPlusModel}
					okButton={"Ok"}
					cancel={cancelClear}
					cancelButton={"Cancel"}
					addCategory ={addCategory}
					addCategoryChange={addCategoryChange}
				/>
				<MinusCategoryModal
					success={successMinus}
					error={errorMinus}
					show={minusModalShow}
					saveOK={saveOKMinusModel}
					okButton={"Ok"}
					cancel={cancelClear}
					cancelButton={"Cancel"}
					categoryData={categoryData}
					removeCategoryChange={removeCategoryChange}
					removeCategory={removeCategory}
				/>


				<CRow className="mt-5">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Product Code</p>
					</CCol>
					<CCol lg="6">
						<CFormInput type="text"   aria-label="sm input example" value={code} readOnly/>
					</CCol>
					<CCol lg="2"></CCol>
				</CRow>


				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Product Name</p>
					</CCol>
					<CCol lg="6">
						<CFormInput type="text"   aria-label="sm input example" value={name}  onChange={(e)=>setName(e.target.value)} />
					</CCol>
					<CCol lg="2"></CCol>
				</CRow>


				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Product Category</p>
					</CCol>
					<CCol lg="6">
						<div style={{display: "flex"}}>
						   <CFormSelect className="mb-3"  style={{width: "87%"}} value={category} onChange={(e)=>categoryChange(e)}>
						   	<option  value=""></option>
								{categoryData.length> 0 &&
									categoryData.map((data,ind)=>{
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
					<CCol lg="2"></CCol>
				</CRow>


				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Gender Status</p>
					</CCol>
					<CCol lg="6">
					<CFormSelect className="mb-3" value={gender}  onChange={(e)=>genderStatusChange(e.target.value)}>
						  <option  value=""></option>
						  <option value="0">Both</option>
						  <option value="1">Male</option>
						  <option value="2">Female</option>
						</CFormSelect>
					</CCol>
					<CCol lg="2"></CCol>
				</CRow>


				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Country of manufacture</p>
					</CCol>
					<CCol lg="6">
						<CFormInput type="text"   aria-label="sm input example" value={madeIn} onChange={(e)=>setMadeIn(e.target.value)}  />
					</CCol>
					<CCol lg="2"></CCol>
				</CRow>

				

				<CRow className="mt-5 mb-5">
					<CCol lg="4"></CCol>
					<CCol lg="6" className="text-align-center">
						<CButton className="login-button"  onClick={() => saveClick()} style={{width: "100px"}}>Save</CButton>
					</CCol>
					<CCol lg="2"></CCol>
				</CRow>
			  </CForm>
		</CCol>
	</CRow>
  )
}

export default RegistrationIndex
