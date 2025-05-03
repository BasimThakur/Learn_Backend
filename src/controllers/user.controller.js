import {asyncHandler} from '../utils/asyncHandler.js';

const registerUser = asyncHandler(async (req, res) =>{
    res.status(200).json({
        message: "Khush ho jao bhaii! API hit hogayi h!"
    })
})

export {registerUser}