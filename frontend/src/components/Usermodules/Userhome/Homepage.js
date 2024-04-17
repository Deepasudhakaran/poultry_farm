import React from 'react'
import './Userhome.css';

const Homepage = () => {
    return (
        <div>
            <div className='main'>
          <div className='uhome'>
            <div className='home'>
            <h1>POULTRY FARM MANAGEMENT SYSTEM</h1>
            </div>
          </div>

         
          <div>
            <img  className='uimage' src='https://image.winudf.com/v2/image/Y29tLmFuZHJvbW8uZGV2MjY2Mjk5LmFwcDYxOTA4M19zY3JlZW5fMTBfdmFpMDN3YWM/screen-10.jpg?fakeurl=1&type=.jpg' alt=''/>
          </div>
          <div className=" text-center">
                <div className="row">
                    <div className="col-12 col-sm-4" id="card1">
                        <img src='https://tse4.mm.bing.net/th?id=OIP.2UhhzKPY0nEbnF4bJLvixgHaE5&pid=Api&P=0&h=180' id="card-img" alt="..." />
                        <h3>Broiler</h3>
                        <p id="passage">Poultry broiler module in ERP software comes with day old chick batch-in, standard feed program for pre-starter, starter and finisher feeds, 0.2% mortality alert, FCR comparison, lifting for sales or processing plant transfer features with a fully integrated business modules like purchase, sales, inventory, and accounts. Capture daily broiler farm data on your smartphone with easy to use mobile application.</p>
                    </div>

                    <div className="col-12 col-sm-4" id="card2">
                        <img src='https://tse1.mm.bing.net/th?id=OIP.qIi3LlxXX2R1OJh_J9YXZQAAAA&pid=Api&P=0&h=180' id="card-img" alt="..." />
                        <h3>Layer</h3>
                        <p id="passage">Poultry layer module in ERP software cares every stage of bird from brooding (chick/grower), layer to culling with proper feed formulation, mortality tracking, shell week analysis, egg production, egg grading to sales features with a fully integrated business modules like purchase, sales, inventory, and accounts. Capture daily layer farm data on your smartphone with easy to use mobile application.</p>
                    </div>



                    <div className="col-12 col-sm-4" id="card3">
                        <img src='https://static.wixstatic.com/media/beaaa8_38053f98b0fc4f60a31e63050a7184be~mv2.jpeg/v1/fit/w_900%2Ch_600%2Cal_c%2Cq_80/file.jpeg' id="card-img" alt="..." />
                        <h3>Breeder</h3>
                        <p id="passage">Poultry breeder module which covers entire breeder life cycle from placement, feed program, egg collection to hatchery in a fully integrated business modules like purchase, sales, inventory, and accounts. Capture daily breeder farm data on your smartphone with easy to use mobile application, track birds health and production performance using analysis reports and graphs, improve efficiency of overall operation, and grow your profit</p>
                    </div>
                </div>
            </div>
           
      </div>
        </div>
    )
}

export default Homepage
