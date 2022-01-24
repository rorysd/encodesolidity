import { Image, Button } from 'antd';
import { useState } from 'react';
import { ImagePicker } from 'react-file-picker'


const Step1 = ({updateImage, imageData, currentStep, setCurrentStep}) => {

    return (
        <div>
        {/* {imageData === '' ? '': <Image width={'100%'} src={imageData}/>} */}
        <ImagePicker
        extensions={['jpg', 'jpeg', 'png']}
        dims={{minWidth: 100, maxWidth: 110000, minHeight: 100, maxHeight: 4100}}
        onChange={(base64) => {
            updateImage(base64)
            setCurrentStep(currentStep + 1)
        }}
        onError={(errMsg) => (console.log(errMsg))}
        >
        <Button style={{'height': '55vh', 'marginBottom': '5px'}} type="dashed" block>Select Image</Button>
        </ImagePicker>
        </div>
    );
}

export default Step1;