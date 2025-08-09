import React from "react";
import { useRecoilState } from "recoil";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { recommendFormState } from "../recoil/atoms"; // 경로 맞게 수정

// 날짜 포맷 설정
const datePickerFormat = "YYYY-MM-DD";
const datePickerUtils = {
  format: datePickerFormat,
  parse: (value) => dayjs(value, datePickerFormat, true).toDate(),
};

const MyDatePicker = () => {
  const [recommendForm, setRecommendForm] = useRecoilState(recommendFormState);

  const startDateChange = (date) => {
    const formattedDate = dayjs(date).format(datePickerFormat);
    setRecommendForm((prev) => ({
      ...prev,
      startDate: formattedDate,
    }));
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      dateFormats={datePickerUtils}
    >
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="출발 날짜를 선택해주세요"
          slotProps={{
            textField: {
              size: "small",
            },
          }}
          format="YYYY / MM / DD"
          value={recommendForm.startDate ? dayjs(recommendForm.startDate) : null}
          onChange={(newValue) => {
            startDateChange(newValue);
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default MyDatePicker;
