import './App.css'
import {useCallback, useState , useEffect ,useRef } from 'react' 
function App() {
  const [length , setLength] = useState(8);
  const [numbAllowed,setNumbAllowed] = useState(false);
  const [charAllowed , setCharALlowed] = useState(false);
  const [password,setPassword] = useState("");
 
   //useRef  Hook
   const passwordRef = useRef(null);
  // Password generator 
   const passwordgenerator = useCallback(() => {
       let pass = ""
       let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
       if(numbAllowed) str+='1234567890'
       if(charAllowed) str+='!@#$%*&-_+=[]{}~`'
       for(let i=1;i<=length;i++){
            let char = Math.floor (Math.random() * str.length + 1)
            pass+= str.charAt(char);
       }
       setPassword(pass)
       
   }, [length , numbAllowed , charAllowed , setPassword])
  //  Password Copy to ClipBoard Method 
  const  copyPasswordtoClipBoard = useCallback(() => {
        passwordRef.current?.select();
        passwordRef.current?.setSelectionRange(0,20);
        window.navigator.clipboard.writeText(password);
  } ,[password])
   useEffect(() => {passwordgenerator()} , [length , numbAllowed , charAllowed , passwordgenerator])
  return (
        <>
          <div className='w-full h-40  max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 '>
          <h1 className='text-center text-white font-bold text-lg py-4'>Password Generator </h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3 h-8' 
          placeholder='password' readOnly ref={passwordRef}/>
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordtoClipBoard}>Copy</button>
          </div>
          <div className='flex gap-x-2 text-sm '>
            <div className='flex items-center gap-x-1'> 
              <input type="range" min={8} max={80} value={length} className='cursor-pointer' onChange={(e)=> {setLength(e.target.value)}}/>
              <label>Length : {length}</label>
            </div>
            <div className='flex items-center gap-x-1'> 
              <input type="checkbox" id='numberinput' defaultChecked={numbAllowed}  onChange={()=> {
                setNumbAllowed((prev) => !prev)}}/>
                <label htmlFor="numberinput">Numbers</label>
            </div>
            <div className='flex items-center gap-x-1'> 
              <input type="checkbox" id='char' defaultChecked={charAllowed}  onChange={()=> {
                setCharALlowed((prev) => !prev)}}/>
                <label htmlFor="char">Char</label>
            </div>
          </div>
          </div>
        </>
  )
}
export default App
