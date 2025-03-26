import React from 'react'

const SideBar = (props) => {
  const { toggleModel, data } = props
  return (
    <div className='sidebar'>
      <div onClick={toggleModel}
        className="bgOverlay"></div>
      <div className="sidebarContent">
        <h2>{data?.title}</h2>
        <div className='descriptionContainer'>
          <p className='descriptionTitle'>{data?.date}</p>
          <p>{data?.explanation}</p>
        </div>
        <button onClick={toggleModel}><span className="material-symbols-outlined">
          arrow_back_ios
        </span></button>
      </div>
    </div>
  )
}

export default SideBar
