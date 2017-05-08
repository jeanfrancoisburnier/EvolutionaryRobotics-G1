{
    // here we define a variable for record keeping
    fitnesses : [],

    setupSimulation: function()
    {
		this.startPos = this.getRobot().getCoreComponent().getRootPosition();
		return true;
    },

    // optional function called at the end of the simulation
    endSimulation: function()
    {

		var currentPos = this.getRobot().getCoreComponent().getRootPosition();
		var xDiff = (currentPos.x - this.startPos.x);
		var yDiff = (currentPos.y - this.startPos.y);
		var distance = Math.pow(xDiff,2) - Math.pow(yDiff,2);
		this.fitnesses.push(distance);

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