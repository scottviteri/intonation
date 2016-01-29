//Homepage self explanatory

Homepage = React.createClass({
  mixins:[ReactMeteorData],
  getMeteorData(){

    return{
      currentUser : Meteor.user()
    };
  },
  componentWillUnmount(){
    console.log(ms);
  },
  render() {
    var centerElement;
    console.log(!this.data.currentUser)
    if(!this.data.currentUser){
      centerElement = <div className="centered" id = "inside">Welcome to Intonation!<br/><br/><center><AccountsUIWrapper/></center></div>


    }else{
      centerElement =<div className="centered" id = "inside"> Welcome to Intonation {this.data.currentUser.username}!<br/><br/>
        <center><a href="/app" className="button-home">Go to App</a></center></div>

    }


    return (
      <div id="homepage">
              {centerElement}
        <Virtualizer/>
      </div>

    );
  }
});
