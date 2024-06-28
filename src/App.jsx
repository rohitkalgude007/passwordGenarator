import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(0);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  //useRef using
  const passwordRef = useRef(null);

  //usecallback using
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) {
      chars += "0123456789";
    }

    if (character) {
      chars += "~!#$%^&*-_+[]{}`";
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(char);
    }

    setPassword(pass);
  }, [length, number, character]);

  //usecallback using
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
    window.alert("Your Password Copy");
  }, [password]);

  //useEffect using
  useEffect(() => {
    passwordGenerator();
  }, [length, number, character, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-10 text-red-500 bg-gray-700">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="w-full outline-none py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={number}
              id="numberInput"
              onChange={() => setNumber((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={character}
              id="characterInput"
              onChange={() => setCharacter((prev) => !prev)}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
