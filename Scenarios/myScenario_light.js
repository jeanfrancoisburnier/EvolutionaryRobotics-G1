{
    // here we define a variable for record keeping
    velocities : [],    
    maxIrVals : [],
    fitnesses : [],

    setupSimulation: function()
    {
		this.maxLightVals = [];
		this.distance = [];
		var lightSources = this.getEnvironment().getLightSources();
		this.lightSourcePos = lightSources[0].getPosition();
		return true;
    },

    // optional function called at the end of the simulation
    endSimulation: function()
    {

		var currentPos = this.getRobot().getCoreComponent().getRootPosition();
		var xDiff = (currentPos.x - this.lightSourcePos.x);
		var yDiff = (currentPos.y - this.lightSourcePos.y);

		this.distance = Math.sqrt(Math.pow(xDiff,2) + Math.pow(yDiff,2));
		console.log("Distance: "+this.distance);
			
		// Something needs to be done with the Height here...

		var sum = 0;
		var sensors = this.getRobot().getSensors();
		var maxLight = 0

		for (var i = 0; i < sensors.length; i++)
		{
			if (/^Eye/.test(sensors[i].getLabel()))
			{
				if (sensors[i].read() > maxLight)
					maxLight = sensors[i].read();
					console.log("Max Light: "+maxLight);
			}
		}

		sum = 1/this.distance*maxLight;			
		this.fitnesses.push(sum);

		return true;
    },

    // the one required method... return the fitness!
    getFitness: function()
    {
		var fitness = this.fitnesses[0];
		for (var i= 1; i < this.fitnesses.length; i++)
		{
			if (this.fitnesses[i] < fitness)
				fitness = this.fitnesses[i];
		}
		return fitness;
    },

}
