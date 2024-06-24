
const Button = (props:any) => {
    return (
    <>
    <button onClick={props.Click} className={`${props.class} bg-indigo-800 text-white font-[Poppins] py-2 px-6 rounded hover:bg-indigo-400 duration-500`}>
        {props.children}
    </button>
    </>
  )
}

export default Button