import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/* 로딩바 컴포넌트 */
// --> https://mhnpd.github.io/react-loader-spinner/
import { Bars } from "react-loader-spinner";

/* 로딩바 뒤에 표시될 반투명 막 */
const TransLayer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  background-color: #0003;
  width: 100%;
  height: 100%;
`;
// visible은 boolean값
const Spinner = ({ visible, color }) => {
  return (
    <div>
      {visible && (
        <TransLayer>
          <Bars
            color={color}
            wrapperStyle={{
              position: "absolute",
              zIndex: 10000,
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />
        </TransLayer>
      )}
    </div>
  );
};

/* 기본값 정의 */
Spinner.defaultProps = {
  visible: false,
  color: "#06f",
  width: 100,
  height: 100,
};

/* 데이터 타입 설정 */
Spinner.propTypes = {
  visible: PropTypes.bool.isRequired,
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};
// React.memo()를 사용하여 함수형 컴포넌트의 리렌더링 성능을 최적화
export default React.memo(Spinner);
