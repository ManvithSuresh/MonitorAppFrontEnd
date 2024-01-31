import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CBadge,
} from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";

function LineChartForCpu({ category, data, isExpanded, onExpand }) {
  const percentageData = data.map((value) => value * 1);

  console.log(
    "Labels:",
    Array.from({ length: 60 }, (_, index) => (index + 1).toString()
    ));
  console.log("Data:", data);

  const maxCpuColor = "danger";
  const minCpuColor = "success";
  const averageCpuColor = "warning";

  return (
    <CCol xs={14} md={12}>
      <CCard>
        <CCardHeader>System CPU utilization</CCardHeader>
        <CCardBody>
          <div className="mb-4 chart-container">
            <CChartLine
              className="mt-3"
              style={{ height: "300px", width: "100%" }}
              data={{
                labels: Array.from({ length: data.length }, (_, index) =>
                  (index + 1).toString()
                ),
                datasets: [
                  {
                    label: category,
                    borderColor: "rgba(12, 107, 221, 0.7)",
                    pointBackgroundColor: "rgba(0, 0, 139, 1)",
                    pointBorderColor: "#fff",
                    borderWidth: 1,
                    data: percentageData,

                    backgroundColor: "rgba(12, 107, 221, 0.1)",
                    fill: true,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: true,
                    },
                    title: {
                      display: true,
                      text: 'Time in (s)', 
                    },
                  },
                  y: {
                    grid: {
                      display: true,
                    },
                    title: {
                      display: true,
                      text: 'CPU Usage in (%)', 
                    },
                    ticks: {
                      callback: function (value) {
                        return value;
                      },
                    },
                  },
                },
              }}
            />
          </div>

          <CRow className="mt-2">
            <CCol>
              <CBadge color={maxCpuColor}>Max CPU Usage</CBadge>
            </CCol>
            <CCol>
              <CBadge color={averageCpuColor}>Average CPU Usage</CBadge>
            </CCol>
            <CCol>
              <CBadge color={minCpuColor}>Min CPU Usage</CBadge>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  );
}

export default LineChartForCpu;
