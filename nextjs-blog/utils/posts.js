import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {

// Fetch Date for Static Generation - API - change to async function ^
        // const res = await fetch('https://jsonplaceholder.typicode.com/todos/');
        // return res.json();

// Fetch Date for Static Generation - File system
    // GEt file name under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostData = fileNames.map((fileName) => {

        // Remove ".md" from the file name to get id
        const id = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf-8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        //combine the data with the id
        return {
            id,
            ...matterResult.data,
        };


    });
    // Sort all posts by date
    return allPostData.sort((a,b) => {
        if (a.date < b.date) {
            return 1;
        } else{
            return -1;
        }
    });
}