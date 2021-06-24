import { useState } from "react";
import { useHistory } from 'react-router-dom';
import  formValidation  from "../../utils/formValidation";
import "../../components/CreateUser/create.scss";

const Create = () => {

    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [emailId, setEmailId] = useState('');
    const [address, setAddress] = useState('');

    const [facebookUrl, setFacebookUrl] = useState('');
    const [linkedInUrl, setLinkedInUrl] = useState('');
    const [twitterUrl, setTwitterUrl] = useState('');

    const [university, setUniversity] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const [degree, setDegree] = useState('');

    const [institution, setInstitution] = useState('');
    const [workStartYear, setWorkStartYear] = useState('');
    const [workEndYear, setWorkEndYear] = useState('');
    const [title, setTitle] = useState('');

    const [education, setEducation] = useState([]);
    const [workExperience, setExperience] = useState([]);

    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const [nameErr, setNameErr] = useState({});
    const [contactNoErr, setContactNoErr] = useState({});
    const [emailIdErr, setEmailIdErr] = useState({});
    const [addressErr, setAddressErr] = useState({});
    const [universityErr, setUniversityErr] = useState({});
    const [degreeErr, setDegreeErr] = useState({});
    const [institutionErr, setInstitutionErr] = useState({});
    const [titleErr, setTitleErr] = useState({});
    const [educationYearErr, setEducationYearErr] = useState({});
    const [experienceYearErr, setExperienceYearErr] = useState({});


    const handleSubmit = (e) => {
        e.preventDefault();
        const {nameErr,
            contactNoErr,
            emailIdErr,
            addressErr,
            universityErr,
            degreeErr,
            institutionErr,
            titleErr,
            educationYearErr,
            experienceYearErr,
            isValid }= formValidation(name, contactNo, emailId, address, university, degree, startYear, endYear, institution, workStartYear, workEndYear, title);



        if(!isValid){
            setNameErr(nameErr);
            setContactNoErr(contactNoErr);
            setEmailIdErr(emailIdErr);
            setAddressErr(addressErr);
            setUniversityErr(universityErr);
            setDegreeErr(degreeErr);
            setInstitutionErr(institutionErr);
            setTitleErr(titleErr);
            setEducationYearErr(educationYearErr);
            setExperienceYearErr(experienceYearErr);

        }


        if(isValid){
        let tempEducation = education;
        tempEducation.push({institution:university, startYear, endYear, degree});

        let tempExperience = workExperience;
        tempExperience.push({ institution, startYear:workStartYear, endYear:workEndYear, title });

        setEducation(tempEducation);
        setExperience(tempExperience);
        
        const user = { name, dob, contactNo, emailId, address, facebookUrl, linkedInUrl, twitterUrl, education, workExperience };
        
        setIsPending(true);

        fetch('http://localhost:8080/people', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then(() => {
            setIsPending(false);
            history.push('/');
        })
    }
    }

    return ( 
        <div className="create">
            <h2>Create a new User</h2>
            <form onSubmit={handleSubmit}>  
                <label>User Name:</label>
                <input
                    type="text"
                    required
                    value={ name }
                    onChange={(e) => setName(e.target.value)} 
                />
                {Object.keys(nameErr).map((key) => {
                    return <div style={{color:"red"}}>{nameErr[key]}</div>
                })}

                <label>Date Of Birth:</label>
                <input
                    type="date"
                    required
                    value={ dob }
                    onChange={(e) => setDob(e.target.value)} 
                />
                
                <label>Contact Number:</label>
                <input
                    type="tel"
                    required
                    value={ contactNo }
                    onChange={(e) => setContactNo(e.target.value)}
                />
                 {Object.keys(contactNoErr).map((key) => {
                    return <div style={{color:"red"}}>{contactNoErr[key]}</div>
                })}

                <label>Email ID:</label>
                <input
                    type="email"
                    required
                    value={ emailId }
                    onChange={(e) => setEmailId(e.target.value)}
                />
                {Object.keys(emailIdErr).map((key) => {
                    return <div style={{color:"red"}}>{emailIdErr[key]}</div>
                })}

                <label>Address:</label>
                <input
                    type="text"
                    required
                    value={ address }
                    onChange={(e) => setAddress(e.target.value)}
                />
                {Object.keys(addressErr).map((key) => {
                    return <div style={{color:"red"}}>{addressErr[key]}</div>
                })}

                <h4>Social Media Profile:</h4>
                <label>Facebook:</label>
                <input
                    type="url"
                    value={ facebookUrl }
                    onChange={(e) => setFacebookUrl(e.target.value)}
                />

                <label>LinkedIn:</label>
                <input
                    type="url"
                    value={ linkedInUrl }
                    onChange={(e) => setLinkedInUrl(e.target.value)}
                />

                <label>Twitter:</label>
                <input
                    type="url"
                    value={ twitterUrl }
                    onChange={(e) => setTwitterUrl(e.target.value)}
                />


                <h4>Education:</h4>
                <label>University:</label>
                <input
                    type="text"
                    required
                    value={ university }
                    onChange={(e) => setUniversity(e.target.value)}
                />
                {Object.keys(universityErr).map((key) => {
                    return <div style={{color:"red"}}>{universityErr[key]}</div>
                })}

                <label>Start Year:</label>
                <input
                    type="number"
                    placeholder="YYYY"
                    min="1950"
                    max="2021"
                    required
                    value={ startYear }
                    onChange={(e) => setStartYear(e.target.value)}
                />
                {Object.keys(educationYearErr).map((key) => {
                    return <div style={{color:"red"}}>{educationYearErr[key]}</div>
                })}
                <label>End Year:</label>
                <input
                    type="text"
                    placeholder="YYYY or Present"
                    required
                    value={ endYear }
                    onChange={(e) => setEndYear(e.target.value)}
                />
                <label>Degree:</label>
                <input
                    type="text"
                    required
                    value={ degree }
                    onChange={(e) => setDegree(e.target.value)}
                />
                {Object.keys(degreeErr).map((key) => {
                    return <div style={{color:"red"}}>{degreeErr[key]}</div>
                })}

                <h4>Experience:</h4>
                <label>Institution:</label>
                <input
                    type="text"
                    required
                    value={ institution }
                    onChange={(e) => setInstitution(e.target.value)}
                />
                {Object.keys(institutionErr).map((key) => {
                    return <div style={{color:"red"}}>{institutionErr[key]}</div>
                })}

                <label>Start Year:</label>
                <input
                    type="number"
                    placeholder="YYYY"
                    min="1950"
                    max="2021"
                    required
                    value={ workStartYear }
                    onChange={(e) => setWorkStartYear(e.target.value)}
                />
                 {Object.keys(experienceYearErr).map((key) => {
                    return <div style={{color:"red"}}>{experienceYearErr[key]}</div>
                })}

                <label>End Year:</label>
                <input
                    type="text"
                    placeholder="YYYY or Present"
                    required
                    value={ workEndYear }
                    onChange={(e) => setWorkEndYear(e.target.value)}
                />

                <label>Title:</label>
                <input
                    type="text"
                    required
                    value={ title }
                    onChange={(e) => setTitle(e.target.value)}
                />
                {Object.keys(titleErr).map((key) => {
                    return <div style={{color:"red"}}>{titleErr[key]}</div>
                })}

                { !isPending && <button className="button-create">Create User</button> }
                { isPending && <button className="button-create" disabled>Creating...</button> }
                
            </form>

            
        </div>
     );
}
 
export default Create;