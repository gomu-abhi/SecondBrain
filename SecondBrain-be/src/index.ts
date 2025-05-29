import express from 'express';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { UserModel, ContentModel, LinkModel, TagModel } from './db';
import {jwt, auth, JWT_SECRET } from './middleware' 
import { random } from './linkUtils';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL as string)

interface AuthRequest extends Request {
    id?: string;
  }

app.post('/api/v1/signup', async function(req : Request, res: Response) : Promise<void> {
    const requiredBody = z.object({
        username : z.string().min(3, {message : 'User Name must be at least 3 characters.'}).max(10, {message : 'User Name must be at most 10 characters.'}), 
        password : z.string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .max(20, { message: 'Password must be at most 20 characters' })
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/,
          {
            message: 'Password must include uppercase, lowercase, number, and special character'
          }
        )
    });
    const parsedDataWithSucess = requiredBody.safeParse(req.body);

    if(!parsedDataWithSucess.success) {
        res.status(411).json({
            message : "Incorrect format",
            error : parsedDataWithSucess.error
        })
        return;
    }

    const { username, password } = req.body;
    const saltRounds = 4;
    const hash = await bcrypt.hash(password, saltRounds);
    try{
        await UserModel.create({
            username : username,
            password : hash
        })

        // success response
        res.status(200).json({
            message : "You have signed up"
        })

        return;
    }
    catch (error: any) {
        if (error.code === 11000) { // MongoDB duplicate key error
            res.status(403).json({
            message: "User already exists"
          });
          return;
        }
        // Server error
        res.status(500).json({
          message: "Internal Server Error"
        });
        return;
    }

});

app.post('/api/v1/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await UserModel.findOne({
        username: username,
    });

    if(! user) {
        res.status(403).json({
            message : "User not found"
        })
        return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    // console.log(passwordMatch);
    if(passwordMatch) {
        const token = jwt.sign({
            id : user._id
        }, JWT_SECRET);
        res.json({
            token: token,
            message : "Signed in succesfully",
            user : user.username
        });
        return;
    }
    else{
        res.status(403).json({
            message : "Wrong password"
        })
        return;
    }
})

app.post('/api/v1/content', auth, async function(req : AuthRequest, res : Response) {
    const requiredBody = z.object({
        link : z.string().url(),
        type : z.enum(["Video", "Tweet", "InstaPost", "Document"]),
        title : z.string().min(1, {message : 'Title must be at least 1 characters.'}).max(100, {message : 'Title must be at most 100 characters.'}),
        // tags : z.array(z.string().min(1, {message : 'Tag must be at least 1 characters.'}).max(20, {message : 'Tag must be at most 20 characters.'})),
    });

    const parsedDataWithSucess = requiredBody.safeParse(req.body);
    if(!parsedDataWithSucess.success) {
        res.status(411).json({
            message : "Incorrect format",
            error : parsedDataWithSucess.error
        })
        return;
    }
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    // const tags = req.body.tags;
    const userId = req.id;
    const content = await ContentModel.create({
        link : link,
        type : type,
        title : title,
        // tags : tags,
        userId : userId
    })

    res.status(200).json({
        message : "Content created",
    })
    return;
})

app.get('/api/v1/content', auth, async function(req : AuthRequest, res : Response) {
    const userId = req.id;
    const content = await ContentModel.find({
        userId : userId
    }).populate('userId', 'username');

    if(!content) {
        res.status(404).json({
            message : "No content found"
        })
        return;
    }
    res.status(200).json({
        message : "Content fetched",
        content : content
    })
    return;
})
  

app.delete('/api/v1/content', auth, async function(req : AuthRequest, res) {
    const contentId = req.body.contentId;
    const userId = req.id;

    await ContentModel.findOneAndDelete({
        _id: contentId,
        userId: userId
    })

    res.status(200).json({
        message : "Content deleted"
    })
})

app.post('/api/v1/brain/share', auth, async function(req : AuthRequest, res : Response) {
    const share = req.body.share;
    if(share) {
        try{
            const hash = random(10);
            // console.log(hash);
            await LinkModel.create({
                hash: hash,
                userId: req.id
            })
            res.status(200).json({
                message : "Updated sharable link",
                hash : hash
            })
        } catch (error: any) {
            if (error.code === 11000) { // MongoDB duplicate key error
                const link = await LinkModel.findOne({
                    userId:req.id
                })
                res.status(200).json({
                    message : "Updated sharable link",
                    hash : link?.hash
                })
                return;
            }
            // Server error
            res.status(500).json({
              message: "Internal Server Error"
            });
            return;
        }
    }
    else {
        await LinkModel.findOneAndDelete({
            userId: req.id,
        });
        res.status(200).json({
            message : "Deleted sharable link"
        })
    }

})

app.get('/api/v1/brain/:shareLink', (req, res) => {
    const shareLink = req.params.shareLink;
    // console.log(shareLink);
    LinkModel.findOne({
        hash: shareLink
    }).then((link) => {
        if(!link) {
            res.status(404).json({
                message : "No link found"
            })
            return;
        }
        ContentModel.find({
            userId: link.userId
        }).populate('userId', 'username').then((content) => {
            res.status(200).json({
                message : "Content fetched",
                content : content
            })
        })
    })
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});