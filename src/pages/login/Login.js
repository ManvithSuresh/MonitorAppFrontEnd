import { React, useState } from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";

import { loginUser } from "../../services/user-service";

import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [validated, setValidated] = useState(false);

  const login = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    const login = { username, password };

    loginUser(login)
      .then((response) => {
        console.log(response);
        const user = response.data;

        if (user.id != null && user.id !== "") {
          setValidated(true);
          // navigate("home");
          navigate("Dashboard")
        }
      })
      .catch((error) => {
        setValidated(false);
        console.log(error);
        showTost("Invalid User Name or Password !!!");
      });
  };

  const showTost = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center"  >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm noValidate validated={validated} className="needs-validation" onSubmit={login}>
                    <h1   >Login</h1>
                    <p className="text-medium-emphasis">
                      Sign In to your account
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CButton 
                       className="px-4" onClick={login}
                      color="danger"
                      style={{ color: 'white' }}
                       >
                        Login
                      </CButton>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
              
                className="text-white  py-4 " 
                style={{ width: "44%"  , backgroundColor : "red"} }
              >
                <CCardBody className="text-center">
                  <div  >
                    <h1 >Monitor Tool</h1>
                    <h3
                   >

                      Hi , Welcome !
                    </h3>  
                    <Link to="/register">

                      {/* <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton> */}
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <ToastContainer />
    </div>
  );
};

export default Login;
