import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts"); // process.cwd() informa o diretorio atual

export function getSortedPostsData() {
    // Le o nome dos arquivos em /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" do nome dos arquivos para pegar o id
        const id = fileName.replace(/\.md$/, "");

        // Le o arquivo markdown como uma string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // Usa o gray-matter para converter a sessão de metadados da postagem. Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Usa o remark para converter o markdown em uma string HTML

        // Combina os dados com o id
        return {
            id,
            ...matterResult.data,
        };
    });
    // Ordena as postagems por data
    return allPostsData.sort(({ date: a }, { date: b }) => {
        if (a < b) {
            return 1;
        } else if (a > b) {
            return -1;
        } else {
            return 0;
        }
    });
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);

    // Retorna uma array que se parece com isso:
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
                id: fileName.replace(/\.md$/, ""), // Expreção regular que remove ".md" do final da string. Funcção "replace" substitui o resultado da regex por um espaço vazio, resultando apenas no nome do arquivo.
            },
        };
    });
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Usa o gray-matter para converter a seção de metadados da postagem
    const matterResult = matter(fileContents);

    const processedContent = await remark().use(html).process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combina os dados com o id
    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
}
