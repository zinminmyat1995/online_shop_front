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
import {validateIntegerOnly,dateFormatChange1 } from "../../common/CommonValidation"
import Message from "../../common/SuccessError";
import {
	cilTrash,
	cilPencil,
	cilCheckAlt,
	cilClipboard
} from '@coreui/icons'
import Loading from "../../common/Loading"
import ApiPath from "../../common/ApiPath";
import { ApiRequest } from "../../common/ApiRequest";

const NGArriveListIndex = () => {
	const [error, setError] = useState([]); // for error message
	const [success, setSuccess] = useState([]); // for success message
	const [code, setCode] = useState("");
	const [name, setName] = useState("");
	const [categoryData, setCategoryData] = useState([]);
	const [category, setCategory] = useState("");
	const [gender, setGender] = useState("");
	const [madeIn, setMadeIn] = useState("");
	const [show, setShow] = useState(false); // 
	const [content, setContent] = useState(""); // 
	const [type, setType] = useState("save"); //
	const [loading, setLoading] = useState(false);  // for loading
	const [copyData, setCopyData] = useState([]);
	const [userData, setUserData] = useState([])
	const [loginID , setLoginID ] = useState(localStorage.getItem('LOGIN_ID'));
	const [deletedID, setDeletedID ] = useState("");
	const [ngCount, setNGCount ] = useState("");
	const [price, setPrice ] = useState("");
	const [totalPrice, setTotalPrice ] = useState("");

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
			url: ApiPath.NGArriveListSearch,
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
				setUserData(response.data.data);setCopyData(response.data.data);setLoading(false);setDeletedID("");setPrice("");setNGCount("");setTotalPrice("");
			} else {
				setError([response.data.message]); setSuccess([]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
	}

	let tempSearchClick =async () => {
		setLoading(true);
		let object = {
			url: ApiPath.NGArriveListSearch,
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
		setLoading(false);setUserData([]);setCopyData([]);
		} else {
			if (response.data.status === 'OK') {
				setUserData(response.data.data);setCopyData(response.data.data);setLoading(false);setDeletedID("");setPrice("");setNGCount("");setTotalPrice("");
			} else {
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
	}
	

	let updateClick = (id) => {
		let temp = userData.filter(data=> data.id == id)
		if(temp[0]['ng_count'] == ""){
			setError(["Please fill NG Count!"]);
			setSuccess([]);
			window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		}else{
			setError([]);setSuccess([]);
			let res = userData.filter(data => {
				if (data.id == id) {
					data.edit_flag = false;
					return data;
				}
				return data;
			})
			setUserData(res);
			setCopyData(res);
		}
	}

	let deleteClick = (id) => {
		let temp = userData.filter(data=> data.code == id)
		setError([]); setSuccess([]);setLoading(false);setType("delete");setDeletedID(id);setNGCount(temp[0]['ng_count']);setPrice(temp[0]['price']);setTotalPrice(temp[0]['total_price'])
		setShow(true);setContent("Are you sure want to delete?");
	}

	let categoryChange = (e) => {
		setCategory(e.target.value);
	}

	let genderStatusChange = (val) => {
		setGender(val);
	}


	
	let editNGCountChange = (id, val)=>{
		let res = userData.filter(data => {
			if (data.id == id) {
				if(val == ""){
					data.ng_count = "";
				}else{
					if(validateIntegerOnly(val) == true && val.charAt(0) != 0 ){
						data.ng_count = val;
					}
				}
				return data;
			}
			return data;
		})
		setUserData(res);
	}

	let saveOK = ()=>{

	}

	
	let deleteOK =async ()=>{
		setSuccess([]); setError([]); setShow(false);
		setLoading(true);
		let object = {
			url: ApiPath.NGArriveListDelete,
			method: 'delete',
			params: {
				"login_id": loginID,
				"product_code": deletedID,
				"ng_count": ngCount,
				"price": price,
				"total_price": totalPrice
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
			<h3>NG Arrive List</h3>
			<hr />
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
			<Message success={success} error={error} />
			<CRow className="mt-5">
				<CCol lg="2" className="">
					<p className="label">Product Code</p>
				</CCol>
				<CCol lg="4">
					<CFormInput type="text" aria-label="sm input example"  value={code} onChange={(e) => setCode(e.target.value)} />
				</CCol>
				<CCol lg="2">
					<p className="label" >Product Name</p>
				</CCol>
				<CCol lg="4">
					<CFormInput type="text" aria-label="sm input example" value={name} onChange={(e) => setName(e.target.value)} />
				</CCol>
			</CRow>

			<CRow className="mt-4">
				<CCol lg="2" className="">
					<p className="label">Product Category</p>
				</CCol>
				<CCol lg="4">
					<CFormSelect className="mb-3"   onChange={(e) => categoryChange(e)}>
						<option value=""></option>
						{categoryData.length > 0 &&
							categoryData.map((data, ind) => {
								return (
									<option value={data.id} key={ind}>{data.name}</option>
								)
							})
						}
					</CFormSelect>
				</CCol>
				<CCol lg="2">
					<p className="label" >Gender Status</p>
				</CCol>
				<CCol lg="4">
					<CFormSelect className="mb-3" onChange={(e) => genderStatusChange(e.target.value)}>
						<option value=""></option>
						<option value="0">Both</option>
						<option value="1">Male</option>
						<option value="2">Female</option>
					</CFormSelect>
				</CCol>
			</CRow>
			<CRow className="mt-4">
				<CCol lg="2" className="">
					<p className="label">Country of manufacture</p>
				</CCol>
				<CCol lg="4">
					<CFormInput type="text" aria-label="sm input example"  value={madeIn} onChange={(e) => setMadeIn(e.target.value)} />
				</CCol>

			</CRow>


			<CRow className="mt-5 mb-5 text-align-center">
				<CCol>
					<CButton className="login-button" style={{ width: "100px" }} onClick={() => searchClick()}>Search</CButton>
				</CCol>
			</CRow>

			{userData.length > 0 &&
				<>
					<CRow>
						<CCol>
							<label className="total-row">Total - {userData.length}  row(s)</label>
						</CCol>
					</CRow>
					<CRow className="mb-4">
						<CCol>
							<div className='table-responsive tableFixHead'>
								<table className='table ng-return-list-table'>
									<thead className="text-center">
										<tr>
											<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="60px" >No</th>
											<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="160px">Code</th>
											<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="180px">Name</th>
											<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="180px">Category</th>
											<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="160px">Gender Status</th>
											<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="180px">Country of manufacture</th>
											<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="150px">Arrive Date</th>
											<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="150px">Price</th>
											<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="150px">NG Arrive Qty</th>
											<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="150px">Total Price</th>
											<th className="bg-body-tertiary text-center"  style={{verticalAlign: "middle"}} width="120px">Action</th>
										</tr>
									</thead>
									<tbody className="text-center">
									{userData.map((item, index) => (
										
												<tr key={index}>

													<td>{index + 1}</td>
													<td>{item.code}</td>
													<td>{item.name}</td>
													<td>
														{categoryData.map((data,index)=>{
															if(data.id == item.category){
																return(
																	<p key={index}>{data.name}</p>
																)
															}
														})}
													</td>
													<td>{item.gender_stauts == 0? "Both" :  item.gender_stauts == 1? "Male" : "Female"}</td>
													<td>{item.made_in}</td>
													<td>{dateFormatChange1(item.ng_arrive_date)}</td>
													<td>{item.price}</td>
													<td>	
														{item.edit_flag == true ?
															<CFormInput type="text" aria-label="sm input example" value={item.ng_count} onChange={(e) => editNGCountChange(item.id, e.target.value)} /> :
															<label>{item.ng_count}</label>
														}
													</td>
													<td>{item.total_price}</td>
													{/* <td>
														{item.edit_flag == true ?
															<CIcon icon={cilClipboard} onClick={() => updateClick(item.id)} /> :
															<CIcon icon={cilPencil} onClick={() => editClick(item.id)} />
														}
													</td> */}
													<td>
														<CIcon icon={cilTrash} onClick={() => deleteClick(item.code)} />
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

export default NGArriveListIndex
