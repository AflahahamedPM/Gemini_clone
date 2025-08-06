import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import SendButton from "./SendButton";
import UploadFile from "./UploadFile";
import { useAuthData } from "../Auth/AuthContextHandler/AuthContextHandler";

const AIInput = () => {
  const { handleSubmitQuestion, question, setQuestion } = useAuthData();
  return (
    <div className="flex md:w-1/2 max-md:w-[70%] md:mx-auto max-md:m-auto max-md:pl-5 items-end mb-12">
      <TextField
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        multiline
        rows={3}
        placeholder="Ask Gemini"
        className="w-full"
        variant="outlined"
        InputProps={{
          sx: {
            borderRadius: "24px",
            fontSize: "18px",
            paddingRight: "12px",
            color: "text.primary",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ccc",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#999",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#000",
            },
            "&.MuiInputBase-root": {
              color: "inherit",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "inherit",
              opacity: 0.6,
            },
          },
          endAdornment: (
            <InputAdornment position="end">
              <div className="flex items-center gap-2">
                <UploadFile />
                <SendButton handleClick={handleSubmitQuestion} />
              </div>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default AIInput;
