import { deepOrange } from '@mui/material/colors'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    messageRow: {
      display: 'flex',
    },
    messageRowRight: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    messageBlue: {
      flex: '1',
      position: 'relative',
      marginLeft: '10px',
      marginBottom: '10px',
      padding: '10px',
      backgroundColor: '#f0f0f0',
      color: '#333',
      maxWidth: '180px',
      textAlign: 'left',
      fontSize: '.9em',
      border: '1px solid #97C6E3',
      borderRadius: '10px',
    },
    messageOrange: {
      position: 'relative',
      marginRight: '20px',
      marginBottom: '10px',
      padding: '10px',
      backgroundColor: '#4b7782',
      color: '#fff',
      maxWidth: '180px',
      textAlign: 'left',
      fontSize: '.9em',
      border: '1px solid #dfd087',
      borderRadius: '10px',
    },

    messageContent: {
      padding: 0,
      margin: 0,
    },
    messageTimeStampRight: {
      position: 'absolute',
      fontSize: '.85em',
      marginTop: '10px',
      bottom: '-3px',
      right: '5px',
    },

    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    avatarNothing: {
      color: 'transparent',
      backgroundColor: 'transparent',
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    displayName: {
      marginLeft: '20px',
    },
  })
)
export { useStyles }
