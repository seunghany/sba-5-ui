import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useHistory } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
// import Link from 'react-router-dom'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '150%', // 16:9
    
  },
  cardContent: {
    flexGrow: 1,
    height:"250px",
    width:"223px"
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));




export default function ActorQuiz() {
  const history = useHistory();
  const classes = useStyles();
  const [data, setData] = useState([])

  const MoreInfo = (id) => {
    // const actor_id = document.getElementById('view').getAttribute('value')
    // const id = e.target.getAttribute('actor_id')
    localStorage.setItem("actor_id", id)
    history.push('/actorquizsingle')
  }
  useEffect(() => {
      axios.get('http://localhost:8080/api/actors')
      .then(res=>{
          // alert(`list Success`)
          setData(res.data) // database 안에 있는 데이터 res.data['lname'] 이런식으로 뽑을 수 있음
      })
      .catch(e =>{
          alert(`list Fail`)
          throw(e)
      } )
  },[])
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            스무고개
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              배우 스무고개
            </Typography>  
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md"> 
          {/* End hero unit */}
          
          <Grid className = "helloooooooooooooooooooooo" container spacing={5}>
            {data.map((i, index) => (
              <Grid item key={index} xs={12} sm={3}>
                <Card className="아무거나" >
                  
                  <CardMedia
                    className={classes.cardMedia}
                    image={i.photo_url}
                    title={i.name}
                  />
                
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {i.name}
                    </Typography>
                    <Typography>
                      나이 {i.age}
                    </Typography>
                    <Typography>
                      본명 {i.real_name}
                    </Typography>
                    <Typography>
                      종교 {i.religion}
                    </Typography>
                    <Typography>
                      소속사 {i.agency}
                    </Typography>
                    <Typography>
                      자녀 {i.children}
                    </Typography>
                    <Typography>
                      데뷔년도 {i.debut_year}
                    </Typography>
                  </CardContent>
                  
                  <CardActions>
                    <Button size="small" color="primary" actorid={i.actor_id} onClick={e => MoreInfo(i.actor_id)} >
                      View {i.actor_id}
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>


        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}