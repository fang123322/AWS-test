import React, { useRef } from 'react';
import { Amplify, Storage } from 'aws-amplify';
// import awsconfig from './aws-exports';
import axios from 'axios'
import { nanoid } from 'nanoid'
import './App.css';
const amplifyConfig ={
  "aws_project_region": "ap-south-1",
  "aws_cognito_identity_pool_id": "ap-south-1:2ff0db0f-9198-43c5-ba60-6a3ceb79cabc",
  "aws_cognito_region": "ap-south-1",
  "aws_user_pools_id": "ap-south-1_cB5PNKPy6",
  "aws_user_pools_web_client_id": "7c1ru8q8tsk48o602rrkt5tr95",
  "oauth": {},
  "aws_cognito_username_attributes": [],
  "aws_cognito_social_providers": [],
  "aws_cognito_signup_attributes": [
      "EMAIL"
  ],
  "aws_cognito_mfa_configuration": "OFF",
  "aws_cognito_mfa_types": [
      "SMS"
  ],
  "aws_cognito_password_protection_settings": {
      "passwordPolicyMinLength": 8,
      "passwordPolicyCharacters": []
  },
  "aws_cognito_verification_mechanisms": [
      "EMAIL"
  ],
  "aws_user_files_s3_bucket": "awstest95c587d84abb4a1e82573e0b420cfb4f212549-staging",
  "aws_user_files_s3_bucket_region": "ap-south-1"
};
Amplify.configure(amplifyConfig);

const gatewayUrl = 'https://uhl1n9glp0.execute-api.ap-south-1.amazonaws.com/default/DynamoDBSaveS3FilePath';

function App() {
  const inputData = useRef(null);
  const fileData = useRef(null);


  function handleSubmit(event){
    event.preventDefault()
    const file = fileData.current.files[0];
    var fileBlob = URL.createObjectURL(file);
    Storage.put(file.name, fileBlob, {
      contentType: file.type , // contentType is optional
      level: 'public'
    }).then((obj) => {
      alert('upload success next ....');
      const id = nanoid();
      const inputText = inputData.current.value;
      const filePath = `${amplifyConfig.aws_user_files_s3_bucket}/${obj.key}`;
      sendDataToGateway({id,inputText,filePath});
    });
  }

  function sendDataToGateway(data){
    axios({
      url: gatewayUrl,
      method: 'OPTIONS',
      data: data,
      timeout: 5000,
      headers: {
        'Content-Type':'application/json;charset=utf-8',
      }
    }).then((data) => {
      alert(data);
    });
  }

  return (
    <div className="flex flex-col h-screen bg-green-50 items-center justify-center view-account">
    <div className="md:text-center ">
      <div className="pt-6 md:p-8 space-y-4">
        <form  className="font-medium" onSubmit={handleSubmit} action="https://wuzjwuf3y5.execute-api.ap-east-1.amazonaws.com/test1" method="post" encType="multipart/form-data" >
          <div>
              <label className="w-full md:w-1/2 ">Text input:</label>
              <input className="w-full border md:w-1/2 " name="text" ref={inputData}></input>
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
