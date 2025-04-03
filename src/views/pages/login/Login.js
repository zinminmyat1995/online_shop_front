import React,{useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CFormCheck,
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
  const [loginType , setLoginType ] = useState(0);

  useEffect(() => {
    (async () => {
      localStorage.removeItem("LOGIN_ID");
      localStorage.removeItem("ROLE");
      localStorage.removeItem("NAME");
      localStorage.removeItem("LOGIN_TYPE");
    })();
    localStorage.setItem('coreui-free-react-admin-template-theme', 'light');
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
              localStorage.setItem('ROLE', response.data.role);
              localStorage.setItem('NAME', response.data.name);
              if(loginType == 0){
                localStorage.setItem('LOGIN_TYPE', loginType);
                navigate("/dashboard");
              }else{
                localStorage.setItem('LOGIN_TYPE', loginType);
                navigate("/match/dashboard");
              }
              
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
                  <img src="image/login-icon.svg" alt="icon" style={{width: "100%"}} />
                  {/* <h1 className='title'>THE SIX</h1>
                  <h6 className='title2'>Currency Exchange</h6> */}
                  
                  <div style={{marginLeft: "12px",marginRight: "12px"}}>
                    <Message success={success} error={error} />
                  </div>
                  
                  {/* <p className="text-body-secondary">Sign In to your account</p> */}
                  <CInputGroup className="mb-3 mt-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Code" autoComplete="username"  value={code} onChange={(e)=>setCode(e.target.value)} />
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
                  <CRow>
                    <CCol lg="6">
                      <CFormCheck type="radio" name="flexRadioDefault" className="text-color-white" id="flexRadioDefault1" value='0' label="The Six" checked  checked={loginType == 0? "checked" : ""} onChange={(e)=>setLoginType(e.target.value)}/>
                    </CCol>
                    <CCol lg="6">
                      <CFormCheck type="radio" name="flexRadioDefault" className="text-color-white" id="flexRadioDefault2" value='1' label="other" checked={loginType == 1? "checked" : ""}  onChange={(e)=>setLoginType(e.target.value)}/>
                    </CCol>
                  </CRow>
                  <CRow className='text-align-center mt-5'>
                    <CCol >
                      <CButton  className="px-4 login-button" onClick={loginClick}>
                        Login
                      </CButton>
                    </CCol>
                  </CRow>
                  {/* <CRow className='text-align-center'>
                    <CCol >
                      <CButton color="link" className="px-0 forgot-password-link">
                        Forgot password?
                      </CButton>
                    </CCol>
                  </CRow> */}
                </CForm>
            </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
