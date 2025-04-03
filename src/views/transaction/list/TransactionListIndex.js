import React, { useState, useEffect,useRef } from "react";
import {
	CButton,
	CFormSelect,
	CCol,
	CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Confirmation from "../../common/Confirmation";
import Message from "../../common/SuccessError";
import ApiPath from "../../common/ApiPath";
import { ApiRequest } from "../../common/ApiRequest";
import { dateFormatChange2, dateFormatChange1,dateFormatChange4   } from "../../common/CommonValidation"
import {
	cilTrash,
} from '@coreui/icons'
import Loading from "../../common/Loading"
import DatePicker  from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import { validateIntegerOnly } from "../../common/CommonValidation";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const TransactionListIndex = () => {
	const [error, setError] = useState([]); // for error message
	const [success, setSuccess] = useState([]); // for success message
	const [fromDate, setFromDate] = useState(dateFormatChange2(new Date()));
	const [toDate, setToDate] = useState(dateFormatChange2(new Date()));
	const [admin, setAdmin ] = useState("");
	const [adminData, setAdminData ] = useState([]);
	const [currency, setCurrency] = useState("");
	const [mainData, setMainData] = useState([])
	const [copyData, setCopyData] = useState([]);
	const [deletedID, setDeletedID ] = useState("");
	const [type, setType] = useState(""); //
	const [show, setShow] = useState(false); // 
	const [content, setContent] = useState(""); // 
	const [loading, setLoading] = useState(false);  // for loading
	const [deletedData, setDeletedData ] = useState([]);
	const [loginID , setLoginID ] = useState(localStorage.getItem('LOGIN_ID'));
	const [role , setRole ] = useState(localStorage.getItem('ROLE'));

	useEffect(() => {
		(async () => {
			if(localStorage.getItem("LOGIN_ID") == undefined){
				window.location.href="/login";
			}
			setLoading(true);
			await getAdmin();
			await searchClick();
		})();
	}, []);

	let getAdmin =async ()=>{
		setError([]); setSuccess([]);
		setLoading(true);
		let object = {
			url: ApiPath.SearchAdmin,
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
				setAdminData(response.data.data);setLoading(false);
			} else {
				setError([response.data.message]); setSuccess([]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
	}

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
				url: ApiPath.TransactionList,
				method: 'get',
				params: {
					"code": admin,
					"rate_type": currency,
					"from_date": dateFormatChange4(fromDate),
					"to_date": dateFormatChange4(toDate),
					"login_id": loginID
				}
			}

			let response = await ApiRequest(object);
			if (response.flag === false) {
				setError([response.message[0]]); setMainData([]); setLoading(false);
			} else {
				if (response.data.status === 'OK') {
					setMainData(response.data.data);setCopyData(response.data.data);setLoading(false);setDeletedData([]);setDeletedID("");
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
			url: ApiPath.TransactionList,
			method: 'get',
			params: {
				"code": admin,
				"rate_type": currency,
				"from_date": dateFormatChange4(fromDate),
				"to_date": dateFormatChange4(toDate),
				"login_id": loginID
			}
		}

		let response = await ApiRequest(object);
		if (response.flag === false) {
			setMainData([]); setLoading(false);
		} else {
			if (response.data.status === 'OK') {
				setMainData(response.data.data);setCopyData(response.data.data);setLoading(false);setDeletedData([]);setDeletedID("");
			} else {
				setError([response.data.message]);
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
			url: ApiPath.TransactionDelete,
			method: 'delete',
			params: {
				"login_id": loginID,
				"id": deletedID
			}
		}

		let response = await ApiRequest(object);
		if (response.flag === false) {
			setError([response.message[0]]); tempSearchClick();  setLoading(false);
		} else {
			if (response.data.status === 'OK') {
				tempSearchClick();
				setSuccess([response.data.message]);setError([]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			} else {
				setError([response.data.message]); setSuccess([]);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
	}
	
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');
		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	};


	let deleteClick = (id,no) => {
		setError([]); setSuccess([]);setLoading(false);setType("delete");setDeletedID(id);
		setShow(true);setContent(`Are you sure want to delete no ${no+1}?`);
	}


	const tableRef = useRef(null);

	const handleExportXLSX = () => {
	  if (!tableRef.current) return;

	  // Create a new workbook and worksheet
	  const wb = XLSX.utils.book_new();
	  const ws = XLSX.utils.table_to_sheet(tableRef.current);
  
	  // 🔹 Set column widths
	  ws["!cols"] = [
		{ wch: 5 }, 
		{ wch: 15 }, 
		{ wch: 15 },
		{ wch: 15 }, 
		{ wch: 15 }, 
		{ wch: 20 }, 
		{ wch: 18 },
		{ wch: 18 }, 
		{ wch: 18 }, 
		{ wch: 15 }
	  ];

		// 🔹 Apply Header Styles (Works only with `cellStyles: true`)
		const headerStyle = {
		  fill: { fgColor: { rgb: "FFFF00" } }, // Yellow background
		  font: { bold: true, color: { rgb: "000000" } }, // Bold text, black color
		  alignment: { horizontal: "center", vertical: "center" }, // Center align
		};

		// Manually apply styles to header cells
		const headerCells = ["A1", "B1", "C1"];
		headerCells.forEach((cell) => {
		  if (!ws[cell]) return;
		  ws[cell].s = headerStyle; // Apply style
		});

	  // Append the worksheet to the workbook
	  XLSX.utils.book_append_sheet(wb, ws, "History");

	  // Convert to XLSX and trigger download
	  const excelBuffer = XLSX.write(wb, {
		bookType: "xlsx",
		type: "array",
		cellStyles: true, // Ensure styles are applied
	  });

	  const data = new Blob([excelBuffer], {
		type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	  });

	  saveAs(data, `TransactionList[${dateFormatChange4(fromDate)}->${dateFormatChange4(toDate)}].xlsx`);
	};


	return (
		<>
			<Loading start={loading} />
			<h3>Transaction List</h3>
			<hr />
			<Confirmation
				show={show}
				content={content}
				type={type}
				saveOK={saveOK}
				deleteOK={deleteOK}
				okButton={"OK"}
				cancel={() => setShow(false)}
				cancelButton={"Cancel"}
			/>
			<Message success={success} error={error} />
			<CRow className="mt-5">
				<CCol lg="1" className="text-align-right">
					<p className="label">Date</p>
				</CCol>
				
				<CCol lg="4" style={{display: "flex"}}>
					<DatePicker
						selected={fromDate}
						onChange={(date) => setFromDate(date)}
						dateFormat="yyyy/MM/dd"
						placeholderText="Select a date"
						className="date-picker-css"
					  />
					<DatePicker
						selected={toDate}
						onChange={(date) => setToDate(date)}
						dateFormat="yyyy/MM/dd"
						placeholderText="Select a date"
						className="date-picker-css"
					  />
				</CCol>
				
				<CCol lg="1" className="text-align-right">
					<p className="label">Admin</p>
				</CCol>
				<CCol lg="2">
					<CFormSelect className="mb-3" value={admin}  onChange={(e)=>setAdmin(e.target.value)}>
						<option  value=""></option>
						{adminData.length > 0 &&
								adminData.map((data, ind) => {
								return (
									<option value={data.code} key={ind}>{data.name}</option>
								)
							})
						}
					</CFormSelect>
				</CCol>

				<CCol lg="1" className="text-align-right">
					<p className="label">Currency</p>
				</CCol>
				<CCol lg="2">
					<CFormSelect className="mb-3" value={currency}  onChange={(e)=>setCurrency(e.target.value)}>
						<option  value=""></option>
						<option  value="1">USD -> MMK</option>
						<option  value="2">MMK -> USD</option>
						<option  value="3">USD -> Baht</option>
						<option  value="4">Baht -> USD</option>
						<option  value="5">MMK -> Baht</option>
						<option  value="6">Baht -> MMK</option>
					</CFormSelect>
				</CCol>
			</CRow>

			<CRow  className="mt-5 text-align-center">
				<CCol lg="4">
				</CCol>
				<CCol lg="2">
					<CButton className="btn-color" style={{ width: "100px" }} onClick={() => searchClick()}>Search</CButton>
				</CCol>
				<CCol lg="1" className="text-align-center">
					<CButton className="btn-color" style={{ width: "100px" }} onClick={handleExportXLSX}>Export</CButton>
				</CCol>
			</CRow>
		
			{mainData .length > 0 &&
				<>
					<CRow className="mt-5">
						<CCol>
							<label className="total-row">Total - {mainData .length}  row(s)</label>
						</CCol>
					</CRow>
					<div className='table-responsive tableFixHead'  ref={tableRef}>
						<table className='table transaction-list-table'>
							<thead className="text-center">
								<tr>
									<th className="custom-header" style={{verticalAlign: "middle"}} width="60px" >No</th>
									<th className="custom-header" style={{verticalAlign: "middle"}} width="150px">Admin</th>
									<th className="custom-header" style={{verticalAlign: "middle"}} width="200px">Currency</th>
									<th className="custom-header" style={{verticalAlign: "middle"}} width="170px">Pay Rate</th>
									<th className="custom-header" style={{verticalAlign: "middle"}} width="230px">Customer Name</th>
									<th className="custom-header" style={{verticalAlign: "middle"}} width="230px">Customer Account</th>
									<th className="custom-header" style={{verticalAlign: "middle"}} width="200px">Amount</th>
									<th className="custom-header" style={{verticalAlign: "middle"}} width="200px">Transaction Amount</th>
									<th className="custom-header" style={{verticalAlign: "middle"}} width="230px">Transaction No</th>
									<th className="custom-header" style={{verticalAlign: "middle"}} width="170px">Date</th>
									<th className="custom-header" style={{verticalAlign: "middle"}} width="110px">Action</th>
								</tr>
							</thead>
							<tbody className="text-center">
							{mainData .map((item, index) => {
								return(
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{item.admin_name}</td>
										<td>{item.rate_type == 1? "USD -> MMK" : ( item.rate_type == 2? "MMK -> USD" : ( item.rate_type == 3? "USD -> THB" : ( item.rate_type == 4? "THB -> USD" : ( item.rate_type == 5? "MMK -> THB" : "THB -> MMK" ) ) ) )}</td>
										<td>{item.pay_rate}</td>
										<td>{item.customer_name}</td>
										<td>{item.customer_acc}</td>
										<td>
											{item.amount}{(item.rate_type == 1 || item.rate_type == 3)? `USD` : ((item.rate_type == 2 || item.rate_type == 5)? `MMK`  : `THB` )}
										</td>
										<td>{(item.rate_type == 2 || item.rate_type == 4)? `${item.transaction_amount}USD` : ((item.rate_type == 1 || item.rate_type == 6)? `${Math.floor(item.transaction_amount)}MMK`  : `${Math.floor(item.transaction_amount)}THB` )}</td>
										<td>{item.transaction_no}</td>
										<td>{formatDate(item.updated_at)}</td>
									
										<td>
										{role < 2 &&
											<CIcon  icon={cilTrash}  onClick={()=>deleteClick(item.id,index)}  />
										}
										{role > 1 && item.code == loginID &&
												<CIcon  icon={cilTrash}  onClick={()=>deleteClick(item.id,index)}  />
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

export default TransactionListIndex
