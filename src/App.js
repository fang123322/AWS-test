import React, { useRef } from 'react';
import { Amplify, Storage } from 'aws-amplify';
import awsconfig from './aws-exports';
import Axios from 'axios';
import { nanoid } from 'nanoid'
import './App.css';

Amplify.configure(awsconfig);
function App() {
  const textData = useRef(null);
  const fileData = useRef(null);
  const id = nanoid();
  function handleSubmit(event){
    debugger
    event.preventDefault()
    const uploadUrl = 'https://wuzjwuf3y5.execute-api.ap-east-1.amazonaws.com/test1';
    const dataUrl = 'https://wuzjwuf3y5.execute-api.ap-east-1.amazonaws.com/test1';
    const file = fileData.current.files[0];
    var fileBlob = URL.createObjectURL(file);
    Storage.put(file.name, fileBlob, {
      contentType: 'image/jpeg' // contentType is optional
    });
  }
  return (
    <div className="flex flex-col h-screen bg-green-50 items-center justify-center view-account">
    <div className="md:text-center ">
      <div className="pt-6 md:p-8 space-y-4">
        <form  className="font-medium" onSubmit={handleSubmit} action="https://wuzjwuf3y5.execute-api.ap-east-1.amazonaws.com/test1" method="post" encType="multipart/form-data" >
          <div>
              <label className="w-full md:w-1/2 ">Text input:</label>
              <input className="w-full border md:w-1/2 " name="text" ref={textData}></input>
              <br/>
              <label className="w-full md:w-1/2 ">File input:</label>
              <input className="w-full border md:w-1/2 " type="file" name="file" ref={fileData}></input>
              <br/>
              <button className="border m-4" type="submit">Submit</button>
          </div>
        </form >
      </div>
    </div>
	</div>
  );
}

export default App;
