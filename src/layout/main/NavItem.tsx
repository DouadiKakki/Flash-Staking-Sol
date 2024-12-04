
import { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NavItem = ({
  text = "",
  img = "",
  active_img = "",
  right = false,
  BgClass = "bg-transparent",
  BgActiveClass = "bg-[#ffc000]",
  TxClass = "text-[#606060]",
  TxActiveClass = "text-[#101010]",
  active = false,
  childItems = [],
  childActive = 0,
  path = "",
  index = "",
}) => {

  const navigate = useNavigate();
  const [dropdownShow, setDropDownShow] = useState(false)

  const handleItemClick = (url: any) => {
    if (url.includes('http')) {
      window.open(url, '_blank')
    } else {
      navigate(url);
    }
  };

  const handleSelfClick = () => {
    if (childItems?.length > 0)
      setDropDownShow(!dropdownShow)
    else navigate(path);
  }

  useEffect(() => {
    if (active) setDropDownShow(true)
  }, [active]);

  return (
    <div>
      <div
        className={`flex items-center gap-x-3 p-[12px_16px] relative cursor-pointer select-none rounded-[8px] ${active ? BgActiveClass : BgClass + " hover:bg-[#202020]"}`}
        onClick={handleSelfClick}
      >
        <img src={active ? active_img : img} alt="icon" />
        <p className={`${active ? TxActiveClass : TxClass} text-[14px] font-semibold capitalize`}>
          {text}
        </p>
        {childItems?.length > 0 && <FaAngleDown className={`absolute top-[50%] right-5 -translate-y-[50%] text-[16px] ${active ? 'text-white' : 'text-[#7A7E82]'} ${dropdownShow && "rotate-180"}`} />}
      </div>
      {
        childItems?.length > 0 && dropdownShow && (
          <div className="flex flex-col gap-3 mt-3">
            {childItems?.map((item: any, index) => (
              <div
                className="py-[10px] pl-[52px] flex flex-row gap-2 items-center cursor-pointer"
                key={index}
                onClick={() => handleItemClick(item.path)}
              >
                <div
                  className={`w-[8px] h-[8px] ${item.active === childActive ? "bg-[#ffc000]" : "bg-[#606060]"} rounded-full`}
                ></div>
                <p
                  className={`text-sm ${item.active === childActive ? "text-[#ffc000]" : "text-[#606060]"} `}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        )
      }
    </div >
  );
};

export default NavItem;
