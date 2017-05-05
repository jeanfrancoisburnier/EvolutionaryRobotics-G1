{
    // here we define a variable for record keeping
    velocities : [],    
    maxIrVals : [],
    fitnesses : [],

    setupSimulation: function()
    {
		this.velocities = [];
		this.maxLightVals = [];
		this.height = [];
		this.distance = [];
		this.startPos = this.getRobot().getCoreComponent().getRootPosition();
		return true;
    },

    // optional function called after each step of simulation
    afterSimulationStep: function()
    {
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
    	this.maxLightVals.push(maxLight);

		var currentPos = this.getRobot().getCoreComponent().getRootPosition();
		var zDiff = (currentPos.z - this.startPos.z);
		this.height.push(Math.abs(zDiff));

		return true;
    },

    // optional function called at the end of the simulation
    endSimulation: function()
    {

		var currentPos = this.getRobot().getCoreComponent().getRootPosition();
		var xDiff = (currentPos.x - this.startPos.x);
		var yDiff = (currentPos.y - this.startPos.y);
		var zDiff = (currentPos.z - this.startPos.z);

		this.distance = Math.sqrt(Math.pow(xDiff,2) + Math.pow(yDiff,2) + Math.pow(zDiff,2));
		console.log("Distance: "+this.distance);
			
		// Something needs to be done with the Height here...

		var sum = 0;
		for (var i = 0; i < this.maxLightVals.length; i++)
		{
			sum += this.height[i] * this.maxLightVals[i];
		}
		sum += this.distance;
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
