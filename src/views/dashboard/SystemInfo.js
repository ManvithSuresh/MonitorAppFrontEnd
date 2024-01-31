import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import React , {useEffect , useState} from 'react'
import LineChartForCpu from './LineChartForCpu';
import { getServers } from '../../services/server-service';
import {
    getCPUInfo,
    getMemoryInfo,
    getdiskInfo,
  } from "../../services/task-manager-service";
import LineChartForRam from './LineChartForRam';
import LineChartForDisk from './LineChartForDisk';
function SystemInfo() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [serverData, setServerData] = useState([]);
    const [cpuData, setCpuData] = useState([]);
    const [expandedChart, setExpandedChart] = useState(null);
    const [ramData, setRamData] = useState([]);
    const [diskData, setDiskData] = useState([]);
    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          setLoading(true);
          const [serversResponse, cpuResponse, ramResponse, diskResponse ] =
            await Promise.all([
              getServers(),
              getCPUInfo(),
              getMemoryInfo(),
              getdiskInfo(),
            ]);

            setServerData(serversResponse.data);
            setCpuData(cpuResponse.data.filter((item) => item !== null));
            setRamData(ramResponse.data.filter((item) => item !== null));
            setDiskData(
              diskResponse.data
                .filter((item) => item !== null)
                .map((item) => ({
                  driveLetter: item.driveLetter,
                  usedDisk: item.usedSpace || 0,
                  freeDisk: item.freeSpace || 0,
                  totalDisk: item.totalSpace || 0,
                }))
            );

        
        } catch (error) {
          console.error(error);
          setError("Error fetching data. Please try again.");
        } finally {
          setLoading(false);
        }
      };
    
      const filteredDiskData = diskData
      .filter((item) => item !== null)
      .reduce((acc, current) => {
        if (!acc.find((drive) => drive.driveLetter === current.driveLetter)) {
          acc.push(current);
        }
        return acc;
      }, []);
  return (
    <>


<CCard>
<CCardHeader>
    <h4>Windows Server Status</h4>
    </CCardHeader>
  <CCardBody>
  <CRow>
        
  <CCol lg="12">
              <LineChartForCpu
                category={serverData.map((server) => `${server.name} (${server.host}) `)}
                data={cpuData.map((item) => item.cpuUsage)}
                isExpanded={expandedChart === 0}
                onExpand={() => handleChartClick(0)}
              />
            </CCol>

<div style={{"width" : "20px"}}>   </div>
            <CCol lg="12">
                  
            <LineChartForRam
              category={serverData.map(
                (server) => `${server.name} (${server.host})`
              )}
              data={ramData.map((item) => (item ? item.usedRam : 0))}
              isExpanded={expandedChart === 1}
              onExpand={() => handleChartClick(1)}
            />
            </CCol>
        </CRow>
  </CCardBody>
</CCard>




{filteredDiskData.map((drive, index) => (
              <LineChartForDisk
                key={index}
                category={serverData.map(
                  (server) =>
                    `${server.name} (${server.host} : ${server.port} )`
                )}
                data={[drive.usedDisk, drive.freeDisk]}
                driveInfo={{ driveLetter: drive.driveLetter }}
                isExpanded={expandedChart === index + 2}
                onExpand={() => handleChartClick(index + 2)}
              />
            ))}

    </>
  )
}

export default SystemInfo
