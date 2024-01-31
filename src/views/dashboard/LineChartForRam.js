import { CCard, CCardBody, CCardHeader, CCol, CRow, CBadge } from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";

function LineChartForRam({ category, data }) {
  const dataInGB = data.map((value) => {
    const numericValue = parseFloat(value);
    return !isNaN(numericValue) ? (numericValue / (1024 * 1024 * 1024)).toFixed(4) : null;
  });

  const maxRamColor = "danger";
  const minRamColor = "success";
  const averageRamColor = "warning";

  return (
    <CCol xs={14} md={12}>
      <CCard>
        <CCardHeader>System Ram Usage</CCardHeader>
        <CCardBody>
          <div className="mb-4 chart-container">
            <CChartLine
              className="mt-3"
              style={{ height: '300px', width: '100%' }}
              data={{
                labels: Array.from({ length: data.length }, (_, index) => (index + 1).toString()),
                datasets: [
                  {
                    label: category,
                    borderColor: 'rgba(111, 67, 214, 0.7)',
                    pointBackgroundColor: 'rgba(69, 14, 199, 0.7)',
                    pointBorderColor: '#fff',
                    backgroundColor: 'rgba(187, 158, 255, 0.7)',
                    borderWidth: 1,
                    data: dataInGB,
                    fill: true,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Time (s)',
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Memory Usage (GB)',
                    },
                    max: 8,  // Set max y-axis value to 8GB
                    min: 0,  // Set min y-axis value to 0GB
                    ticks: {
                      stepSize: 1,  // Set step size for y-axis ticks
                      callback: function (value) {
                        return value + 'GB';
                      },
                    },
                  },
                },
              }}
            />
          </div>
          <CRow className="mt-2">
            <CCol>
              <CBadge color={maxRamColor}>Max Ram Usage</CBadge>
            </CCol>
            <CCol>
              <CBadge color={averageRamColor}>Average Ram Usage</CBadge>
            </CCol>
            <CCol>
              <CBadge color={minRamColor}>Min Ram Usage</CBadge>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  );
}

export default LineChartForRam;
