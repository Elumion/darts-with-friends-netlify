import React, { useRef, useState } from "react";

interface Props {
  label: string;
  saveFunc: (text: string) => void;
}

const InputSet = ({ saveFunc, label }: Props) => {
  const [text, setText] = useState("");
  const ref = useRef<null | HTMLInputElement>(null);
  return (
    <div>
      <input
        className="main-input"
        type="text"
        value={text}
        placeholder={label}
        onChange={(e) => setText(e.target.value)}
        ref={ref}
      />
      <button
        className="main-button"
        onClick={() => {
          saveFunc(text);
          setText("");

          ref?.current?.focus();
        }}
      >
        ADD
      </button>
    </div>
  );
};

export default InputSet;
