Tuner = React.createClass({
  componentDidMount() {
    
    //This runs immediately after render
    //console.log(this.ref.tunerView);

    var tuners = [new OnlineTuner.Controller.GuitarTuner(new OnlineTuner.Widget.CircleWidget(document.getElementById('tunerView'), '#ffffff', 'black', 'black', 'black'))];

    new OnlineTuner.Analyzer(tuners).install(function() {
      //ok
    }, function(errorMessage) {
      //nok
    });

  },
  componentWillUnmount() {
    try {
      ms.getTracks()[0].stop();
    } catch (e) {
      console.log(e);
    }
  },

  render() {
    // Just render a placeholder container that will be filled in
    return (
      <canvas id="tunerView" height="300" width="300"></canvas>
    );

  }
});
