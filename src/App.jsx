import { useState,useCallback,useEffect,useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("") 
  const [copyMessage, setCopyMessage] = useState('Copy'); 
  const [flag, setFlag] = useState('good');
  const [flagColor, setFlagColor] = useState('#F59E0B');  
  const [copyChangeBorder,setCopyChangeBorder] = useState('border-super-light-grey')
  const [copyChangeBg,setCopyChangeBg] = useState('bg-light-grey')
//useCallback(function , [array of dependencies])
//this function is used to store some reusable items of a function in cache. thus used for memoization
  const  passwordGenerator =  useCallback(() =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+='0123456789'
    if(charAllowed) str+='!@#$%^&*?/'

    for(let i=1; i<=length;i++){
      let index=Math.floor(Math.random() * str.length + 1)
      pass+=str.charAt(index);
    }
    setPassword(pass)

  } ,[length,numberAllowed,charAllowed,setPassword]);
  
  useEffect(()=> {
    passwordGenerator();
  }, [length,numberAllowed,charAllowed,passwordGenerator])
  
  //to use useRef hook we have to make it a variable
  const passwordRef=useRef(null) //default password reference is not there so null
  //this gives an effect by highlighting the copied area
  //without this also it copies but user won't know what area is copied

  const copyPasswordToClipboard=useCallback(() => {
    window.navigator.clipboard.writeText(password);
    setCopyMessage('✅');
    setCopyChangeBorder('border-bright-blue');
    setCopyChangeBg('bg-bright-blue');
    // Clear the message after 1 second
    setTimeout(() => {
      setCopyMessage('Copy');
      setCopyChangeBorder('border-super-light-grey'); 
      setCopyChangeBg('bg-light-grey');
    }, 1500);
  },[password])

  useEffect(() => {
    if (length > 15) {
      setFlagColor('green');
    } else if (length >= 8) {
      setFlagColor('#F59E0B');
    } 
    else{
      setFlagColor('red');
    }
  }, [length]);

  useEffect(() => {
    if (length > 15) {
      setFlag('strong');
    } else if (length >= 8) {
      setFlag('good');
    } 
    else{
      setFlag('weak');
    }
  }, [length]);


  return (
    <>
    <h1 className='text-white font-bold text-4xl mt-20 text-center'>PassCipher</h1>
    <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-10 py-2 my-8 mt-10 bg-gray-700 text-greyish-white' style={{backgroundColor:'#202229'}}>
    <h1 className='text-center text-white my-5'> Generate a random password</h1>        
    <div className={`flex shadow rounded-lg overflow-hidden mb-5 border ${copyChangeBorder}`}>
      <input 
      type='text'
      value={password}
      className={`outline-none w-full py-1 px-3 ${copyChangeBg}`}
      placeholder='password'
      readOnly
      ref={passwordRef}
      >
      </input>
      <div className={`${copyChangeBg} outline-none py-1 px-3`}>
        <div className='outline-none py-1 px-3 my-1 rounded-lg text-white' style={{backgroundColor:flagColor}}>{flag}</div>
        </div>
      <button className='w-20 outline-none text-white px-3 py-0.5 shrink-0 bg-main-blue transition-all duration-300 hover:bg-blue-800'
      onClick={copyPasswordToClipboard}>
        {copyMessage}</button>
 
    </div>
    

    <div>
    <div className='items-centre gap-x-1'>
    <label>Length: {length}</label>
    <br/>
      <input
      type='range'
      min={2}
      max={30}
      value={length}
      className=' cursor-pointer mt-1 w-full h-1 mb-2 mt-1'
      //onClick and onChange can never hold return value of function so we give it a function () itself
      onChange={(e)=>{setLength(e.target.value)}}

      />
  
    </div>
    <div className='flex items-center gap-x-1  mb-2'>
      <input
      type='checkbox'
      defaultChecked={numberAllowed}
      // id="numberInput"
      onChange={()=>{setNumberAllowed((prev)=> !prev);
      }}
      />
      <label>Numbers</label>
    </div>

    <div className='flex items-center gap-x-1'>
      <input
      type='checkbox'
      defaultChecked={charAllowed}
      // id="numberInput"
      onChange={()=>{setCharAllowed((prev)=> !prev);
      }}
      />
      <label>Characters</label>
    </div>
    </div>

    </div>
    </>
  )
}

export default App
