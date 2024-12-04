//@ts-nocheck

import { useEffect, useState } from "react";

const Input = ({
  label = "",
  value = "",
  placeholder = "",
  required = false,
  icon = "",
  rightIcon = "",
  rightIconClick = null,
  type = "text",
  hint = [],
  checkValid = null,
  setValue = null,
  defaultValue = "",
  setKeyValue = null,
  key1 = '',
  isValid = null,
  autoFocus = false,
  min = 100000000,
  secondaryMsg = "",
  className = "",
  size = "normal",    // small
  ...props
}) => {
  const [inputData, setInputData] = useState("")
  const [changed, setChanged] = useState(false)
  const [hintIdx, setHintIndex] = useState()

  useEffect(() => {
    isValid && (hintIdx === 0 ? isValid(true) : isValid(false))
  }, [hintIdx])

  useEffect(() => {
    setHintIndex(checkValid ? checkValid(value, defaultValue) : 0)
  }, [value])

  useEffect(() => {
    if (!required && value == '') {
      isValid && isValid(true)
    }
  }, [])

  return (
    <div className="flex flex-col gap-2 w-[100%]">
      {label && (
        <p className="text-white text-[14px] font-[500]">
          {label}
          {required && <span className="text-[#FFC000] ml-1">*</span>}
        </p>
      )}
      <div className="relative">
        {icon && (
          <img
            src={icon}
            alt="icon"
            className="absolute top-[50%] translate-y-[-50%] left-4"
          />
        )}
        <input
          type={type}
          placeholder={placeholder}
          autoFocus={autoFocus}
          value={value}
          onChange={(e) => {
            checkValid && setHintIndex(checkValid(e.target.value))
            setValue && (checkValid && !checkValid(e.target.value) || !checkValid || type !== "number" || !e.target.value || e.target.value < min) && setValue(e.target.value)
            setKeyValue && (checkValid && !checkValid(e.target.value) || !checkValid || type !== "number" || !e.target.value || e.target.value < min) && setKeyValue(key1, e.target.value)
            setChanged(true)
          }}
          onBlur={() => {
            checkValid && setHintIndex(checkValid(value))
          }}
          className={`w-[100%] ${size == 'small' ? 'h-[35px] p-3' : 'h-[49px] p-4'} text-[14px] text-[#606060] outline-none border bg-[#131313] ${(hintIdx === 0 || !changed) ? "border-[#2e2e2e]" : "border-[#FF0000]"} remove-arrow ${icon && "pl-11"
            } ${rightIcon && "pr-11"
            } rounded-lg ${className}`}
          {...props}
        />
        {rightIcon && (
          <img
            src={rightIcon}
            alt="icon"
            className={`absolute top-[50%] translate-y-[-50%] right-1 ${rightIconClick && 'cursor-pointer'}`}
            onClick={() => { if (rightIconClick) rightIconClick(); }}
          />
        )}
      </div>
      {secondaryMsg && <span className="text-[12px] text-[#9B9DA5]">{secondaryMsg}</span>}
      {changed && hint.length !== 0 && (<span className="text-[#FF0000]">{hint[hintIdx]}</span>)}
    </div>
  );
};

export default Input;
