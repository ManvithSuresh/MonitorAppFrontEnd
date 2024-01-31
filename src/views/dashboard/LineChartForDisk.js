// LineChartForDisk.jsx

import React, { useState, useEffect, useRef } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CBadge,
} from "@coreui/react";
import { CChartDoughnut } from "@coreui/react-chartjs";


function LineChartForDisk({ category, data, isExpanded, onExpand, driveInfo }) {
  const [usedMemoryPercentage, setUsedMemoryPercentage] = useState(0);
  const chartRef = useRef();


  const dataInGB = data.map((value) => value / (1024 * 1024 * 1024)); // Convert to GB

  const usedDiskColor = "rgba(220, 53, 69, 0.7)"; 
  const freeDiskColor = "rgba(40, 167, 69, 0.7)"; 

  // Split the data into used and free disk space
  const usedDiskData = dataInGB[0];

  // Check if driveInfo is defined before accessing its properties
  const driveLetter = driveInfo?.driveLetter || 'N/A';
  const totalDiskSpace = dataInGB[1];
  const freeDiskSpace = totalDiskSpace - usedDiskData;

  useEffect(() => {
    // Calculate the percentage of used memory
    const percentage = (usedDiskData / totalDiskSpace) * 100;
    setUsedMemoryPercentage(percentage);
  }, [usedDiskData, totalDiskSpace]);

  useEffect(() => {
    const chart = chartRef.current?.chartInstance;

    if (chart) {
      const ctx = chart.ctx;
      const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

      ctx.clearRect(0, 0, chart.width, chart.height);

      ctx.font = "20px Arial";
      ctx.fillStyle = "#000000"; 
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${usedMemoryPercentage.toFixed(2)}%`, centerX, centerY);
    }
  }, [usedMemoryPercentage]);

  return (
    <CCol xs={14} md={12}>
      <CCard>
        <CCardHeader>Disk Usage</CCardHeader>
        <CCardBody>
          <div className="mb-4 chart-container doughnut-chart-container">
            <CChartDoughnut
              ref={chartRef}
              className="mt-3"
              style={{ height: "300px", width: "100%" }}
              data={{
                labels: category,
                datasets: [
                  {
                    data: [usedDiskData, freeDiskSpace], 
                    backgroundColor: [usedDiskColor, freeDiskColor],
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                cutout: "70%",
              }}
            />
          </div>
          <CRow className="mt-2">
            <CCol>
              <CBadge color={usedDiskColor}>Used Disk Space</CBadge>
            </CCol>
            <CCol>
              <CBadge color={freeDiskColor}>Free Disk Space</CBadge>
            </CCol>
          </CRow>
          <CRow className="mt-2">
            <CCol>
              <CBadge color="primary">{`Drive Letter: ${driveLetter}`}</CBadge>
            </CCol>
            <CCol>
              <CBadge color="warning">{`Total: ${totalDiskSpace.toFixed(2)} GB`}</CBadge>
            </CCol>
            <CCol>
              <CBadge color="danger">{`Used: ${usedDiskData.toFixed(2)} GB`}</CBadge>
            </CCol>
            <CCol>
              <CBadge color="success">{`Free: ${freeDiskSpace.toFixed(2)} GB`}</CBadge>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  );  
}

export default LineChartForDisk;
