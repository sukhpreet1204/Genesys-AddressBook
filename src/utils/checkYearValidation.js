const checkYearValidation = (startYear, endYear) => {
    if(startYear<endYear) return true;
    else return false;
}

export default checkYearValidation;