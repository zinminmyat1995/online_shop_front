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
import CustomerModal from "./CustomerModal";
const ListIndex = () => {
	const [error, setError] = useState([]); // for error message
	const [success, setSuccess] = useState([]); // for success message
	const [fromDate, setFromDate] = useState(dateFormatChange2(new Date()));
	const [toDate, setToDate] = useState(dateFormatChange2(new Date()));
	const [show, setShow] = useState(false); // 
	const [content, setContent] = useState(""); // 
	const [type, setType] = useState(""); //
	const [loading, setLoading] = useState(false);  // for loading
	const [copyData, setCopyData] = useState([]);
	const [userData, setUserData] = useState([])
	const [deletedData, setDeletedData ] = useState([]);
	const [deletedID, setDeletedID ] = useState("");
	const [loginID , setLoginID ] = useState(localStorage.getItem('LOGIN_ID'));
	const [customerModalShow, setCustomerModalShow ] = useState(false);
	const [customerModalData, setCustomerModalData ] = useState([]);
	let totalPayment = [];
	let totalAll = 0;
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

		let inputDateParts1 = dateFormatChange1(fromDate).split('-');
		let inputDateParts2 = dateFormatChange1(toDate).split('-');
		let day1 = new Date(inputDateParts1[2], inputDateParts1[1] - 1, inputDateParts1[0]);
		let day2 = new Date(inputDateParts2[2], inputDateParts2[1] - 1, inputDateParts2[0]);
		let from = Math.floor(day1.getTime() / (1000 * 3600 * 24));
		let to = Math.floor(day2.getTime() / (1000 * 3600 * 24));
		if( from > to ){
			setError(["From Date is greater than To Date!"]); setSuccess([]);setLoading(false);
			window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		}else{
			setError([]); setSuccess([]);
			setLoading(true);
			let object = {
				url: ApiPath.SaleListSearch,
				method: 'get',
				params: {
					"from_date": dateFormatChange2(fromDate),
					"to_date": dateFormatChange3(toDate),
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


	let updateClick =async (id) => {
		setError([]);setSuccess([]);setLoading(true);
		let obj = {
			method: "get",
			url: ApiPath.SaleListSearchData,
			params: {
				"customer_id": id,
				"login_id": loginID
			},
		};
		let response = await ApiRequest(obj);
				
		if (response.flag === false) {
			setSuccess([]);setLoading(false);setCustomerModalShow(false);
			setError(response.message);
		} else {
			if (response.data.status == "OK") {
				setCustomerModalData(response.data.data);setCustomerModalShow(true);setLoading(false);
			}else{
				setError([response.data.message]);setSuccess([]); setLoading(false);setCustomerModalShow(false);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			} 
		}
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
			<h3>Sale List</h3>
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
			<CustomerModal
				show={customerModalShow}
				cancel={() => setCustomerModalShow(false)}
				listData = {customerModalData}
			/>
			<Message success={success} error={error} />
			<CRow className="mt-5">
				<CCol lg="1" className="">
					<p className="label">Date</p>
				</CCol>
				<CCol lg="2">
					<DatePicker
						selected={fromDate}
						onChange={(date) => setFromDate(date)}
						dateFormat="yyyy/MM/dd"
						placeholderText="Select a date"
						className="date-picker-css"
					  />
				</CCol>
				<CCol lg="1" className="center-web-phone">
					<p className="label" >~</p>
				</CCol>
				<CCol lg="2">
					<DatePicker
						selected={toDate}
						onChange={(date) => setToDate(date)}
						dateFormat="yyyy/MM/dd"
						placeholderText="Select a date"
						className="date-picker-css"
					  />
				</CCol>
				<CCol lg="2" className="center-web-phone-btn center-web-phone">
					<CButton className="login-button" style={{ width: "100px" }} onClick={() => searchClick()}>Search</CButton>
				</CCol>
			</CRow>



			{userData.length > 0 &&
				<>
					<CRow className="mt-5">
						<CCol>
							<label className="total-row">Total - {userData.length}  row(s)</label>
						</CCol>
					</CRow>
					<div className='table-responsive tableFixHead'>
						<table className='table sale-list-table'>
							<thead className="text-center">
								<tr>
									<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="60px" >No</th>
									<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="200px">Customer Name</th>
									<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="180px">Phone No</th>
									<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="200px">Address</th>
									<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="180px">Payment</th>
									<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="180px">Total Price</th>
									<th className="bg-body-tertiary text-center" style={{verticalAlign: "middle"}} width="120px">Detail</th>
								</tr>
							</thead>
							<tbody className="text-center">
							{userData.map((item, index) => {
								if (totalPayment[item.payment_name]) {
									totalPayment[item.payment_name] += item.total_price;
								} else {
									totalPayment[item.payment_name] = item.total_price;
								}
								totalAll = totalAll + item.total_price;
								return(
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{item.name}</td>
										<td>{item.phone_no}</td>
										<td>{item.address}</td>
										<td>{item.payment_name}</td>
										<td>{item.total_price}</td>
										<td>
											<CIcon icon={cilAddressBook} onClick={() => updateClick(item.id)} />
										</td>
								
									</tr>
								)})}
								
								
							</tbody>
						</table>
					</div>

				
					<CRow className="bill-sale-card mt-3">
						<CCol lg="12" >
							<CRow className="mt-3">
								<CCol lg="12">
									<p className="label">Bill of sale from [{dateFormatChange1(fromDate)} ~ {dateFormatChange1(toDate)}] days</p>
								</CCol>
							</CRow>

							<table className='mb-4'>
								<tbody >

									{Object.keys(totalPayment).map((key, index) => (
										<tr key={index}>
											<td width="70px" >{key}</td>
											<td width="200px"  >- {totalPayment[key]}</td>	
										</tr>
									))}
									<tr>
										<td width="100px" >Total sales</td>
										<td width="100px"  >- {totalAll}</td>	
									</tr>
										
								</tbody>
							</table>
			
						</CCol>
					</CRow>
				</>
			}

		</>
	)
}

export default ListIndex
