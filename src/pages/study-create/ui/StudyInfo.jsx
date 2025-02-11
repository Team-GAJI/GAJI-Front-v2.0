import React, { useState, useRef } from "react";
import styled from "styled-components";
// import ThumbNailImg from "../../../assets/images/studyDetail/thumbNailImg.png";
import GrayLogo from "../../../assets/logos/grayLogo.svg?react";
import StudyData from "./StudyData";
import { useDispatch, useSelector } from "react-redux";
import {
  setName,
  setPeopleMaximum,
  setThumbnailUrl,
  setPrivate,
} from "../../../redux/slice/study/studyCreateSlice";
import StudyCreateSelectBox from "./StudyCreateSelectBox";

const StudyInfo = () => {
  const [isMinWarningVisible, setIsMinWarningVisible] = useState(false);
  const [isMaxWarningVisible, setIsMaxWarningVisible] = useState(false);
  const [lengthCount, setLengthCount] = useState(0);
  const [styledHr, setStyledHr] = useState(false);
  const [isOn, setIsOn] = useState(true);
  const [imgFile, setImgFile] = useState("");

  // Redux 관리
  const dispatch = useDispatch();
  const { name, peopleMaximum } = useSelector((state) => state.studyCreate);

  // 제목 입력
  const handleTitleChange = (e) => {
    dispatch(setName(e.target.value));
    setLengthCount(e.target.value.length);
  };

  // 인원수 카운터
  const increaseCount = () => {
    if (peopleMaximum === 100) {
      setIsMaxWarningVisible(true);
      const timer = setTimeout(() => setIsMaxWarningVisible(false), 3000);
      return () => clearTimeout(timer); // 3초후 자동으로 취소
    } else {
      dispatch(setPeopleMaximum(peopleMaximum + 1));
    }
    setIsMinWarningVisible(false);
  };

  const decreaseCount = () => {
    if (peopleMaximum === 1) {
      setIsMinWarningVisible(true);
      const timer = setTimeout(() => setIsMinWarningVisible(false), 3000);
      return () => clearTimeout(timer); // 3초후 자동으로 취소
    } else {
      dispatch(setPeopleMaximum(peopleMaximum - 1));
    }
    setIsMaxWarningVisible(false);
  };

  // 제목 하단바 색상 관리
  const handlePurpleHr = () => setStyledHr(true);
  const handleGrayHr = () => setStyledHr(false);

  // 이미지 업로드 input의 onChange
  const imgRef = useRef();
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
    if (file) {
      // 보통 파일 업로드 후, 서버에서 받은 URL을 상태에 저장합니다.
      const url = URL.createObjectURL(file);
      dispatch(setThumbnailUrl(url));
    }
  };

  // 토글 기능
  const handleToggle = () => {
    setIsOn(!isOn);
    dispatch(setPrivate(isOn));
  };
  const onToggle = () => {
    setIsOn(true);
    dispatch(setPrivate(true));
  };
  const offToggle = () => {
    setIsOn(false);
    dispatch(setPrivate(false));
  };

  // 글자 수 오류 방지 함수
  const handleOnInput = (e, maxlength) => {
    const {
      target: { value },
    } = e;
    if (value.length > maxlength) e.target.value = value.substr(0, maxlength);
  };

  return (
    <ComponentWrapper>
      {/* 카테고리, 인원수 영역 */}
      <TopWrapper>
        <StudyCreateSelectBox />
        <TotalMembersWrapper>
          <CounterWrapper>
            <Text>최대 인원수 설정</Text>
            <CountButton onClick={decreaseCount}>-</CountButton>
            <TotalCount>{peopleMaximum}</TotalCount>
            <CountButton onClick={increaseCount}>+</CountButton>
          </CounterWrapper>
          <WanringText isVisible={isMinWarningVisible}>
            인원수는 1명 이상이어야 합니다!
          </WanringText>
          <WanringText isVisible={isMaxWarningVisible}>
            최대 인원수는 100명입니다!
          </WanringText>
        </TotalMembersWrapper>
      </TopWrapper>

      {/* 제목 입력 영역 */}
      <TitleWrapper>
        <InputWrapper>
          <TitleInput
            onFocus={handlePurpleHr}
            onBlur={handleGrayHr}
            onChange={handleTitleChange}
            value={name}
            placeholder="스터디 명을 입력해주세요"
            maxLength="20"
            onInput={(e) => handleOnInput(e, 20)}
          />
          <TextLength lengthCount={lengthCount}>{lengthCount}/20 자</TextLength>
        </InputWrapper>
        <StyledTitleHr styledHr={styledHr} />
      </TitleWrapper>

      {/* 썸네일 업로드 영역 */}
      <ThumbNailWrapper>
        <Title>대표 이미지</Title>
        <UploadWrapper>
          {/* 업로드 버튼 */}
          <ImageWrapper>
            <FileInputLabel htmlFor="file">이미지 업로드</FileInputLabel>
            <ImageUploadInput
              type="file"
              id="file"
              accept=".jpg, .png"
              onChange={saveImgFile}
              ref={imgRef}
            />
            <ImageText>용량 제한: 232123mb</ImageText>
            <ImageText>파일 형식: jpg, png</ImageText>
          </ImageWrapper>
          {/* 미리보기 */}
          <PreivewWrapper isImgFile={imgFile}>
            <StyledGrayLogo isImgFile={imgFile} />
          </PreivewWrapper>
        </UploadWrapper>
      </ThumbNailWrapper>

      {/* 스터디자료 링크 영역 */}
      <StudyData />

      {/* 공개/비공개 토글 영역 */}
      <ToggleWrapper>
        <OnToggleText onClick={onToggle} isOn={isOn}>
          공개
        </OnToggleText>
        <ToggleBox onClick={handleToggle}>
          <Toggle isOn={isOn}></Toggle>
        </ToggleBox>
        <OffToggleText onClick={offToggle} isOn={isOn}>
          비공개
        </OffToggleText>
      </ToggleWrapper>
    </ComponentWrapper>
  );
};

