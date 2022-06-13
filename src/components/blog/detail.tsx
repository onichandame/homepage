import { useRouter } from "next/router";
import { CopyBlock, nord } from "react-code-blocks";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import ReactMarkdown from "react-markdown";

import { Blog } from "../../types/blog";
import { Box } from "@mui/material";

export const BlogDetail = ({ blog }: { blog: Blog }) => {
  const router = useRouter();
  if (!router.locale) throw new Error(`locale not set in blog ${blog.slug}`);
  const content = blog.content[router.locale];
  if (!content) {
    throw new Error(
      `content for current locale ${router.locale} not available in blog ${blog.slug}`,
    );
  }
  return (
    <Box sx={{ display: `flex`, flexDirection: `column`, maxWidth: `100%` }}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={{
          p: function ({ children }) {
            return <Box sx={{ textIndent: `2rem` }}>{children}</Box>;
          },
          pre: function ({ children, className }) {
            return (
              <Box
                className={className}
                component="pre"
                sx={{
                  backgroundColor: (theme) => theme.palette.background.default,
                  overflowX: `auto`,
                  maxWidth: `100%`,
                }}
              >
                {children}
              </Box>
            );
          },
          code: function ({ children, className }) {
            const language =
              className?.split(`language-`)[1]?.split(` `).pop() || `text`;
            return <code>{children}</code>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
};
