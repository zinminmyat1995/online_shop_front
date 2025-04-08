import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ProductRegistration = React.lazy(() => import('./views/product/registration/RegistrationIndex'))
const ProductList = React.lazy(() => import('./views/product/list/ListIndex'))
const ProductImport = React.lazy(() => import('./views/product/import/ImportIndex'))
const Instock = React.lazy(() => import('./views/warehouse/instock/InstockIndex'))

const UserRegistration = React.lazy(() => import('./views/user/registration/RegistrationIndex'))
const UserList = React.lazy(() => import('./views/user/list/ListIndex'))
const ResetPassword = React.lazy(() => import('./views/user/reset-password/ResetPasswordIndex'))

const NGRegistration = React.lazy(() => import('./views/ng/ng-registration/NGRegistrationIndex'))
const NGList = React.lazy(() => import('./views/ng/ng-list/NGListIndex'))
const NGReturn = React.lazy(() => import('./views/ng/ng-return/NGReturnIndex'))
const NGReturnList = React.lazy(() => import('./views/ng/ng-return-list/NGReturnListIndex'))
const NGArriveRegistration = React.lazy(() => import('./views/ng/ng-arrive/NGArriveIndex'))
const NGArriveList = React.lazy(() => import('./views/ng/ng-arrive-list/NGArriveListIndex'))
const NGDetailInformation = React.lazy(() => import('./views/ng/ng-detail-information/NGDetailInformationIndex'))
const SaleRegistration = React.lazy(() => import('./views/sale/registration/RegistrationIndex'))
const SaleList = React.lazy(() => import('./views/sale/list/ListIndex'))
const Setting = React.lazy(() => import('./views/setting/setting/SettingIndex'))
const Storage = React.lazy(() => import('./views/storage/storage/StorageIndex'))
const History = React.lazy(() => import('./views/history/history/HistoryIndex'))


// const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
// const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// // Base
// const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
// const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
// const Cards = React.lazy(() => import('./views/base/cards/Cards'))
// const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
// const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
// const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
// const Navs = React.lazy(() => import('./views/base/navs/Navs'))
// const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
// const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
// const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
// const Progress = React.lazy(() => import('./views/base/progress/Progress'))
// const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
// const Tables = React.lazy(() => import('./views/base/tables/Tables'))
// const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// // Buttons
// const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
// const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
// const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

// //Forms
// const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
// const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
// const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
// const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
// const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
// const Range = React.lazy(() => import('./views/forms/range/Range'))
// const Select = React.lazy(() => import('./views/forms/select/Select'))
// const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

// const Charts = React.lazy(() => import('./views/charts/Charts'))

// // Icons
// const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
// const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
// const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// // Notifications
// const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
// const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
// const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
// const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

// const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/user', name: 'User', exact: true },
  { path: '/user/register', name: 'Registration', element: UserRegistration },
  { path: '/user/list', name: 'List', element: UserList },
  { path: '/user/reset-password', name: 'Reset Password', element: ResetPassword },
  { path: '/product', name: 'Product', exact: true },
  { path: '/product/registration', name: 'Registration', element: ProductRegistration },
  { path: '/product/list', name: 'List', element: ProductList },
  { path: '/product/import', name: 'Import', element: ProductImport },
  { path: '/product/ng-registration', name: 'NG Registration', element: NGRegistration },
  { path: '/product/ng-list', name: 'NG List', element: NGList },
  { path: '/product/ng-return', name: 'NG Return', element: NGReturn },
  { path: '/product/ng-return-list', name: 'NG Return List', element: NGReturnList },
  { path: '/product/ng-arrive', name: 'NG Arrive Registration', element: NGArriveRegistration },
  { path: '/product/ng-arrive-list', name: 'NG Arrive List', element: NGArriveList },
  { path: '/product/ng-detail-information', name: 'NG Detail Information', element: NGDetailInformation },
  { path: '/sale/registration', name: 'Sale Registration', element: SaleRegistration },
  { path: '/sale/list', name: 'Sale List', exact: true, element: SaleList },
  { path: '/setting', name: 'Setting', exact: true, element: Setting },
  { path: '/warehouse/instock', name: 'Instock', exact: true, element: Instock },
  { path: '/history', name: 'History', exact: true, element: History },
  { path: '/storage', name: 'Storage', exact: true, element: Storage },


  // { path: '/theme', name: 'Theme', element: Colors, exact: true },
  // { path: '/theme/colors', name: 'Colors', element: Colors },
  // { path: '/theme/typography', name: 'Typography', element: Typography },
  // { path: '/base', name: 'Base', element: Cards, exact: true },
  // { path: '/base/accordion', name: 'Accordion', element: Accordion },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  // { path: '/base/cards', name: 'Cards', element: Cards },
  // { path: '/base/carousels', name: 'Carousel', element: Carousels },
  // { path: '/base/collapses', name: 'Collapse', element: Collapses },
  // { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  // { path: '/base/navs', name: 'Navs', element: Navs },
  // { path: '/base/paginations', name: 'Paginations', element: Paginations },
  // { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  // { path: '/base/popovers', name: 'Popovers', element: Popovers },
  // { path: '/base/progress', name: 'Progress', element: Progress },
  // { path: '/base/spinners', name: 'Spinners', element: Spinners },
  // { path: '/base/tables', name: 'Tables', element: Tables },
  // { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  // { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  // { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  // { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  // { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  // { path: '/charts', name: 'Charts', element: Charts },
  // { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  // { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  // { path: '/forms/select', name: 'Select', element: Select },
  // { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  // { path: '/forms/range', name: 'Range', element: Range },
  // { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  // { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  // { path: '/forms/layout', name: 'Layout', element: Layout },
  // { path: '/forms/validation', name: 'Validation', element: Validation },
  // { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  // { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  // { path: '/icons/flags', name: 'Flags', element: Flags },
  // { path: '/icons/brands', name: 'Brands', element: Brands },
  // { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  // { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  // { path: '/notifications/badges', name: 'Badges', element: Badges },
  // { path: '/notifications/modals', name: 'Modals', element: Modals },
  // { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  // { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
