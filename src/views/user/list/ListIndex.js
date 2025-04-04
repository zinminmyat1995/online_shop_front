import React, { useState, useEffect } from "react";
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput 
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Message from "../../common/SuccessError";
import Confirmation from "../../common/Confirmation";
import {
  cilTrash,
  cilPencil,
  cilCheckAlt,
  cilClipboard
} from '@coreui/icons'
import Loading from "../../common/Loading"
import ApiPath from "../../common/ApiPath";
import { ApiRequest } from "../../common/ApiRequest";
import {validateEmail,validateIntegerOnly} from "../../common/CommonValidation";
const ListIndex = () => {
	const [error, setError] = useState([]); // for error message
	const [success, setSuccess] = useState([]); // for success message
	const [name, setName] = useState("");
	const [address, setAddress ] = useState("");
	const [loading, setLoading] = useState(false);  // for loading
	const [ copyData, setCopyData ] = useState([]);
    const [ userData, setUserData ] = useState([])
	const [loginID , setLoginID ] = useState(localStorage.getItem('LOGIN_ID'));
	const [show, setShow] = useState(false); // 
	const [content, setContent] = useState(""); // 
	const [type, setType] = useState(""); //
	const [deletedData, setDeletedData ] = useState([]);
	const [deletedID, setDeletedID ] = useState("");
  	useEffect(() => {
		(async () => {
			if(localStorage.getItem("LOGIN_ID") == undefined){
				window.location.href="/login";
			}
			setLoading(true);
			await searchClick();
		})();
	}, []);


	let searchClick = async () => {
		setError([]); setSuccess([]);
		setLoading(true);
		let object = {
			url: ApiPath.UserListSearch,
			method: 'get',
			params: {
				"name": name,
				"address": address,
				"login_id": loginID
			}
		}
	
		let response = await ApiRequest(object);
		if (response.flag === false) {
			setError([response.message[0]]); setUserData([]); setLoading(false);
		} else {
			if (response.data.status === 'OK') {
				setUserData(response.data.data);setCopyData(response.data.data);setLoading(false);setDeletedData([]);setDeletedID("");
			} else {
				setError([response.data.message]); setSuccess([]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
	}

	let tempSearchClick = async () => {
		setLoading(true);
		let object = {
			url: ApiPath.UserListSearch,
			method: 'get',
			params: {
				"name": name,
				"address": address,
				"login_id": loginID
			}
		}
		
		let response = await ApiRequest(object);
		if (response.flag === false) {
			setError([response.message[0]]); setUserData([]); setLoading(false);
		} else {
			if (response.data.status === 'OK') {
				setUserData(response.data.data);setCopyData(response.data.data);setLoading(false);setDeletedData([]);setDeletedID("");
			} else {
				setError([response.data.message]); setSuccess([]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
	}
	

  let editClick = (id) =>{
	let temp =[];
	copyData.forEach(data=>{
		if(data.id == id ){
			temp.push({
				id: data.id,
				code: data.code,
				name: data.name,
				email: data.email,
				phone_no: data.phone_no,
				address: data.address,
				edit_flag: true
			})
		}else{
			temp.push({
				id: data.id,
				code: data.code,
				name: data.name,
				email: data.email,
				phone_no: data.phone_no,
				address: data.address,
				edit_flag: false
			})
		}
	})
	setUserData(temp);
  }

  let editNameChange = (id,val) =>{
	let res = userData.filter(data=>{
		if(data.id == id){
			data.name = val;
			return data;
		}
		return data;
	})
	setUserData(res);
  }

  let editEmailChange = (id,val) =>{
	let res = userData.filter(data=>{
		if(data.id == id){
			data.email = val;
			return data;
		}
		return data;
	})
	setUserData(res);
  }

  let editAddressChange = (id,val) =>{
	let res = userData.filter(data=>{
		if(data.id == id){
			data.address = val;
			return data;
		}
		return data;
	})
	setUserData(res);
  }

  let editPhoneNoChange = (id,val) =>{
	let res = userData.filter(data=>{
		if(data.id == id){
			data.phone_no = val;
			return data;
		}
		return data;
	})
	setUserData(res);
  }
  
  let updateClick = (id)=>{
	let str = [];
	let data = userData.filter(data=> data.edit_flag == true)
	let ID = data[0]['id'];
	let name = data[0]['name'];
	let email = data[0]['email'];
	let phoneNo = data[0]['phone_no'];
	let address = data[0]['address'];
	setLoading(true);
	if (name == "") {
		str.push("Please fill name!")
	}
	if (email == "") {
		str.push("Please fill email!")
	}else if(validateEmail(email) == false){
		str.push("Invalid email!")
	}

	if (address == "") {
		str.push("Please fill address!")
	}

	if (phoneNo == "") {
		str.push("Please fill phone no!")
	}else if(validateIntegerOnly(phoneNo) == false){
		str.push("Invalid phone no!")
	}

	if (str.length > 0) {
		setError(str);
		setSuccess([]);setLoading(false);
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	} else {
		setError([]); setSuccess([]);setLoading(false);
		let temp={
			id:  ID,
			name: name,
			email:  email,
			address:  address,
			phone_no:  phoneNo,
		}
		setDeletedData(temp);setType("save");
		setShow(true);setContent("Are you sure want to update?");
	}
  }
  
  let deleteClick = (id)=>{
	setError([]); setSuccess([]);setLoading(false);setType("delete");setDeletedID(id);
	setShow(true);setContent("Are you sure want to delete?");
  }

  let saveOK =async ()=>{
	setError([]);setSuccess([]);setShow(false);setLoading(true);
		let obj = {
			method: "post",
			url: ApiPath.UserListUpdate,
			params: {
				"id": deletedData['id'],
				"name": deletedData['name'],
				"email": deletedData['email'],
				"phone_no": deletedData['phone_no'],
				"address": deletedData['address'],
				"login_id": loginID
			},
		};
		let response = await ApiRequest(obj);
				
		if (response.flag === false) {
			setSuccess([]);setLoading(false);
			setError(response.message);
		} else {
			if (response.data.status == "OK") {
			setSuccess([response.data.message]);setError([]);searchClick();	
			window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}else{
				setError([response.data.message]);setSuccess([]); setLoading(false);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			} 
		}
	}

  let deleteOK =async ()=>{
	setSuccess([]); setError([]); setShow(false);
	setLoading(true);
	let object = {
		url: ApiPath.UserListDelete,
		method: 'delete',
		params: {
			"login_id": loginID,
			"id": deletedID
		}
	}

	let response = await ApiRequest(object);
	if (response.flag === false) {
		setError([response.message[0]]); setUserData([]); setLoading(false);
	} else {
		if (response.data.status === 'OK') {
			setSuccess([response.data.message]);setError([]);
			tempSearchClick();window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		} else {
			setError([response.data.message]); setSuccess([]);
			window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		}
	}
  }

  return (
	<>
	<Loading start={loading} />
	<h3>User List</h3>
	<hr/>
		<Message success={success} error={error} />
		<Confirmation
			show={show}
			content={content}
			type={type}
			saveOK={saveOK}
			deleteOK={deleteOK}
			okButton={"Ok"}
			cancel={() => setShow(false)}
			cancelButton={"Cancel"}
		/>
		<CRow className="mt-5">
			<CCol lg="1" className="">
					<p className="label">Name</p>
			</CCol>
			<CCol lg="4">
				<CFormInput type="text"   aria-label="sm input example"  value={name}  onChange={(e) => setName(e.target.value)}  />
			</CCol><CCol lg="1"></CCol>
			<CCol lg="2">
				<p className="label" >Address</p>
			</CCol>
			<CCol lg="4">
				<CFormInput type="text"   aria-label="sm input example" value={address}    onChange={(e) => setAddress(e.target.value)}  />
			</CCol>
		</CRow>
		<CRow className="mt-5 mb-5 text-align-center">
			<CCol>
					<CButton className="login-button"  style={{width: "100px"}}  onClick={() => searchClick()}>Search</CButton>
			</CCol>
		</CRow>

		{userData.length > 0 &&
		<>
			<CRow>
				<CCol>
					<label className="total-row">Total - {userData.length}  row(s)</label>
				</CCol>
			</CRow>
			<CRow>
				<CCol >
					<div className='table-responsive tableFixHead'>
						<table className='table user-list-table'>
							<thead className="text-center">
								<tr>
									<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="60px" >No</th>
									<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="160px">Code</th>
									<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="180px">Name</th>
									<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="180px">Email</th>
									<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="180px">Address</th>
									<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="160px">Phone No</th>
									<th className="bg-body-tertiary text-center" colSpan={2} style={{verticalAlign: "middle"}} width="150px">Action</th>
								</tr>
							</thead>
							<tbody className="text-center">
							{userData.map((item, index) => (
								
								<tr key={index}>

									<td>{index + 1}</td>
									<td>{item.code}</td>
									<td>
										{item.edit_flag == true? 
											<CFormInput type="text"   aria-label="sm input example" value={item.name}   onChange={(e) =>editNameChange(item.id, e.target.value)}  /> : 
											<label>{item.name}</label>
										}
									</td>
									<td>
										{item.edit_flag == true? 
											<CFormInput type="text"   aria-label="sm input example" value={item.email}  onChange={(e) =>editEmailChange(item.id, e.target.value)}  /> : 
											<label>{item.email}</label>
										}
									</td>
									<td>
										{item.edit_flag == true? 
											<CFormInput type="text"   aria-label="sm input example" value={item.address}  onChange={(e) =>editAddressChange(item.id, e.target.value)}  /> : 
											<label>{item.address}</label>
										}
									</td>
									<td>
										{item.edit_flag == true? 
											<CFormInput type="text"   aria-label="sm input example" value={item.phone_no}  onChange={(e) =>editPhoneNoChange(item.id, e.target.value)}  /> : 
											<label>{item.phone_no}</label>
										}
									</td>
	
									<td>
										{item.edit_flag == true? 
											<CIcon icon={cilClipboard} onClick={()=>updateClick(item.id)} /> :
											<CIcon icon={cilPencil} onClick={()=>editClick(item.id)} />
										}	
									</td>
									<td>
										<CIcon icon={cilTrash}  onClick={()=>deleteClick(item.id)}  />
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
		
	</>
  )
}

export default ListIndex
