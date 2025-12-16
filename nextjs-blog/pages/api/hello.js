export default function handler(req, res) {
res.status(200).json(
    { 
    post:{
            id: '1', 
            title: 'My first post', 
            author: 'Bob', 
            publishDate: '16/12/2025', 
        }
    }
)}