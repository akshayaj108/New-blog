const getOtp = document.getElementById('otp');

formOtp.addEventListener('submit' , (e) =>{
    e.preventDefault();
    verifyOTP()
})


const setError = ( element, message) =>{
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element =>{
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error')

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error')
}


    function generateOTP(){
        var digits = '0123456789';
        var OTP = '';
        for (let i = 0; i < 4; i++ ) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
    console.log(OTP)   
        }

var otpConfirm = console.log(generateOTP())
 function verifyOTP(){

            const otpValue = getOtp.value.trim();
        if(otpConfirm === otpValue){
            setSuccess();
            location.href ="forget.html"
        }
        else{
         alert("Incorrect OTP")
        }
        }
       

// let user_records = new Array();
// function checkOTP(){
  
//    

// var OTP = 
// generateOTP();
//     user_records = JSON.parse(localStorage.getItem("users"));
//     user_records.push({
//         "otp":OTP,
//     });


//     if(user_records.some((v) =>{ 
//         return v.otp === otpValue;
//     })){
//    location.href= "forget.html"
//     }else{
//         alert("Incorrect OTP")
//     }
// }