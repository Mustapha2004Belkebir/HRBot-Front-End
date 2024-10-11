import React from 'react';
import './OBfeature.css';
import lamp from '../assets/images/lamp.png';
import cardTick from '../assets/images/cardTick.png';
import job from '../assets/images/job.png';
import interview from '../assets/images/interview.png';
import paper from '../assets/images/paper.png';
import handShake from '../assets/images/handShake.png';

function OBfeature() {
  return (
    <div className="features">
        <div className='OB-head'>
            <div className="OB-title">Features</div>
            <div className="title-line"></div>
        </div>
        
        <div className='features-body'>
            <div className="for-who">FOR HRs</div>
            
            <div className="feature-element">
                <div className='features-icon'>
                    <img src={handShake} className='handshake' alt='handshake'></img>
                </div>
                <div className='feature-text'>
                    <div className="feature-title">Posting Job Offers</div>
                    <div className="feature-description">
                    Effortlessly create and publish job listings to attract top talent. Customize job descriptions, requirements, and application processes to ensure you find the perfect candidates for your organization.
                    </div>
                </div>
            </div>

            <div className="feature-element feature-space">
                <div className='features-icon'>
                    <img src={cardTick} alt='cardTick'/>
                </div>
                <div className='feature-text'>
                    <div className="feature-title">Check Applicants List and Their Match Percentage</div>
                    <div className="feature-description">
                    Quickly review a comprehensive list of applicants and see how well they match your job criteria. Our AI analyzes resumes and provides a match percentage, helping you identify the best candidates efficiently.
                    </div>
                </div>
            </div>

            <div className="feature-element feature-space">
                <div className='features-icon'>
                    <img src={interview} alt='interview'/>
                </div>
                <div className='feature-text'>
                    <div className="feature-title">Hire Applicants Interviewed by Chatbot</div>
                    <div className="feature-description">
                    Streamline your hiring process by leveraging our AI chatbot for initial interviews. Review detailed interview scores and feedback, allowing you to make informed hiring decisions with confidence.
                    </div>
                </div>
            </div>

            <div className="for-who">FOR Job Seekers</div>

            <div className="feature-element">
                <div className='features-icon'>
                    <img src={job} alt='job'/>
                </div>
                <div className='feature-text'>
                    <div className="feature-title">Find Job Offers and Apply</div>
                    <div className="feature-description">
                    Explore a wide range of job opportunities and easily apply to positions that match your skills and career goals. Our platform makes finding and applying for your next job straightforward and efficient.
                    </div>
                </div>
            </div>

            <div className="feature-element feature-space">
                <div className='features-icon'>
                    <img src={paper} alt='paper'/>
                </div>
                <div className='feature-text'>
                    <div className="feature-title">Resume Consulter</div>
                    <div className="feature-description">
                    Optimize your resume with our AI-powered resume consulter. Get actionable feedback on your resume’s strengths, weaknesses, and how well it aligns with job descriptions to increase your chances of landing interviews.
                    </div>
                </div>
            </div>

            <div className="feature-element feature-space">
                <div className='features-icon'>
                    <img src={lamp} alt='lamp'/>
                </div>
                <div className='feature-text'>
                    <div className="feature-title">Customized Tips and Advice for Job Applications</div>
                    <div className="feature-description">
                    Receive tailored tips and advice to enhance your job applications. From crafting compelling cover letters to preparing for interviews, our personalized guidance helps you stand out in a competitive job market.
                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}

export default OBfeature