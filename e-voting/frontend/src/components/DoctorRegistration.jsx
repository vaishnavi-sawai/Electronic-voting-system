import React from 'react';
import contractABI from "../abis/contractABI.json";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
const ethers = require("ethers");
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;


const DoctorRegistration = () => {
  
   const handleRegistration = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const singer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, singer);
    await contract.addVoter(
     data.get("firstName"), 
     data.get("lastName"),
     data.get("description"));
  }
  return (
    <>
      <div className="root">
        <div className="background"></div>
        <div className="loginParent">
          <div className="loginChild mainBG">
            <div className="formHeader">
              <span className="taskValues">
                <PersonAddAltOutlinedIcon fontSize='large' />
              </span>
              <h1> Voter Registration</h1>
            </div>
            <form className="material-icons-outlined" onSubmit={handleRegistration}>
              <label>First Name</label>
              <br></br>
              <input className="input" type="text" id="firstName" name="firstName" placeholder="First Name"></input>
              <br></br>
              <label>Last Name</label>
              <br></br>
              <input className="input" type="text" id="lastName" name="lastName" placeholder="Last Name"></input>
              <br></br>
              <label>Age</label>
              <br></br>
              <input className="input" type="text" id="qualification" name="qualification" placeholder="Age"></input>
              <br></br>
              <br></br>
              <button className="button ascend secondaryBG" type="submit" >Submit</button>
            </form>

            <button className="button ascend secondaryBG" type="submit">Already Registererd?</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DoctorRegistration;