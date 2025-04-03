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
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


const HistoryIndex = () => {
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
				url: ApiPath.HistorySearch,
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
					console.log(response.data.data);
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


	  const tableRef = useRef(null);

	  const handleExportXLSX = () => {
		if (!tableRef.current) return;

		// Create a new workbook and worksheet
		const wb = XLSX.utils.book_new();
		const ws = XLSX.utils.table_to_sheet(tableRef.current);
    
		// 🔹 Set column widths
		ws["!cols"] = [
		  { wch: 15 }, // Column A width
		  { wch: 30 }, // Column B width increased
		  { wch: 30 }, // Column C width increased
		  { wch: 15 }, // Column C width increased
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

		saveAs(data, "History.xlsx");
	  };

	return (
		<>
			<Loading start={loading} />
			<h3>History</h3>
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
				<CCol lg="1" className="text-align-center">
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
				<CCol lg="1" className="text-align-center">
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
				<CCol lg="2" className="text-align-center">
					<CButton className="btn-color" style={{ width: "100px" }} onClick={() => searchClick()}>Search</CButton>
				</CCol>
				<CCol lg="1" className="text-align-center">
					<CButton className="btn-color" style={{ width: "100px" }} onClick={handleExportXLSX}>Export</CButton>
				</CCol>
			</CRow>


			
			{userData.length > 0 &&
				<>
					<CRow className="mt-5">
						<CCol>
							<label className="total-row">Total - {userData.length}  row(s)</label>
						</CCol>
					</CRow>
					<div className='table-responsive ' ref={tableRef}>
						<table className='table history-table'>
							<thead className="text-center">
								<tr>
									<th className="custom-header" style={{verticalAlign: "middle"}} width="60px" >No</th>
									<th className="custom-header" style={{verticalAlign: "middle"}} width="200px">Status</th>
									<th className="custom-header" style={{verticalAlign: "middle"}} width="300px">Note</th>
									<th className="custom-header" style={{verticalAlign: "middle"}} width="200px">Date</th>
								</tr>
							</thead>
							<tbody className="text-center">
							{userData.map((item, index) => {
								return(
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{item.type == 1? "Investment Registration" : (item.type == 2? "Transaction Deletion" : ( item.type == 3? "Transfer Currency" : "Sale Currency" ))}</td>
										<td>{item.note}</td>
										<td>{formatDate(item.updated_at)}</td>
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

export default HistoryIndex
