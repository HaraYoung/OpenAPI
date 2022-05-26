import React from "react";

/* 페이지 로딩이 완료되었음을 감지하기 위한 커스텀 후 */

const useMountedRef = () => {
  // let [boolean, setBoolean] = React.useState(false);

  const mountedRef = React.useRef(false);

  React.useEffect(() => {
    setTimeout(() => {
      // setBoolean(true);
      mountedRef.current = true;
    });
  }, []);
  // return boolean;
  return mountedRef;
};

export default useMountedRef;
