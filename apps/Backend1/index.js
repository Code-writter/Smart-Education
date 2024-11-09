import express from  "express"
import dotenv, { config } from 'dotenv'
import multer from "multer"
import cors from "cors"
// import path from "path"
// import fs from 'fs'
import admin from 'firebase-admin'
import serviceAccount from './adminCredential.json' assert {type  : 'json'}
import { getStorage} from "firebase-admin/storage"


dotenv.config()

const app = express();

const storage = multer.memoryStorage()

const upload = multer({ storage });

const firebaseConfig = {
    credential : admin.credential.cert(serviceAccount),
    storageBucket : 'smart-education-ee682.appspot.com'
}

app.use(cors({
    origin :["http://localhost:5173","http://localhost:3000"],
    credentials : true
}))
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use("./public/temp", express.static("uploads"))

const PORT = process.env.PORT || 3000

const fireApp = admin.initializeApp(firebaseConfig)

app.post('/upload', upload.single('video'), (req, res) => {
    const file = req.file;
    const videoRef = admin.storage().bucket().file(`${file.originalname}`);
    videoRef.save(file.buffer, { contentType: file.mimetype }, async (err) => {
        if (err) {
            console.error('Error uploading video:', err);
            res.status(500).send({ message: 'Failed to upload video' });
        } else {
            try {
                await videoRef.makePublic();
                const publicUrl = `https://storage.googleapis.com/${videoRef.bucket.name}/${videoRef.name}`;
                
                res.send({ message: 'Video uploaded successfully', url: publicUrl });
            } catch (error) {
                console.error('Error making video public:', error);
                res.status(500).send({ message: 'Failed to make video public' });
            }
        }
    });
});


// const fireApp = initializeApp(firebaseConfig)
const firebaseStorage = getStorage(fireApp);
const listRef = ref(firebaseStorage, 'files/uid')

app.get('/videos', () => {

    listAll(listRef)
    .then((res) => {
        res.prefixes.forEach((folderRef) => {
            const list = folderRef.fullPath()
            console.log( "LIst", list)
            console.log("Folder Ref : ", folderRef);
            
        })

        res.items((itemsRef) => {
            console.log("Iteam Ref : ", itemsRef)
        })
    }).catch((error) => {
        console.log("Something went wrong while fetching the data ", error)
    })

})

// app.post('/upload', upload.single('video'), (req, res) => {
//     const file = req.file;
//     const videoRef = admin.storage().bucket().file(`${file.originalname}`);
//     videoRef.save(file.buffer, { contentType: file.mimetype }, (err) => {
//       if (err) {
//         console.error('Error uploading video:', err);
//         res.status(500).send({ message: 'Failed to upload video' });
//       } else {
          
//         res.send({ message: 'Video uploaded successfully' });
//       }
//     });
// });
  

app.get("/", (req, res) => {
    return res.json({
        msg :"Every thing is good"
    })
})

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})
