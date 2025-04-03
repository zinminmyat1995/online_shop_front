import React from 'react'
import CIcon from '@coreui/icons-react'
import {

  cilSpeedometer,
  cilStar,
  cilUser,
  cilApps,
  cilChevronDoubleDown,
  cilChevronDoubleUp,
  cilClipboard,
  cilSettings,
  cilCheck,
  cilNotes,
  cilHistory,
  cilTransfer,
  cilArrowThickFromLeft

} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav2 = [
  {
	component: CNavItem,
	name: 'Dashboard',
	to: '/match/dashboard',
	icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
	badge: {
	  color: 'info',
	  // text: 'NEW',
	},
  },
  {
	component: CNavTitle,
	name: 'Deposit And Withdrawal',
  },
  {
    component: CNavItem,
    name: 'Deposit',
    to: '/deposit/register',
    icon: <CIcon icon={cilChevronDoubleDown} customClassName="nav-icon" />,
    },
  {
	component: CNavItem,
	name: 'Withdrawl',
	to: '/withdrawl/register',
	icon: <CIcon icon={cilChevronDoubleUp} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Transfer Deposit',
    to: '/transfer/deposit',
    icon: <CIcon icon={cilArrowThickFromLeft} customClassName="nav-icon" />,
    },
  {
    component: CNavTitle,
    name: 'Match',
  },
  {
    component: CNavItem,
    name: 'Match Registration',
    to: '/match/register',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Match Result',
    to: '/match/result',
    icon: <CIcon icon={cilCheck} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Match List',
    to: '/match/list',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },

  {
    component: CNavTitle,
    name: 'History',
  },
  {
    component: CNavItem,
    name: 'History',
    to: '/match/history',
    icon: <CIcon icon={cilHistory} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Account',
  },
  {
    component: CNavItem,
    name: 'Account List',
    to: '/account/list',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavGroup,
  //   name: 'Icons',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Free',
  //       to: '/icons/coreui-icons',
  //       badge: {
  //         color: 'success',
  //         text: 'NEW',
  //       },
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Flags',
  //       to: '/icons/flags',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Brands',
  //       to: '/icons/brands',
  //     },
  //   ],
  // },
]

export default _nav2
