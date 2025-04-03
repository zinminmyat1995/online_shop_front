import React, { useEffect, useRef ,useState} from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CCard ,
  CCardHeader ,
  CBadge,
  CButton,
  CCardBody 
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilContrast,
  cilEnvelopeOpen,
  cilList,
  cilMenu,
  cilMoon,
  cilX,
} from '@coreui/icons'
import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
// import echo from "../views/common/echo";


const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useState('light')
  const [notifications, setNotifications] = useState([]);
  const [showBox, setShowBox] = useState(false);
  
    const handleBellClick = () => {
      setShowBox(true); // Show the message box
      };
    
      const handleCloseBox = () => {
      setShowBox(false);
      setNotifications([]); // Clear notifications when closing
      };
      
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  // useEffect(() => {
  //   const channel = echo.channel("transactions");

  //   channel.listen("NewTransaction", (event) => {
  //     let name =
  //       event.transaction.code == "10001"
  //         ? "Ko Min"
  //         : event.transaction.code == "10002"
  //         ? "Ko Pe"
  //         : event.transaction.code == "10003"
  //         ? "Ko Zin"
  //         : event.transaction.code == "10004"
  //         ? "Ko Nyi"
  //         : event.transaction.code == "10005"
  //         ? "Ko Lynn"
  //         : "Ko Tahar";

  //     let noti = `${name} exchanged ${event.transaction.amount} USD to ${event.transaction.transaction_amount} MMK by ${event.transaction.pay_rate} rate`;

  //     // Correct way to update state
  //     setNotifications((prevNotifications) => [...prevNotifications, noti]);
  //   });

  //   return () => {
  //     echo.leaveChannel("transactions");
  //   };
  // }, []);

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
    
        <CHeaderNav className="ms-auto">
          <CNavItem>
          


          <div style={{ position: "relative" }}>
              {/* Notification Icon */}
              <CNavLink href="#" style={{ position: "relative", display: "inline-block" }} onClick={handleBellClick}>
              <CIcon icon={cilBell} size="lg" style={{color: "white"}}  />
              {notifications.length > 0 && (
                <CBadge
                color="danger"
                shape="rounded-pill"
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  fontSize: "0.75rem",
                }}
                >
                {notifications.length}
                </CBadge>
              )}
              </CNavLink>

              {/* Message Box */}
              {showBox && (
              <CCard style={{ position: "absolute", top: "40px", right: "0px", width: "300px", zIndex: 10 }}>
                <CCardHeader className="d-flex justify-content-between">
                Notifications
                <CButton color="" size="sm" onClick={handleCloseBox}>
                  <CIcon icon={cilX} />
                </CButton>
                </CCardHeader>
                <CCardBody>
                {notifications.length > 0 ? (
                  notifications.map((noti, index) => <div key={index}>{index+1}) {noti}</div>)
                ) : (
                  <p>No new notifications</p>
                )}
                </CCardBody>
              </CCard>
              )}
            </div>

          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" style={{color: "white"}} />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" style={{color: "white"}} />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
     
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75 white-color" ></div>
          </li>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      {/* <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer> */}
    </CHeader>
  )
}

export default AppHeader
