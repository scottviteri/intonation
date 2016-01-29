MainLayout = React.createClass({
  mixins:[ReactMeteorData],
  getMeteorData() {
    console.log(!Meteor.user());
    return {
      userStatus: !Meteor.user(),
    };

  },
  render() {
    return (
      <div id = "mainlayout">
        <header><Navigationbar /></header>
        <main>
          {this.props.content}</main>
      </div>
    );
  }
});
