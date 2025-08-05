import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCol,
  CContainer,
  CForm,
  CFormLabel,
  CFormInput,
  CRow,
  CFormTextarea,
  CFormSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilMinus, cilPlus } from '@coreui/icons'
import Message from "../../common/SuccessError";
import Confirmation from "../../common/Confirmation";
import Loading from "../../common/Loading"
import {validateIntegerOnly} from "../../common/CommonValidation"
import PlusCategoryModal from "./PlusCategoryModal"
import PlusMeatModal from "./PlusMeatModal"
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
	const [menuType, setMenuType] = useState(""); 
	const [menuTypeData, setMenuTypeData] = useState([]);
	const [loginID , setLoginID ] = useState(localStorage.getItem('LOGIN_ID'));
    const [addMenuType, setAddMenuType ] = useState("");
    const [plusModalShow, setPlusModalShow ] = useState(false);
    const [minusModalShow, setMinusModalShow ] = useState(false);
	const [plusMeatModalShow, setPlusMeatModalShow ] = useState(false);
    const [show, setShow] = useState(false); // 
	const [content, setContent] = useState(""); // 
	const [type, setType] = useState(""); //
    const [modalStatus, setModalStatus ] = useState("");
	const [removeMenuType, setRemoveMenuType ] = useState("");
 	const [addMeatType, setAddMeatType ] = useState("");
	const [meatTypeData, setMeatTypeData ] = useState([]);
	const [removeMeatID , setRemoveMeatID ] = useState("");


	useEffect(() => {
		(async () => {
			if(localStorage.getItem("LOGIN_ID") == undefined){
				window.location.href="/login";
			}
			setLoading(true);
			await getMenuType();
			await getMeatType();
		})();
	}, []);

	let getMenuType =async ()=>{
		setLoading(true);
		let object = {
			url: ApiPath.MenuTypeSearch,
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
				setMenuTypeData(response.data.data);setLoading(false);
			} else {
				setError([response.data.message]); setSuccess([]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
	}

	let getMeatType =async ()=>{
		setLoading(true);
		let object = {
			url: ApiPath.MeatTypeSearch,
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
				setMeatTypeData(response.data.data);setLoading(false);
			} else {
				setError([response.data.message]); setSuccess([]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
	}

	let addMenuTypeChange = (e)=>{
		setAddMenuType(e.target.value);
	}
	let addMeatTypeChange = (e)=>{
		setAddMeatType(e.target.value);
	}
	let removeMenuTypeChange =(e)=>{
		setRemoveMenuType(e.target.value);
	}

    let saveOKPlusModel = ()=>{
		let str = [];
		setLoading(true);
		if (addMenuType == "") {
			str.push("Please fill menu type!")
		}
	
		if (str.length > 0) {
			setErrorPlus(str);
			setSuccessPlus([]);setLoading(false);
			window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		} else {
			setErrorPlus([]); setSuccessPlus([]);setLoading (false);setPlusModalShow(false);setModalStatus("add");setType("save");
			setShow(true);setContent("Are you sure want to save?");
		}

	}

	let saveOKPlusMeatModel = ()=>{
		let str = [];
		setLoading(true);
		if (addMeatType == "") {
			str.push("Please fill meat type!")
		}
	
		if (str.length > 0) {
			setErrorPlus(str);
			setSuccessPlus([]);setLoading(false);
			window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		} else {
			setErrorPlus([]); setSuccessPlus([]);setLoading (false);setPlusMeatModalShow(false);setModalStatus("meat-add");setType("save");
			setShow(true);setContent("Are you sure want to save?");
		}

	}

	

	let saveOKMinusModel = ()=>{
		let str = [];
		setLoading(true);
		if (removeMenuType == "") {
			str.push("Please select menu type!")
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


    let cancelClear = ()=>{
		setSuccessPlus([]);setErrorPlus([]);setSuccessMinus([]);setErrorMinus([]);setPlusModalShow(false);setMinusModalShow(false);setPlusMeatModalShow(false);
	}


    let saveOK =async ()=>{
		setPlusModalShow(false);setMinusModalShow(false);setLoading(true);setShow(false);
		if(modalStatus == "add"){
			let obj = {
				method: "post",
				url: ApiPath.MenuTypeAdd,
				params: {
					"login_id": loginID,
					"menu_type": addMenuType
				},
			  };
			  let response = await ApiRequest(obj);
			  if (response.flag === false) {
				setSuccessPlus([]);setLoading(false);
				setErrorPlus(response.message);
			  } else {
				if (response.data.status == "OK") {
					setSuccessPlus([response.data.message]);setErrorPlus([]);getMenuType();setModalStatus("");setPlusModalShow(true);setShow(false);setAddMenuType("");setLoading(false);
				    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
				}else{
					setErrorPlus([response.data.message]);setSuccessPlus([]);setLoading(false);
					window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
				} 
			  }
		}else if(modalStatus == "meat-add"){
			let obj = {
			  method: "post",
				url: ApiPath.MeatTypeAdd,
				params: {
					"login_id": loginID,
					"meat_type": addMeatType
				},
			  };
			  let response = await ApiRequest(obj);
			  if (response.flag === false) {
				setSuccessPlus([]);setLoading(false);
				setErrorPlus(response.message);
			  } else {
				if (response.data.status == "OK") {
					setSuccessPlus([response.data.message]);setErrorPlus([]);getMeatType();setModalStatus("");setPlusMeatModalShow(true);setShow(false);setAddMeatType("");setLoading(false);
				    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
				}else{
					setErrorPlus([response.data.message]);setSuccessPlus([]);setLoading(false);
					window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
				} 
			}
		}else{
			let arr = [];
			meatTypeData.forEach(data=>{
				if(data.check == true && data.price != ""){
					arr.push({
						"meat_id": data.id,
						"price": data.price
					})
				}
			})
			

			let obj = {
				method: "post",
				url: ApiPath.MenuRegister,
				params: {
					"menu_id": code,
					"menu_name": name,
					"menu_type": menuType,
					"meat_and_price": arr,
					"login_id": loginID,
				},
			  };
			  let response = await ApiRequest(obj);
			  
			  if (response.flag === false) {
				setSuccess([]);setLoading(false);
				setError(response.message);
			  } else {
				if (response.data.status == "OK") {
					setSuccess([response.data.message]);setError([]);getMenuType();getMeatType();setName("");setCode("");setMenuType("");setModalStatus("");setLoading(false);
				    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
				}else{
					setError([response.data.message]);setSuccess([]);setLoading(false);
					window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
				} 
			  }
		}
	}

console.log(meatTypeData)
    
	let deleteOK =async () =>{
		setPlusModalShow(false);setMinusModalShow(false);setLoading(true);setShow(false);
		let obj = {
			method: "delete",
			url: ApiPath.MenuTypeRemove,
			params: {
				"login_id": loginID,
				"menu_type_id": removeMenuType
			},
			};
			let response = await ApiRequest(obj);
			
			if (response.flag === false) {
			setSuccessMinus([]);setLoading(false);
			setErrorMinus(response.message);
			} else {
			if (response.data.status == "OK") {
				setSuccessMinus([response.data.message]);setErrorMinus([]);getMenuType();setRemoveMenuType("");setModalStatus("");setMinusModalShow(true);setShow(false);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}else{
				setErrorMinus([response.data.message]);setSuccessMinus([]);setLoading(false);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			} 
			}
		
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

	let priceChange = ( val, id ) =>{
		if(validateIntegerOnly(val) && val != "0"){
			let data = meatTypeData.map(data=>{
				if(id == data.id){
					data.price = val;
					return data;
				}
				return data;
			})
			setMeatTypeData(data);
		}
		
	}



	let removeMeat = (id)=>{
		setSuccess([]);setError([]);
		setRemoveMeatID(id);setType("update");
		setShow(true);setContent("Are you sure want to remove?");
		
	}

	let updateOK =async () =>{
		setLoading(true);setShow(false);
		let obj = {
			method: "delete",
			url: ApiPath.MeatTypeRemove,
			params: {
				"login_id": loginID,
				"meat_type_id": removeMeatID
			},
			};
			let response = await ApiRequest(obj);
			
			if (response.flag === false) {
			setSuccess([]);setLoading(false);
			setError(response.message);
			} else {
			if (response.data.status == "OK") {
				setSuccess([response.data.message]);setError([]);getMeatType();setShow(false);setRemoveMeatID("");
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}else{
				setError([response.data.message]);setSuccess([]);setLoading(false);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			} 
			}
		
	}

	let plusMeatModalShowFun =()=>{
		setSuccess([]);setError([]);setPlusMeatModalShow(true); 
	}

	let plusModalShowFun =()=>{
		setSuccess([]);setError([]);setPlusModalShow(true); 
	}

	let minusModalShowFun =()=>{
		setSuccess([]);setError([]);setMinusModalShow(true); 
	}

	let menuTypeChange = (e)=>{
		let id = e.target.value;let code ="";
		if(id != ""){
			let res = menuTypeData.filter(data=> data.id == id);
			code = (parseInt(id) * 1000) + (parseInt(res[0]['count'] + 1));
		}else{
			code = "";
		}
		setCode(code);setMenuType(id)
	}

	let checkboxChange = (id)=>{
		let data = meatTypeData.map(data=>{
			if(data.id == id){
				data.check = !data.check;
				return data;
			}
			return data;
		})
		setMeatTypeData(data)
	}

	let saveClick = () => {
		let str = [];let flg = false;

		if (name == "") {
			str.push("Please fill name!")
		}
		if (menuType == "") {
			str.push("Please select menu type!")
		}
		
		if(meatTypeData.length > 0){
			meatTypeData.forEach(data=>{
				if(data.check == true && data.price != ""){
					flg = true;
				}
			})
		}

		if (flg == false) {
			str.push("Please select meat and fill price!")
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
	
  return (
	<CRow>
		<CCol>
			<CForm>
				<Loading start={loading} />
				<h3>Menu Registration</h3>
				<hr/>
				<Message success={success} error={error} />
                <Confirmation
                    show={show}
                    content={content}
                    type={type}
                    saveOK={saveOK}
                    deleteOK={deleteOK}
					updateOK={updateOK}
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
                    addMenuType ={addMenuType}
                    addMenuTypeChange={addMenuTypeChange}
                />
                <MinusCategoryModal
                    success={successMinus}
                    error={errorMinus}
                    show={minusModalShow}
                    saveOK={saveOKMinusModel}
                    okButton={"Ok"}
                    cancel={cancelClear}
                    cancelButton={"Cancel"}
                    menuTypeData={menuTypeData}
                    removeMenuTypeChange={removeMenuTypeChange}
                    removeMenuType={removeMenuType}
                />
 				<PlusMeatModal
                    success={successPlus}
                    error={errorPlus}
                    show={plusMeatModalShow}
                    type={type}
                    saveOK={saveOKPlusMeatModel}
                    okButton={"Ok"}
                    cancel={cancelClear}
                    cancelButton={"Cancel"}
                    addMeatType ={addMeatType}
                    addMeatTypeChange={addMeatTypeChange}
                />

				<CRow className="mt-5">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Menu Code</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text"   aria-label="sm input example" value={code} readOnly/>
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>


				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Menu Name</p>
					</CCol>
					<CCol lg="4">
						<CFormInput type="text"   aria-label="sm input example" value={name}  onChange={(e)=>setName(e.target.value)} />
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>



				<CRow className="mt-3">
					<CCol lg="2"></CCol>
					<CCol lg="2" className="text-align-center">
							<p className="label">Menu Type</p>
					</CCol>
					<CCol lg="4">
						<div style={{display: "flex"}}>
						   <CFormSelect className="mb-3"  style={{width: "87%"}} value={menuType} onChange={(e)=>menuTypeChange(e)}>
						   	<option  value=""></option>
								{menuTypeData.length> 0 &&
									menuTypeData.map((data,ind)=>{
										return(
											<option value={data.id} key={ind}>{data.name}</option>
										)
									})
								}
						</CFormSelect>
						   <CIcon icon={cilPlus} className="plus-button" style={{marginLeft: "10px", marginRight: "10px"}} onClick={()=>plusModalShowFun()}  /> 
						   <CIcon icon={cilMinus} className="plus-button" onClick={()=>minusModalShowFun()}   />
						</div>
					</CCol>
					<CCol lg="4"></CCol>
				</CRow>


		
                


                <CRow className="mt-3">
                    <CCol lg="2"></CCol>
                    <CCol lg="8">
                        <div className="fieldset-container">
                            <legend className="legend-style"><h5 style={{fontStyle: "italic"}}>Meat & Price <CIcon icon={cilPlus} className="plus-button" style={{marginLeft: "10px", marginRight: "10px"}} onClick={()=>plusMeatModalShowFun()}  /> </h5>
                            </legend>
                            <div>
								{meatTypeData.length > 0 &&
									meatTypeData.map((data,ind)=>{
										return(
											<CRow className="mb-3" key={ind}>
												<CCol lg="2" className=""></CCol>
												<CCol lg="2" className="">
													<input type="checkbox"  style={{width: "14px", height: "14px"}} value={data.id}   checked={data.check === true} onChange={(e) => checkboxChange(data.id)}/>
													<label style={{marginLeft: "5px"}} >{data.name}</label>
												</CCol>
												<CCol lg="4">
													<CFormInput type="text"   aria-label="sm input example" value={data.price}  onChange={(e)=>priceChange(e.target.value,data.id)} />
												</CCol>
												<CCol lg="3">
													<CIcon icon={cilMinus} className="plus-button" onClick={()=>removeMeat(data.id)}   />
												</CCol>
											</CRow>
										)
									})
								}
                                

                            
                            </div >
                        </div>
                    </CCol>
                    <CCol lg="2"></CCol>
                </CRow>

				<CRow className="mt-5 mb-5">
					<CCol lg="3"></CCol>
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
