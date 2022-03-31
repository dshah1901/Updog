import { React, useState } from 'react'
import { Avatar, Paper, Grid, Typography } from '@mui/material'
import classes from './notificationcard.module.scss'

/**
 * This component will be used in notification screen to display any new alerts received by the user. It should be
 *
 * Props:
 * @type: the type of notification to be displayed. Should be either like, share, reply or follow.
 * @time : a formatted time to be displayed. Assumed to be already formatted ie in the form "3 weeks ago".
 * @handle : the handle (@) of the appropriate user
 * @username : the username of the appropriate user
 * @image : the link to the users profile image
 *
 * The const variable avatar size has been extracted out in case any avatar size changes need to be made
 */

const avatarSize = 70

function NotificationCardView({ type, time, handle, username, image }) {
  const [content, setContent] = useState('')
  switch (type) {
    case 'like':
      setContent(`${{ username }}liked your post!`)
      break
    case 'share':
      setContent(`${{ username }}shared your post!`)
      break
    case 'reply':
      setContent(`${{ username }}replied to your post!`)
      break
    case 'follow':
      setContent(`${{ username }}started following you!`)
      break
    default:
      console.log('unexpected or no type received')
      break
  }
  return (
    <Paper variant="outlined" className={classes.container}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        wrap="wrap"
        className={classes.container}
      >
        <Grid item className={classes.userInfo}>
          <Grid container alignItems="center" direction="column">
            <Avatar
              alt={username}
              src={image}
              sx={{ width: avatarSize, height: avatarSize }}
            />
            <Typography variant="subtitle1" className={classes.username}>
              {username}
            </Typography>
            <Typography variant="body2" className={classes.userHandle}>
              @{handle}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={6} container alignItems="center" justifyContent="center">
          <Typography>{content}</Typography>
        </Grid>
        <Grid item xs="auto" container>
          <Typography variant="caption" className={classes.timestamp}>
            {time}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default NotificationCardView
