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
                        <p id="passage">Our delicious cake is a form of sweet food made from flour, sugar, and other ingredients, that is usually baked.</p>
                    </div>

                    <div className="col-12 col-sm-4" id="card2">
                        <img src='https://connectusfund.org/wp-content/uploads/2017/12/advantages-and-disadvantages-of-poultry-farming.png' id="card-img" alt="..." />
                        <h3>Layer</h3>
                        <p id="passage">Our pestries collection brings together all of the delicious individual treats that showcase the pestries art.</p>
                    </div>



                    <div className="col-12 col-sm-4" id="card3">
                        <img src='https://static.wixstatic.com/media/beaaa8_38053f98b0fc4f60a31e63050a7184be~mv2.jpeg/v1/fit/w_900%2Ch_600%2Cal_c%2Cq_80/file.jpeg' id="card-img" alt="..." />
                        <h3>Breeder</h3>
                        <p id="passage">Our desert cakes all make the perfect final to a meal served with lashing of cream for even more indulgence.</p>
                    </div>
                </div>
            </div>
           
      </div>
        </div>
    )
}

export default Homepage
