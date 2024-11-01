import express from  "express"
import dotenv, { config } from 'dotenv'
import multer from "multer"
import {v4 as uuidv4} from 'uuid'
import cors from "cors"
import path from "path"
import fs from 'fs'
import { exec } from "child_process"
import { error } from "console"
import { stderr, stdout } from "process"


dotenv.config()

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/temp');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname-`${uuidv4()}-${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
    const lessonId = uuidv4()
    const videoPath = req.file.path
    const outputPath = `./public/temp/${lessonId}`
    //m3u8 means convert video in UTF-8 encoded playlist file
    const hlsPath = `${outputPath}/index.m3u8`

    if(!fs.existsSync(outputPath)){
        fs.mkdirSync(outputPath, {recursive : true})
    }

    // FFMPEG command

    const FFMPEG_command = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}`


    // TODO:  No queue because of prove of concept not to be used in production
    exec(FFMPEG_command,( error, stdout, stderr ) =>{
        if(error){
            console.log(`exec error : ${error}`)
        }
        console.log(`stdout : ${stdout}`)
        console.log(`stderr : ${stderr}`)

        const videoUrl = `http://localhost:8787/public/temp/${lessonId}/index.m3u8`

        return res.json({
            msg : "Video conveted to HLS format",
            videoUrl : videoUrl
        })
    })

    try {
        res.status(200).json({
            message: 'File uploaded successfully',
            file: req.file
        });
    } catch (error) {
        res.status(400).json({
            message: 'File upload failed',
            error: error.message
        });
    }
});

app.use(cors({
    origin :["http://localhost:5173","http://localhost:3000"],
    credentials : true
}))
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use("./public/temp", express.static("uploads"))

app.use((req, res, next) => {
    res.header("Access-Controll-Allow-Origin", "*") // Bad practice
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With", "Content-Type", "Accept"
    )
    next();
})

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
    return res.json({
        msg :"Every thing is good"
    })
})

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})
