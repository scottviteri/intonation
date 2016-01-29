var ListItemWrapper = React.createClass({

  componentDidMount() {
    document.getElementById("octaveslist").selectedIndex = 4;
  },

  render: function() {
    return (
      <option value={this.props.data.text}>{this.props.data.text}</option>
    );
  }
});

IntonationTest = React.createClass({

  notes: [
    {
      id: 0,
      text: "C"
    }, {
      id: 1,
      text: "C#"
    }, {
      id: 2,
      text: "D"
    }, {
      id: 3,
      text: "D#"
    }, {
      id: 4,
      text: "E"
    }, {
      id: 5,
      text: "F"
    }, {
      id: 6,
      text: "F#"
    }, {
      id: 7,
      text: "G"
    }, {
      id: 8,
      text: "G#"
    }, {
      id: 9,
      text: "A"
    }, {
      id: 10,
      text: "A#"
    }, {
      id: 11,
      text: "B"
    }
  ],
  octaves: [
    {
      id: 0,
      text: "0"
    }, {
      id: 1,
      text: "1"
    }, {
      id: 2,
      text: "2"
    }, {
      id: 3,
      text: "3"
    }, {
      id: 4,
      text: "4"
    }, {
      id: 5,
      text: "5"
    }, {
      id: 6,
      text: "6"
    }, {
      id: 7,
      text: "7"
    }, {
      id: 8,
      text: "8"
    }
  ],
  note_order: {
    "C": 0,
    "C#": 1,
    "D": 2,
    "D#": 3,
    "E": 4,
    "F": 5,
    "F#": 6,
    "G": 7,
    "G#": 8,
    "A": 9,
    "A#": 10,
    "B": 11
  },

  computeHzFromSteps(steps) {
    var f0 = 440;
    var fn = f0 * Math.pow(Math.pow(2, 1.0 / 12), steps);
    return fn;
  },

  setupContext() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var context = new AudioContext();
    return context;
  },


  showAverage() {
      
  },

  toggleButton() {
      if (document.getElementById("startbutton").textContent === "Start") {
	  document.getElementById("startbutton").textContent = "Stop";
	  this.showAverage();
      } else {
	  document.getElementById("startbutton").textContent = "Start";
      }
  },

  playTone(bool) {
    if (bool === undefined)
      bool = true;
    if (bool === true) {
      if (this.oscillator !== null) {
        this.oscillator.stop(this.context.currentTime);
        this.oscillator.disconnect(this.context.destination);
        this.oscillator = null;
      }
      this.oscillator = this.context.createOscillator(); // Create sound source
      this.oscillator.connect(this.context.destination);

      var note_dropdown = document.getElementById("noteslist");
      var octave_dropdown = document.getElementById("octaveslist");
      var steps_from_a4 = this.note_order[note_dropdown.value] - 9 + (octave_dropdown.value - 4) * 12;

      this.oscillator.frequency.value = this.computeHzFromSteps(steps_from_a4); // value in hertz
      this.oscillator.start(0); // Play instantly
    } else if (bool === false && this.oscillator !== null) {
      this.oscillator.stop(this.context.currentTime);
      this.oscillator.disconnect(this.context.destination);
      this.oscillator = null;
    }

  },

  componentDidMount() {
    this.context = this.setupContext();
    this.oscillator = null;
  },

  render() {
    // Just render a placeholder container that will be filled in (add in lift)
    return (
      <div id="intonationtest" className="centered">
        <div id="overlay"></div>
        <div id="testframe">
          <div id="tuner">
	    //want to pass in and pass out variables
	    //pass in start command 
            <Tuner/>
          </div>

          <button id="pause" onClick={this.playTone.bind(this, false)}>{this.playTone}</button>
          <button id="play" onClick={this.playTone.bind(this, true)}>{this.playTone}</button>
          <select id="noteslist" form="noteform">
            {this.notes.map(function(listValue) {
              return <ListItemWrapper key={listValue.id} data={listValue}/>;
            })}
          </select>
          <select id="octaveslist" form="octaveform">
            {this.octaves.map(function(listValue) {
              return <ListItemWrapper key={listValue.id} data={listValue}/>;
            })}
          </select>
          <button id="startbutton" onClick={this.toggleButton}>Start</button>

        </div>
      </div>
    );
  }

});
