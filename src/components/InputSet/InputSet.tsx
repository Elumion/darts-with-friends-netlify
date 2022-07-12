import { useState } from "react";

interface Props {
  label: string;
  saveFunc: (text: string) => void;
}

const InputSet = ({ saveFunc, label }: Props) => {
  const [text, setText] = useState("");

  return (
    <div>
      <input
        className="main-input"
        type="text"
        value={text}
        placeholder={label}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="main-button"
        onClick={() => {
          saveFunc(text);
          setText("");
        }}
      >
        ADD
      </button>
    </div>
  );
};

export default InputSet;
