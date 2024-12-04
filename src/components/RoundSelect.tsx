const RoundSelect = ({
  label = "Networks",
  optons = [
    { text: "No Filter", value: "nofilter" },
    { text: "ETH", value: "eth" },
    { text: "BSC", value: "bsc" },
    { text: "opBNB", value: "opbnb" },
  ],
}) => {
  return (
    <div className="relative w-[150px]">
      <div className="px-1 absolute left-[25px] -top-2 text-[#86888C] text-[11px] bg-[#141414]">
        {label}
      </div>
      <div className="h-[44px] max-sm:h-[33px] pr-3 rounded-[26px] border border-[#2C2C2C]">
        <select className="pl-[25px] py-[10px] w-full pr-3 max-sm:pl-[19px] max-sm:py-[4px] rounded-[26px] bg-[#141414] outline-none text-white text-[16px]">
          {optons.map((item, index) => (
            <option value={item.value} key={index}>
              {item.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RoundSelect;
