import React, { Component } from 'react'
import AppIcon from '../images/iconPage.png'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';



const styles = {
    form: {
        textAlign: 'center',
    },
    image: {
        margin: '20px auto 20px auto'
    },

    typography: {
        useNextVariants: true,
    },
    pageTitle: {
        margin: '10px auto 10px auto'
    },

    textField: {
        margin: '10px auto 10px auto',
    },
    button: {
        marginTop: 50,
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
    }

}




class login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/login', userData)
            .then(res => {
                console.log(res.data);
                this.setState({
                    loading: false
                })
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({
                    error: err.response.data,
                    loading: false
                })
            })
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} alt="paper plane" className={classes.image} />
                    <Typography variant="h3" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            className={classes.textField}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            className={classes.textField}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth />
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button} >Login</Button>

                    </form>
                </Grid>
                <Grid item sm />


            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(login);