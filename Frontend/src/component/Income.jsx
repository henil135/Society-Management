import React from 'react';
import balance from '../assets/total-balance.png';
import balanceRectangle from '../assets/dashboard card.png';
import income from '../assets/total-income.png';
import incomeRectangle from '../assets/dashboard card2.png';
import unit from '../assets/total-unit.png';
import unitRectangle from '../assets/dashboard card3.png';
import expense from '../assets/total-exp.png';
import expenseRectangle from '../assets/dashboard card4.png';
import balanceRactangle1 from '../assets/Rectangle 1063.png';
import incomeRactangle1 from '../assets/Rectangle 1063 (1).png'
import expRactangle1 from '../assets/Rectangle 1063 (2).png'
import unitRactangle1 from '../assets/Rectangle 1063 (3).png'
function Income() {
    return (
        <div className="container-fluid income">
            <div className="row px-4">
                {/* Total Balance Card */}
                <div className="col-lg-3 col-md-6 col-12 pt-3 px-1">
                    <div
                        className="card"
                        style={{
                            backgroundImage: `url(${balanceRectangle})`,
                            backgroundSize: 'cover',
                            backgroundRepeat:"no-repeat",
                            backgroundPosition: 'center',
                            borderRadius: '15px',
                            overflow: 'hidden',
                            height:"105px",
                            width:"100%"
                        }}
                    >
                        <div className="card-body d-flex justify-content-between align-items-center px-4 py-3">
                        <img src={balanceRactangle1} width={8} className='position-absolute start-0' />
                            <div>
                                <h6 className="card-subtitle mb-1">Total Balance</h6>
                                <p className="mb-0">₹ 2,22,520</p>
                            </div>
                            <div>
                                <img src={balance} alt="Total Balance Icon" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Total Income Card */}
                <div className="col-lg-3 col-md-6 col-12 pt-3 px-1">
                    <div
                        className="card"
                        style={{
                            backgroundImage: `url(${incomeRectangle})`,
                            backgroundSize: 'cover',
                            backgroundRepeat:"no-repeat",
                            backgroundPosition: 'center',
                            borderRadius: '15px',
                            overflow: 'hidden',
                              height:"105px",
                            width:"100%"
                        }}
                    >
                        <div className="card-body d-flex justify-content-between align-items-center px-4 py-3">
                         <img src={incomeRactangle1} width={8} className='position-absolute start-0' />
                         
                            <div>
                                <h6 className="card-subtitle mb-1">Total Income</h6>
                                <p className="mb-0">₹ 55,000</p>
                            </div>
                            <div>
                                <img src={income} alt="Total Income Icon" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Total Expense Card */}
                <div className="col-lg-3 col-md-6 col-12 pt-3 px-1">
                    <div
                        className="card"
                        style={{
                            backgroundImage: `url(${expenseRectangle})`,
                            backgroundSize: 'cover',
                            backgroundRepeat:"no-repeat",
                            backgroundPosition: 'center',
                            borderRadius: '15px',
                            overflow: 'hidden',
                              height:"105px",
                            width:"100%"
                        }}
                    >
                        <div className="card-body d-flex justify-content-between align-items-center px-4 py-3">
                        <img src={expRactangle1} width={8} className='position-absolute start-0' />
                            <div>
                                <h6 className="card-subtitle mb-1">Total Expense</h6>
                                <p className="mb-0">₹ 20,550</p>
                            </div>
                            <div>
                                <img src={expense} alt="Total Expense Icon" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Total Unit Card */}
                <div className="col-lg-3 col-md-6 col-12 pt-3 px-1">
                    <div
                        className="card"
                        style={{
                            backgroundImage: `url(${unitRectangle})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat:"no-repeat",
                            borderRadius: '15px',
                            overflow: 'hidden',
                              height:"105px",
                            width:"100%"
                        }}
                    >
                        <div className="card-body d-flex justify-content-between align-items-center px-4 py-3">
                        <img src={unitRactangle1} width={8} className='position-absolute start-0' />
                            <div>
                                <h6 className="card-subtitle mb-1">Total Unit</h6>
                                <p className="mb-0">₹ 20,550</p>
                            </div>
                            <div>
                                <img src={unit} alt="Total Unit Icon" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Income;
