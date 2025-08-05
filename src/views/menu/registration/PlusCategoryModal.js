import React from 'react';
import {CRow,CButton,CModal,CModalBody,CButtonToolbar,CModalHeader ,CModalTitle ,CModalFooter,CCol,CFormInput } from '@coreui/react';
import Message from "../../common/SuccessError";
const PlusCategoryModal = props => {
	return (
		<>
		<CModal
			alignment="center"
			visible={props.show}
			onClose={props.cancel}
			aria-labelledby="VerticallyCenteredExample"
	
		>
			<CModalBody className="m-body">
					<h5 className="modal-p" style={{fontSize: "20px",fontWeight: "bold"}}>Add Menu Type</h5>
				<hr/>
				<div style={{marginLeft: "30px", marginRight: "30px"}}>
					<Message success={props.success} error={props.error} />
				</div>
				<CButtonToolbar className="confirm-body mt-4">
					<CRow className='width100 mt-3'>
						<CCol lg="5" className='text-align-center'>
							<p className="label">Menu Type</p>
						</CCol>
						<CCol lg="7">
							<CFormInput type="text"   aria-label="sm input example" value={props.addMenuType} onChange={props.addMenuTypeChange} />
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
export default PlusCategoryModal



