{
	setupSimulation: function() {
    		// record the starting position
    		this.startPos = this.getRobot().getCoreComponent().getRootPosition();
    		return true;
	},

	endSimulation: function() {
    		// find the distance between the starting position and ending position
    		var currentPos = this.getRobot().getCoreComponent().getRootPosition();
		var xDiff = (currentPos.x - this.startPos.x);
    		var yDiff = (currentPos.y - this.startPos.y);
    		this.fitness = Math.sqrt(Math.pow(xDiff,2) + Math.pow(yDiff,2));
    		return true;
	},

	getFitness: function() {
    		return this.fitness;
	},

}