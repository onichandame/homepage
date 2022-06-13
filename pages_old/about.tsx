import { Divider, Grid, IconButton, Link, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { GetStaticProps, NextPage } from "next";
import { resolve } from "path";
import { cwd } from "process";
import { readFileSync } from "fs";
import { PropsWithChildren } from "react";
import { ContentCopy } from "@mui/icons-material";

export default (({ content }) => {
  return (
    <Grid container direction="column" spacing={8}>
      <Grid item mt={(theme) => theme.spacing(5)}>
        <Typography variant="subtitle2" color="gray" align="center">
          "A little code, a little science, and a little perseverance."
        </Typography>
      </Grid>
      <Grid item>
        <ReactMarkdown components={{ h1: H1, p: P }}>
          {content}
        </ReactMarkdown>
      </Grid>
      <Grid item>
        Contact: <Link href="mailto:zxinmyth@gmail.com">Email</Link>
        <IconButton
          onClick={() => navigator.clipboard.writeText(`zxinmyth@gmail.com`)}
        >
          <ContentCopy />
        </IconButton>
      </Grid>
    </Grid>
  );
}) as NextPage<Props>;

function H1({ children }: PropsWithChildren) {
  return (
    <>
      <Typography variant="h4">{children}</Typography>
      <Divider />
    </>
  );
}

function P({ children }: PropsWithChildren) {
  return <p style={{ textIndent: `2rem` }}>{children}</p>;
}

export const getStaticProps: GetStaticProps<Props> = ({ locale }) => {
  const rootPath = resolve(cwd(), `contents`, `resume`, `${locale}.md`);
  return { props: { content: readFileSync(rootPath, `utf8`) } };
};

type Props = { content: string };
