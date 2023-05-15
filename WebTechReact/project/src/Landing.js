import React from 'react'
import { Link } from 'react-router-dom'
import "./Landing.css"
import JuitLOGO from "./Logo.png"
import Footer from './Footer'


function Landing() {
    return (
        <>
            <div className="LandingContainer">
                <div className='HeaderLanding'>
                    <div className='LandingLogo'><img id='LandingLogo' src={JuitLOGO} /></div>
                    <div className='LandingHeaderTexts'>
                        <div className='PPHeadingLanding'>
                            <b> Time Table</b>
                        </div>
                        <div className='JUITHeadingLanding'>
                            Jaypee University Of Information Technology , Solan.
                        </div>
                    </div>
                    <div className='LoginPageButtonLanding'>4th Semester</div>
                </div>                               
            </div>
            
        </>
    )
}

export default Landing