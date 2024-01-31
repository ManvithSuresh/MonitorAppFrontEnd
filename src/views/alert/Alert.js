import React from "react";

import { CAlert } from "@coreui/react";

export const Alert = (props) => {

  const [visible, setVisible] = React.useState(props.visible);

  return (
    <>
      <CAlert
        color={props.color}
        dismissible
        visible={visible}
        onClose={() => setVisible(false)}
      >
        {props.message}
      </CAlert>
    </>
  );
};
