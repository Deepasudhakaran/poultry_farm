import React from 'react';
import './Footer.css'

const Footer = () => {
  return (
    <div>
  



{/* <div className='fbody'>
<footer>
<div class="footer">
<div class="row">
<a href="/"><i class="fa-brands fa-facebook"></i></a>
<a href="/"><i class="fa-brands fa-instagram"></i></a>
<a href="/"><i class="fa-brands fa-youtube"></i></a>
<a href="/"><i class="fa-brands fa-twitter"></i></a>
</div>

<div class="row">
<ul>
<li><a href="/">Contact us</a></li>
<li><a href="/">Our Services</a></li>
<li><a href="/">Privacy Policy</a></li>
<li><a href="/">Terms & Conditions</a></li>
<li><a href="/">Career</a></li>
</ul>
</div>

<div class="row">
<p>INFERNO Copyright © 2021 Inferno - All rights reserved || Designed By: Mahesh </p>
</div>
</div>
</footer>
</div>
       */}


<footer>

<div class="footer">
<div class="row">
<ul>
<li className='hi'><i class="fa-brands fa-facebook"></i></li>
<li className='hi'><i class="fa-brands fa-instagram"></i></li>
<li className='hi'><i class="fa-brands fa-twitter"></i></li>
</ul>

</div>


<div class="row">
<ul>
<li><a href="/">Home</a></li>
<li><a href="/">About</a></li>
<li><a href="/">Contact us</a></li>
<li><a href="/">Our Services</a></li>
<li><a href="/">Privacy Policy</a></li>

</ul>
</div><br/>


<div >&copy;<span id="year">
   </span><span> Your Company Name. All rights reserved.</span>
   </div>
   </div>
   </footer>
   
    </div>
  );
}

export default Footer;
