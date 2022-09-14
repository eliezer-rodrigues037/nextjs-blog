import Head from "next/head";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
}

export default function Home({ allPostsData }) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>
                    Hi, i'm a software developar at Mind Conulting. You can find me on &nbsp;
                    <a
                        href="https://www.linkedin.com/in/eliezer-rodrigues-ribeiro-820190101/"
                        about="My linkedin profile"
                        target="_blank"
                        rel="noopener"
                    >
                        Linkedin
                    </a>
                    &nbsp; or &nbsp;
                    <a href="https://github.com/eliezer-rodrigues037" target="_blank" rel="noopener" about="My github ">
                        Github
                    </a>
                    .
                </p>
                <p>
                    (This is a sample website - you can build it on this<a href="https://nextjs.org/learn"> Next.js tutorial</a>.)
                </p>
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {allPostsData.map(({ id, date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/posts/${id}`}>
                                <a>{title}</a>
                            </Link>
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
