import React from 'react';
import clsx from 'clsx';

import { Grid, Typography, Divider, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Edit from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles(theme => ({
  label: {
    letterSpacing: '.07272727em',
    fontSize: '0.8rem',
    fontWeight: 500,
    lineHeight: '1rem',
    textTransform: 'uppercase',
    color: 'rgb(166, 173, 186)',
    marginLeft: '10px',
    marginTop: '10px'
    
  },
  hover: {
    // margin: theme.spacing(1),
    '&:hover': {
      backgroundColor: 'rgb(31, 41, 55)',
      cursor: 'pointer'
    }
  },
  row: {
    paddingTop: theme.spacing(2),
    borderBottom: '1px solid rgb(31, 41, 55)',
    padding: "15px 5px 10px 10px"
  },
  icon: {
    color: 'rgb(166, 173, 186)',
  }
}));

const FieldRow = (props) => {
  const classes = useStyles();

  const handleClick = () => {
    if (props.openModal) {
      props.openModal({
        label: props.label,
        value: props.value
      });
    }
  }

  return (
    <div className={clsx([classes.row, (props.openModal && classes.hover)])}>
      <Grid container onClick={handleClick}>
        <Grid item xs={4}>
          <Typography variant="overline" className={classes.label} gutterBottom>
            {props.label}
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography variant="subtitle1" gutterBottom style={{color: "rgb(234, 236, 239)"}}>
            {props.value}aaaa
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Box display="flex" justifyContent="center">
            {props.openModal ? <Edit className={classes.icon} /> : null}
          </Box>
        </Grid>
      </Grid>
      <Divider light={true} />
    </div>
  )
}

export default FieldRow;