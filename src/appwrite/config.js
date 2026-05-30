/// CREATE SERVICES

import conf from '../conf/conf.js'
import {Client, ID, TablesDB, Storage, Query} from 'appwrite'


export class StorageClass {
    client = new Client;
    databases;
    bucket;

    constructor() {
        this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId);
        this.databases = new TablesDB(this.client);
        this.bucket = new Storage(this.client); // bucket/storage

        }
        
        // .createRow('[DATABASE_IT]', '[TABLE_ID]', '[ROW_ID]', {DATA})
    async createPost({title, slug, content, featuredImage, status, userId}) {
       // slug == rowId
        try {
            return await this.databases.createRow(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }

            ) 
        } catch (error) {
           console.error("create post: ",error);
            
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateRow(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug, 
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.error("update post: ",error);
            
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteRow(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug
            )
            return true
        } catch (error) {
            console.error("delete Post: ",error);
            return false
        }
    }

    async getRow(slug) {
        try {
            return await this.databases.getRow(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug
                // queries : [],  --optional
            
            )
        } catch (error) {
            console.error("get Row: ", error);
            return false
        }
    }
    
    // get all posts having status 'active'
    async getPosts() {
        try {
            return await this.databases.listRows(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                [
                    Query.equal("status", "active")
                ]
            )
        } catch (error) {
            console.error("getPosts: ", error); 
        }
    }

    // file upload service
    async uploadFile(file) {
        try {
           await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
            // document.getElementById('uploader').files[0]
           ) 
        } catch (error) {
            console.error("upload file: ", error);
            
        }
    }    

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.error("deleteFile: ", error);
            return false
        }
    }

    getFilePreview(fileId) {  // no need of async-await as it doesnt return a promise
        try {
            this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.error("get file preview: ", error);
        }
    }
}

export default StorageClass;
