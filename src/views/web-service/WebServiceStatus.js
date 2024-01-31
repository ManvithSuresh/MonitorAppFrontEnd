

import React, { useEffect, useState } from "react";
import {
  CCol,
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
} from "@coreui/react";
import { useParams } from "react-router-dom";

import { getStyle } from "@coreui/utils";

import {
    getMonitorWebserviceHourlyStatusById,
  getMonitorWebServiceStatusById,
} from "../../services/monitor-service/monitor-webservice-status-service";
import { useNavigate } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import {
  CChartBar,
  CChartBubble,
  CChartLine,
  CChart,
} from "@coreui/react-chartjs";
import { cilArrowTop, cilOptions } from "@coreui/icons";

function WebServiceStatus() {
  const navigate = useNavigate();
  const params = useParams();
  const dbId = params.dbId;

  const [database, setDatabase] = useState({});
  const [Name, setName] = useState("");
  const [host, setHost] = useState("");
  const [port, setPort] = useState("");

  const [labels, setLabels] = useState([]);
  const [durations, setDurations] = useState([]);

  useEffect(() => {
    getWebserviceStatus();
  }, []);

  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const getWebserviceStatus = () => {
    if (dbId) {
        getMonitorWebServiceStatusById(dbId)
        .then((response) => {
          const webserviceStatusData = response.data ? response.data : {};
          const webserviceData = webserviceStatusData.database
            ?webserviceStatusData.database
            : {};
          setDatabase(webserviceData);
          setName(webserviceData.name);
          setHost(webserviceData.url);
          
        })
        .catch((error) => {
          console.log(error);
        });

        getMonitorWebserviceHourlyStatusById(dbId)
        .then((response) => {
          let hourlyStatuses = response.data;

          let labels = [];
          let durations = [];
          for (let i = 0; i < hourlyStatuses.length; i++) {
            let date = new Date(hourlyStatuses[i].startTime);
            let fDate = formatDateToYYYYMMDD(date);

            labels.push(
              //hourlyStatuses[i].startTime + " - " + hourlyStatuses[i].endTime
              fDate + " " + hourlyStatuses[i].hour.toString().padStart(2, "0")
            );
            durations.push(hourlyStatuses[i].duration/60);
          }

          setLabels(labels);
          setDurations(durations);
        })
        .catch((err) => {
          console.error("Error Retriving Hourly Status ", err);
        });
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <h4>webservice Details</h4>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Down Time of the webservice on a Bar Chart
            </p>
            <CCol sm={12}>
              <h5>{name}</h5>
              <CChart
                type="bar"
                data={{
                  labels: labels,
                  datasets: [
                    {
                      label: "Down Time in Minutes",
                      backgroundColor: "#f87979",
                      data: durations,
                    },
                  ],
                }}
                labels="Date and Hour"
                options={{
                  plugins: {
                    legend: {
                      labels: {
                        color: getStyle("--cui-body-color"),
                      },
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        color: getStyle("--cui-border-color-translucent"),
                      },
                      ticks: {
                        color: getStyle("--cui-body-color"),
                      },
                    },
                    y: {
                      grid: {
                        color: getStyle("--cui-border-color-translucent"),
                      },
                      ticks: {
                        color: getStyle("--cui-body-color"),
                      },
                    },
                  },
                }}
              />
            </CCol>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default WebServiceStatus;
