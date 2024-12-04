//@ts-nocheck

const DefaultSelect = ({
  label = "",
  required = false,
  placeholder = "",
  options = [],
  value = 0,
  setValue = null,
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-2 w-[100%]`}>
      {label && (
        <p className="text-white text-[14px]">
          {label}
          {required && <span className="text-[#ffc000]">*</span>}
        </p>
      )}
      <select
        placeholder={placeholder}
        onChange={(e) => {
          setValue && setValue(e.target.value)
        }}
        value={value}
        className={`w-[100%] h-[49px] p-3 bg-[#131313] border border-[#2e2e2e] rounded-[8px] outline-none text-[#606060] ${className}`}
      >
        {options.map((item, index) => (
          <option
            value={typeof item == "object" ? item?.value : item}
            key={index}
          >
            {typeof item == "object" ? item?.label : item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DefaultSelect;
