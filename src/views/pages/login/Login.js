import React,{useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import ApiPath from "../../common/ApiPath";
import { ApiRequest } from "../../common/ApiRequest";
import Loading from "../../common/Loading"
import Message from "../../common/SuccessError";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState([]); // for error message
  const [success, setSuccess] = useState([]); // for success message
  const [loading, setLoading] = useState(false);  // for loading
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    (async () => {
      localStorage.removeItem("LOGIN_ID");
    })();
  }, []);

  let loginClick =async ()=>{
    let str = [];
    if(code == ""){
      str.push("Please fill code!")
    }

    if(password == ""){
      str.push("Please fill password!")
    }

    if(str.length > 0){
      setError(str);
    }else{
      setError([]);setLoading(true);
      let obj = {
        method: "post",
        url: ApiPath.Login,
        params: {
          "code": code,
          "password": password,
        },
        };
        let response = await ApiRequest(obj);
      
        if (response.flag === false) {
            setLoading(false);
            setError(response.message);
        } else {
        if (response.data.status == "OK") {
            localStorage.setItem('LOGIN_ID', code);
            navigate("/dashboard");
        }else{
          setError([response.data.message]);setLoading(false);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        } 
        }
    }
    }
   

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center login-background-image">
      <Loading start={loading} />
      <CContainer>
        <CRow>
            <CCol md={5} className='login-card-design'>
              <CForm style={{marginTop: "50%"}}>
                  <h1 className='title'>Online Shop</h1>
                  <div style={{marginLeft: "12px",marginRight: "12px"}}>
                    <Message success={success} error={error} />
                  </div>
                  
                  {/* <p className="text-body-secondary">Sign In to your account</p> */}
                  <CInputGroup className="mb-3 mt-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="User Code" autoComplete="username"  value={code} onChange={(e)=>setCode(e.target.value)} />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      value={password} onChange={(e)=>setPassword(e.target.value)} 
                    />
                  </CInputGroup>
                  <CRow className='text-align-center'>
                    <CCol >
                      <CButton  className="px-4 login-button" onClick={loginClick}>
                        Login
                      </CButton>
                    </CCol>
                  </CRow>
                  <CRow className='text-align-center'>
                    <CCol >
                      <CButton color="link" className="px-0 forgot-password-link">
                        Forgot password?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
            </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
