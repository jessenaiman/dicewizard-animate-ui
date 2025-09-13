import Link from 'next/link';
import './start-building.css';

const StartBuilding = () => {
  return (
    <section className="start-building-section">
      <div className="start-building-container">
        <div className="start-building-card">
          <h2 className="start-building-title">Explore My Work</h2>
          <p className="start-building-subtitle">Interactive UI, motion systems, and scalable component design</p>

          <Link href="https://github.com/jessenaiman?tab=repositories" className="start-building-button" target="_blank" rel="noreferrer noopener">
            View Projects on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StartBuilding;
