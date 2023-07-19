import React from 'react'
import { useNavigate } from 'react-router-dom'

const Intermediate_Sign_Up_Page = () => {
    let navigate = useNavigate();
    
    const handleMusicianClick = () => {
        navigate('/Sign_Up_Musician');
      };
    
      const handleEventPlannerClick = () => {
        navigate('/Sign_Up_Event_Planner');
      };
    
    return (
        <div>
            <button id = 'musicSignUp' onClick = { handleMusicianClick }>Musician</button>
            <button id = 'eventSignUp' onClick = { handleEventPlannerClick }>Event Planner</button>
        </div>
    )
}

export default Intermediate_Sign_Up_Page;