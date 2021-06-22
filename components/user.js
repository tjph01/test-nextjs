import React from 'react';
import Image from 'next/image'

class User extends React.Component {
  state = {
    userinfo: [],
    loaded: false
  }

  componentDidMount() {
    const apiUrl = `https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/users/${this.props.uid}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({...this.state, userinfo: data});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="member-item">
         <picture className="avatar">
           <img
             style={this.state.loaded ? {} : {display: 'none'}}
             src={this.state.userinfo.avatarUrl}
             onLoad={() => this.setState({loaded: true})}
            />
         </picture>
         {this.state.userinfo.firstName ? <div className="member-info">
           <h2>{this.state.userinfo.firstName} {this.state.userinfo.lastName}</h2>
           <p>{this.state.userinfo.displayName}</p>
           <p className="member-location">
             <span className="loc-ico"><svg version="1.1" x="0px" y="0px"viewBox="0 0 297 297"><path d="M148.5,0C85.646,0,34.511,51.136,34.511,113.989c0,25.11,8.008,48.926,23.157,68.873c13.604,17.914,32.512,31.588,53.658,38.904l27.464,68.659c1.589,3.971,5.434,6.574,9.71,6.574c4.276,0,8.121-2.603,9.71-6.574l27.464-68.659c21.146-7.316,40.054-20.99,53.658-38.904c15.149-19.947,23.157-43.763,23.157-68.873C262.489,51.136,211.354,0,148.5,0z M148.5,72.682c22.777,0,41.308,18.53,41.308,41.308c0,22.777-18.53,41.309-41.308,41.309c-22.777,0-41.308-18.531-41.308-41.309C107.192,91.212,125.723,72.682,148.5,72.682z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></span>
             {this.state.userinfo.location}
            </p>
         </div> : ''}
       </div>
    )
  }
}

export default User;
