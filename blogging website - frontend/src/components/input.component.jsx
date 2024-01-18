import { useState } from "react";

const InputBox = ({id, type, name, placeholder, value, icon}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div className="relative w-[100%] mb-4">
      <input
        id={id}
        type={type == "password" ? passwordVisible ? "text" : "password" : type}
        name={name}
        defaultValue={value}
        placeholder={placeholder}
        className="input-box"
      />
      <i className={"fi " + icon + " input-icon"}></i>

      {
        type == "password" ? 
          <i className={"fi fi-rr-eye"+(!passwordVisible ? "-crossed" : "") +" input-icon left-[auto] right-4 cursor-pointer"} onClick={() => setPasswordVisible(currentVal => !currentVal)}></i>
        : ""
      }
    </div>
  )
}

export default InputBox;