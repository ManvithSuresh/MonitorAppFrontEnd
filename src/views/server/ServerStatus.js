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
  getServerStatusById,
  getServerHourlyStatusById,
} from "../../services/server-service";
import { useNavigate } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import {
  CChartBar,
  CChartBubble,
  CChartLine,
  CChart,
} from "@coreui/react-chartjs";
import { cilArrowTop, cilOptions } from "@coreui/icons";

function ServerStatus() {
  const navigate = useNavigate();
  const params = useParams();
  const serverId = params.serverId;

  const [server, setServer] = useState({});
  const [name, setName] = useState("");
  const [host, setHost] = useState("");
  const [port, setPort] = useState("");

  const [labels, setLabels] = useState([]);
  const [durations, setDurations] = useState([]);

  useEffect(() => {
    getServerStatus();
  }, []);

  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const getServerStatus = () => {
    if (serverId) {
      getServerStatusById(serverId)
        .then((response) => {
          const serverStatusData = response.data ? response.data : {};
          const serverData = serverStatusData.server
            ? serverStatusData.server
            : {};
          setServer(serverData);
          setName(serverData.name);
          setHost(serverData.host);
          setPort(serverData.port);
        })
        .catch((error) => {
          console.log(error);
        });

      getServerHourlyStatusById(serverId)
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
            <h4>Server Details</h4>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Down Time of the Server on a Bar Chart
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

export default ServerStatus;
