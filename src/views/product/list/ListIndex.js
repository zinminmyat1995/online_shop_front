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
import Message from "../../common/SuccessError";
import ApiPath from "../../common/ApiPath";
import { ApiRequest } from "../../common/ApiRequest";
import {
	cilTrash,
	cilPencil,
	cilCheckAlt,
	cilClipboard
} from '@coreui/icons'
import Loading from "../../common/Loading"

const ListIndex = () => {
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
	const [type, setType] = useState(""); //
	const [loading, setLoading] = useState(false);  // for loading
	const [copyData, setCopyData] = useState([]);
	const [userData, setUserData] = useState([])
	const [deletedData, setDeletedData ] = useState([]);
	const [deletedID, setDeletedID ] = useState("");
	const [loginID , setLoginID ] = useState(localStorage.getItem('LOGIN_ID'));

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
				setUserData(response.data.data);setCopyData(response.data.data);setLoading(false);setDeletedData([]);setDeletedID("");
			} else {
				setError([response.data.message]); setSuccess([]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
	}


	let tempSearchClick =async () => {
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
				setUserData([]); setLoading(false);
		} else {
			if (response.data.status === 'OK') {
				setUserData(response.data.data);setCopyData(response.data.data);setLoading(false);setDeletedData([]);setDeletedID("");
			} else {
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
					gender_stauts: data.gender_stauts  ,
					made_in: data.made_in  ,
					edit_flag: true
				})
			} else {
				temp.push({
					id: data.id  ,
					code: data.code  ,
					name: data.name  ,
					category: data.category  ,
					gender_stauts: data.gender_stauts  ,
					made_in: data.made_in  ,
					edit_flag: false
				})
			}
		})
		setUserData(temp);
	}

	let editNameChange = (id, val) => {
		let res = userData.filter(data => {
			if (data.id == id) {
				data.name = val;
				return data;
			}
			return data;
		})
		setUserData(res);
	}

	let editMadeInChange = (id, val) => {
		let res = userData.filter(data => {
			if (data.id == id) {
				data.made_in = val;
				return data;
			}
			return data;
		})
		setUserData(res);
	}

	let updateClick = (id) => {

		let temp = userData.filter(data=> data.id == id); let str = [];
		if(temp[0]['code'] == ""){
			str.push("Please fill Code!");
		}
		if(temp[0]['name'] == ""){
			str.push("Please fill Name!");
		}

		if(temp[0]['made_in'] == ""){
			str.push("Please fill Country of manufacture!");
		}
		if(str.length > 0){
			setError(str);
			setSuccess([]);
			window.scrollTo({ top: 1, left: 0 });
			  setTimeout(() => {
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			  }, 10);
		}else{
			setError([]); setSuccess([]);setLoading(false);
			let res = userData.filter(data => data.id == id)
			let temp={
				product_code: res[0]['code'],
				product_name: res[0]['name'],
				product_category: res[0]['category'],
				gender: res[0]['gender_stauts'],
				made_in: res[0]['made_in'],
			}
			setDeletedData(temp);setType("save");
			setShow(true);setContent("Are you sure want to update?");
		}
	}

	let deleteClick = (id) => {
		setError([]); setSuccess([]);setLoading(false);setType("delete");setDeletedID(id);
		setShow(true);setContent("Are you sure want to delete?");
	}

	let categoryChange = (e) => {
		setCategory(e.target.value);
	}

	let genderStatusChange = (val) => {
		setGender(val);
	}

	let editCategoryChange = (id, val)=>{
		let res = userData.filter(data => {
			if (data.id == id) {
				data.category = val;
				return data;
			}
			return data;
		})
		setUserData(res);
	}
	
	let editGenderStatusChange = (id, val)=>{
		let res = userData.filter(data => {
			if (data.id == id) {
				data.gender_stauts = val;
				return data;
			}
			return data;
		})
		setUserData(res);
	}

	let saveOK =async ()=>{
		setError([]);setSuccess([]);setShow(false);setLoading(true);
		let obj = {
			method: "post",
			url: ApiPath.ProductListUpdate,
			params: {
				"product_code": deletedData['product_code'],
				"product_name": deletedData['product_name'],
				"product_category": deletedData['product_category'],
				"gender": deletedData['gender'],
				"made_in": deletedData['made_in'],
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

	let deleteOK =async ()=>{
		setSuccess([]); setError([]); setShow(false);
		setLoading(true);
		let object = {
			url: ApiPath.ProductListDelete,
			method: 'delete',
			params: {
				"login_id": loginID,
				"product_code": deletedID
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
			<h3>Product List</h3>
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
				<CCol lg="2" >
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
				<CCol lg="2" >
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
					<div className='table-responsive tableFixHead'>
						<table className='table product-list-table'>
							<thead className="text-center">
								<tr>
									<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="60px" >No</th>
									<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="160px">Code</th>
									<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="220px">Name</th>
									<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="180px">Category</th>
									<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="180px">Gender Status</th>
									<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="180px">Country of manufacture</th>
									<th className="bg-body-tertiary text-center" colSpan={2} style={{verticalAlign: "middle"}} width="120px">Action</th>
								</tr>
							</thead>
							<tbody className="text-center">
							{userData.map((item, index) => (
								
								<tr key={index}>

									<td>{index + 1}</td>
									<td>{item.code}</td>
									<td>
										{item.edit_flag == true ?
											<CFormInput type="text" aria-label="sm input example" value={item.name} onChange={(e) => editNameChange(item.id, e.target.value)} /> :
											<label>{item.name}</label>
										}
									</td>
									<td>
										{item.edit_flag == true ?
											<CFormSelect   onChange={(e) => editCategoryChange(item.id, e.target.value)} value={item.category}>
												{categoryData.length > 0 &&
													categoryData.map((data, ind) => {
														return (
															<option value={data.id} key={ind}>{data.name}</option>
														)
													})
												}
											</CFormSelect>
											:
												<label>
													{categoryData.map((data,index)=>{
														if(data.id == item.category){
															return(
																<p key={index}>{data.name}</p>
															)
														}
													})}
												</label>
										}
									</td>
									<td>
										{item.edit_flag == true ?
											<CFormSelect  onChange={(e) => editGenderStatusChange(item.id,e.target.value)}  value={item.gender_stauts}>
												<option value="0">Both</option>
												<option value="1">Male</option>
												<option value="2">Female</option>
											</CFormSelect>
											:
											<label>{item.gender_stauts == 0? "Both" : item.gender_stauts == 1? "Male" : "Female"}</label>
										}
									</td>
									<td>
										{item.edit_flag == true ?
											<CFormInput type="text" aria-label="sm input example" value={item.made_in} onChange={(e) => editMadeInChange(item.id, e.target.value)} /> :
											<label>{item.made_in}</label>
										}
									</td>
	
									<td>
										{item.edit_flag == true ?
											<CIcon icon={cilClipboard} onClick={() => updateClick(item.id)} /> :
											<CIcon icon={cilPencil} onClick={() => editClick(item.id)} />
										}
									</td>
									<td>
										<CIcon icon={cilTrash}  onClick={()=>deleteClick(item.code)}  />
									</td>
								</tr>
									
								))}
							</tbody>
						</table>

					</div>
				</>
			}

		</>
	)
}

export default ListIndex
