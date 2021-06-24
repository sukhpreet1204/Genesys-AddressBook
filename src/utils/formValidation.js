import checkYearValidation from "./checkYearValidation"
const formValidation = (name, contactNo, emailId, address, university, degree, startYear, endYear, institution, workStartYear, workEndYear, title )=> {
    const nameErr = {};
    const contactNoErr = {};
    const emailIdErr = {};
    const addressErr = {};
    const universityErr = {};
    const degreeErr = {};
    const institutionErr = {};
    const titleErr = {};
    const educationYearErr = {};
    const experienceYearErr = {};
    let isValid = true;

    if(!name){
        nameErr.mandatory = "Name is required";
        isValid = false;
    }
    if(name.length < 3){
        nameErr.nameShort = "Name is too short";
        isValid = false;
    }

    if(!contactNo){
        contactNoErr.mandatory = "Contact number is required";
        isValid = false;
    }
    else{  
        var numberPattern = /^\d+$/;  
        if (!numberPattern.test(contactNo)) {     
            contactNoErr.invalid = "Invalid Contact Number"; 
            isValid = false;  
        }    

    }

    if(!emailId){
        emailIdErr.mandatory = "Email ID is required";
        isValid = false;
    }
    else if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailId))) {       
        emailIdErr.invalid = "Invalid email id.";  
        isValid = false;  
    } 
    
    if(!address){
        addressErr.mandatory = "Address is required";
        isValid = false;
    }
    if(address.length < 3){
        addressErr.addressShort = "Address is too short";
        isValid = false;
    }

    if(!university){
        universityErr.mandatory = "University is required";
        isValid = false;
    }
    if(university.length < 3){
        universityErr.universityShort = "University Name is too short";
        isValid = false;
    }

    if(!checkYearValidation(startYear, endYear)){
        educationYearErr.invalidYear = "Start Year should be less than End Year";
        isValid = false;
    }

    if(!degree){
        degreeErr.mandatory = "Degree is required";
        isValid = false;
    }

    if(!institution){
        institutionErr.mandatory = "Institution is required";
        isValid = false;
    }
    if(institution.length < 3){
        institutionErr.institutionShort = "Institution Name is too short";
        isValid = false;
    }

    if(!checkYearValidation(workStartYear, workEndYear)){
        experienceYearErr.invalidYear = "Start Year should be less than End Year";
        isValid = false;
    }

    if(!title){
        titleErr.mandatory = "Title is required";
        isValid = false;
    }
    if(title.length < 3){
        titleErr.titleShort = "Title is too short";
        isValid = false;
    }
    return {
        nameErr,
        contactNoErr,
        emailIdErr,
        addressErr,
        universityErr,
        degreeErr,
        institutionErr,
        titleErr,
        educationYearErr,
        experienceYearErr,
       isValid 
    };     
}

export default formValidation;