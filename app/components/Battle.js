import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';



const PlayerPreview = (props)=>{
  return (
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={props.avatar}
          alt={'Avatar for' + props.username}
          />
          <h2 className='username'>@{props.username}</h2>
      </div>
      <button
        className='reset'
        onClick={props.onReset.bind(null,props.id)}>
        Reset
      </button>
    </div>
  )
}

PlayerPreview.PropTypes ={
  avatar: PropTypes.string.isRequired,
  username:PropTypes.string.isRequired,
  id:PropTypes.string.isRequired,
  onReset:PropTypes.func.isRequired,
}

class PlayerInput extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      username:''
    };
    this.handleChange= this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
    handleChange(event) {
      const value = event.target.value;

      this.setState(()=>{
        return {
          username: value
        }

      })
    }
    handleSubmit(event) {
      event.preventDefault();

      this.props.onSubmit(
        this.props.id,
        this.state.username,
      );
    }
    render() {
      return (
        <form className='column' onSubmit={this.handleSubmit}>
        <label className= 'header' htmlFor='username'>{this.props.label}</label>
        <input
        id='username'
        placeholder='github username'
        type='text'
        value={this.state.username}
        autoComplete='off'
        onChange={this.handleChange}
        />

        <button
        className='button'
        type='submit'
        disabled={!this.state.username}>
        Submit
        </button>
        </form>
      )
    }
}
PlayerInput.PropTypes={
  id:PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

PlayerInput.defaultProps ={
  label: 'Username'
}

export default class Battle extends React.Component{
  constructor(props) {
    super(props);
    this.state ={
      playerOneName: '',
      PlayerTwoName: '',
      PlayerOneImage:null,
      PlayerTwoImage:null,
    };

    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleReset=this.handleReset.bind(this);
  }
  handleSubmit(id,username){
    this.setState(()=>{
      const newState ={};
      newState[id + 'Name'] = username;
      newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200'
      console.log("Submit is working");
      return newState;

    });
  }
  handleReset(id) {
    this.setState(()=>{
      const newState = {}
      newState[id + 'Name'] = '';
      newState[id + 'Image'] = null;
      return newState;
      })
  }
  render(){
    const match = this.props.match;
    const PlayerOneName = this.state.PlayerOneName;
    const PlayerTwoName = this.state.PlayerTwoName;
    const PlayerOneImage = this.state.PlayerOneImage;
    const PlayerTwoImage = this.state.PlayerTwoImage;
    return(
      <div>
       <div className ='row'>
         {!PlayerOneName &&
          <PlayerInput
            id='PlayerOne'
            label='Player One'
            onSubmit={this.handleSubmit}
         />}
         {PlayerOneImage !== null &&
         <PlayerPreview
          avatar={PlayerOneImage}
          username={PlayerOneName}
          onReset={this.handleReset}
          id='playerOne'
        />}

         {!PlayerTwoName &&
           <PlayerInput
             id='PlayerTwo'
             label='Player Two'
             onSubmit={this.handleSubmit}
           />}
           {PlayerTwoImage !== null &&
           <PlayerPreview
            avatar={PlayerTwoImage}
            username={PlayerTwoName}
            onReset={this.handleReset}
            id='playerTwo'
          />}
      </div>

      {PlayerOneImage && PlayerTwoImage &&
       <Link
       className='button'
       to={{
       pathname: match.url + '/results',
       search: '?PlayerOneName=' + PlayerOneName + '&PlayerTwoName=' + PlayerTwoName
   }}>
      Battle
    </Link>}
      </div>
    )
  }
}
