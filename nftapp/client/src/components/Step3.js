import { Result, Button } from 'antd';
import { useState } from 'react';

const Step3 = ({nftName}) => {
    const title = 'Successfully Minted your NFT called ' + nftName
    return (
        <Result
        status="success"
        title={title}
        subTitle="Transaction ID xxxxxxxx, view transaction here"
      />
    )
}

export default Step3;