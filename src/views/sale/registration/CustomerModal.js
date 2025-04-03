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

					<CRow className='width100 mt-3 mb-5'>
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
								<CCol lg="2" className='text-align-center'>
									<CButton color="success" style={{ width: "100px" }} onClick={props.calculateClick}>Calculate</CButton>
								</CCol>
							</>
						}
						
						
					</CRow>


					{props.discountSetting &&
						<CRow className='mt-4 mb-2'>
							<CCol>
								<CIcon icon={cilTags} width={25} height={25} style={{marginLeft: "14px"}}/><span className='discount-span'>{props.discount}% Off</span><span className='discount1-span'> discount is given! </span>
							</CCol>
						</CRow>
					}
					<CRow className={'width100  margin-left-0'}>
						<CAccordion flush >
							<CAccordionItem itemKey={1}>
								<CAccordionHeader>View Shopping List</CAccordionHeader>
								<CAccordionBody>
								<CRow className='shpping-list-table-hearder'>
									<CCol lg="1" className='text-align-center'>
										No
									</CCol>
									<CCol lg="3" className='text-align-center'>
										Product Name
									</CCol>
									<CCol lg="3" className='text-align-center'>
										Price
									</CCol>
									<CCol lg="2" className='text-align-center'>
										Quantity
									</CCol>
									<CCol lg="3" className='text-align-center'>
										Total
									</CCol>
								</CRow>

								{props.listData.map((data,ind)=>{
									num=num+1;
									return(
										<CRow className='shpping-list-table-body' key={ind}>
											<CCol lg="1" className='text-align-center'>
												{num}
											</CCol>
											<CCol lg="3" className='text-align-center'>
												{data.name}
											</CCol>
											<CCol lg="3" className='text-align-center'>
												{data.price}
											</CCol>
											<CCol lg="2" className='text-align-center'>
												{data.count}
											</CCol>
											<CCol lg="3" className='text-align-center'>
												{data.total_price}
											</CCol>
										</CRow>
									)
									
								})}


									<CRow className='shpping-list-table-total' >
										<CCol lg="7" className='text-align-right' style={{fontWeight: "bold"}}>
											Subtotal
										</CCol>
										<CCol lg="2" className='text-align-center' style={{fontWeight: "bold"}}>
											{props.totalCount}
										</CCol>
										<CCol lg="3" className='text-align-center' style={{fontWeight: "bold"}}>
											{props.totalPrice}
										</CCol>
									</CRow>

									<CRow className='shpping-list-table-total '>
										<CCol lg="7" className='text-align-right' style={{fontWeight: "bold"}}>
											Discount
										</CCol>
										<CCol lg="2" className='text-align-center' style={{fontWeight: "bold"}}>
											
										</CCol>
										<CCol lg="3" className='text-align-center' style={{fontWeight: "bold"}}>
											{props.discount > 0 ? props.discount+"%" : "-" }
										</CCol>
									</CRow>

									<CRow className='shpping-list-table-total payment-discount-border-bottom-line'>
										<CCol lg="7" className='text-align-right' style={{fontWeight: "bold"}}>
											Delivery Fee
										</CCol>
										<CCol lg="2" className='text-align-center' style={{fontWeight: "bold"}}>
											
										</CCol>
										<CCol lg="3" className='text-align-center' style={{fontWeight: "bold"}}>
											{props.copyDeliveryService > 0 ? props.copyDeliveryService : "-"}
										</CCol>
									</CRow>

									<CRow className='shpping-list-table-total payment-discount-border-bottom-line2' >
										<CCol lg="7" className='text-align-right' style={{fontWeight: "bold"}}>
											Total
										</CCol>
										<CCol lg="2" className='text-align-center' style={{fontWeight: "bold"}}>
											
										</CCol>
										<CCol lg="3" className='text-align-center' style={{fontWeight: "bold"}}>
											{props.finalTotal}
										</CCol>
									</CRow>

									<CRow className="mt-5 mb-2 text-align-center">
										<CCol>
											<CButton color="success" style={{ width: "100px" }} onClick={props.saveClick}>Save</CButton>
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



