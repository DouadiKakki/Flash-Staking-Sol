

const IconButton2 = ({
  icon = "",
  text = "",
  className = "",
  onClick = () => { }
}) => {
  return (
    <div className={`bg-gradient-to-b from-[#474747] to-[#1F1F1F] p-[2px] rounded-[8px] cursor-pointer ${className}`} onClick={onClick}>
      <div
        className='flex flex-row items-center justify-center gap-3 px-8 py-4 rounded-[8px] bg-gradient-to-b hover:bg-gradient-to-t from-[#282828] to-[#1F1F1F]'
      >
        {icon &&
          <img src={icon} alt="icon" />
        }
        {text && 
          <span className="text-[#FFC000] text-[16px] lg:text-[20px]">{text}</span>
        }
      </div>
    </div>
  );
};

export default IconButton2;
