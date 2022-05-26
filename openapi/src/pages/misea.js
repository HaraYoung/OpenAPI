/**
 * @filename: misae.js
 * @description: 화면에 실질적으로 보여지는 컴포넌트 (액션함수를 dispatch한다)
 * @author: 최수진(sujin971008@gmail.com),박세영()
 */
import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

/* slice  */
import { getInfo } from "../slices/misaeSlice";

import Spinner from "../components/Spinner";
import Error from "../components/Error";

/* styledComponent */
const Div = styled.div``;
const SelectContainer = styled.div`
  position: sticky;
  top: 0;
  background-color: #fff;
  padding: 10px 0;
  margin: 0;

  select {
    margin-right: 15px;
    font-size: 16px;
    padding: 5px 10px;
  }
`;

const Table = styled.table``;

const Misae = () => {
  React.useEffect(() => console.clear(), []);
  // hook을 통해 slice가 관리하는 상태값 가져오기
  const { items, loading, error } = useSelector((state) => state.getInfo);

  /* Grade 함수1 */
  function Grade(x) {
    let state = null;
    if (x === "1") {
      state = "좋음";
    } else if (x === "2") {
      state = "보통";
    } else if (x === "3") {
      state = "나쁨";
    } else if (x === "4") {
      state = "매우나쁨";
    } else {
      state = "오류";
    }
    return state;
  }
  /* Grade값 함수2 */
  function Emoji(y) {
    let state = null;
    if (y === "1") {
      state = "😀";
    } else if (y === "2") {
      state = "😐";
    } else if (y === "3") {
      state = "😨";
    } else if (y === "4") {
      state = "😷";
    } else {
      state = "오류";
    }
    return state;
  }

  // dispatch 함수 생성
  const dispatch = useDispatch();

  /* 상태값을 '중구'로 기본값을 잡아줌으로써, 페이지가 열리자 마자 정보를 보여주게 된다(앱과 같은 느낌을 주고 싶었다)  */
  const [stationName, setStationName] = React.useState("중구");

  // 컴포넌트가 마운트되면 데이터 조회를 위한 액션함수를 디스패치 함
  React.useEffect(() => {
    dispatch(getInfo());
  }, [dispatch, stationName]);

  /* 자치구 선택 시 Event */
  const onSelectChange = React.useCallback((e) => {
    e.preventDefault();
    // 드롭다운의 입력값 취득
    const current = e.target;
    const value = current[current.selectedIndex].value;
    setStationName((stationName) => value);
  }, []);

  return (
    <>
      <Spinner visible={loading} />

      {/* 검색 조건 드롭다운 박스 */}
      <SelectContainer>
        <select
          name="location"
          onChange={onSelectChange}
          style={{ border: "3px solid #168", borderRadius: "7%" }}
        >
          {/* items의 지역명을 반복 돌려서 option 생성 */}
          <option value="">-- 자치구 선택 --</option>
          {items &&
            items.map((v, i) => {
              return (
                <option value={v.stationName} key={i}>
                  {v.stationName}
                </option>
              );
            })}
        </select>
      </SelectContainer>

      {error ? (
        <Error error={error} />
      ) : (
        <Div>
          <div>
            <h1>서울특별시</h1>
            <h3>{stationName}</h3>
          </div>
          {items &&
            items.map((v, i) => {
              return (
                <div>
                  {/* 통합지수 */}
                  <p>
                    {v.stationName === stationName ? Grade(v.khaiGrade) : ""}
                  </p>
                  {/* 통합지수 이모지 */}
                  <span style={{ fontSize: "120px" }}>
                    {v.stationName === stationName ? Emoji(v.khaiGrade) : ""}
                  </span>
                  {/* 미세먼지 */}
                  <div>
                    {v.stationName === stationName ? (
                      <ul>
                        <li>
                          미세먼지: {v.pm10Value}㎍/㎥
                          {Emoji(v.pm10Grade)}
                        </li>
                        <li>
                          초미세먼지: {v.pm25Value}㎍/㎥
                          {Emoji(v.pm25Grade)}
                        </li>
                      </ul>
                    ) : (
                      <ul></ul>
                    )}
                  </div>
                </div>
              );
            })}
        </Div>
      )}
      {/* 기타 대기오염지수 테이블 */}
      {error ? (
        <Error error={error} />
      ) : (
        <Table>
          {items &&
            items.map((v, i) => {
              return v.stationName === stationName ? (
                <thead>
                  <tr>
                    <th>아황산가스</th>
                    <td>
                      {Grade(v.so2Grade)}
                      {Emoji(v.so2Grade)}
                    </td>
                    <td>{v.so2Value}</td>
                  </tr>
                  <tr>
                    <th>일산화탄소</th>
                    <td>
                      {Grade(v.coGrade)}
                      {Emoji(v.coGrade)}
                    </td>
                    <td>{v.coValue}</td>
                  </tr>
                  <tr>
                    <th>오존</th>
                    <td>
                      {Grade(v.o3Grade)}
                      {Emoji(v.o3Grade)}
                    </td>
                    <td>{v.o3Value}</td>
                  </tr>
                  <tr>
                    <th>이산화질소</th>
                    <td>
                      {Grade(v.no2Grade)}
                      {Emoji(v.no2Grade)}
                    </td>
                    <td>{v.no2Value}</td>
                  </tr>
                </thead>
              ) : (
                <thead></thead>
              );
            })}
        </Table>
      )}
      <div>
        {/* 이거 쓰고 싶은데 왜 안되는지 모르겠어요 ㅜㅜ */}
        <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
        <p>자료 출처: 공공데이터포털을 통한 환경부/한국환경공단 에어코리아 </p>
        <p>
          주의사항: 해당 기관이 제공하는 자료는 “인증을 받지 않은
          실시간자료”이므로 자료 오류 및 표출방식에 따라 값이 다를 수 있다.
        </p>
      </div>
    </>
  );
};

export default React.memo(Misae);