export default StudyInfo;

/* CSS */
const ComponentWrapper = styled.div`
  padding: 3em 3em 2em 3em;
  box-sizing: border-box;
  border: 1px solid #8e59ff;
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TopWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    gap: 1em;
  }
`;

const TotalMembersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  position: relative;
  width: 49%;
`;

const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const WanringText = styled.div`
  margin-top: 3em;
  color: red;
  font-size: 0.8125em;
  font-weight: bold;
  visibility: ${(props) => (props.isVisible ? "visibility" : "hidden")};
  opacity: ${(props) => (props.isVisible ? "1" : "0")};
  transition: all 0.3s ease;
  position: absolute;
`;

const Text = styled.div`
  margin-right: 2em;
  color: #8e59ff;
  font-size: 0.8125em;
  font-weight: 800;
`;

const CountButton = styled.div`
  border-radius: 30px;
  width: 1.5em;
  height: 1.5em;
  line-height: 1.5em;
  text-align: center;
  background-color: #a2a3b2;
  color: white;
  font-size: 1.2em;
  cursor: pointer;
`;

const TotalCount = styled.div`
  margin: 0 0.5em;
  border: 1px solid lightgray;
  border-radius: 10px;
  width: 3.2694em;
  height: 1.915em;
  line-height: 1.915em;
  text-align: center;
  font-weight: bold;
`;

const TitleWrapper = styled.div`
  margin: 1em 0;
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TitleInput = styled.input`
  border: none;
  border-radius: 10px;
  width: 90%;
  height: 3em;
  background-color: transparent;
  font-size: 0.8125em;
  font-family: "NanumSquareNeo";
  font-weight: bold;
  &:focus {
    outline: none;
  }
  transition: all 0.3s ease;
  &::placeholder {
    color: #a2a3b2;
    font-weight: bold;
  }
  @medai (max-width : 768px) {
    width: 80%;
  }
`;

const TextLength = styled.div`
  width: 10%;
  font-size: 0.9em;
  font-weight: bold;
  text-align: end;
  color: ${(props) => (props.lengthCount >= 20 ? "red" : "#A2A3B2")};
  transition: all 0.3s ease;
  @media (max-width: 768px) {
    width: 20%;
  }
`;

const StyledTitleHr = styled.hr`
  margin: 0;
  border: none;
  height: 1.5px;
  background-color: ${(props) => (props.styledHr ? "#8E59FF" : "#A2A3B2")};
  box-shadow: ${(props) =>
    props.styledHr ? "0 -0.3125em 0.8em rgba(142,89,255,0.5)" : "none"};
  transition: all 0.3s ease;
`;

const ThumbNailWrapper = styled.div`
  width: 100%;
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  margin: 1em 0 0.7em 0;
  color: #8e59ff;
  font-weight: 800;
`;

const UploadWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1em;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #a2a3b2;
  border-radius: 10px;
  width: 50%;
  height: 11.625em;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FileInputLabel = styled.label`
  margin: 1em;
  padding: 0 1em;
  border: 1.2px solid #8e59ff;
  border-radius: 10px;
  height: 2.2308em;
  line-height: 2.2308em;
  text-align: center;
  color: #8e59ff;
  font-size: 0.8125em;
  font-weight: bold;
  cursor: pointer;
`;

const ImageUploadInput = styled.input`
  display: none;
`;

const ImageText = styled.div`
  margin-bottom: 0.3em;
  color: #a2a3b2;
  font-size: 0.6875em;
  font-weight: bold;
`;

const PreivewWrapper = styled.div`
  border: 1px solid #a2a3b2;
  border-radius: 10px;
  width: 40%;
  height: 11.625em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f4f8;
  background-image: ${(props) =>
    props.isImgFile ? `url(${props.isImgFile}` : "none"});
  background-size: cover;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledGrayLogo = styled(GrayLogo)`
  width: 2rem;
  display: ${(props) => (props.isImgFile ? "none" : "flex")};
`;

const ToggleWrapper = styled.div`
  margin-top: 2em;
  display: flex;
  align-items: center;
`;

const OnToggleText = styled.div`
  color: ${(props) => (props.isOn ? "#8E59FF" : "#A2A3B2")};
  font-size: 0.9em;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const OffToggleText = styled.div`
  color: ${(props) => (props.isOn ? "#A2A3B2" : "#8E59FF")};
  font-size: 0.9em;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const ToggleBox = styled.div`
  margin: 0 0.8em;
  border: 1.5px solid #8e59ff;
  border-radius: 10px;
  width: 3.5em;
  height: 1.4375em;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const Toggle = styled.div`
  border-radius: 30px;
  width: 1em;
  height: 1em;
  background-color: #8e59ff;
  position: absolute;
  left: ${(props) => (props.isOn ? "0.2em" : "2.2em")};
  transition: all 0.3s ease-out;
`;
