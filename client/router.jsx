



FlowRouter.route('/app', {
  name: "app",
  triggersEnter: [function(context, redirect) {
    if(!Meteor.user()){
      redirect('/');
    }


  }],
  action: function(params) {
    
    ReactLayout.render(MainLayout, {content:<App/>});
  }
});

FlowRouter.route('/about',{
  name:"about",
  action(){
    ReactLayout.render(MainLayout,{content:<About/>})
  }
})

FlowRouter.route('/exercises',{
  name:"exercises",
  action(){
    ReactLayout.render(MainLayout,{content:<Exercises/>});
  }
})

//routes to personal page.
FlowRouter.route('/:postId', {
  action: function(params) {
    ReactLayout.render(MainLayout, {content: <Homepage/>});
  }
});



FlowRouter.route('/exercises:postId', {
  action(params) {
    alert("this is the exercises page", params.postId);
  }
});

FlowRouter.route('/login', {
  name: "Login",
  action(params) {}
});
//routes to homepage
FlowRouter.route('/', {
  name: 'Homepage',
  action: function() {

    ReactLayout.render(MainLayout, {content: <Homepage/>});
  }
});
