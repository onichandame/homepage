import { Divider, Grid, Typography } from "@mui/material";
import { GetStaticProps, NextPage } from "next";

import { BlogTile } from "../../components/blog";
import { parseBlogs } from "../../libs/blog";
import { Blog } from "../../types/blog";

export default (({ blogs }) => {
  const featuredBlogs = blogs.filter((v) => v.featured);
  const normalBlogs = blogs.filter((v) => !v.featured);
  return (
    <Grid container direction="column" spacing={10} alignItems="center">
      <Grid item>
        <Grid container direction="column" spacing={3} alignItems="center">
          <Grid item>
            <Typography variant="h6" fontStyle="oblique" color="gray">
              Featured blogs
            </Typography>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={5}>
              {featuredBlogs.map((blog) => (
                <Grid item key={blog.slug} sx={{ display: `flex` }}>
                  <BlogTile blog={blog} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider
        flexItem
        orientation="horizontal"
        sx={{ mt: (theme) => theme.spacing(5) }}
      />
      <Grid item>
        <Grid container direction="row" spacing={5}>
          {normalBlogs.map((blog) => (
            <Grid item key={blog.slug} sx={{ display: `flex` }}>
              <BlogTile blog={blog} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}) as NextPage<Props>;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const blogs = await parseBlogs();
  return { props: { blogs } };
};

type Props = { blogs: Blog[] };
