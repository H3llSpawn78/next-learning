import { AppButton } from "@/components/ui/Button/AppButton";
import { Typography } from "@mui/material";
import { StyledFlexBox } from "@/components/ui/StyledFlexBox";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import Grid from "@mui/material/Grid";
import TwoColumnLayout from "@/components/ui/TwoColLayout/TwoColLayout";
import MediaCard from "@/components/ui/Card/AppMediaCard";
import { FadeIn } from "@/animations/FadeIn";
import { FadeInBox } from "@/animations/mui/FadeInBox";
import { StaggerTypography } from "@/animations/mui/StaggerTypography";

export default function Page() {
  return (
    <>
      <Grid container spacing={2}>
        <StyledFlexBox
          size={{ xs: 12 }}
          sx={{
            textAlign: "center",
            marginBottom: "100px",
            marginTop: "100px",
          }}
        >
          <Typography variant="h1">
            This is the MUI and Motion design system test page (wip) - Scroll
            down!
          </Typography>
        </StyledFlexBox>
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: "700px" }}>
        <StyledFlexBox size={{ xs: 12, md: 6 }}>
          <StaggerTypography
            variant="h2"
            text="This text will stagger in from the pub ;)"
          />
        </StyledFlexBox>
        <StyledFlexBox size={{ xs: 12, md: 6 }}>
          <FadeIn>
            <AppButton
              variant="outlined"
              color="primary"
              endIcon={<DeleteIcon />}
            >
              Test primary outlined button with icon
            </AppButton>
          </FadeIn>
        </StyledFlexBox>
      </Grid>
      <Grid container spacing={2}>
        <TwoColumnLayout
          leftColWidth={{
            xs: "100%",
            md: "50%",
          }}
          rightColWidth={{
            xs: "100%",
            md: "50%",
          }}
          leftCol={
            <Typography variant="h2">
              This is a test 2-col layout component with configurable column
              widths.
            </Typography>
          }
          rightCol={
            <FadeIn>
              <AppButton
                variant="outlined"
                color="primary"
                endIcon={<DeleteIcon />}
              >
                Test button
              </AppButton>
            </FadeIn>
          }
        />
      </Grid>
      <Grid container spacing={2}>
        <TwoColumnLayout
          leftColWidth={{
            xs: "100%",
            md: "100%",
          }}
          rightColWidth={{
            xs: "100%",
            md: "100%",
          }}
          leftCol={
            <FadeIn>
              <AppButton
                variant="outlined"
                color="primary"
                endIcon={<ShareIcon />}
              >
                Test share button
              </AppButton>
            </FadeIn>
          }
          rightCol={
            <FadeIn>
              <Typography variant="h2">This text will fade in...</Typography>
            </FadeIn>
          }
        />
      </Grid>
      <Grid container spacing={2}>
        <TwoColumnLayout
          leftColWidth={{
            xs: "100%",
            md: "100%",
          }}
          rightColWidth={{
            xs: "100%",
            md: "100%",
          }}
          leftCol={
            <FadeInBox>
              <MediaCard
                title="Test title"
                variant="primary"
                description=""
                image="https://picsum.photos/480/240"
                actions={
                  <>
                    <FadeIn>
                      <AppButton
                        variant="outlined"
                        color="primary"
                        endIcon={<DeleteIcon />}
                      >
                        Test button
                      </AppButton>
                    </FadeIn>
                    <FadeIn>
                      <AppButton
                        color="primary"
                        variant="contained"
                        endIcon={<ShareIcon />}
                      >
                        Share
                      </AppButton>
                    </FadeIn>
                  </>
                }
              />
            </FadeInBox>
          }
          rightCol={
            <FadeInBox>
              <MediaCard
                title="Test title"
                variant="primary"
                description=""
                image="https://picsum.photos/480/240"
                actions={
                  <>
                    <FadeIn>
                      <AppButton
                        variant="outlined"
                        color="primary"
                        endIcon={<DeleteIcon />}
                      >
                        Test button
                      </AppButton>
                    </FadeIn>
                    <FadeIn>
                      <AppButton size="small" endIcon={<ShareIcon />}>
                        Share
                      </AppButton>
                    </FadeIn>
                  </>
                }
              />
            </FadeInBox>
          }
        />
      </Grid>
    </>
  );
}
