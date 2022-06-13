import { Avatar, Drawer, Grid, Toolbar, Typography } from "@mui/material";

export const Profile = () => {
  return (
    <Drawer
      anchor="left"
      variant="persistent"
      open={true}
      sx={{
        width: 150,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 150,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Grid container direction="column" alignItems="center" spacing={1}>
        <Grid item>
          <Avatar
            alt="avatar"
            src="https://res.cloudinary.com/onichandame/image/upload/v1654698901/pic/20220608222820_10_oaxmjm.png"
            sx={{ width: 100, height: "auto" }}
          />
        </Grid>
        <Grid item>
          <Typography variant="h5">
            Xiao Zhang
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" align="center" fontStyle="italic">
            Developer & Architect
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="caption" color="gray" fontStyle="oblique">
            always stay curious
          </Typography>
        </Grid>
      </Grid>
    </Drawer>
  );
};
