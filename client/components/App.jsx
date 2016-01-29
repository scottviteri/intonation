// App component - represents the whole app
App = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    //console.log(!Meteor.user());
    return {
      userStatus: !Meteor.user()
    };
  },
  componentWillUnmount(){
    console.log(ms);
  },
  render() {
    if (!Meteor.user()) {
      location.reload();
    }
    return (
      <div id ="app">
          <IntonationTest/>
      </div>
    );
  }
});
