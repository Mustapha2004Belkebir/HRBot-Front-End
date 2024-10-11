import React from 'react'
import './OBacheivment.css';
import smily from '../assets/images/smilyFace.png';
import building from '../assets/images/building.png';
import cloudJob from '../assets/images/cloudJob.png';
import businessPerson from '../assets/images/BusinessPerson.png';

function OBacheivment() {
  return (
    <div className="our-achievement">
        <div className='OB-head'>
            <div className="OB-title">Our Achievement</div>
            <div className="acheivment-line"></div>
        </div>

        <div className='acheivment-body'>
            <div className="acheivment-description">We’re proud of the impact we’ve made:</div>

            <div className='acheivment-main'>
                <div className="one-acheivment">
                    <img src={building} alt='building' className='building-icon'/>
                    <div>
                        <div className="stat-number">500+</div>
                        <div className="stat-description">HRs</div>   
                    </div>
                    
                </div>

                <div className="one-acheivment">
                    <img src={cloudJob} alt='cloud job' className='cloud-icon'/>
                    <div>
                        <div className="stat-number">1,200+</div>
                        <div className="stat-description">Job posts</div>
                    </div>
                </div>

                <div className="one-acheivment">
                    <img src={businessPerson} alt='business person' className='business-icon'/>
                    <div>
                        <div className="stat-number">10,000+</div>
                        <div className="stat-description">Job applicants</div>
                    </div>
                </div>

                <div className="one-acheivment">
                    <img src={smily} alt='smily' className='smily-icon'/>
                    <div>
                        <div className="stat-number">98%</div>
                        <div className="stat-description">Client satisfaction rate</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OBacheivment