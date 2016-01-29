//
// Copyright (c) 2014 Sylvain Peyrefitte
//
// This file is part of onlinetuner.co.
//
// onlinetuner.co is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.
//

//controller.js
//Interface between analyzer and widgets
(function () {

	//Step compute from La 440 Hz
	//var GUITAR_STEP = [-5, -10, -14, -19, -24, -29];
	//notes of guitar strings
	//var GUITAR_NOTE = ["E", "B", "G", "D", "A", "E"];

        	//Controller
	var Controller = function() {
	};

	//interface
	Controller.prototype = {
		notify : OnlineTuner.virtual
	};

	//Guitar tuner view
	var GuitarTuner = function(widget) {
		Controller.call(this);
		//target of drawing
		this.widget = widget;
	};

	GuitarTuner.prototype = {
		// draw guitar tuner state
		notify : function(info) {

			//update associate widget
			this.widget.show( info.pitch_error/20.0, info.note + "" + info.octave , "error: "+parseFloat(info.pitch_error.toFixed(4)), Math.round(info.frequency) + "Hz");
		}
	};

	//Namespace declaration
	OnlineTuner.Controller = {GuitarTuner : GuitarTuner};
})();
