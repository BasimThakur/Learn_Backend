import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) { // er are using multer to handle file uploads

    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) // Generate a unique suffix
    
        
      // Generate a unique filename using the original name and the unique suffix
      cb(null, file.originalname)  //we can use the original name or generate a unique one
    }   
  })
  
 export const upload = multer({storage})