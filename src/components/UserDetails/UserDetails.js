import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import avatar from "../../assets/avatar.png";
import Modal from "react-modal";
import { FaUserEdit , FaUniversity, FaBirthdayCake, FaFacebook } from 'react-icons/fa';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { MdDelete, MdEmail, MdWork } from 'react-icons/md';
import { GiPhone } from 'react-icons/gi';
import { ImAddressBook } from 'react-icons/im';
import { IoIosPeople, IoLogoLinkedin } from 'react-icons/io';
import ReactTooltip from "react-tooltip";
import "../../components/UserDetails/userDetails.scss";

const UserDetails = ({userData}) => {

    const history = useHistory();

    const renderEducation = (data) => {
        return(<div>
            {data.map((edu, index)=> {
                return <>
                <section className="education-details">
                <div className="year">{`${edu.startYear}-${edu.endYear}`}</div>
                <div className="college-course">
                    <h4>{edu.institution}</h4>
                    <p>{edu.degree}</p>
                </div>
                </section>
                </>
            })}
        </div>)
    }

    const renderExperience = (data) => {
        return(<div>
            {data.map((edu, index)=> {
                return <>
                <section className="experience-details">
                <div className="year">{`${edu.startYear}-${edu.endYear? edu.endYear:'Present'}`}</div>
                <div className="company-details">
                    <h4>{edu.institution}</h4>
                    <p>{edu.title}</p>
                </div>
                </section>
                </>
            })}
        </div>)
    }

    Modal.setAppElement("#root");
    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    const handleDelete = () => {
        fetch('http://localhost:8080/people/' + userData.id, {
            method: 'DELETE'
        }).then(() => {
            setIsOpen(!isOpen);
            history.push('/');
        })
}

    return ( 
        <div className="user-details">
            { userData && (
               <><section className="personal-details">
                    <article className="profile-picture">
                        <img className="avatar" 
                            src={avatar} alt={"Profile picture"}
                        />
                        
                        
                    </article>
                    <article className="personal-data">
                        <h2>{ userData.name }</h2>
                        <p>{<FaBirthdayCake className="dobIcon" />}{ userData.dob }</p>
                        <p>{<GiPhone className="phoneIcon" />}{ userData.contactNo }</p>
                        <p>{<MdEmail className="emailIcon" />}{ userData.emailId }</p>
                        <p>{<ImAddressBook className="addressIcon"/>}{ userData.address }</p>
                    </article>
                    <article>
                       
                        <Link className="editButton" to={`/edit/${userData.id}`} data-tip data-for="editTip" params={{userId : userData.id}}><FaUserEdit /></Link> 
                        <ReactTooltip className="editToolTip" id="editTip" place="bottom" effect="solid">
                            Edit User
                        </ReactTooltip> 
                        <button className="deleteButton" data-tip data-for="deleteTip" onClick={toggleModal}><MdDelete /></button> 
                        <ReactTooltip className="deleteToolTip" id="deleteTip" place="bottom" effect="solid">
                            Delete User
                        </ReactTooltip> 
                    </article>
                    <Modal
                            isOpen={isOpen}
                            onRequestClose={toggleModal}
                            contentLabel="Delete dialog"
                            className="deleteModal"
                            overlayClassName="deleteOverlay"
                            closeTimeoutMS={500}
                    >
                            <div>Are you sure you want to delete the User?</div>
                            <button onClick={handleDelete}>Yes</button>
                            <button onClick={toggleModal}>No</button>
                            
                    </Modal>
                </section>
                {userData.facebookUrl || userData.linkedInUrl || userData.twitterUrl ?
                <section className="social-media">
                    <h2>{<IoIosPeople className="socialMediaIcon" />}SOCIAL MEDIA PROFILE</h2>
                    {userData.facebookUrl ? 
                    <p>{<FaFacebook className="facebookIcon" />}{ userData.facebookUrl }</p>: "" }
                    {userData.linkedInUrl ? 
                    <p>{<IoLogoLinkedin className="linkedInIcon" />}{ userData.linkedInUrl}</p>: ""}
                    {userData.twitterUrl ?
                    <p>{<AiFillTwitterCircle className="twitterIcon"/>}{ userData.twitterUrl}</p>: ""}
                </section>: "" }
                

                <section className="education">
                    <h2>{<FaUniversity className="educationIcon" />}EDUCATION</h2>
                    
                    {renderEducation(userData.education)}
                    

                </section>
                <section className="experience">
                    <h2>{<MdWork className="workIcon"/>}EXPERIENCE</h2>
                    {renderExperience(userData.workExperience)}
                </section>
                </>
            )}
        </div>
     );
}

export default UserDetails;