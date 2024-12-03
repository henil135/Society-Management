import React, { useState } from 'react'
import ResidentSidebar from '../layout/ResidentSidebar'
import Navbar from '../Navbar'
import Avatar from '../../assets/Avatar.png'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const ActivityParticipation = () => {


  const [complaint, setComplaint] = useState([
    { img: Avatar, complainer: 'Evelyn Harper', des: 'Event and recreational activities.', time: '2:45 PM', date: '01/02/2024', eventName: 'Holi Festival' },
    { img: Avatar, complainer: 'Evelyn Harper', des: 'Event and recreational activities.', time: '2:45 PM', date: '01/02/2024', eventName: 'Holi Festival' },
    { img: Avatar, complainer: 'Evelyn Harper', des: 'Event and recreational activities.', time: '2:45 PM', date: '01/02/2024', eventName: 'Holi Festival' },
    { img: Avatar, complainer: 'Evelyn Harper', des: 'Event and recreational activities.', time: '2:45 PM', date: '01/02/2024', eventName: 'Holi Festival' },
    { img: Avatar, complainer: 'Evelyn Harper', des: 'Event and recreational activities.', time: '2:45 PM', date: '01/02/2024', eventName: 'Holi Festival' },
    { img: Avatar, complainer: 'Evelyn Harper', des: 'Event and recreational activities.', time: '2:45 PM', date: '01/02/2024', eventName: 'Holi Festival' },
    { img: Avatar, complainer: 'Evelyn Harper', des: 'Event and recreational activities.', time: '2:45 PM', date: '01/02/2024', eventName: 'Holi Festival' },
    { img: Avatar, complainer: 'Evelyn Harper', des: 'Event and recreational activities.', time: '2:45 PM', date: '01/02/2024', eventName: 'Holi Festival' },
    { img: Avatar, complainer: 'Evelyn Harper', des: 'Event and recreational activities.', time: '2:45 PM', date: '01/02/2024', eventName: 'Holi Festival' },
    { img: Avatar, complainer: 'Evelyn Harper', des: 'Event and recreational activities.', time: '2:45 PM', date: '01/02/2024', eventName: 'Holi Festival' },
    { img: Avatar, complainer: 'Evelyn Harper', des: 'Event and recreational activities.', time: '2:45 PM', date: '01/02/2024', eventName: 'Holi Festival' },
    { img: Avatar, complainer: 'Evelyn Harper', des: 'Event and recreational activities.', time: '2:45 PM', date: '01/02/2024', eventName: 'Holi Festival' },
  ])

  return (
    <div className='dashboard-bg w-100' >
      <ResidentSidebar />
      <Navbar />

      <div className="stickyHeader marginLeft">
        <div className='container-fluid '>

          <div className='row p-4'>
            <div className="table-responsive rounded pb-3">

              <Link to="/events-and-participation" className='btn btn-sm maintainance-income-btn maintainance-income-btn-withoutbg complaint-btn'>Events Participate</Link>

              <Link to="/activity-and-participation" className='btn btn-sm maintainance-income-btn maintainance-income-btn-bg complaint-btn'>Activity Participate</Link>

              <div className="table-responsive rounded custom-scrollbar" style={{
                maxHeight: '730px',
                overflowY: complaint.length > 10 ? 'scroll' : 'hidden',
              }}>

                <div className='bg-light'>
                  <h3 className=' mb-0 py-3 ps-3 financial-income-title'>Events Participation</h3>
                  <div className='px-3' style={{ overflowX: 'auto' }}>

                    <table className="table">
                      <thead className='table-primary'>
                        <tr style={{ height: '55px' }}>
                          <th scope="col"> Participator Name</th>
                          <th scope="col">Description</th>
                          <th scope="col">Activity Time</th>
                          <th scope="col">Activity Date</th>
                          <th scope="col">Activity Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          complaint.map((val, index) => {
                            return (
                              <tr key={index} className='bg-light'>
                                <td><img src={val.img} className='me-2' height={40} />{val.complainer}</td>
                                <td>{val.des}</td>
                                <td>
                                  <div
                                    style={{
                                      width: "92px",
                                      height: "34px",
                                      padding: "5px 15px",
                                      gap: "10px",
                                      borderRadius: "50px",
                                      backgroundColor: "#F6F8FB",
                                      color: "#4F4F4F",
                                      display: "inline-block",
                                    }}
                                  >
                                    {val.time}
                                  </div>
                                </td>

                                <td>{val.date}</td>

                                <td>{val.eventName}</td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivityParticipation
