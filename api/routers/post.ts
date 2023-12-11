import { Router } from "express";
import multer from "multer";
import { Pool } from "../server";
import { MysqlError } from "mysql";
import { S3 } from "aws-sdk";

//types
import { postType } from "../types/postTypes";
import { userType } from "../types/userTypes";

export const postRouter = Router();

//S3のインスタンス作成
const s3 = new S3();
const bucketName = process.env.AWS_BUCKET_NAME || "";

//Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

postRouter.post("/post", upload.single('image'), async (req, res) => {
    const fileData: Express.Multer.File | undefined = req.file;
    const data = req.body;
    console.log(data);

    return res.status(200).json({ message: "OK" });

    // Pool.getConnection((err, con) => {
    //     if (err) return res.status(500).json({ message: "ユーザーの取得ができません" });

    //     const sql = `SELECT * FROM User WHERE email = ?`;
    //     con.query(sql, [email], (err: MysqlError | null, results: userType[]) => {
    //         if (err) return res.status(500).json({ message: "ユーザーの取得に失敗しました" });
            
    //         const userIcon = results[0].iconUrl;
    //         const userName = results[0].username;
            
    //         const now = new Date(Date.now());
    //         const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');

    //         const imageUrl = "";
    //         const goodUsers = "";
            
    //         const postSql = `INSERT INTO Post 
    //         (
    //             username, usericon, title, description, imageUrl, created_at, good_users, uid
    //         ) VALUES (
    //             ?, ?, ?, ?, ?, ?, ?, ?
    //         )`;
    //         con.query(postSql, [userName, userIcon, title, description, imageUrl, formattedDate, goodUsers, uid], (err) => {
    //             if (err) return res.status(500).json({ message: "投稿内容の登録に失敗しました" });
    //         });

    //         return res.status(200).json({ message: "投稿完了" });
    //     });
        
    //     con.release();
    // });
});

// postRouter.post("/post_image", upload.single('image'), async (req, res) => {
//     const fileData: Express.Multer.File | undefined = req.file;
//     const userId: string = req.body.uid;

//     console.log(fileData, userId);
    
//     try {
//         if (fileData) {
//             const imageKey: string = `images/${userId}/${Date.now()}_${fileData.originalname}`;
//             const params = {
//                 Bucket: bucketName,
//                 Key: imageKey,
//                 Body: fileData.buffer,
//                 ContentType: fileData.mimetype,
//             };

//             await s3.upload(params).promise();

//             Pool.getConnection((err, con) => {
//                 if (err) return res.status(500).json({ message: "画像URLの登録ができません。" });
                
//                 const sql = `UPDATE Post SET imageUrl = ? WHERE uid = ?`;
//                 const imageUrlAWS = `${process.env.AWS_S3_URL}/${imageKey}`;
//                 con.query(sql, [imageUrlAWS, userId], (err) => {
//                     if (err) return res.status(500).json({ message: "画像URLの登録に失敗しました。" });
//                     return res.status(200).json({ message: "画像をアップロードしました" });
//                 });
//                 con.release();
//             });
//         } else {
//             return res.status(500).json({ message: "画像データがありません" });
//         };
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: "画像のアップロードに失敗しました" });
//     };
// });