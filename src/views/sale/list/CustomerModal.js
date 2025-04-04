import React from 'react';
import {CRow,CButton,CModal,CModalBody,CFormSelect ,CFormTextarea ,CModalFooter,CCol,CFormInput,CAccordion,CAccordionItem,CAccordionHeader,CAccordionBody } from '@coreui/react';
import Message from "../../common/SuccessError";
import {
	cilTags
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
const CustomerModal = props => {

	let num =0;
	return (
		<>
		<CModal
			alignment="center"
			visible={props.show}
			onClose={props.cancel}
			aria-labelledby="VerticallyCenteredExample"
			size='xl'
		>
			<CModalBody className="m-body">
					<h5 className="modal-p" style={{fontSize: "20px",fontWeight: "bold"}}>List of items purchased by the customer</h5>
				<hr/>
				
			
				<div className='table-responsive tableFixHead'>
					<table className='table sale-list-modal-table'>
						<thead className="text-center">
							<tr>
								<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="60px" >No</th>
								<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="160px">Product Name</th>
								<th className="bg-body-tertiary sale-voucher-table-3" style={{verticalAlign: "middle"}} width="160px">Product Category</th>
								<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="160px">Gender Status</th>
								<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="180px">Country of manufacture</th>
								<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="125px">Price</th>
								<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="115px">Qty</th>
								<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="140px">Total Price</th>
							</tr>
						</thead>
						<tbody className="text-center">
						{props.listData.map((item, index) => {
							return(
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{item.p_name}</td>
									<td className='sale-voucher-table-3'>{item.p_category_name}</td>
									<td>{item.p_gender == 0? "Both" : item.p_gender == 1? "Male" : "Female"}</td>
									<td>{item.p_made_in}</td>
									<td>{item.price}</td>
									<td>{item.qty}</td>
									<td>{item.total_price}</td>
								</tr>
							)})}
								
								
						</tbody>
					</table>
				</div>
		

	
			</CModalBody>
		</CModal>
	  </>
	)
}
export default CustomerModal



