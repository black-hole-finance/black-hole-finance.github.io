import './index.less'
import SketchMap from '../../../assets/image/sketch_map@2x.png'
const Home = () => {
  return (
    <>
      <div className='home'>
        <h2 className='home_title'>
          Governance token BLACK token black hole deflation burning mechanism
          schematic
        </h2>
        <div className='home_content'>
          <p className='home_content_text'>
            The creator holds X tokens and Black's liquidity to create a black
            hole burn pool without a license, in which they can invest new
            tokens Y to incentivize the burn. 80% of the actual burn volume is
            also used by Black to incentivize the burn.
          </p>
          <img className='home_sketch_map' src={SketchMap} />
        </div>
      </div>
      <div className='roadmap'>
        <h2 className='roadmap_title'>Roadmap</h2>
        <p className='roadmap_timeline'>
          <span></span>
          <span></span>
          <span></span>
        </p>
        <div className='roadmap_card'>
          <div className='roadmap_card_content'>
            <h3>2021Q2</h3>
            <p className='roadmap_card_text'>
              Perform IDO to generate initial circulation
            </p>
            <p className='roadmap_card_text'>
              Go live with liquidity farming pool
            </p>
            <p className='roadmap_card_text'>
              Go live with single token burning protocol
            </p>
            <p className='roadmap_card_text'>
              Go live with liquidity token burning protocol
            </p>
          </div>
          <div className='roadmap_card_content'>
            <h3>2021Q3</h3>
            <p className='roadmap_card_text'>
              Goes live with cross-chain aggregated burning protocols (
              Ethereum, Polka, BSC, Heco, etc.)
            </p>
            <p className='roadmap_card_text'>
              Launch of the initial burning offering platform (IBO)
            </p>
            <p className='roadmap_card_text'>
              Go live Token governance platform
            </p>
          </div>
          <div className='roadmap_card_content'>
            <h3>2021Q4</h3>
            <p className='roadmap_card_text'>
              Start V2 Black Hole Protocol version - Big Disruption.
            </p>
          </div>
        </div>
      </div>
      <div className='i_do'>
        <h2 className='i_do_title'>IDO</h2>
        <div className='enter_pool'>
          <div className='enter_pool_card'></div>
          <div className='enter_pool_card'></div>
        </div>
      </div>
    </>
  )
}

export default Home
