import { useState } from 'react';

import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IoEyeSharp } from "react-icons/io5";

import profileimg from '../../assets/profile.png';
import pollImg from '../../assets/poll-icon.png';
import ResidentSidebar from '../layout/ResidentSidebar';
import Header from '../Navbar';

const Polls = () => {
    const [note, setNote] = useState([
        { id: 1, option: 'Multichoice Polls', que: 'Sales Deal with Toyota - Azure HF - AMS Amplify?', options: [{ text: 'Yes', votes: 90 }, { text: 'No', votes: 10 }], date: '01/07/2024', time: '10:00 AM' },
        { id: 2, option: 'Multichoice Polls', que: 'Sales Deal with Toyota - Azure HF - AMS Amplify?', options: [{ text: 'Yes', votes: 90 }, { text: 'No', votes: 10 }], date: '01/07/2024', time: '10:00 AM' },
        { id: 3, option: 'Multichoice Polls', que: 'Sales Deal with Toyota - Azure HF - AMS Amplify?', options: [{ text: 'Yes', votes: 90 }, { text: 'No', votes: 10 }], date: '01/07/2024', time: '10:00 AM' },
        { id: 4, option: 'Multichoice Polls', que: 'Sales Deal with Toyota - Azure HF - AMS Amplify?', options: [{ text: 'Yes', votes: 90 }, { text: 'No', votes: 10 }], date: '01/07/2024', time: '10:00 AM' },
    ]);

    const [show, setShow] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [userVotes, setUserVotes] = useState({});

    const handleVote = (pollId, optionText) => {
        const updatedNotes = [...note];
        const pollIndex = updatedNotes.findIndex((poll) => poll.id === pollId);
        const poll = updatedNotes[pollIndex];

        const userVote = userVotes[pollId];
        if (userVote) {
            const previousOptionIndex = poll.options.findIndex((opt) => opt.text === userVote);
            poll.options[previousOptionIndex].votes -= 1;

            if (userVote === optionText) {
                delete userVotes[pollId];
                setUserVotes({ ...userVotes });
                setNote(updatedNotes);
                return;
            }
        }

        const selectedOptionIndex = poll.options.findIndex((opt) => opt.text === optionText);
        poll.options[selectedOptionIndex].votes += 1;

        setUserVotes({ ...userVotes, [pollId]: optionText });
        setNote(updatedNotes);
    };

    const handleClose = () => {
        setShow(false);
        reset();
    };

    const handleShow = () => setShow(true);

    const onSubmit = (data) => {
        const newPoll = {
            id: note.length + 1,
            option: data.pollType || 'Custom Poll',
            que: data.que,
            options: [
                { text: data.option1, votes: 0 },
                { text: data.option2, votes: 0 },
            ],
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
        };
        setNote([...note, newPoll]);
        handleClose();
    };

    return (
        <div className="d-flex flex-column flex-md-row">
            <div className="flex-shrink-0">
                <ResidentSidebar/>
            </div>
            <div className="dashboard-bg">
                <Header />
                <div className="stickyHeader">
                    <div className="income marginLeft w-100" >
                        <div className="row p-4">
                            <div className=" rounded pb-3">
                                <Link to="/Polls" className="btn btn-sm maintainance-income-btn maintainance-income-btn-bg">Own Poll</Link>
                                <Link className="btn btn-sm maintainance-income-btn maintainance-income-btn-withoutbg">New Poll</Link>
                                <Link className="btn btn-sm maintainance-income-btn maintainance-income-btn-withoutbg">Previous Poll</Link>

                                <div className="bg-light">
                                    <div className="d-flex justify-content-between align-items-center p-3">
                                        <h3 className=" mb-0 financial-income-title">Polls</h3>
                                        <button className="set-maintainance-btn d-flex align-items-center other-income-btn p-2" onClick={handleShow}>
                                            Create Polls
                                        </button>
                                    </div>

                                  
                                    {show && (
                                        <div className="modal fade show d-block custom-modal" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                                            <div className="modal-dialog modal-dialog-centered">
                                                <div className="modal-content">
                                                    <h5 className="modal-title Modal-Title p-3 text-start">Create Poll</h5>
                                                    <form onSubmit={handleSubmit(onSubmit)}>
                                                        <div className="modal-body">
                                                            <div className="mb-3">
                                                                <label className="form-label">Poll Type</label>
                                                                <select className="form-select" {...register("pollType")}>
                                                                    <option value="">Select Poll Type</option>
                                                                    <option value="Multichoice Poll">Multichoice Polls</option>
                                                                    <option value="Ranking Poll">Ranking Polls</option>
                                                                    <option value="Rating polls">Rating polls</option>
                                                                    <option value="Numeric polls">Numeric polls</option>
                                                                    <option value="Text polls">Text polls</option>
                                                                </select>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Question <span className="text-danger">*</span></label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter your question"
                                                                    {...register("que", { required: true })}
                                                                />
                                                                {errors.que && <span className="text-danger">Question is required</span>}
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Option 1 <span className="text-danger">*</span></label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter option 1"
                                                                    {...register("option1", { required: true })}
                                                                />
                                                                {errors.option1 && <span className="text-danger">Option 1 is required</span>}
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Option 2 <span className="text-danger">*</span></label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter option 2"
                                                                    {...register("option2", { required: true })}
                                                                />
                                                                {errors.option2 && <span className="text-danger">Option 2 is required</span>}
                                                            </div>
                                                        </div>
                                                        <div className="px-3 pb-3 d-flex justify-content-between">
                                                            <button type="button" className="btn btn-sm cancle" onClick={handleClose}>Cancel</button>
                                                            <button type="submit" className="btn btn-sm save">Create</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="row px-3">
                                        {note.map((poll) => (
                                            <div className="col-12  col-md-6 col-lg-3 pt-0" key={poll.id}>
                                                <div className="poll-card">
                                                    <div className="poll-card-header d-flex justify-content-between align-items-center">
                                                        <div className="d-flex">
                                                            <img src={profileimg} className="me-2" height={40} />
                                                            <div>
                                                                <h6 className="poll-author text-primary">Arlene McCoy</h6>
                                                                <p className="poll-type">{poll.option}</p>
                                                            </div>
                                                        </div>
                                                        <div className="poll-points bg-primary rounded px-2 d-flex align-items-center">
                                                            <IoEyeSharp className="text-light" />
                                                            <span className="badge px-1" style={{ fontSize: '14px' }}>20</span>
                                                        </div>
                                                    </div>
                                                    <div className="poll-question">
                                                        <p>{poll.que}</p>
                                                    </div>
                                                    <div className="poll-options">
                                                    <p className="poll-instruction"><img src={pollImg} className="me-1 mb-2" />Select one or more</p>
                                                        {poll.options.map((option, i) => {
                                                            const totalVotes = poll.options.reduce((acc, opt) => acc + opt.votes, 0);
                                                            const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                                                            const progressBarColor = percentage > 50 ? 'green' : 'red';

                                                            return (
                                                                <div className="poll-option" key={i}>
                                                                    <label>
                                                                        <input
                                                                            type="radio"
                                                                            name={`poll-${poll.id}`}
                                                                            value={option.text}
                                                                            checked={userVotes[poll.id] === option.text}
                                                                            onChange={() => handleVote(poll.id, option.text)}
                                                                        />{' '}
                                                                        {option.text}
                                                                        <div className="poll-progress">
                                                                            <div
                                                                                className="poll-bar"
                                                                                style={{ width: `${percentage}%`, backgroundColor: progressBarColor }}
                                                                            ></div>
                                                                        </div>
                                                                        <span className="poll-votes">{option.votes}</span>
                                                                    </label>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                    <div className="poll-footer d-flex justify-content-end">
                                                        <p className="poll-date">{poll.date} {poll.time}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Polls;
