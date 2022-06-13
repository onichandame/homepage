import { Card, CardActionArea, CardHeader, CardMedia } from "@mui/material";
import { useRouter } from "next/router";

import { Blog } from "../../types/blog";

export const BlogTile = ({ blog }: { blog: Blog }) => {
  const router = useRouter();
  return (
    <Card sx={{ width: 240 }} variant="outlined">
      <CardActionArea
        onClick={() => router.push(`${router.asPath}/${blog.slug}`)}
      >
        <CardMedia
          component="img"
          image={blog.image}
          height="200"
          alt={blog.slug}
        />
        <CardHeader
          title={blog.title[router.locale || ``]}
          subheader={new Date(blog.updatedAt).toLocaleDateString()}
        />
      </CardActionArea>
    </Card>
  );
};
