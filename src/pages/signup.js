import React, { Component } from 'react'
import AppIcon from '../images/iconPage.png'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';



const styles = (theme) => ({
    ...theme.spreadThis
})




class signup extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            loading: false,
            errors: {}
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle

        }
        axios.post('/signup', newUserData)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
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
                        SignUp
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
                            value={this.state.email || ''}
                            onChange={this.handleChange}
                            fullWidth />
                        <TextField
                            id="handle"
                            name="handle"
                            type="text"
                            label="Nome"
                            className={classes.textField}
                            helperText={errors.handle}
                            error={errors.handle ? true : false}
                            value={this.state.handle || ''}
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
                            value={this.state.password || ''}
                            onChange={this.handleChange}
                            fullWidth />
                        <TextField
                            id="ConfirmPassword"
                            name="ConfirmPassword"
                            type="password"
                            label="Confirma Senha"
                            className={classes.textField}
                            helperText={errors.ConfirmPassword}
                            error={errors.ConfirmPassword ? true : false}
                            value={this.state.ConfirmPassword || ''}
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
                            className={classes.button}
                            disabled={loading}

                        >
                            SignUp
                            {loading && (
                                <CircularProgress size={30} className={classes.progress} />
                            )}
                        </Button>
                        <br></br><br></br>
                        <small>

                            Já Possui uma Conta? Logue <Link href="/login.js">aqui!</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm />


            </Grid>
        );
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(signup);
