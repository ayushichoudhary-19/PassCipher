import { useState,useCallback,useEffect,useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("") 
  const [copyMessage, setCopyMessage] = useState(''); 
  
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
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopyMessage('Copied!');
    // Clear the message after 1 second
    setTimeout(() => {
      setCopyMessage('');
    }, 1000);
  },[password])

  return (
    <>
    <h1 className='text-white font-bold text-4xl mt-20 text-center'style={{color:'#C26291'}}>PassCipher</h1>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-2 my-8 mt-10 bg-gray-700' style={{backgroundColor:'rbga(74, 91, 106, 0.8)',color:'#728495'}}>
    <h1 className='text-center text-white my-2'> Generator a random password</h1>        
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input 
      type='text'
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='password'
      readOnly
      ref={passwordRef}
      >
      </input>
      <button className='outline-none text-white px-3 py-0.5 shrink-0 '
      onClick={copyPasswordToClipboard} style={{backgroundColor:'#131E88'}}>
        Copy</button>
 
    </div>
    

    <div className='text-sm gap-x-2'>
    <div className='items-centre gap-x-1'>
    <label>Length: {length}</label>
    <br/>
      <input
      type='range'
      min={8}
      max={30}
      value={length}
      className='cursor-pointer mt-1 w-full'
      //onClick and onChange can never hold return value of function so we give it a function () itself
      onChange={(e)=>{setLength(e.target.value)}}
      />
  
    </div>
    <div className='flex items-center gap-x-1'>
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
    {copyMessage && <p className="text-green-500 text-center text-xs">{copyMessage}</p>}

    </div>
    </>
  )
}

export default App
