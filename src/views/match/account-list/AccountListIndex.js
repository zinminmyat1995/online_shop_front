import React, { useState, useEffect,useRef } from "react";
import {
	CAvatar,
	CButton,
	CFormSelect,
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
import Confirmation from "../../common/Confirmation";
import Message from "../../common/SuccessError";
import ApiPath from "../../common/ApiPath";
import { ApiRequest } from "../../common/ApiRequest";
import { dateFormatChange2, dateFormatChange1,dateFormatChange3  } from "../../common/CommonValidation"
import {
	cilTrash,
	cilPencil,
	cilAddressBook,
	cilClipboard
} from '@coreui/icons'
import Loading from "../../common/Loading"
import DatePicker  from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';



const AccountListIndex = () => {
	const [error, setError] = useState([]); // for error message
	const [success, setSuccess] = useState([]); // for success message
	const [show, setShow] = useState(false); // 
	const [content, setContent] = useState(""); // 
	const [type, setType] = useState(""); //
	const [loading, setLoading] = useState(false);  // for loading
	const [userData, setUserData] = useState([])
	const [deletedData, setDeletedData ] = useState([]);
	const [editID, setEditID ] = useState("");
	const [copyData, setCopyData ] = useState([]);
	const [loginID , setLoginID ] = useState(localStorage.getItem('LOGIN_ID'));
	const [password, setPassword ] = useState("");
	const [userName, setUserName ] = useState("");

	useEffect(() => {
		(async () => {
			if(localStorage.getItem("LOGIN_ID") == undefined){
				window.location.href="/login";
			}
			setLoading(true);
			await searchClick();
		})();
	}, []);


	let searchClick =async () => {
		setError([]); setSuccess([]);
		setLoading(true);
		let object = {
			url: ApiPath.AccountSearch,
			method: 'get',
			params: {
				"login_id": loginID
			}
		}

		let response = await ApiRequest(object);
		if (response.flag === false) {
			setError([response.message[0]]); setUserData([]); setLoading(false);
		} else {
			if (response.data.status === 'OK') {
				setCopyData(response.data.data);
				setUserData(response.data.data);setLoading(false);setDeletedData([]);setEditID("");setUserName("");
			} else {
				setError([response.data.message]); setSuccess([]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
	}


	let tempSearchClick =async () => {
		setLoading(true);
		let object = {
			url: ApiPath.AccountSearch,
			method: 'get',
			params: {
				"login_id": loginID
			}
		}

		let response = await ApiRequest(object);
		if (response.flag === false) {
			setUserData([]); setLoading(false);
		} else {
			if (response.data.status === 'OK') {
				setCopyData(response.data.data);
				setUserData(response.data.data);setLoading(false);setDeletedData([]);setEditID("");setUserName("");
			} else {
				setError([response.data.message]); setSuccess([]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
	}
	

	let saveOK =async ()=>{
		setError([]);setSuccess([]);setShow(false);setLoading(true);
		let obj = {
			method: "post",
			url: ApiPath.ResetPassword,
			params: {
				"user_name": userName,
				"password":password,
				"login_id": loginID
			},
		};
		let response = await ApiRequest(obj);
				
		if (response.flag === false) {
			setSuccess([]);setLoading(false);
			setError(response.message);
		} else {
			if (response.data.status == "OK") {
			setSuccess([response.data.message]);setError([]);tempSearchClick();	
			window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}else{
				setError([response.data.message]);setSuccess([]); setLoading(false);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			} 
		}
	}


	let editClick = (id,no,user_name) => {
		setEditID(id);setUserName(user_name);
	}

	let updateClick = () => {
		let str = [];
		if (password == "") {
			str.push("Please fill Password!")
		}
		
		if (str.length > 0) {
			setError(str);
			setSuccess([]);
			window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		} else {
			setError([]); setSuccess([]);setLoading(false);setType("save");
			setShow(true);setContent(`Are you sure want to update?`);
		}
	}

	let cancelChange = ()=>{
		let data = copyData;
		setUserData(data);
		setShow(false);
		setPassword("");setEditID("");
	}	
  
	return (
		<>
			<Loading start={loading} />
			<h3>Account List</h3>
			<hr />
			<Confirmation
				show={show}
				content={content}
				type={type}
				saveOK={saveOK}
				okButton={"OK"}
				cancel={cancelChange}
				cancelButton={"Cancel"}
			/>
			<Message success={success} error={error} />
			
			{userData.length > 0 &&
				<>
					<CRow className="mt-2">
						<CCol>
							<label className="total-row">Total - {userData.length}  row(s)</label>
						</CCol>
					</CRow>
					<div className='table-responsive ' >
						<table className='table account-list-table'>
							<thead className="text-center">
								<tr>
									<th className="custom-header" style={{verticalAlign: "middle"}} width="60px" >No</th>
									<th className="custom-header" style={{verticalAlign: "middle"}} width="150px">Account No</th>
									<th className="custom-header" style={{verticalAlign: "middle"}} width="200px">Agent Name</th>
									<th className="custom-header" style={{verticalAlign: "middle"}} width="150px">User Name</th>
									<th className="custom-header" style={{verticalAlign: "middle"}} width="150px">Password</th>
									<th className="custom-header" style={{verticalAlign: "middle"}} width="170px">Phone No</th>
									<th className="custom-header" style={{verticalAlign: "middle"}} width="60px">Action</th>
								</tr>
							</thead>
							<tbody className="text-center">
							{userData.map((item, index) => {
								return(
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{item.account_name}</td>
										<td>{item.agent_name}</td>
										<td>{item.user_name}</td>
										<td>
											{ item.id != editID &&
												item.password
											}
											{ item.id == editID &&
												<CFormInput type="text"   aria-label="sm input example" value={password}  onChange={(e)=>setPassword(e.target.value)} />
											}
										</td>
										<td>{item.phone_no}</td>
										<td>
											{ item.id != editID &&
												<CIcon  icon={cilPencil}  onClick={()=>editClick(item.id,index,item.user_name)}  />
											}
											{ item.id == editID &&
												<CIcon  icon={cilClipboard}  onClick={()=>updateClick()}  />
											}
											
											
										</td>
									</tr>
								)})}
								
								
							</tbody>
						</table>
					</div>
				
				</>
			}

		</>
	)
}

export default AccountListIndex
