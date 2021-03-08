import './index.less'

const Banner = () => {
  return (
    <div className='banner'>
      <div className='banner_content'>
        <div>
          <h2 className='banner_title'>Black Hole — Protocol</h2>
          <p
            className='banner_text'
            style={{ marginBottom: '46px', fontSize: '26px' }}
          >
            License-free Decentralized Token Burning Protocol, the Blockchain
            Ecosystem Reconfigurator for Permanent Deflation
          </p>
          <p className='banner_text'>
            Blackhole protocol is a license-free decentralized burning platform
            based on the Heco network. Any user or project governor can create a
            burning pool by holding the Blackhole protocol burning token BLACK
            with the old token LP to permanently destroy the old Token and
            generate a new Token, thus gaining a new ecological vitality.
          </p>
        </div>
        <div className='banner_btn'>
          <a>Summary</a>
          <a>Whitepaper</a>
          <a>IDO</a>
        </div>
      </div>
    </div>
  )
}

export default Banner
