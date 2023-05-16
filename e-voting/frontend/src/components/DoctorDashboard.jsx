import React, { useState, useEffect, setState } from 'react';
import contractABI from "../abis/contractABI.json";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import { ParamType } from 'ethers/lib/utils';
const ethers = require("ethers");
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState({});
  const [candidates, setCandidates] = useState([]);
  const [toggleState, setToggleState] = useState(0);
  const [toggleStateform2, setToggleStateform2] = useState(2);
  const [submitProcess, setSubmitProcess] = useState("Submit");
  const toggleTab = (index) => {
    setToggleState(index);
  };
    const toggleTab2 = (index) => {
    setToggleStateform2(index);
  };

  async function fetchInfo() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    // const doctorData = await contract.getDoctor();
    const CandidateData = await contract.getCandidateList();
    // setDoctor({
    //   doctorId: doctorData[0],
    //   firstName: doctorData[1],
    //   lastName: doctorData[2],
    //   qualification: doctorData[3],
    //   specialization: doctorData[4],
    //   prescriptionCount: parseInt(String(doctorData[5]))
    // })


    for (let i = 0; i < CandidateData[0]["length"]; i++) {
      const newItem = {
        candidateId: String(CandidateData[0][i]),
        firstName: CandidateData[1][i],
        lastName: CandidateData[2][i],
        description: CandidateData[3][i],
        partyName : CandidateData[4][i],
        voteCount : String(CandidateData[5][i]),

      }
      setCandidates(prescriptions => [
        ...prescriptions, newItem
      ])
    }
  }

  const handleSubmit = async (event) => {
    setSubmitProcess("Processing...");
    event.preventDefault();
    const data = new FormData(event.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    await contract.castVote(
      parseInt(data.get("candidateId")),
    );
    toggleTab(0);
    setSubmitProcess("Submit");
  }

  const handleCancel = () => {
    setSubmitProcess("Submit");
    toggleTab(0);
  }

  useEffect(() => {
    fetchInfo();
  }, []);

 const handleSubmit2 = async(event) =>{
  setSubmitProcess("Processing...");
  event.preventDefault();
  const data = new FormData(event.target);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  await contract.addCandidate(
    data.get("firstName"),
    data.get("lastName"),
    data.get("description"),
    data.get("partyName"),
  );

    toggleTab2(2);
    setSubmitProcess("Submit");
    fetchInfo();
 }
   const handleCancel2 = () => {
    setSubmitProcess("Submit");
    toggleTab2(2);
  }

  const CandidateList = () => {
    return candidates.map((candidate) => (
      <div className="task ascend">
        <div class="taskTopper">
          <span class="material-icons-outlined headerMid">
            <AssignmentOutlinedIcon />
          </span>
          <div class="taskColor"></div>
          <h2 class="taskHeader">Candidate Details</h2>
        </div>
        <div class="taskDescription">
          <li>
            <span class="taskKeys">
              <p>Candidate ID</p>
              <p>First Name</p>
              <p>Last Name</p>
              <p>Description</p>
              <p>Party Name</p>
              <p>Vote Count</p>
            </span>
            <span class="taskValues">
              <p>: {candidate.candidateId}</p>
              <p>: {candidate.firstName}</p>
              <p>: {candidate.lastName}</p>
              <p>: {candidate.description}</p>
              <p>: {candidate.partyName}</p>
              <p>: {candidate.voteCount}</p>
            </span>
          </li>
        </div>
      </div>
    ))
  };
  return (
    <>
      <div class="root">
        <div class="background"></div>
        <div className={toggleState === 1 ? "services__modal active-modal" : "services__modal"}>
          <div class="loginParent">
            <div class="loginChild mainBG">
              <div class="formHeader">
                <span class="taskValues">
                  <PostAddOutlinedIcon fontSize='large' />
                </span>
                <h1>Cast a Vote</h1>
              </div>
              <form onSubmit={handleSubmit} className="material-icons-outlined">
                <label>Candidate ID</label>
                <br></br>
                <input class="input" type="text" name="candidateId" placeholder="Enter Candidate's Id"></input>
                <br></br>
                <button class="button ascend secondaryBG" type="submit">{submitProcess}</button>
              </form>
              <button onClick={handleCancel} class="button ascend secondaryBG" type="submit">Cancel</button>
            </div>
          </div>
        </div>
                  <div className={toggleStateform2 === 3 ? "services__modal active-modal" : "services__modal"}>
          <div class="loginParent">
            <div class="loginChild mainBG">
              <div class="formHeader">
                <span class="taskValues">
                  <BorderColorOutlinedIcon fontSize='large' />
                </span>
                <h1>Register For Candidacy</h1>
              </div>
              <form onSubmit={handleSubmit2} className="material-icons-outlined">
                <label>First Name</label>
                <br></br>
                <input class="input" type="text" name="firstName" placeholder="Enter firstName"></input>
                <br></br>
                <label>Last Name</label>
                <br></br>
                <input class="input" type="text" name="lastName" placeholder="Enter lastName"></input>
                <br></br>
                <label>Description</label>
                <br></br>
                <input class="input" type="text" name="description" placeholder="Enter description"></input>
                <br></br>
                <label>Party Name</label>
                <br></br>
                <input class="input" type="text" name="partyName" placeholder="Enter partyName"></input>
                <br></br>
                <button class="button ascend secondaryBG" type="submit">{submitProcess}</button>
              </form>
              <button onClick={handleCancel2} class="button ascend secondaryBG" type="submit">Cancel</button>
            </div>
          </div>
        </div>
        <div class="taskManagerParent">
          <div class="category">
            <div class="categoryTopper">
              <span class="material-icons-outlined">
                <LocalHospitalIcon />
              </span>
              <h1 class="categoryHeader headerMid">Poll Details
              </h1>
              <span class="createButton ascend" onClick={() => toggleTab(1)}>
                <span class="material-icons-outlined icon1"><PostAddOutlinedIcon /></span>
                <h1>Cast a Vote 
                </h1>
              </span>
                <span class="createButton ascend" onClick={() => toggleTab2(3)}>
                <span class="material-icons-outlined icon1"><BorderColorOutlinedIcon /></span>
                <h1>Register For Candidacy
                </h1>
              </span>
            </div>
            <div class="categoryTopper1">
              <div class="categorySubHeading">Poll Name :
                <div class="categoryValue"> Test Poll</div>
              </div>
              <div class="categorySubHeading">Created by :
                <div class="categoryValue">Tester</div>
              </div>
              <div class="categorySubHeading">Description :
                <div class="categoryValue">This is a test poll</div>
              </div>
              <div class="categorySubHeading">Region :
                <div class="categoryValue">North West</div>
              </div>
            </div>
            <div class="categoryInfo">
              <CandidateList />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DoctorDashboard;