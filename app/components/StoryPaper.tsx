'use client'

export default function StoryPaper() {
  return (
    <div className="story-paper-wrapper">
      <div className="story-paper">
        <div className="paper-holes">
          <div className="hole"></div>
          <div className="hole"></div>
          <div className="hole"></div>
        </div>
        <div className="paper-content">
          <h2 className="paper-title">Our Story.</h2>
          <div className="paper-underline"></div>
          
          <p className="paper-body">It started with a simple idea —</p>
          <p className="paper-body">what if breakfast felt like a</p>
          <p className="paper-body paper-emphasis">love letter?</p>
          
          <p className="paper-body" style={{ marginTop: '1.5rem' }}>French Toast opened its doors in</p>
          <p className="paper-body">Panampilly Nagar, Kochi.</p>
          <p className="paper-body">A little space that felt like home.</p>
          
          <p className="paper-body" style={{ marginTop: '1.5rem' }}>Every dish — made fresh, that</p>
          <p className="paper-body">morning. Nothing from a packet.</p>
          <p className="paper-body">Nothing microwaved. We mean it.</p>
          
          <p className="paper-body" style={{ marginTop: '1.5rem' }}>Kochi told its friends. Word spread.</p>
          <p className="paper-body">And this little nook became a</p>
          <p className="paper-body">neighbourhood institution.</p>
          
          <div className="paper-divider"></div>
          
          <p className="paper-signature">The French Toast Team</p>
          <p className="paper-location">Panampilly Nagar · Kacheripady, Kochi</p>
        </div>
        <div className="paper-doodles">
          <span className="doodle doodle-1">☕</span>
          <span className="doodle doodle-2">♥</span>
          <span className="doodle doodle-3">✦</span>
        </div>
      </div>
    </div>
  )
}
