import React, {useEffect, useState} from 'react'
import './sidebar.css';
import SidebarButton from './sidebarButton';
import { SlLogout } from "react-icons/sl"; 
import { IoLibrary, IoPlayCircleSharp } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import apiClient from '../spotify';



function Sidebar() {
  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdLAY3C19kL0nV2bI_plU3_YFCtra0dpsYkg&usqp=CAU"
  );
  useEffect(() => {
    apiClient.get("me").then((response) => {
      setImage(response.data.images[0].url);
    });
  }, []);

  return (
    <div className='sidebar-container'>
      <img src= {image} 
      className='profile-img' alt='Profile'/>

      <div >
        <SidebarButton title="Player" to="/musicplayer" icon={<IoPlayCircleSharp />} />
        <SidebarButton title="Library" to="/" icon={<IoLibrary />}/>
      </div>
      <SidebarButton title="Sign Out" to="" icon={<SlLogout/>}/>
    </div>
  )
}

export default Sidebar