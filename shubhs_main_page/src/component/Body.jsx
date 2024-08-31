import React from 'react';
import styles from './Body.module.css'; // Import the CSS Module

const Body = () => {
  return (
    <div className={styles.bodyContainer}>
      <header className={styles.bodyHeader}>
        <h1>Welcome to shubhs9162</h1>
      </header>
      <main className={styles.bodyContent}>
        <section id="history-of-shubhs" className={styles.bodySection}>
          <div className={styles.bodyText}>
            <h2>History of shubh_profile</h2>
            <p>
            Founded in 2022, shubhs Studios became a trailblazing entity in the entertainment world, dedicated to merging cutting-edge technology with engaging storytelling. The company set out with a clear vision to create outstanding gaming experiences that connect with audiences on a global scale.
            <br /><br />
               shubhs's initial triumph was marked by the launch of Temple Run, a revolutionary mobile game that reshaped the endless runner genre. The game's blend of dynamic mechanics, user-friendly controls, and immersive settings enthralled players globally, catapulting Imangi to the pinnacle of mobile gaming. Temple Run swiftly became a cultural icon, earning numerous awards and recognition.
              <br /><br />
               As the company grew, shubhs continued to break new ground in interactive entertainment. Their portfolio expanded to encompass a range of captivating and inventive games, each defined by a dedication to top-tier design and user experience. The studio's success lies in its capacity to adapt to changing technology and market dynamics, ensuring that every new release embodies the latest gaming innovations.
              <br /><br />
               Beyond game development, shubhs has also ventured into other domains of digital entertainment, forging partnerships with leading brands and media entities. The company's commitment to excellence and creativity has positioned it as a key player in the industry, renowned for delivering unforgettable experiences.
               <br /><br />
               Today, shubhs Studios stands as a symbol of innovation and storytelling. With a committed team and a drive for innovation, Imangi continues to influence the future of entertainment, crafting memorable experiences for audiences worldwide. As the company looks ahead, it remains dedicated to exploring new opportunities and setting benchmarks in the realm of interactive media.

            </p>
          </div>
          <img src="m1.webp" alt="History of shubhs_profile"/>
        </section>
        <section id="our-vision" className={styles.bodySection}>
          <div className={styles.bodyText}>
            <h2>Our Vision</h2>
            <p>
              At shubhs Studios, our vision is to lead the entertainment industry through innovation and creativity. We aim to craft immersive experiences that captivate and inspire a global audience, blending cutting-edge technology with exceptional storytelling. Our goal is to stay ahead of industry trends, continually delivering high-quality, engaging products that resonate with users.
              <br /><br />
              We are committed to exploring new technologies and fostering a culture of creativity within our team. By embracing new challenges and ideas, we strive to set new standards in interactive entertainment. As we move forward, shubhs remains dedicated to shaping the future of digital media and making a lasting impact through groundbreaking experiences.
            </p>
          </div>
          <img src="m2.jpg" alt="Our Vision" />
        </section>
      </main>
    </div>
  );
};

export default Body;
