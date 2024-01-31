import React from "react";
import {
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { cilSettings, cilAccountLogout, cilUser } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

import { useCookies } from "react-cookie";

import { useNavigate } from "react-router-dom";

import { getUserById } from "../../services/user-service";

const AppHeaderDropdown = () => {
  const [cookies, removeCookie] = useCookies(["User"]);

  const [user, setUser] = React.useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    getUserById(cookies.User)
      .then((response) => {
        console.log(response);
        const user = response.data;

        setUser(user);

        if (user.id) {
          console.log(user);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/");
      });
  };

  const logOut = () => {
    removeCookie("User", { path: "/", domain: "localhost" });
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/current-user-detail/" + cookies.User);
  };

  const curPointer = { cursor: "pointer" };

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CIcon icon={cilUser} className="me-2" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Settings
        </CDropdownHeader>
        {user && user.type !== "SUPERUSER" ? (
          <>
            <CDropdownItem style={curPointer} onClick={handleProfile}>
              <CIcon icon={cilUser} className="me-2" />
              Profile
            </CDropdownItem>
            <CDropdownItem href="#">
              <CIcon icon={cilSettings} className="me-2" />
              Settings
            </CDropdownItem>
            <CDropdownDivider />
          </>
        ) : (
          <></>
        )}
        <CDropdownItem style={curPointer} onClick={logOut}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Sing Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
