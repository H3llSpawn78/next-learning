export default function handler(req, res) {
res.status(200).json(
    { 
    post:{
            id: '2', 
            title: 'My first post', 
            author: 'Bob', 
            publishDate: '16/12/2025', 
        }
    }
)}