require("ts-node").register({ files: true });

const { localize } = require("./src/i18n/localize");
const { locales } = require("./src/i18n/locales");

const { basename, dirname } = require("path");

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  deletePage(page);
  Object.keys(locales).map((locale) => {
    return createPage({
      ...page,
      path: localize(locale, page.path),
      context: {
        ...page.context,
        locale,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "Mdx") {
    const locale = basename(basename(node.fileAbsolutePath, ".mdx"), `.md`);
    const name = basename(dirname(node.fileAbsolutePath));
    createNodeField({ node, name: "locale", value: locale });
    createNodeField({ node, name: "name", value: name });
    createNodeField({
      node,
      name: "type",
      value: name === "resume" ? "resume" : "post",
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const blogTemplate = require.resolve("./src/template/blog");
  const resumeTemplate = require.resolve("./src/template/resume");
  const { createPage } = actions;
  const blogs = await graphql(`
    {
      blog: allFile(filter: { sourceInstanceName: { eq: "post" } }) {
        edges {
          node {
            relativeDirectory
            childMdx {
              fields {
                locale
                type
              }
              frontmatter {
                title
                author
                date
              }
            }
          }
        }
      }
    }
  `);
  const resume = await graphql(`
    {
      resume: allFile(filter: { sourceInstanceName: { eq: "resume" } }) {
        edges {
          node {
            relativeDirectory
            childMdx {
              fields {
                locale
                type
                name
              }
            }
          }
        }
      }
    }
  `);
  if (blogs.errors || resume.errors) {
    console.log(blogs.errors);
    return;
  }
  const postList = blogs.data.blog.edges.filter(
    ({ node: { childMdx } }) => !!childMdx,
  );
  const resumeList = resume.data.resume.edges.filter(
    ({ node: { childMdx } }) => !!childMdx,
  );
  postList.forEach(({ node: post }) => {
    const slug = post.relativeDirectory;
    const { locale, type } = post.childMdx.fields;
    const { title, author, date } = post.childMdx.frontmatter;
    createPage({
      path: localize(locale, `/post/${slug}`),
      component: blogTemplate,
      context: {
        locale,
        type,
        title,
        date,
        author,
      },
    });
  });
  resumeList.forEach(({ node: content }) => {
    const { locale, type } = content.childMdx.fields;
    createPage({
      path: localize(locale, `/about`),
      component: resumeTemplate,
      context: {
        locale,
        type,
      },
    });
  });
};
