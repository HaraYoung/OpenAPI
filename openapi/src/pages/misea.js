import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInfo } from "../slices/misaeSlice";

// import Spinner from "../components/Spinner";
// import Error from "../components/Error";
const Misae = () => {
  React.useEffect(() => console.clear(), []);
  // hook을 통해 slice가 관리하는 상태값 가져오기
  const { items, loading, error } = useSelector((state) => state.getInfo);

  // dispatch 함수 생성
  const dispatch = useDispatch();

  // 컴포넌트가 마운트되면 데이터 조회를 위한 액션함수를 디스패치 함
  React.useEffect(() => {
    dispatch(getInfo());
  }, [dispatch]);

  return loading ? (
    "loading"
  ) : error ? (
    JSON.stringify(error)
  ) : (
    <>
      <h1>data안에 response안에 body안에 items정보들</h1>
      {JSON.stringify(items)}
    </>
  );
};

export default React.memo(Misae);
