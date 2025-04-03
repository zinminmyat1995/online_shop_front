import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const InvestmentRegistration = React.lazy(() => import('./views/investment/registration/RegistrationIndex'))
const RateRegistration = React.lazy(() => import('./views/rate/registration/RegistrationIndex'))
const Transaction = React.lazy(() => import('./views/transaction/transaction/TransactionIndex'))
const TransactionList = React.lazy(() => import('./views/transaction/list/TransactionListIndex'))
const CurrencyTransfer = React.lazy(() => import('./views/transaction/transfer/TransferIndex'))
const CurrencySale = React.lazy(() => import('./views/transaction/sale/SaleIndex'))
const History = React.lazy(() => import('./views/history/history/HistoryIndex'))


const UserRegistration = React.lazy(() => import('./views/user/registration/RegistrationIndex'))
const UserList = React.lazy(() => import('./views/user/list/ListIndex'))
const ResetPassword = React.lazy(() => import('./views/user/reset-password/ResetPasswordIndex'))
const Setting = React.lazy(() => import('./views/setting/setting/SettingIndex'))
const Storage = React.lazy(() => import('./views/storage/storage/StorageIndex'))


const MatchDashboard = React.lazy(() => import('./views/match/Dashboard'))
const WithdrawRegistration = React.lazy(() => import('./views/match/withdraw/RegistrationIndex'))
const MatchRegistration = React.lazy(() => import('./views/match/match/MatchIndex'))
const MatchResult = React.lazy(() => import('./views/match/result/ResultIndex'))
const DepositRegistration = React.lazy(() => import('./views/match/deposit/RegistrationIndex'))
const MatchList = React.lazy(() => import('./views/match/match-list/MatchListIndex'))
const MatchHistory = React.lazy(() => import('./views/match/history/HistoryIndex'))
const AccountList = React.lazy(() => import('./views/match/account-list/AccountListIndex'))
const TransferDeposit = React.lazy(() => import('./views/match/transfer-deposit/TransferDepositIndex'))

const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/investment/register', name: 'Registration', element: InvestmentRegistration },
  { path: '/rate/register', name: 'Registration', element: RateRegistration },
  { path: '/transaction/register', name: 'Transaction', element: Transaction },
  { path: '/transaction/list', name: 'Transaction List', element: TransactionList },
  { path: '/transaction/transfer', name: ' Transfer Currency', element: CurrencyTransfer },
  { path: '/transaction/sale', name: ' Sale Currency', element: CurrencySale },
  { path: '/history', name: 'History', exact: true, element: History },
  { path: '/storage', name: 'Storage', exact: true, element: Storage },
  { path: '/setting', name: 'Setting', exact: true, element: Setting },

  
  
  { path: '/user', name: 'User', exact: true },
  { path: '/user/register', name: 'Registration', element: UserRegistration },
  { path: '/user/list', name: 'List', element: UserList },
  { path: '/user/reset-password', name: 'Reset Password', element: ResetPassword },


  { path: '/match/dashboard', name: 'Dashboard', element: MatchDashboard },
  { path: '/withdrawl/register', name: 'Registration', element: WithdrawRegistration },
  { path: '/match/register', name: 'Match Registration', element: MatchRegistration },
  { path: '/match/result', name: 'Match Result', element: MatchResult },
  { path: '/deposit/register', name: 'Registration', element: DepositRegistration },
  { path: '/match/list', name: 'Match List', element: MatchList },
  { path: '/match/history', name: 'History', element: MatchHistory },
  { path: '/account/list', name: 'Account List', element: AccountList },
  { path: '/transfer/deposit', name: 'Transfer Deposit', element: TransferDeposit },
  
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  
  
]

export default routes
