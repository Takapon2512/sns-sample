import { Router } from "express";
import multer from "multer";
import { Pool } from "../server";
import { MysqlError } from "mysql";

//types
import { postType } from "../types/postTypes";

export const postRouter = Router();

//Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

postRouter.post("/post", (req, res) => {
    const { title, description, uid }: postType = req.body;
    console.log({title, description, uid});

    return res.status(200).json({ message: "投稿完了" });
});

postRouter.post("/post_image", upload.single('image'), (req, res) => {
    const fileData: Express.Multer.File | undefined = req.file;
    console.log(fileData);

    return res.status(200).json({ message: "画像の投稿完了" });
});