import React from "react";
import { useState } from "react";
import { Image, Row, Col, Input } from 'antd';

const Step2 = ({imageData, nftName, updateNftName}) => {

    // const [someState, setSomeState] = useState('');

    const onChange = event => {
        const value = event.target.value;
        updateNftName(value);
        console.log(`set value to ${value}`)
      };

    return (
        <Row>
            <div>
                <Image
                    style={{'height': '300px', 'width': '300px'}}
                    src={imageData}
                />
            </div>
        <Input onBlur={onChange} style={{'marginBottom': '12px', 'width': '100%'}} placeholder="Name Your NFT" />
        </Row>
    )
}

export default Step2;
