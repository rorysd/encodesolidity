console.log("hello console")

function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }


function uploadFile(data){
$.ajax({
    type:"POST",
    url:'/ipfs',
    data:{uploadText:data},
    success:function(responsedata){
            console.log(responsedata.cid)
            document.getElementById('uploadTextField').value = ''
            document.getElementById('returnedCID').value = responsedata.cid
    }
    })
}

function AddText(){
    myvalue = document.getElementById('uploadTextField').value
    uploadFile(myvalue)
}

async function AddImage(){
    target = document.getElementById('uploadImageField')
    const uploadedImageBase64 = await convertFileToBase64(target.files[0])
    //console.log(uploadedImageBase64)
    uploadFile(uploadedImageBase64)
}

function retrieveData(cid){

    mycid = document.getElementById('searchCID').value

    $.ajax({
        type:"GET",
        url:`/ipfs?cid=${mycid}`,
        success:function(responsedata){
                console.log(responsedata.data)

                if (responsedata.data.startsWith('data:image')){
                    console.log('retrieved image')
                    document.getElementById('responseContainerText').style.visibility = 'hidden'
                    document.getElementById('responseContainerImage').style.visibility = 'visible'
                    document.getElementById('responseHeaderText').innerHTML = ''
                    document.getElementById('readImage')
                        .setAttribute(
                            'src', responsedata.data
                        );
                } else {
                    console.log('retrieved text')
                    document.getElementById('responseContainerImage').style.visibility = 'hidden'
                    document.getElementById('responseContainerText').style.visibility = 'visible'
                    document.getElementById('readImage')
                        .setAttribute(
                            'src', ''
                        );
                    document.getElementById('responseHeaderText').innerHTML = "Response: " + responsedata.data
                }
        }
        })
}