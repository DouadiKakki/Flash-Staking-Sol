

const IconButton = ({
  text = "",
  className = "",
  icon = null,
  rightIcon = null,
  BgClass = "bg-[#E7B10B]",
  BgHoverClass = "hover:bg-[#d4ab2d]",
  TxClass = "text-[#131313]",
  TxSize = "text-[16px] lg:text-[20px]",
  px = "px-[16px]",
  py = "py-[16px]",
  rounded = "rounded-[8px]",
  onClick = () => { },
  capitalize = true,
  iconHeight = null,
  disabled = false,
}) => {
  return (
    <button
      className={`${px} ${py} max-w-full flex flex-row justify-center items-center gap-2 ${rounded} ${BgClass} ${BgHoverClass} ${disabled && '!bg-[#8d8c89]'} ${className}`}
      onClick={(e) => { e.preventDefault(); onClick(); }}
      disabled={disabled}
    >
      {icon && (
        <img
          src={icon}
          height={iconHeight ? iconHeight : ""}
          alt="button-icon"
          style={{ maxWidth: "none" }}
        />
      )}
      {text && (
        <p className={`${TxClass} ${TxSize} font-[500] font-Urbanist ${capitalize ? "capitalize" : ""}`}>
          {text}
        </p>
      )}
      {rightIcon && <img src={rightIcon} alt="button-icon" />}
    </button>
  );
};

export default IconButton;
