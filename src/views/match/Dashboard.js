import React, { useState, useEffect } from "react";
import CIcon from '@coreui/icons-react'
import { cibFacebook, cibTwitter } from '@coreui/icons'
import { CChartLine } from '@coreui/react-chartjs'
import { CCard, CCol, CRow, CWidgetStatsD } from '@coreui/react'
import Message from "../common/SuccessError";
import Loading from "../common/Loading"
import ApiPath from "../common/ApiPath";
import { ApiRequest } from "../common/ApiRequest";
import { currentDate } from "../common/CommonValidation";
import { Card } from "@mui/material";

const Dashboard = () => {
  const [error, setError] = useState([]); // for error message
  const [success, setSuccess] = useState([]); // for success message
  const [loading, setLoading] = useState(false);  // for loading
  const [deposit, setDeposit ] = useState("0");
  const [withdraw, setWithdraw ] = useState("0");
  const [kpay, setKPay ] = useState("0");
  const [withdrawData, setWithdrawData ] = useState([]);
  const [remainData, setRemainData ] = useState([]);
  const [loginID , setLoginID ] = useState(localStorage.getItem('LOGIN_ID'));

  useEffect(() => {
    (async () => {
      if(localStorage.getItem("LOGIN_ID") == undefined){
        window.location.href="/login";
      }
      setLoading(true);
      await getData();
      await getRemainData();
      await getWithdrawData();
    })();
  }, []);
  

  let getData =async ()=>{
    let object = {
      url: ApiPath.DashboardDepositWithdraw,
      method: 'get',
      params: {
        "login_id": loginID
      }
    }
	
    let response = await ApiRequest(object);

    if (response.flag === false) {
      setError([]); setSuccess([]);
    } else {
      if (response.data.status === 'OK') {
        setWithdraw(response.data.data['withdraw']);
        setDeposit(response.data.data['deposit']);
        setKPay(response.data.data['kpay'])
 
      } else {
        setError([]); setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
  }

  let getRemainData =async ()=>{
    let object = {
      url: ApiPath.DashboardGetRemain,
      method: 'get',
      params: {
        "login_id": loginID
      }
    }
	
    let response = await ApiRequest(object);

    if (response.flag === false) {
      setError([]); setSuccess([]); setLoading(false);
    } else {
      if (response.data.status === 'OK') {
        setRemainData(response.data.data);
      } else {
        setError([]); setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
  }

  let getWithdrawData =async ()=>{
    let object = {
      url: ApiPath.DashboardWithdraw,
      method: 'get',
      params: {
        "login_id": loginID
      }
    }
	
    let response = await ApiRequest(object);

    if (response.flag === false) {
      setError([]); setSuccess([]); setLoading(false);
    } else {
      if (response.data.status === 'OK') {
        setWithdrawData(response.data.data);
        setLoading(false);
      } else {
        setError([]); setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
  }

  return (
    <>
      <Loading start={loading} />
      <Message success={success} error={error} />
      <CRow>
        <CCol xs={4}>
            <CWidgetStatsD
              className="mb-3 account-card-header1 card-shadow"
              icon={<label>Deposit</label>}
              values={[
                { value: `${deposit == ""? 0 : deposit}` }
              ]}

            />
        </CCol>
        <CCol xs={4}>
          <CWidgetStatsD
                className="mb-3 account-card-header3 card-shadow"
                icon={<label>KPAY</label>}
                values={[
                  { value: `${kpay == ""? 0 : kpay}` }
                ]}

              />
        </CCol>
        <CCol xs={4}>
          <CWidgetStatsD
                className="mb-3 account-card-header2 card-shadow"
                icon={<label>Withdrawl</label>}
                values={[
                  { value: `${withdraw == ""? 0 : withdraw}` }
                ]}

              />
        </CCol>
      
      </CRow>

      {remainData.length > 0 &&
        <>
          <CRow className="mt-3">
            <CCol>
                <h4>Remain Balance</h4>
            </CCol>
          </CRow>
          <CRow className="">
                  {remainData.map((data, ind) => {
                      return (
                        <CCol lg="2" key={ind} className="mt-3">
                          <Card className="rate-card">
                            <CRow className="rate-card-row1">
                              <CCol style={{marginTop: "12px", fontSize: "18px"}}> 
                                {data.account_name}
                              </CCol>
                            </CRow>
                            <CRow className="account-rate-card-row2-dashboard">
                              <CCol className="rate-card-row2-col-dashboard"> 
                                <div className="content">
                                  <CRow>
                                    <label className="admin-card-body mt-2">Amount - {data.amount}</label>
                                  </CRow>
                                </div>
                              </CCol>
                            </CRow>
                          </Card>
                        </CCol>
                      )
                  })}
          </CRow>
        </>
      }


{withdrawData.length > 0 &&
        <>
          <CRow className="mt-5">
            <CCol>
                <h4>Withdraw</h4>
            </CCol>
          </CRow>
          <CRow className="mb-5">
                  {withdrawData.map((data, ind) => {
                      return (
                        <CCol lg="2" key={ind} className="mt-3">
                          <Card className="rate-card">
                            <CRow className="rate-card3-row1">
                              <CCol style={{marginTop: "12px", fontSize: "18px"}}> 
                                {data.account_name}
                              </CCol>
                            </CRow>
                            <CRow className="account-rate-card-row2-dashboard">
                              <CCol className="rate-card-row2-col-dashboard"> 
                                <div className="content">
                                  <CRow>
                                    <label className="admin-card-body mt-2">Amount - {data.amount}</label>
                                  </CRow>
                                </div>
                              </CCol>
                            </CRow>
                          </Card>
                        </CCol>
                      )
                  })}
          </CRow>
        </>
      }


      {remainData.length > 0 &&
              <>
                <CRow className="mt-5">
                  <CCol>
                      <h4>Depoist</h4>
                  </CCol>
                </CRow>
                <CRow className="mb-5">
                        {remainData.map((data, ind) => {
                            return (
                              <CCol lg="2" key={ind} className="mt-3">
                                <Card className="rate-card">
                                  <CRow className="rate-card2-row1">
                                    <CCol style={{marginTop: "12px", fontSize: "18px"}}> 
                                      {data.account_name}
                                    </CCol>
                                  </CRow>
                                  <CRow className="account-rate-card-row2-dashboard">
                                    <CCol className="rate-card-row2-col-dashboard"> 
                                      <div className="content">
                                        <CRow>
                                          <label className="admin-card-body mt-2">Amount - {data.deposit_amount}</label>
                                        </CRow>
                                      </div>
                                    </CCol>
                                  </CRow>
                                </Card>
                              </CCol>
                            )
                        })}
                </CRow>
              </>
            }


    
      
     
    </>
  )
}

export default Dashboard
