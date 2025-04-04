import React, { useState, useEffect } from "react";
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
import {validateIntegerOnly,dateFormatChange1} from "../../common/CommonValidation"
import Message from "../../common/SuccessError";
import {
	cilTrash,
	cilPencil,
	cilCheckAlt,
	cilClipboard,
	cilCheck
} from '@coreui/icons'
import Loading from "../../common/Loading"
import ApiPath from "../../common/ApiPath";
import { ApiRequest } from "../../common/ApiRequest";

const NGDetailInformationIndex = () => {
	const [error, setError] = useState([]); // for error message
	const [success, setSuccess] = useState([]); // for success message
	const [code, setCode] = useState("");
	const [qty, setQty] = useState("");
	const [show, setShow] = useState(false); // 
	const [content, setContent] = useState(""); // 
	const [type, setType] = useState("save"); //
	const [loading, setLoading] = useState(false);  // for loading
	const [copyData, setCopyData] = useState([]);
	const [userData, setUserData] = useState([])
	const [loginID , setLoginID ] = useState(localStorage.getItem('LOGIN_ID'));

	
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
			url: ApiPath.NGDetailInformationSearch,
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
				setUserData(response.data.data);setLoading(false);
			} else {
				setError([response.data.message]); setSuccess([]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
	}

	let tempSearchClick =async () => {
		let object = {
			url: ApiPath.NGDetailInformationSearch,
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
				setUserData(response.data.data);setLoading(false);
			} else {
				setError([response.data.message]); setSuccess([]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
	}

	let approveBtn =(code,qty) =>{
		setError([]); setSuccess([]);setLoading(false);setType("save");setCode(code);setQty(qty);
		setShow(true);setContent("Are you sure want to approve?");
	}

	let saveOK =async ()=>{
		setError([]);setSuccess([]);setShow(false);setLoading(true);
		let obj = {
			method: "post",
			url: ApiPath.NGDetailInformationApprove,
			params: {
				"login_id": loginID,
				"ng_arrive_qty": qty,
				"product_code": code
			},
		  };
		  let response = await ApiRequest(obj);
			  
		  if (response.flag === false) {
			setSuccess([]);setLoading(false);
			setError(response.message);
		  } else {
			if (response.data.status == "OK") {
			  setSuccess([response.data.message]);setError([]); tempSearchClick();
			  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}else{
				setError([response.data.message]);setSuccess([]);setLoading(false);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			} 
		  }
	}

	return (
		<>
			<Loading start={loading} />
			<h3>NG Detail Information</h3>
			<hr />
			<Confirmation
				show={show}
				content={content}
				type={type}
				saveOK={saveOK}
				okButton={"Ok"}
				cancel={() => setShow(false)}
				cancelButton={"Cancel"}
			/>
			<Message success={success} error={error} />
			{userData.length > 0 &&
				<>
					<CRow className="mb-4 mt-3">
						<CCol>
							<div className='table-responsive tableFixHead'>
								<table className='table ng-detail-information-table'>
									<thead className="text-center">
										<tr>
											<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="60px" >No</th>
											<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="160px">Product Code</th>
											<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="180px">Product Name</th>
											<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="180px">NG Qty</th>
											<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="180px">NG Return Qty</th>
											<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="180px">NG Arrive Qty</th>
											<th className="bg-body-tertiary text-center" style={{verticalAlign: "middle"}} width="150px">Action</th>
										</tr>
									</thead>
									<tbody className="text-center">
									{userData.map((item, index) => (
										
												<tr key={index}>

													<td>{index + 1}</td>
													<td>{item.p_code}</td>
													<td>{item.p_name}</td>
													<td>{item.ng_qty > 0? item.ng_qty: "-"}</td>
													<td>{item.ng_return_qty > 0? item.ng_return_qty: "-"}</td>
													<td>{item.ng_arrive_qty > 0? item.ng_arrive_qty: "-"}</td>
													<td>
														{item.ng_arrive_qty > 0 ?
															<CButton  style={{ width: "100px", background: "rgb(98 255 200)", fontSize: "15px", borderRadius: "35px" }} onClick={() => approveBtn(item.p_code,item.ng_arrive_qty)}>Approve</CButton>
																:
															""
														}
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

export default NGDetailInformationIndex;
