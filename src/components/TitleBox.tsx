

const TitleBox = ({
  text = "",
  className = ""
}) => {
  return (
    <div className={`bg-gradient-to-b from-[#474747] to-[#1F1F1F] p-[1px] rounded-[44px] ${className}`}>
      <div
        className='flex flex-row items-center justify-center gap-3 px-5 py-3 rounded-[44px] bg-gradient-to-b from-[#282828] to-[#1F1F1F]'
      >
        {/* <div className='w-[10px] h-[10px] bg-white rounded-full'></div> */}
        <span className='text-white text-[14px] lg:text-[20px] font-[500]'>{text}</span>
      </div>
    </div>
  );
};

export default TitleBox;
