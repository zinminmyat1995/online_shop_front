import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'

const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="primary"
          value={
            <>
              26K{' '}
              <span className="fs-6 fw-normal">
                (-12.4% <CIcon icon={cilArrowBottom} />)
              </span>
              
            </>
          }
          title={
            <>
              Users
              <div className="fs-6 mt-2">Additional text under the title</div>
            </>
          }
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
            color="primary"
            value={
              <>
                26K{' '}
                <span className="fs-6 fw-normal">
                  (-12.4% <CIcon icon={cilArrowBottom} />)
                </span>
                
              </>
            }
            title={
              <>
                Users
                <div className="fs-6 mt-2">Additional text under the title</div>
              </>
            }
          />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
            color="primary"
            value={
              <>
                26K{' '}
                <span className="fs-6 fw-normal">
                  (-12.4% <CIcon icon={cilArrowBottom} />)
                </span>
                
              </>
            }
            title={
              <>
                Users
                <div className="fs-6 mt-2">Additional text under the title</div>
              </>
            }
          />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="primary"
          value={
            <>
              26K{' '}
              <span className="fs-6 fw-normal">
                (-12.4% <CIcon icon={cilArrowBottom} />)
              </span>
                
            </>
          }
          title={
            <>
              Users
              <div className="fs-6 mt-2">Additional text under the title</div>
            </>
          }
        />
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
