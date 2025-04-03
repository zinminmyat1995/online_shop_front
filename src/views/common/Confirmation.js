import React from 'react';
import {CRow,CButton,CModal,CModalBody,CButtonToolbar,CModalHeader ,CModalTitle ,CModalFooter,CCol } from '@coreui/react';

const Confirmation = props => {
    return (
        <>
        <CModal
            alignment="center"
            visible={props.show}
            onClose={props.cancel}
            aria-labelledby="VerticallyCenteredExample"
        >
            <CModalBody className="m-body">
                <CRow className="confirm-header mt-3" alignHorizontal="center">
                    <p className="modal-p text-center" style={{fontSize: "20px",fontWeight: "bold"}}>{props.content}</p>
                </CRow>
                <CButtonToolbar className="confirm-body mt-4">
                    <CRow className="width100 text-align-right" >
                        <CCol lg="12">
                            <CButton className="ok-btn" onClick={
                                (props.type === 'sendMail') ? props.sendMailOK :
                                (props.type === 'save') ? props.saveOK :
                                (props.type === 'owsave') ? props.owsaveOK :
                                (props.type === 'confirm') ? props.confirmOK :
                                (props.type === 'update') ? props.updateOK :
                                (props.type === 'delete') ? props.deleteOK :
                                (props.type === 'export') ? props.exportOK :
                                (props.type === 'edit') ? props.editOK :
                                (props.type === 'rehire') ? props.rehireOK :
                                (props.type === 'resign') ? props.resignOK :
                                (props.type === 'active') ? props.activeOK : props.inactiveOK
                            }>{props.okButton}</CButton>
                            <CButton className="cancel-btn" style={{marginLeft: "45px"}} onClick={props.cancel}>{props.cancelButton}</CButton>
                        </CCol>
                    </CRow>
                </CButtonToolbar>
            </CModalBody>
        </CModal>
      </>
    )
}
export default Confirmation



