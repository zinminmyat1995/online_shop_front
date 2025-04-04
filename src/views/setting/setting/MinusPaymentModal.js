import React from 'react';
import {CRow,CButton,CModal,CModalBody,CButtonToolbar,CModalHeader ,CModalTitle ,CModalFooter,CCol,CFormSelect  } from '@coreui/react';
import Message from "../../common/SuccessError";

const MinusPaymentModal = props => {
	return (
		<>
		<CModal
			alignment="center"
			visible={props.show}
			onClose={props.cancel}
			aria-labelledby="VerticallyCenteredExample"
			size='lg'
		>
			<CModalBody className="m-body">
					<h5 className="modal-p" style={{fontSize: "20px",fontWeight: "bold"}}>Remove Payment</h5>
				<hr/>
				<div style={{marginLeft: "30px", marginRight: "30px"}}>
					<Message success={props.success} error={props.error} />
				</div>
			
				<CButtonToolbar className="confirm-body mt-4">
					<CRow className='width100 mt-3'>
						<CCol lg="5" className='text-align-center'>
							<p className="label">Product Category</p>
						</CCol>
						<CCol lg="7">
							<CFormSelect className="mb-3"  style={{width: "87%"}} value={props.deletedPaymentID} onChange={props.removePaymentChange}>
								<option  value=""></option>
									{props.paymentData.length> 0 &&
											props.paymentData.map((data,ind)=>{
											return(
												<option value={data.name} key={ind}>{data.name}</option>
											)
										})
									}
							</CFormSelect>
						</CCol>
					</CRow>

					<CRow className="width100 text-align-right mt-4" >
						<CCol lg="12">
							<CButton className="ok-btn" onClick={props.saveOK }>{props.okButton}</CButton>
							<CButton className="cancel-btn" style={{marginLeft: "45px"}} onClick={props.cancel}>{props.cancelButton}</CButton>
						</CCol>
					</CRow>
				</CButtonToolbar>
			</CModalBody>
		</CModal>
	  </>
	)
}
export default MinusPaymentModal



