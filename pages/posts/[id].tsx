import Layout from "../../components/layout";
import Head from "next/head";
import Date from "../../components/date";
import uStyles from "../../styles/utils.module.css";
import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllPostIds, getPostData } from "../../lib/posts";

export const getStaticPaths:GetStaticPaths = async () => {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export const getStaticProps:GetStaticProps = async ({ params }) => {
    const postData = await getPostData(params.id);

    return {
        props: {
            postData,
        },
    };

}

export default function Post({ 
    postData } : {
        postData: {
        title: string
        date: string
        contentHtml: string
        }
    }){
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <h1 className={uStyles.headingX1}>{postData.title}</h1>
            <div className={uStyles.lightText}>
                <Date dateString={postData.date} />
            </div>

            <br />
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </Layout>
    );
}
