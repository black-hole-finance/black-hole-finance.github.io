import cs from 'classnames'
import { FormattedMessage } from 'react-intl'
import './index.less'
import FiledPng from '../../../assets/image/popup/failed.svg'
import {changeNetwork} from "../../../utils";
import {ChainId} from "../../../constants";

const ChangeNetworkPopup = (props) => {
    const switchChanId = props.location.pathname.includes('investment') ? ChainId.ETH : ChainId.BSC
    return (
        <div className='change_network_popup'>
            <img src={FiledPng} />
            <p>
                <FormattedMessage id='changeNetwork_text_1' />
            </p>
            <p style={{ marginTop: '20px' }}>
                <FormattedMessage id='changeNetwork_text_2' />
            </p>
            <a
                onClick={() => {
                    changeNetwork(switchChanId).then(() => {
                    })
                }}
            >
                <FormattedMessage id='changeNetwork_text_3' />
            </a>
        </div>
    )
}

export default ChangeNetworkPopup