import { Router } from "express";
import multer from "multer";
import { Pool } from "../server";
import { MysqlError } from "mysql";
import { S3 } from "aws-sdk";

//types
import { postDBType, postType } from "../types/postTypes";
import { userType } from "../types/userTypes";

export const postRouter = Router();

//S3のインスタンス作成
const s3 = new S3();
const bucketName = process.env.AWS_BUCKET_NAME || "";

//Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//テキストと画像を投稿するAPI
postRouter.post("/post", upload.single('image'), async (req, res) => {
    const fileData: Express.Multer.File | undefined = req.file;
    const postData: postType = req.body;

    Pool.getConnection((err, con) => {
        if (err) return res.status(500).json({ message: "ユーザーの取得ができません" });

        const sql = `SELECT * FROM User WHERE email = ?`;
        con.query(sql, [postData.email || ""], (err: MysqlError | null, users: userType[]) => {
            if (err) return res.status(500).json({ message: "ユーザーの取得に失敗しました" });
            
            const userIcon = users[0].iconUrl;
            const userName = users[0].username;
            
            const now = new Date(Date.now());
            const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');

            const imageKey: string = `images/${postData.uid}/${Date.now()}_${fileData?.originalname}`;
            const imageUrlAWS = `${process.env.AWS_S3_URL}/${imageKey}`;

            const goodUsers = "";
            
            const postSql = `INSERT INTO Post 
            (
                username, usericon, title, description, imageUrl, created_at, good_users, uid
            ) VALUES (
                ?, ?, ?, ?, ?, ?, ?, ?
            )`;
            con.query(postSql, [
                userName, 
                userIcon, 
                postData.title, 
                postData.description, 
                imageUrlAWS, 
                formattedDate, 
                goodUsers, 
                postData.uid || ""
            ], async (err) => {
                if (err) return res.status(500).json({ message: "投稿内容の登録に失敗しました" });
                if (!fileData) return res.status(500).json({ message: "画像がありません。" });

                //画像をS3にアップロードする処理
                const params = {
                    Bucket: bucketName,
                    Key: imageKey,
                    Body: fileData.buffer,
                    ContentType: fileData.mimetype,
                };

                await s3.upload(params).promise();
            });
            return res.status(200).json({ message: "投稿完了" });
        });
        
        con.release();
    });
});

//すべてのユーザーが投稿した内容を取得するAPI
postRouter.get("/fetch_post", (req, res) => {
    Pool.getConnection((err, con) => {
        if (err) return res.status(500).json({ message: "投稿内容を取得できません。" });

        const fetchSql = `SELECT * FROM Post`;
        con.query(fetchSql, (err: MysqlError | null, posts: postDBType[]) => {
            if (err) return res.status(500).json({ message: "投稿内容の取得に失敗しました。" });
            return res.status(200).json(posts);
        });

        con.release();
    });
});