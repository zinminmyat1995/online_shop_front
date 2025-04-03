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
  const [usd, setUSD ] = useState("0");
  const [mmk, setMMK ] = useState("0");
  const [baht, setBAHT ] = useState("0");
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
    })();
  }, []);


  let getData =async ()=>{
    let object = {
      url: ApiPath.InvestSearch,
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
        setUSD(response.data.data[0]['usd']);
        setMMK(response.data.data[0]['mmk']);
        setBAHT(response.data.data[0]['b']);
      } else {
        setError([]); setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
  }

  let getRemainData =async ()=>{
    let object = {
      url: ApiPath.RemainSearch,
      method: 'get',
      params: {
        "code": "",
        "login_id": loginID
      }
    }
	
    let response = await ApiRequest(object);

    if (response.flag === false) {
      setError([]); setSuccess([]); setLoading(false);
    } else {
      if (response.data.status === 'OK') {
        setRemainData(response.data.data);
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
              className="mb-3 card-header1 card-shadow"
              icon={<img src="image/USD.png" alt="icon" style={{width: "100%"}} />}
             
              values={[
                { value: `${usd} $` }
              ]}
            />
        </CCol>

        <CCol xs={4}>
          <CWidgetStatsD
                className="mb-3 card-header2 card-shadow"
                icon={<img src="image/MMK.png" alt="icon" style={{width: "100%"}} />}
              
                values={[
                  { value: `${mmk} Ks` }
                ]}
              />
        </CCol>

        <CCol xs={4}>
          <CWidgetStatsD
                className="mb-3 card-header3 card-shadow"
                icon={<img src="image/BAHT.png" alt="icon" style={{width: "100%"}} />}
              
                values={[
                  { value: `${baht} ฿` }
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
                        <CCol lg="2" key={ind}>
                          <Card className="rate-card">
                            <CRow className="rate-card-row1">
                              <CCol style={{marginTop: "12px", fontSize: "18px"}}> 
                                {data.admin_name}
                              </CCol>
                            </CRow>
                            <CRow className="rate-card-row2-dashboard">
                              <CCol className="rate-card-row2-col-dashboard"> 
                                <div className="content">
                                  <CRow >
                                    <label className="admin-card-body mt-2">USD - {data.usd}</label>
                                  </CRow>
                                  <CRow>
                                    <label className="admin-card-body mt-2">MMK - {data.mmk}</label>
                                  </CRow>
                                  <CRow>
                                    <label className="admin-card-body mt-2">THB - {data.b}</label>
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
                      <h4>Opening Balance</h4>
                  </CCol>
                </CRow>
                <CRow className="mb-5">
                        {remainData.map((data, ind) => {
                            return (
                              <CCol lg="2" key={ind}>
                                <Card className="rate-card">
                                  <CRow className="rate-card2-row1">
                                    <CCol style={{marginTop: "12px", fontSize: "18px"}}> 
                                      {data.admin_name}
                                    </CCol>
                                  </CRow>
                                  <CRow className="rate-card-row2-dashboard">
                                    <CCol className="rate-card-row2-col-dashboard"> 
                                      <div className="content">
                                        <CRow >
                                          <label className="admin-card-body mt-2">USD - {data.admin_usd}</label>
                                        </CRow>
                                        <CRow>
                                          <label className="admin-card-body mt-2">MMK - {data.admin_mmk}</label>
                                        </CRow>
                                        <CRow>
                                          <label className="admin-card-body mt-2">THB - {data.admin_b}</label>
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
