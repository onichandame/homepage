import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { BlogDetail } from "../../components/blog";
import { parseBlogs } from "../../libs/blog";
import { Blog } from "../../types/blog";

export default (({ blog }) => {
  return <BlogDetail blog={blog} />;
}) as NextPage<Props>;

export const getStaticProps: GetStaticProps<Props, Query> = async (
  { params },
) => {
  const slug = params?.slug;
  if (!slug) throw new Error(`blog must be defined`);
  const blogs = await parseBlogs();
  const blog = blogs.find((v) => v.slug === slug);
  if (!blog) throw new Error(`blog not found`);
  return { props: { blog } };
};

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  const blogs = await parseBlogs();
  return {
    paths: blogs.map((blog) => ({ params: { slug: blog.slug } })),
    fallback: `blocking`,
  };
};

type Props = { blog: Blog };
type Query = { slug: string };
