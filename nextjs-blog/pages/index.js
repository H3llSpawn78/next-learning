import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/Utils.module.css';
import { getSortedPostsData } from '../utils/posts';
import Link from 'next/link';
import Date from '../components/date';

// Static Generation - API
// export async function getStaticProps() {
//   const allPostsData = await getSortedPostsData();
//   return {
//     props:{
//       allPostsData
//     }
//   }
// };
// Static Generation - File system
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props:{
      allPostsData
    }
  }
};
  export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>We dispose of stuff.</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
            <h2 className={utilStyles.headingLg}>Blog</h2>
            <ul>
              {allPostsData.map(({id, date, title}) => (
                <li className={utilStyles.listItem} key={id}>
                  <Link href={`/posts/${id}`}>{title}</Link>
                  <br />
                  <small className={utilStyles.lightText}>
                    <Date dateString={date} />
                  </small>
                </li>
              ))}
            </ul>
      </section>
    </Layout>
  );
}
