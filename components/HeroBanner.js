import React from 'react'
import Link from 'next/link';
import Image from 'next/image'

import { urlFor } from '../lib/client';


const HeroBanner = ({ heroBanner }) => {
  // console.log({heroBanner})
  // console.log(urlFor(heroBanner.image.asset._ref))

  return (
    <div className="hero-banner-container">

      {/* <Image 
        src={"https://cdn.sanity.io/images/4zfw1a5k/production/369c62c7f4fbc4bf2b43ed4b9ecb7ab7e8ef6ee9-1555x1037.jpg?w=2000&fit=max&auto=format"}
        alt="background"
        fill
        quality={80}
        style={{objectFit:"cover", opacity: .8}}
      />
       */}
      <p className="hero-heading">{heroBanner.smallText}</p>
      <h3>{heroBanner.midText}</h3>
      <img src={urlFor(heroBanner.image.asset._ref)} alt="headphones" className="hero-banner-image" />

      {/* <div style={{
          backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/e/e0/Grass_at_a_lawn_with_morning_dew_02.jpg")`,
          height: '100vh',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}/> */}
      
      <div className="hero-desc">
        <h5>Description</h5>
        <p>{heroBanner.desc}</p>
      </div>
      
    </div>
  )
}

export default HeroBanner