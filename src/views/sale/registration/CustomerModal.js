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
					<h5 className="modal-p" style={{fontSize: "20px",fontWeight: "bold"}}>Payment and filling of customer information</h5>
				<hr/>
				<div style={{marginLeft: "30px", marginRight: "30px"}}>
					<Message success={props.success} error={props.error} />
				</div>
					<CRow className='width100 mt-3'>
						<CCol lg="1" className='text-align-center'>
							<p className="label">Name</p>
						</CCol>
						<CCol lg="3">
							<CFormInput type="text"   aria-label="sm input example" value={props.name} onChange={props.nameChange} />
						</CCol>
						<CCol lg="1" className='text-align-center'>
							<p className="label">Phone</p>
						</CCol>
						<CCol lg="3">
							<CFormInput type="text"   aria-label="sm input example" value={props.phone} onChange={props.phoneChange} />
						</CCol>
						<CCol lg="1" className='text-align-center'>
							<p className="label">Payment</p>
						</CCol>
						<CCol lg="3">
							<CFormSelect className="mb-3" value={props.payment}  onChange={props.paymentChange}>
								{props.paymentData.length > 0 &&
										props.paymentData.map((data, ind) => {
										return (
											<option value={data.id} key={ind}>{data.name}</option>
										)
									})
								}
							</CFormSelect>
						</CCol>
					</CRow>

					<CRow className='width100 mt-3 '>
						<CCol lg="1" className='text-align-center'>
							<p className="label">Address</p>
						</CCol>
						<CCol lg="3">
							<CFormTextarea
									feedbackInvalid="Please enter a message in the textarea."
									id="note"
									required
									value={props.address}
									onChange={props.addressChange}
									></CFormTextarea>
						</CCol>
						{props.deliveryServiceSetting &&
							<>
								<CCol lg="1" className='text-align-center'>
									<p className="label">Delivery Fee</p>
								</CCol>
								<CCol lg="3">
									<CFormInput type="text"   aria-label="sm input example" value={props.deliveryService} onChange={props.deliveryServiceChange} />
								</CCol>
							</>
						}
						
						
					</CRow>

					{props.deliveryServiceSetting &&
						<CRow className="mt-2 mb-5 text-align-center">
							<CCol>
								<CButton className="login-button" style={{ width: "100px" }} onClick={props.calculateClick}>Calculate</CButton>
							</CCol>
						</CRow>
					}

					{props.discountSetting &&
						<CRow className='mt-4 mb-2'>
							<CCol>
								<CIcon icon={cilTags} width={25} height={25} style={{marginLeft: "14px"}}/><span className='discount-span'>{props.discount}% Off</span><span className='discount1-span'> discount is given! </span>
							</CCol>
						</CRow>
					}
			
				<CRow className={'width100  margin-left-0 sale-voucher-web'}>
						<CAccordion flush >
							<CAccordionItem itemKey={1}>
								<CAccordionHeader>View Shopping List</CAccordionHeader>
								<CAccordionBody>
									
										<div className='table-responsive tableFixHead'>
											<table className='table sale-voucher-table'>
												<thead className="text-center">
													<tr>
														<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="60px" >No</th>
														<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="150px" >Product Name</th>
														<th className="bg-body-tertiary sale-voucher-table-3" style={{verticalAlign: "middle"}} width="100px" >Price</th>
														<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="80px" >Quantity</th>
														<th className="bg-body-tertiary" style={{verticalAlign: "middle"}} width="120px" >Total</th>
													</tr>
												</thead>
												<tbody className="text-center">
												{props.listData.map((data,ind) => {
													num=num+1;
													return(
														<tr key={ind}>
															<td>{num}</td>
															<td>{data.name}</td>
															<td className=" sale-voucher-table-3">{data.price}</td>
															<td>{data.count}</td>
															<td>{data.total_price}</td>
									
														</tr>
													)})}
												</tbody>
											</table>
										</div>
									

										<table className='mt-2' style={{width: "100%"}}>
											<tbody >
												<tr>
													<td width="120px" >Subtotal</td>
													<td width="80px"  >{props.totalCount}</td>
													<td width="120px" >{props.totalPrice}</td>			
												</tr>	
												<tr>
													<td width="120px">Discount</td>
													<td width="80px" ></td>
													<td width="120px">{props.discount > 0 ? props.discount+"%" : "-" }</td>			
												</tr>	
												<tr>
													<td width="120px">Delivery Fee</td>
													<td width="80px" ></td>
													<td width="120px">{props.copyDeliveryService > 0 ? props.copyDeliveryService : "-"}</td>			
												</tr>		
												<tr style={{borderTop: "1px solid gray"}}>
													<td width="120px">Total</td>
													<td width="80px" ></td>
													<td width="120px">{props.finalTotal}</td>			
												</tr>	
									
											</tbody>
										</table>

										<CRow className="mt-5 mb-2 text-align-center">
											<CCol>
												<CButton className="login-button" style={{ width: "100px" }} onClick={props.saveClick}>Save</CButton>
											</CCol>
										</CRow>


								</CAccordionBody>
							</CAccordionItem>
						</CAccordion>

					</CRow>

		

					<CRow className="width100 text-align-right mt-4" >
						<CCol lg="12">
							<CButton className="ok-btn" onClick={props.saveOK }>{props.okButton}</CButton>
							<CButton className="cancel-btn" style={{marginLeft: "45px"}} onClick={props.cancel}>{props.cancelButton}</CButton>
						</CCol>
					</CRow>
			</CModalBody>
		</CModal>
	  </>
	)
}
export default CustomerModal



