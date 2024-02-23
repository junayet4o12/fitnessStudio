
const useStyleProperty = () => {
    const buttonStyle =
    "p-2 xs:p-2.5 transition-all duration-500 w-[110px] xs:w-[160px] font-bold text-white rounded border-[3px] active:bg-[#ff470470] active:scale-90";

const labelStyle = "after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-200 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-200 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-gray-200 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-300 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500";

const inputStyle = "peer border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5  text-sm text-gray-200 outline outline-0 placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100";
return [buttonStyle,labelStyle,inputStyle]
};

export default useStyleProperty;