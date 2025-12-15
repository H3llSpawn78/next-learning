import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');
// Example serverside
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // props for your component
//     },
//   };
// }

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

export async function getPostData(id){
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
    const contentHtml = processedContent.toString();

// Combine the data with the id and contentHtml
return {
  id,
  contentHtml,
  ...matterResult.data,
};

}
export function getAllPostIds() {
  // Instead of the file system,
  // fetch post data from an external API endpoint (amend function to an async)
    //   const res = await fetch('..');
    //   const posts = await res.json();
    //   return posts.map((post) => {
    //     return {
    //       params: {
    //         id: post.id,
    //       },
    //     };
    //   });

    const fileNames = fs.readdirSync(postsDirectory);           
  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    });
}