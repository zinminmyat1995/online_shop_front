import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUser,
  cilApps,
  cibMicrosoft,
  cilCart,
  cilXCircle,
  cilSettings,
  cilHome,
  cilHistory,
  cilChartLine,
  cilTransfer,
  cilArrowRight

} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      // text: 'NEW',
    },
  },

  {
    component: CNavTitle,
    name: 'Investment',
  },
  {
    component: CNavItem,
    name: 'Investment Registration',
    to: '/investment/register',
    icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
  },


  {
    component: CNavTitle,
    name: 'Rate',
  },
  {
    component: CNavItem,
    name: 'Rate Registration',
    to: '/rate/register',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },

  {
    component: CNavTitle,
    name: 'Transaction',
  },
  {
    component: CNavItem,
    name: 'Transaction',
    to: '/transaction/register',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Transaction List',
    to: '/transaction/list',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Transfer Currency',
    to: '/transaction/transfer',
    icon: <CIcon icon={cilTransfer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Sale Currency',
    to: '/transaction/sale',
    icon: <CIcon icon={cilArrowRight} customClassName="nav-icon" />,
  },

  {
    component: CNavTitle,
    name: 'History',
  },
  {
    component: CNavItem,
    name: 'History',
    to: '/history',
    icon: <CIcon icon={cilHistory} customClassName="nav-icon" />,
  },

  // {
  //   component: CNavTitle,
  //   name: 'User',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Registration',
  //   to: '/user/register',
  //   icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'List',
  //   to: '/user/list',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Reset Password',
  //   to: '/user/reset-password',
  //   icon: <CIcon icon={cilApps} customClassName="nav-icon" />,
  // },
  {
    component: CNavTitle,
    name: 'Storage',
  },
  {
    component: CNavItem,
    name: 'Database Storage',
    to: '/storage',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },

  // {
  //   component: CNavTitle,
  //   name: 'Setting',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Setting',
  //   to: '/setting',
  //   icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  // },



  

]

export default _nav
